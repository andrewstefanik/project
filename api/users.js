"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.get('/', function (req, res) {
    db_1.default.db.collection('users').find().toArray().then(function (users) {
        res.json(users);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/:id', function (req, res) {
    console.log('api endpoint');
    var userId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('users').findOne(userId).then(function (user) {
        res.json(user);
    });
});
router.post('/', function (req, res) {
    var user = req.body;
    user._id = new mongodb.ObjectID(user._id);
    db_1.default.db.collection('users').save(user).then(function (newUser) {
        res.json(newUser);
    });
});
router.delete('/:id', function (req, res) {
    var userId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('users').remove({ _id: userId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
