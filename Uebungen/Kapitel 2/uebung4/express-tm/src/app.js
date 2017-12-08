const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

fs.readFile(__dirname + '/../tasks.json', 'utf-8', (err, data) => {
    if (err) throw err;
    let tasks = JSON.parse(data);
    
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.get('/', (req, res) => {
        res.type('text/html');
        res.send(createHtmlResponse(tasks));
    });
    
    app.listen(3000, () => {
        console.log('listening on port 3000!');
    });
});

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