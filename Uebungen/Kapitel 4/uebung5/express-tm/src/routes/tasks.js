"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    let genericDao = req.app.locals.genericDao;
    genericDao.findAll(function (err, tasks) {
        res.render('tasks', { tasks });
    });
});
router.post('/', (req, res) => {
    let genericDao = req.app.locals.genericDao;
    let task = req.body;
    task.status = 'open';
    genericDao.create(task, function (err, task) {
        res.redirect('/tasks');
    });
});
router.patch('/:id', (req, res) => {
    let genericDao = req.app.locals.genericDao;
    let id = req.params.id;
    let status = req.body.status;
    let task = { id: id, title: '', createdAt: 0, status: status };
    let updateObject = { status: status };
    genericDao.update(task, updateObject, function (err, task) {
        res.status(200).end();
    });
});
router.delete('/:id', (req, res) => {
    let genericDao = req.app.locals.genericDao;
    let id = req.params.id;
    genericDao.delete(id, function (err, deleted) {
        if (deleted) {
            res.status(200).end();
        }
        else {
            console.log('Error while deleting: ', err.stack);
        }
    });
});
exports.default = router;
