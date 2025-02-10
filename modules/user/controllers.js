const { validationResult } = require('express-validator');

const User = require('./user');

exports.updateUserInfos = async (req, res, next) => {
  const userEmail = req.body.email;
  const userName = req.body.name;
  const userBiography = req.body.biography;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('invalid inputs');
    error.statusCode = 422;
    throw error;
  }

  try {
    const foundUser = await User.findOne(req.userId);
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found!' });
    }

    foundUser.name = userName;
    foundUser.email = userEmail;
    foundUser.biography = userBiography;

    await foundUser.save();
    return res.status(200).json({ message: 'User informations updated!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.updatedUserAvatar = async (req, res, next) => {
  const userImage = req.file;

  try {
    const foundUser = await User.findOne(req.userId);
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!userImage) {
      foundUser.avatar = null;
    }

    foundUser.avatar = userImage.path;
    await foundUser.save();

    return res
      .status(200)
      .json({ message: 'avatar is updated', avatar: foundUser.avatar });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
