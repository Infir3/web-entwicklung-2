const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const tasks = require('./routes/tasks');

const port = 3000;
const url = 'mongodb://localhost/express-tm';

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log('Could not connect to MongoDB: ', err.stack);
    process.exit(1);
  } else {
    startServer(db);
  }
});

function startServer(db) {
  const app = express();
  app.locals.db = db;

  const engineConfig = {
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main'
  }
  app.engine('hbs', exphbs(engineConfig));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.get('/', (req, res) => {
    res.redirect('/tasks');
  });
  app.use('/tasks', tasks);

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}