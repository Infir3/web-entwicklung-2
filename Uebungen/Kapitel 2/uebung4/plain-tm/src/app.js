const http = require('http');
const fs = require('fs');
const port = 3000;

fs.readFile(__dirname + '/../tasks.json', 'utf-8', (err, data) => {
    if (err) throw err;
    let tasks = JSON.parse(data);
    
    console.log(data);
    console.log(tasks);

    const server = http.createServer((req, res) => {   
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');    
        res.write(createHtmlResponse(tasks));
        res.end();
    });
    
    server.listen(port, () => {    
        console.log(`Server running at http://localhost:${port}`);
    });
});

function createHtmlResponse(tasks) {
    var html = '<head>';
    html += '<body>';
    html += '<h1>Aufgaben</h1>';
    html += '<ul>';
    tasks.forEach(function(element) {
        html += '<li><p>' + element.title + '</p></li>';
    }, this);
    html += '</ul>';
    html += '</body></head>';
    return html;
}