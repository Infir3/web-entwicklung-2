import { Db } from 'mongodb';
import { Task } from './task';
import * as uuidv4 from 'uuid/v4';

export { Task, TaskStatus } from './task';

export class TaskDAO {
  constructor(private db: Db) { }

  create(task: Task, cb: any) {
    task.id = uuidv4();
    task.createdAt = new Date().getTime();
    this.db.collection('tasks').insertOne(
      task,
      (err, result) => {
        cb(err, task)
      });
  }

  findAll(cb: any) {
    this.db.collection('tasks')
      .find().sort({ createdAt: -1 })
      .toArray((err, tasks) => {
        cb(err, tasks);
      });
  }

  update(task: Task, cb: any) {
    this.db.collection('tasks').updateOne(
      { id: task.id }, { $set: task },
      (err, result) => {
        cb(err, task)
      });
  }

  delete(id: string, cb: any) {
    this.db.collection('tasks').deleteOne(
      { id },
      (err, result) => {
        cb(err, !!result.deletedCount);
      });
  }

}