const express = require('express');
const fs = require('fs');
const path = require('path');

const tasks = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'tasks.json'), 'utf-8'));

const router = express.Router();

router.get('/', (req, res) => {
  res.render('tasks', { tasks });
});

module.exports = router;
