const express = require('express');
const cors = require('cors')
const app = express();

let candidates = [];
let totalVotes = 0;

function fillCandidates() {
    candidates = [
        {
            id: 1,
            name: 'Nightcrawler',
            votes: 0,
            percentage:0,
        },
        {
            id: 2,
            name: 'Magneto',
            votes: 0,
            percentage:0,
        },
        {
            id: 3,
            name: 'Spider-man',
            votes: 0,
            percentage:0,
        }
    ]
}

function simulateVotes(){
    setInterval(() => {
        candidates.forEach(candidate => {
            const votes = getRandomNumber();
            totalVotes+=votes;
            candidate.votes += votes;
            candidate.percentage = candidate.votes / totalVotes * 100;
        })
        console.log(candidates);
    }, 1000);
}

function getRandomNumber(from = 1, to = 10000){
    return Math.max(from, Math.ceil(Math.random() * to))
}

app.use(cors())

app.get('/', (req, res) => {
    res.json({message: 'Welcome!'});
});


app.get('/votes', (req, res) => {
    const sortedCandidates = candidates.sort((a,b) => {
        b.votes - a.votes;
    });
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify({candidates: sortedCandidates}, null, 4));
});

app.listen(8080);

fillCandidates();
simulateVotes();