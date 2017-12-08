const express = require('express');
const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');

const router = express.Router();

router.get('/', (req, res) => {
  let db = req.app.locals.db;
  db.collection('tasks').find().toArray((err, tasks) => {
    tasks.forEach(function(element) {
      // format date
      element.createdAtString = new Date(element.createdAt).toLocaleString();     
    });
    // sort by createdAt descending
    tasks.sort(function(a, b) {
      return b.createdAt - a.createdAt;
    });
    res.render('tasks', { tasks });
  });
});

router.post('/', (req, res) => {
  let db = req.app.locals.db;
  let body = req.body;
  console.log(body);
  let task = {};
  task.id = uuidv4();
  task.title = body.title;
  task.createdAt = new Date().getTime();
  db.collection('tasks').insertOne(task, (err, result) => {
    if (!err) { console.log('Inserted ' + result.insertedCount); }
  });
  res.redirect('/tasks');
});

module.exports = router;
