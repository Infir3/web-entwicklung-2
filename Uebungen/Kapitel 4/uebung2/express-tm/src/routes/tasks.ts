import * as express from 'express';
import * as uuidv4 from 'uuid/v4';
import { Db } from 'mongodb';
import { TaskDAO } from '../models/task.dao';
import { Task } from '../models/task';
import { TaskStatus } from '../models/task';

const router = express.Router();

router.get('/', (req, res) => {
  let taskDAO: TaskDAO = req.app.locals.taskDAO;
  taskDAO.findAll(function (err: any, tasks: Array<Task>) {
    res.render('tasks', { tasks });
  })
});

router.post('/', (req, res) => {
  let taskDAO: TaskDAO = req.app.locals.taskDAO;    
  let task = req.body;
  taskDAO.create(task, function(err: any, task: Task) {
    res.redirect('/tasks');
  });
});

router.patch('/:id', (req, res) => {
  let taskDAO: TaskDAO = req.app.locals.taskDAO;
  let task: any = {id: req.params.id, status: req.body.status};
  taskDAO.update(task, function(err: any, task: Task) {
    res.status(200).end();
  })
});

router.delete('/:id', (req, res) => {
  let taskDAO: TaskDAO = req.app.locals.taskDAO;  
  let id = req.params.id;
  taskDAO.delete(id, function(err: any, deleted: boolean) {
    if (deleted) {
      res.status(200).end();
    } else {
      console.log('Error while deleting: ', err.stack);
    }    
  });
});

export default router;