const express = require('express');
const { body } = require('express-validator');

const authControllers = require('./auth-controllers');

const router = express.Router();

router.post(
  '/auth/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().isLength({ min: 5 }),
  ],
  authControllers.signup
);

router.post(
  '/auth/signin',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
  ],
  authControllers.signin
);

module.exports = router;
