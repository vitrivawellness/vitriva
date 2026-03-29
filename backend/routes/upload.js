const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', uploadController.uploadSingle, uploadController.uploadImage);

module.exports = router;
