import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { GenericDAO } from '../models/generic.dao';

const router = express.Router();

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/', (req, res) => {
  let userDAO: GenericDAO<User> = req.app.locals.userDAO;
  let user: Partial<User> = {
    name: req.body.name,
    email: req.body.email
  };
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    user.password = hash;
    userDAO.create(user as User, (err, result) => {
      res.redirect('/tasks');
    });
  });
});

router.post('/signin', (req, res) => {
  let userDAO: GenericDAO<User> = req.app.locals.userDAO;
  let filter: Partial<User> = { email: req.body.email };

  userDAO.findOne(filter, (err, user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if (isValid) {
          let claimSet = {
            id: user.id,
            name: user.name,
            email: user.email
          }
          jwt.sign(claimSet, 'mysecret', { algorithm: 'HS256' },
            (err, token) => {
              res.cookie('jwt-token', token);
              res.redirect('/tasks');
            }
          );
        } else {
          res.clearCookie('jwt-token');
          res.redirect('/users/signin');
        }
      });
    } else {
      res.clearCookie('jwt-token');
      res.redirect('/users/signin');
    }
  });
});

export default router;