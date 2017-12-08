import * as express from 'express';

import { Task } from '../models/task';
import { GenericDAO } from '../models/generic.dao';

const router = express.Router();

router.get('/', (req, res) => {
  let taskDAO:GenericDAO<Task> = req.app.locals.taskDAO;
  taskDAO.findAll((err, tasks) => {
      res.render('tasks', { tasks });
    });
});

router.post('/', (req, res) => {
  let taskDAO:GenericDAO<Task> = req.app.locals.taskDAO;
  let task: Task = req.body;
  task.status = 'open';
  taskDAO.create(task, (err, result) => {
    res.redirect('/tasks');
  });
});

router.patch('/:id', (req, res) => {
  let taskDAO: GenericDAO<Task> = req.app.locals.taskDAO;
  
  let task: Partial<Task> = { id: req.params.id, status: req.body.status };

  taskDAO.update(task as Task,
    (err, result) => {
      res.status(200).end();
    });
});

router.delete('/:id', (req, res) => {
  let taskDAO: GenericDAO<Task> = req.app.locals.taskDAO;
  let id = req.params.id;
  taskDAO.delete(id, (err, result) => {
    res.status(200).end();
  });
});

export default router;