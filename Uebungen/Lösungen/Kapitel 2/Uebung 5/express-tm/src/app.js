const express = require('express');
const path = require('path');
const tasks = require('./routes/tasks');

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/tasks');
});

app.use('/tasks', tasks);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});