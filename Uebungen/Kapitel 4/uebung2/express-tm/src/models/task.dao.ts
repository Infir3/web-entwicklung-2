import { Db } from 'mongodb';
import { v4 } from 'uuid';
import { Task} from './task';
import { TaskStatus} from './task';

export class TaskDAO {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    create(task: Task, cb: any) {
        task.id = v4();
        task.createdAt = new Date().getTime();
        task.status = TaskStatus.open;
        this.db.collection('tasks').insertOne(task, (err, result) => {
          cb(err, task);
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
        let id: string = task.id;
        this.db.collection('tasks').updateOne( { id }, { $set: task },
            (err, result) => {
                cb(err, task);
            });
    }

    delete(id: string, cb: any) {
        this.db.collection('tasks').deleteOne({ id }, (err, result) => {
            let deleted: boolean = false;
            if (result.deletedCount && result.deletedCount > 0) {
                deleted = true;
            }
            cb(err, deleted);
        });
    }
}