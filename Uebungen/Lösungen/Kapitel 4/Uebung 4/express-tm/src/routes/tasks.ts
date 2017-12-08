import * as express from 'express';
import * as uuidv4 from 'uuid/v4';

import { TaskDAO, Task, TaskStatus } from '../models/task.dao';

const router = express.Router();

router.get('/', (req, res) => {
  let taskDAO:TaskDAO = req.app.locals.taskDAO;
  taskDAO.findAll((err: Error, tasks: Task[]) => {
      res.render('tasks', { tasks });
    });
});

router.post('/', (req, res) => {
  let taskDAO:TaskDAO = req.app.locals.taskDAO;
  let task: Task = req.body;
  task.status = TaskStatus.open;
  taskDAO.create(task, (err: Error, result: Task) => {
    res.redirect('/tasks');
  });
});

router.patch('/:id', (req, res) => {
  let taskDAO: TaskDAO = req.app.locals.taskDAO;
  
  // Kandidat für Partial
  let task: any = { id: req.params.id, status: req.body.status };

  taskDAO.update(task,
    (err: Error, result: Task) => {
      res.status(200).end();
    });
});

router.delete('/:id', (req, res) => {
  let taskDAO: TaskDAO = req.app.locals.taskDAO;
  let id = req.params.id;
  taskDAO.delete(id, (err: Error, result: boolean) => {
    res.status(200).end();
  });
});

export default router;