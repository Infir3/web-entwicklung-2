"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var router = express.Router();
router.get('/signin', function (req, res) {
    res.render('signin');
});
router.get('/signup', function (req, res) {
    res.render('signup');
});
router.post('/', function (req, res) {
    var userDAO = req.app.locals.userDAO;
    var user = {
        name: req.body.name,
        email: req.body.email
    };
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        user.password = hash;
        userDAO.create(user, function (err, result) {
            res.redirect('/tasks');
        });
    });
});
router.post('/signin', function (req, res) {
    var userDAO = req.app.locals.userDAO;
    var filter = { email: req.body.email };
    userDAO.findOne(filter, function (err, user) {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, isValid) {
                if (isValid) {
                    var claimSet = {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    };
                    jwt.sign(claimSet, 'mysecret', { algorithm: 'HS256' }, function (err, token) {
                        res.cookie('jwt-token', token);
                        res.redirect('/tasks');
                    });
                }
                else {
                    res.clearCookie('jwt-token');
                    res.redirect('/users/signin');
                }
            });
        }
        else {
            res.clearCookie('jwt-token');
            res.redirect('/users/signin');
        }
    });
});
exports.default = router;
