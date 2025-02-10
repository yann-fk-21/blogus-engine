const { validationResult } = require('express-validator');

const Category = require('./category');

exports.getCategories = async (req, res, next) => {
  try {
    const foundCategories = await Category.find();
    return res.status(200).json({ categories: foundCategories });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  const categoryName = req.body.name;
  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('invalid input');
      error.statusCode = 422;
      throw error;
    }

    const createdCategory = new Category({ name: categoryName });
    await createdCategory.save();

    return res
      .status(201)
      .json({ message: 'category is created', category: createdCategory });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    await Category.findByIdAndDelete(categoryId);
    return res.status(204).json({ message: 'category is deleted' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
