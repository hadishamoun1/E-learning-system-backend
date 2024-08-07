// config/multerConfig.js
const multer = require('multer');

const storage = multer.memoryStorage(); // This stores the file in memory

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, PDF, and TXT are allowed.'), false);
    }
  },
});

module.exports = upload;
