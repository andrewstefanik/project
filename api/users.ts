import * as express from 'express';
import * as mongodb from 'mongodb';
import database from '../db';

let router = express.Router();

// Get single user
router.get('/', (req, res) => {

  database.db.collection('users').find().toArray().then((users) => {
    res.json(users);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  })
});

// Get a single user by id
router.get('/:id', (req, res) => {
    console.log('api endpoint');
    let userId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('users').findOne(userId).then((user) => {
    res.json(user);
  });
});

// Create new user
router.post('/', (req, res) => {
  let user = req.body;
  user._id = new mongodb.ObjectID(user._id);
  database.db.collection('users').save(user).then((newUser) => {
      res.json(newUser);
  })
});

// Delete user
router.delete('/:id', (req, res) => {
  let userId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('users').remove({_id:userId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;
