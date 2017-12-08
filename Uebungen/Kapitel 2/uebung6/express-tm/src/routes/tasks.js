const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile(__dirname + '/../../tasks.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let tasks = JSON.parse(data);        
        //res.send(createHTML(tasks));
        res.render('tasks', {tasks: tasks});
    });
});

module.exports = router;

function createHTML(tasks) {
    let html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="UTF-8">
          <link rel="stylesheet" href="/css/style.css"> 
          <title>Aufgaben</title>
        </head>
        <body>
          <header><h1>Aufgaben</h1></header>
          <main>
            <ul>`;
    
    for (let task of tasks) {
      html += `<li>${task.title}</li>`;
    }
  
    html += `
            </ul>
          </main>
        </body>
      </html>`;
    
    return html;
  }