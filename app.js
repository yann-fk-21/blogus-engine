const path = require('path');

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const databaseConnection = require('./config/database');
const multerHelpers = require('./utils/multer-helper');

const authRoutes = require('./modules/auth/auth-routes');
const articleRoutes = require('./modules/article/routes');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'images')));

app.use(
  multer({
    storage: multerHelpers.storage,
    fileFilter: multerHelpers.fileFilter,
  }).single('image')
);

app.use((req, res, next) => {
  res.setHeader('Control-Access-Allow-Origin', '*');
  res.setHeader(
    'Control-Access-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Control-Access-Allow-Headers', 'Authorization, Content-Type');
  next();
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', articleRoutes);

app.use((error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  return res.status(status).json({ message: message });
});

// database connection
databaseConnection();
app.listen(8080);
