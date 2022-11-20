const express = require('express');
const { getLatestText, recordText } = require('../controllers/text')
const router = express.Router();

router.get('/gettext', getLatestText)
router.post('/recordtext', recordText)

module.exports = router