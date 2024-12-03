const express = require('express');
const { body } = require('express-validator');

const articleControllers = require('./controllers');
const isAuth = require('../../middleware/is-auth');

const router = express.Router();

router.post(
  '/articles',
  isAuth,
  [
    body('title').trim().isLength({ min: 6 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  articleControllers.createArticle
);

module.exports = router;
