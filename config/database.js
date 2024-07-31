const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((result) => {
      console.log('database connection ...');
    })
    .catch((err) => console.log(err));
};
