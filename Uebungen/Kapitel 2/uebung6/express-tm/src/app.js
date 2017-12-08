const express = require('express');
const path = require('path');
const tasks = require('./routes/tasks');

const port = 3000;
const app = express();
const exphbs= require('express-handlebars');

app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views')); // Templates-Verzeichnis
app.set('view engine', 'hbs'); // Registrieren der Template Engine

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.use('/tasks', tasks);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});