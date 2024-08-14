const { validationResult } = require('express-validator');

const Article = require('./article');

exports.getArticles = async (req, res, next) => {
  const page = req.query.page || 1;

  try {
    let totalItems = await Article.find().countDocuments();
    const ITEMS_PER_PAGE = 20;

    const articles = await Article.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    if (!articles) {
      return res.status(404).json({ message: 'Article not found!' });
    }

    return res.status(200).json({ totalItems: totalItems, articles: articles });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

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
