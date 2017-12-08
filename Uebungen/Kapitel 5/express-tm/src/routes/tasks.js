"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get('/', function (req, res) {
    var taskDAO = req.app.locals.taskDAO;
    taskDAO.findAll(function (err, tasks) {
        res.render('tasks', { tasks: tasks });
    });
});
router.post('/', function (req, res) {
    var taskDAO = req.app.locals.taskDAO;
    var task = req.body;
    task.status = 'open';
    taskDAO.create(task, function (err, result) {
        res.redirect('/tasks');
    });
});
router.patch('/:id', function (req, res) {
    var taskDAO = req.app.locals.taskDAO;
    var task = { id: req.params.id, status: req.body.status };
    taskDAO.update(task, function (err, result) {
        res.status(200).end();
    });
});
router.delete('/:id', function (req, res) {
    var taskDAO = req.app.locals.taskDAO;
    var id = req.params.id;
    taskDAO.delete(id, function (err, result) {
        res.status(200).end();
    });
});
exports.default = router;
