const multer = require('multer');

exports.storage = multer.diskStorage({
  destination: (req, file, callback) => {
    return callback(null, 'images');
  },
  filename: (req, file, callback) => {
    return callback(null, new Date().toISOString() + '-' + file.originalname);
  },
});

exports.fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
