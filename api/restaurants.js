"use strict";
var express = require("express");
var mongodb = require("mongodb");
var db_1 = require("../db");
var router = express.Router();
router.get('/', function (req, res) {
    console.log('api endpoint');
    db_1.default.db.collection('restaurants').find().toArray().then(function (restaurants) {
        res.json(restaurants);
    }).catch(function (err) {
        res.status(500);
        console.error(err);
    });
});
router.get('/:id', function (req, res) {
    var restaurantId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('restaurants').findOne(restaurantId).then(function (restaurant) {
        res.json(restaurant);
    });
});
router.post('/', function (req, res) {
    var restaurant = req.body;
    restaurant._id = new mongodb.ObjectID(restaurant._id);
    db_1.default.db.collection('restaurants').save(restaurant).then(function (newRestaurant) {
        res.json(newRestaurant);
    });
});
router.delete('/:id', function (req, res) {
    var restaurantId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('restaurants').remove({ _id: restaurantId }).then(function () {
        res.sendStatus(200);
    }).catch(function (err) {
        res.status(500);
        console.log(err);
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
