const express = require('express');
const { body } = require('express-validator');

const categoryControllers = require('./controllers');

const router = express.Router();

router.post(
  '/categories',
  [body('name').trim().isLength({ min: 4 }).isString()],
  categoryControllers.createCategory
);

router.get('/categories', categoryControllers.getCategories);

router.delete('/categories/:categoryId', categoryControllers.deleteCategory);

module.exports = router;
