import * as express from 'express';
import * as uuidv4 from 'uuid/v4';
import { Db } from 'mongodb';
import { GenericDAO } from '../models/generic.dao';
import { Task, TaskStatusEnum } from '../models/task';
import { TaskStatus } from '../models/task';
import { TaskDAO } from '../models/task.dao';

const router = express.Router();

router.get('/', (req, res) => {
  let genericDao: GenericDAO<Task> = req.app.locals.genericDao;
  genericDao.findAll(function (err: any, tasks: Array<Task>) {
    res.render('tasks', { tasks });
  })
});

router.post('/', (req, res) => {
  let genericDao: GenericDAO<Task> = req.app.locals.genericDao;    
  let task: Task = req.body;
  task.status = 'open';
  genericDao.create(task, function(err: any, task: Task) {
    res.redirect('/tasks');
  });
});

router.patch('/:id', (req, res) => {
  let genericDao: GenericDAO<Task> = req.app.locals.genericDao;
  let id: string = req.params.id;
  let status: TaskStatus = req.body.status;
  let task: Task = {id: id, title: '', createdAt: 0, status: status};
  let updateObject = { status: status};
  genericDao.update(task, updateObject, function(err: any, task: Task) {
    res.status(200).end();
  })
});

router.delete('/:id', (req, res) => {
  let genericDao: GenericDAO<Task> = req.app.locals.genericDao;  
  let id = req.params.id;
  genericDao.delete(id, function(err: any, deleted: boolean) {
    if (deleted) {
      res.status(200).end();
    } else {
      console.log('Error while deleting: ', err.stack);
    }    
  });
});

export default router;