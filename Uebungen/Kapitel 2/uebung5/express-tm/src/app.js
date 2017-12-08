const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const tasks = require('./routes/tasks');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/tasks');
  });

app.use('/tasks', tasks);

app.listen(3000, () => {
    console.log('listening on port 3000!');
});