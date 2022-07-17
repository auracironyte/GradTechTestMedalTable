/**
 * Parse the medal data to produce a medaltable
 * The winner gets 3 points, second place 2 points and third place 1 point
 */

const countriesPoints = [
    {
        name: "Italy",
        totalPoints: 0,
    },
    {
        name: "France",
        totalPoints: 0,
    },
    {
        name: "ROC",
        totalPoints: 0,
    },
    {
        name: "USA",
        totalPoints: 0,
    },
    {
        name: "Qatar",
        totalPoints: 0,
    },
    {
        name: "China",
        totalPoints: 0,
    },
    {
        name: "Germany",
        totalPoints: 0,
    },
    {
        name: "Brazil",
        totalPoints: 0,
    },
    {
        name: "Belarus",
        totalPoints: 0,
    },
]

const podiumPointMap = {
    "1": 3,
    "2": 2,
    "3": 1,
}

function createMedalTable(medals) {
    medals.forEach(medalByPodium => {
        medalByPodium.podium.forEach(podiumCountry => {
            // split podium by county
            const podiumCountryMap = podiumCountry.split(".");
            const podium = podiumCountryMap[0];
            const country = podiumCountryMap[1];
            // find object in array and replace/change object totalPoints if founded
            const foundIndex = countriesPoints.findIndex(obj => obj.name === country);
            countriesPoints[foundIndex].totalPoints += podiumPointMap[podium];
        });
    });

    let medalTableResult = {};
    countriesPoints.forEach(({name, totalPoints}) =>
        Object.assign(medalTableResult, {[name]: totalPoints}));

    return medalTableResult;
}

describe("Medal Table Generator", () => {
    // Test function, please do not edit
    it("creates correct data structure ", () => {
        // Input data
        const medals = [{
            sport: "cycling",
            podium: ["1.China", "2.Germany", "3.ROC"]
        },
            {
                sport: "fencing",
                podium: ["1.ROC", "2.France", "3.Italy"]
            },
            {
                sport: "high jump",
                podium: ["1.Italy", "1.Qatar", "3.Belarus"]
            },
            {
                sport: "swimming",
                podium: ["1.USA", "2.France", "3.Brazil"]
            }
        ];

        // Expected output data
        const medalTable = {
            "Italy": 4,
            "France": 4,
            "ROC": 4,
            "USA": 3,
            "Qatar": 3,
            "China": 3,
            "Germany": 2,
            "Brazil": 1,
            "Belarus": 1,
        };

        const actualResult = createMedalTable(medals);
        expect(actualResult).toMatchObject(medalTable);
    });
});