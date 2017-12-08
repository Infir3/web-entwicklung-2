const express = require('express');
const uuidv4 = require('uuid/v4');

const router = express.Router();

router.get('/', (req, res) => {
  let db = req.app.locals.db;
  db.collection('tasks')
    .find().sort({ createdAt: -1 })
    .toArray((err, tasks) => {
      res.render('tasks', { tasks });
    });
});

router.post('/', (req, res) => {
  let db = req.app.locals.db;
  let task = req.body;
  task.id = uuidv4();
  task.createdAt = new Date().getTime();
  task.status = 'open';
  db.collection('tasks').insertOne(task, (err, result) => {
    res.redirect('/tasks');
  });
});

router.patch('/:id', (req, res) => {
  let db = req.app.locals.db;
  let id = req.params.id;
  let status = req.body.status;

  db.collection('tasks').updateOne(
    { id }, { $set: { status } },
    (err, result) => {
      res.status(200).end();
    });
});

router.delete('/:id', (req, res) => {
  let db = req.app.locals.db;
  let id = req.params.id;
  db.collection('tasks').deleteOne({ id }, (err, result) => {
    res.status(200).end();
  });
});

module.exports = router;