"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require("uuid/v4");
var task_1 = require("./task");
exports.TaskStatus = task_1.TaskStatus;
var TaskDAO = /** @class */ (function () {
    function TaskDAO(db) {
        this.db = db;
    }
    TaskDAO.prototype.create = function (task, cb) {
        task.id = uuidv4();
        task.createdAt = new Date().getTime();
        this.db.collection('tasks').insertOne(task, function (err, result) {
            cb(err, task);
        });
    };
    TaskDAO.prototype.findAll = function (cb) {
        this.db.collection('tasks')
            .find().sort({ createdAt: -1 })
            .toArray(function (err, tasks) {
            cb(err, tasks);
        });
    };
    TaskDAO.prototype.update = function (task, cb) {
        this.db.collection('tasks').updateOne({ id: task.id }, { $set: task }, function (err, result) {
            cb(err, task);
        });
    };
    TaskDAO.prototype.delete = function (id, cb) {
        this.db.collection('tasks').deleteOne({ id: id }, function (err, result) {
            cb(err, !!result.deletedCount);
        });
    };
    return TaskDAO;
}());
exports.TaskDAO = TaskDAO;
