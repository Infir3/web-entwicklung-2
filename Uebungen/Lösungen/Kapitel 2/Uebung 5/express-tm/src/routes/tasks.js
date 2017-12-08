const express = require('express');
const fs = require('fs');
const path = require('path');

const tasks = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'tasks.json'), 'utf-8'));

const router = express.Router();

router.get('/', (req, res) => {
  res.send(createHTML(tasks));
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
