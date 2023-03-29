/*This file supplies the input for the program: Passing score (Passing_score), 
contact information (Contact), and test records (Test_info)*/

export const Passing_score = 55

export const Contact = [
    {name: 'Peter', phone: 12345678},
    {name: 'Alice', phone: 23456789},
    {name: 'John', phone: 34567890},
    {name: 'Susan', phone: 98765432},
    {name: 'Lily', phone: 87654321},
    {name: 'Tom', phone: 56781234}
]

export const Test_info = [
    {
        testDate: "29-May-2020",
        scores: [ 
                    {name: 'Peter', score: 40.5},
                    {name: 'Alice', score: 60.2}, 
                    {name: 'John', score: 38.7}
        ],
        callLimit: 1
    },
    {
        testDate: "30-May-2020",
        scores: [
                    {name: 'Peter', score: 70.6},
                    {name: 'Tom', score: 16.7}, 
                    {name: 'Lily', score: 16.7}, 
                    {name: 'Susan', score: 10}
        ],
        callLimit: 0
    },
    {
        testDate: "31-May-2020",
        scores: [
                    {name: 'Peter', score: 16.7},
        ],
        callLimit: 2
    },
    {
        testDate: "1-Jun-2020",
        scores: [],
        callLimit: 0
    },
    {
        testDate: "2-Jun-2020",
        scores: [
                    {name: 'Alice', score: 89.2},
                    {name: 'Tom', score: 100}
        ],
        callLimit: 3
    }
]