import * as express from 'express';
import * as mongodb from 'mongodb';
import database from '../db';

let router = express.Router();

// Get single restaurant
router.get('/', (req, res) => {
    console.log('api endpoint');
  database.db.collection('restaurants').find().toArray().then((restaurants) => {
    res.json(restaurants);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  })
});

// Get a single restaurant by id
router.get('/:id', (req, res) => {
    let restaurantId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('restaurants').findOne(restaurantId).then((restaurant) => {
    res.json(restaurant);
  });
});

// Create new restaurant
router.post('/', (req, res) => {
  let restaurant = req.body;
  restaurant._id = new mongodb.ObjectID(restaurant._id);
  database.db.collection('restaurants').save(restaurant).then((newRestaurant) => {
      res.json(newRestaurant);
  })
});

// Delete restaurant
router.delete('/:id', (req, res) => {
  let restaurantId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('restaurants').remove({_id:restaurantId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;
