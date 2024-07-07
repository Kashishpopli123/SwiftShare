const express = require('express');
const upload = require('../utils/upload.js');
const { uploadImage, getImage } = require('../controllers/image-controller.js');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadImage);
router.get('/file/:fileId', getImage);

module.exports = router;
