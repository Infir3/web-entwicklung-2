"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get('/signin', function (req, res) {
    res.render('signin');
});
router.get('/signup', function (req, res) {
    res.render('signup');
});
exports.default = router;
