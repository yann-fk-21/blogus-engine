const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../../middleware/is-auth');
const userControllers = require('./controllers');

const router = express.Router();

router.put(
  '/users',
  isAuth,
  [
    body('email').isEmail().normalizeEmail(),
    body('name').trim().isLength({ min: 4 }),
    body('biography').trim().isLength({ min: 6 }),
  ],
  userControllers.updateUserInfos
);

router.patch('/users/img', isAuth, userControllers.updatedUserAvatar);

module.exports = router;
