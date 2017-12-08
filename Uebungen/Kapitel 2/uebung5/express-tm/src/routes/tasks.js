const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile(__dirname + '/../../tasks.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let tasks = JSON.parse(data);        

        res.type('text/html');
        res.send(createHtmlResponse(tasks));
    });
});

module.exports = router;

function createHtmlResponse(tasks) {    
    let html = '<head>';
    html += '<link rel="stylesheet" type="text/css" href="css/style.css"/>';
    html += '</head>';
    html += '<body>';
    html += '<h1>Aufgaben</h1>';
    html += '<ul>';
    tasks.forEach(function(element) {
        html += '<li><p>' + element.title + '</p></li>';
    }, this);
    html += '</ul>';
    html += '</body>';
    return html;
}