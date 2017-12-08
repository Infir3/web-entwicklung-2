const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const tasks = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'tasks.json'), 'utf-8'));

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(createHTML(tasks));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function createHTML(tasks) {
  let html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
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
