const express = require('express');
const { getLatestText, recordText, getAllTexts } = require('../controllers/text')
const router = express.Router();

router.get('/gettext', getLatestText)
router.post('/recordtext', recordText)
router.get('/getalltexts', getAllTexts)

module.exports = router