"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class TaskDAO {
    constructor(db) {
        this.db = db;
    }
    create(task, cb) {
        task.id = uuid_1.v4();
        task.createdAt = new Date().getTime();
        task.status = 'open';
        this.db.collection('tasks').insertOne(task, (err, result) => {
            cb(err, task);
        });
    }
    findAll(cb) {
        this.db.collection('tasks')
            .find().sort({ createdAt: -1 })
            .toArray((err, tasks) => {
            cb(err, tasks);
        });
    }
    update(task, cb) {
        let id = task.id;
        let taskStatus = task.status;
        this.db.collection('tasks').updateOne({ id }, { $set: { status: taskStatus } }, (err, result) => {
            cb(err, task);
        });
    }
    delete(id, cb) {
        this.db.collection('tasks').deleteOne({ id }, (err, result) => {
            let deleted = false;
            if (result.deletedCount && result.deletedCount > 0) {
                deleted = true;
            }
            cb(err, deleted);
        });
    }
}
exports.TaskDAO = TaskDAO;
