"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    let taskDAO = req.app.locals.taskDAO;
    taskDAO.findAll(function (err, tasks) {
        res.render('tasks', { tasks });
    });
});
router.post('/', (req, res) => {
    let taskDAO = req.app.locals.taskDAO;
    let task = req.body;
    taskDAO.create(task, function (err, task) {
        res.redirect('/tasks');
    });
});
router.patch('/:id', (req, res) => {
    let taskDAO = req.app.locals.taskDAO;
    let id = req.params.id;
    let status = req.body.status;
    let task = { id: id, title: '', createdAt: 0, status: status };
    taskDAO.update(task, function (err, task) {
        res.status(200).end();
    });
});
router.delete('/:id', (req, res) => {
    let taskDAO = req.app.locals.taskDAO;
    let id = req.params.id;
    taskDAO.delete(id, function (err, deleted) {
        if (deleted) {
            res.status(200).end();
        }
        else {
            console.log('Error while deleting: ', err.stack);
        }
    });
});
exports.default = router;
