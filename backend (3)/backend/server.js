const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// =========================================================
// HELPER FUNCTIONS
// =========================================================

function clean(value) {
    return String(value ?? "")
        .toLowerCase()
        .trim();
}

function hasValue(value) {
    return value !== null &&
           value !== undefined &&
           value !== "" &&
           value !== "null";
}

function containsAny(text, words) {
    return words.some(word => text.includes(word));
}


// =========================================================
// HOME
// =========================================================

app.get("/", (req, res) => {
    res.json({
        message: "Avsar backend is running!"
    });
});


// =========================================================
// GET ALL SCHOLARSHIPS
// =========================================================

app.get("/api/scholarships", (req, res) => {

    try {

        const scholarships = db.prepare(`
            SELECT *
            FROM scholarships
            ORDER BY id ASC
        `).all();

        res.json(scholarships);

    } catch (error) {

        console.error("Database error:", error);

        res.status(500).json({
            error: "Could not load scholarships"
        });

    }
});


// =========================================================
// MATCH SCHOLARSHIPS
// =========================================================

app.post("/api/matches", (req, res) => {

    const user = req.body || {};

    console.log("\n=================================");
    console.log("Student details received:");
    console.log(user);
    console.log("=================================\n");

    try {

        const scholarships = db.prepare(`
            SELECT *
            FROM scholarships
            ORDER BY id ASC
        `).all();


        // -----------------------------------------------------
        // USER DATA
        // -----------------------------------------------------

        const userLevel = clean(user.level);
        const userCategory = clean(user.category);
        const userType = clean(user.type);
        const userGender = clean(user.gender);
        const userState = clean(user.state);

        const userScore =
            hasValue(user.score)
                ? Number(user.score)
                : null;

        const userIncome =
            hasValue(user.income)
                ? Number(user.income)
                : null;


        // -----------------------------------------------------
        // MATCHING
        // -----------------------------------------------------

        const matches = scholarships.filter((scholarship) => {

            const level = clean(scholarship.level);
            const category = clean(scholarship.category);
            const type = clean(scholarship.type);
            const gender = clean(scholarship.gender);
            const state = clean(scholarship.state);
            const eligibility = clean(
                scholarship.eligibilityText
            );


            // =================================================
            // LEVEL MATCH
            // =================================================

            let levelMatch = true;

            if (userLevel) {

                if (
                    userLevel === "ug" ||
                    userLevel === "undergraduate"
                ) {

                    levelMatch =
                        containsAny(level, [
                            "ug",
                            "undergraduate",
                            "college",
                            "school/college",
                            "school /college",
                            "school / college"
                        ]);

                }

                else if (
                    userLevel === "pg" ||
                    userLevel === "postgraduate"
                ) {

                    levelMatch =
                        containsAny(level, [
                            "pg",
                            "postgraduate",
                            "college"
                        ]);

                }

                else {

                    levelMatch =
                        level.includes(userLevel) ||
                        level === "all" ||
                        !level;

                }

            }


            // =================================================
            // CATEGORY MATCH
            // =================================================

            let categoryMatch = true;

            /*
             * General students:
             * Scholarships specifically restricted to SC/ST/OBC/
             * minority/PwD etc. should normally be excluded.
             */

            const restrictedToOtherCategory =
                containsAny(eligibility, [
                    "sc students",
                    "st students",
                    "sc/st",
                    "obc students",
                    "obc/ebc",
                    "ews students",
                    "minority community",
                    "minority students",
                    "minority",
                    "differently abled",
                    "differently-abled",
                    "disability",
                    "pwd students",
                    "persons with disability"
                ]);


            if (userCategory === "general") {

                categoryMatch =
                    !restrictedToOtherCategory;

            }

            else if (userCategory === "obc") {

                categoryMatch =
                    eligibility.includes("obc") ||
                    eligibility.includes("all") ||
                    !restrictedToOtherCategory;

            }

            else if (userCategory === "sc") {

                categoryMatch =
                    eligibility.includes("sc") ||
                    !restrictedToOtherCategory;

            }

            else if (userCategory === "st") {

                categoryMatch =
                    eligibility.includes("st") ||
                    !restrictedToOtherCategory;

            }

            else if (userCategory === "ews") {

                categoryMatch =
                    eligibility.includes("ews") ||
                    eligibility.includes("economically weaker");

            }

            else if (userCategory) {

                categoryMatch =
                    eligibility.includes(userCategory) ||
                    category.includes(userCategory) ||
                    !restrictedToOtherCategory;

            }


            // =================================================
            // TYPE MATCH
            // =================================================

            let typeMatch = true;

            if (userType) {

                if (userType === "merit") {

                    /*
                     * Merit user can receive merit scholarships.
                     *
                     * If database type is empty, don't reject it.
                     */

                    typeMatch =
                        type.includes("merit") ||
                        category.includes("merit") ||
                        !type;

                }

                else if (
                    userType === "need" ||
                    userType === "need-based"
                ) {

                    typeMatch =
                        type.includes("need") ||
                        category.includes("need") ||
                        !type;

                }

                else {

                    typeMatch =
                        type.includes(userType) ||
                        !type;

                }

            }


            // =================================================
            // GENDER MATCH
            // =================================================

            let genderMatch = true;

            if (gender && gender !== "all") {

                if (userGender) {

                    genderMatch =
                        gender === userGender ||
                        gender.includes(userGender);

                }

            }


            /*
             * If the scholarship eligibility text says
             * female/women/girls and the student is female,
             * allow it.
             */

            if (
                userGender === "female" &&
                containsAny(eligibility, [
                    "female",
                    "women",
                    "woman",
                    "girl",
                    "girls"
                ])
            ) {

                genderMatch = true;

            }


            // =================================================
            // STATE MATCH
            // =================================================

            let stateMatch = true;

            if (userState) {

                /*
                 * Empty state means nationwide.
                 */

                if (
                    !state ||
                    state === "all" ||
                    state === "india" ||
                    state === "national"
                ) {

                    stateMatch = true;

                }

                else {

                    stateMatch =
                        state.includes(userState) ||
                        userState.includes(state) ||
                        eligibility.includes(userState);

                }

            }


            // =================================================
            // SCORE MATCH
            // =================================================

            let scoreMatch = true;

            if (
                userScore !== null &&
                !isNaN(userScore)
            ) {

                if (
                    scholarship.minScore !== null &&
                    scholarship.minScore !== undefined &&
                    scholarship.minScore !== ""
                ) {

                    const minScore =
                        Number(scholarship.minScore);

                    if (!isNaN(minScore)) {

                        scoreMatch =
                            userScore >= minScore;

                    }

                }

            }


            // =================================================
            // INCOME MATCH
            // =================================================

            let incomeMatch = true;

            if (
                userIncome !== null &&
                !isNaN(userIncome)
            ) {

                if (
                    scholarship.maxIncome !== null &&
                    scholarship.maxIncome !== undefined &&
                    scholarship.maxIncome !== ""
                ) {

                    const maxIncome =
                        Number(scholarship.maxIncome);

                    if (!isNaN(maxIncome)) {

                        incomeMatch =
                            userIncome <= maxIncome;

                    }

                }

            }


            // =================================================
            // DEBUG
            // =================================================

            console.log(
                scholarship.name,
                "=>",
                {
                    levelMatch,
                    categoryMatch,
                    typeMatch,
                    genderMatch,
                    stateMatch,
                    scoreMatch,
                    incomeMatch
                }
            );


            return (
                levelMatch &&
                categoryMatch &&
                typeMatch &&
                genderMatch &&
                stateMatch &&
                scoreMatch &&
                incomeMatch
            );

        });


        // =====================================================
        // RESULT
        // =====================================================

        console.log(
            "\nMATCHES FOUND:",
            matches.length
        );

        console.log(
            "=================================\n"
        );


        res.json(matches);

    } catch (error) {

        console.error(
            "Matching error:",
            error
        );

        res.status(500).json({
            error: "Could not find scholarship matches",
            details: error.message
        });

    }

});


// =========================================================
// START SERVER
// =========================================================

app.listen(PORT, () => {

    console.log(
        `Avsar backend running at http://localhost:${PORT}`
    );

});
