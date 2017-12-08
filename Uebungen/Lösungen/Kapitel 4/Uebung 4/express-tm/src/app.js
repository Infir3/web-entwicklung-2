"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var path = require("path");
var mongodb_1 = require("mongodb");
var tasks_1 = require("./routes/tasks");
var task_dao_1 = require("./models/task.dao");
var port = 3000;
var url = 'mongodb://localhost/express-tm';
mongodb_1.MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Could not connect to MongoDB: ', err.stack);
        process.exit(1);
    }
    else {
        startServer(db);
    }
});
function startServer(db) {
    var app = express();
    app.locals.taskDAO = new task_dao_1.TaskDAO(db);
    var engineConfig = {
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
        defaultLayout: 'main'
    };
    app.engine('hbs', exphbs(engineConfig));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.get('/', function (req, res) {
        res.redirect('/tasks');
    });
    app.use('/tasks', tasks_1.default);
    app.listen(port, function () {
        console.log("Server running at http://localhost:" + port);
    });
}
