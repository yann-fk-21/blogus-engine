const Article = require('./article');
const { validationResult } = require('express-validator');

exports.createArticle = async (req, res, next) => {
  const articleTitle = req.body.title;
  const articleContent = req.body.content;
  const articleCategory = req.body.category;
  const articleImageUrl = req.file;

  const errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      const error = new Error('Length of inputs is too short');
      error.statusCode = 422;
      throw error;
    }

    const createdArticle = new Article({
      title: articleTitle,
      content: articleContent,
      imageUrl: articleImageUrl.path,
      category: articleCategory,
      author: req.userId,
    });
    await createdArticle.save();

    return res
      .status(200)
      .json({ message: 'article is created!', article: createdArticle });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
