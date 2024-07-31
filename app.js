require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const databaseConnection = require('./config/database');

const authRoutes = require('./modules/auth/auth-routes');

const app = express();

// middleware
app.use(bodyParser.json());

app.use('/api/v1', authRoutes);

app.use((error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  return res.status(status).json({ message: message });
});

// database connection
databaseConnection();
app.listen(8080);
