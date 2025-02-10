const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../user/user');

exports.signup = async (req, res, next) => {
  const username = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('invalid inputs');
      error.statusCode = 422;
      error.data = errors.array();
      console.log(errors.array());
      throw error;
    }
    const foundUser = await User.findOne({ email: userEmail });
    if (foundUser) {
      return res.status(422).json({ message: 'Email already exist!' });
    }

    const hashPassword = await bcrypt.hash(userPassword, 12);
    const createdUser = new User({
      name: username,
      email: userEmail,
      password: hashPassword,
    });
    await createdUser.save();
    return res
      .status(201)
      .json({ message: 'user created!', user: createdUser });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.signin = async (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Invalid inputs');
      error.statusCode = 500;
      error.data = errors.array();
      throw error;
    }

    const foundUser = await User.findOne({ email: userEmail });
    if (!foundUser) {
      const error = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }

    const isEqual = await bcrypt.compare(userPassword, foundUser.password);
    if (!isEqual) {
      const error = new Error('Not Authenticated!');
      error.statusCode = 401;
      throw error;
    }

    const user = {
      userId: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
    };
    const token = jwt.sign(
      {
        user: user,
      },
      'topsecrettopsecret',
      { expiresIn: '1h' }
    );

    res
      .status(200)
      .json({ mesage: 'user is authenticated!', user: user, token: token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
