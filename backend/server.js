const http = require('http');
const url = require('url');
const express = require('express')
const questions = require('./question')
var app = express()

function send(res, data) {
    res.set('Content-Type', 'application/json');
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.send(data)
}

app.get('/generate/theory-interval/:level', function(req, res) {
    let level = parseInt(req.params.level)
    let question = questions.generateQTheoryInterval(level)
    send(res, question)
})

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port)
console.log(`Server running at http://${hostname}:${port}/`);