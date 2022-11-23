const express = require('express');
const { getLatestText, recordText, getAllTexts } = require('../controllers/text')
const router = express.Router();
var cors = require('cors')

router.get('/gettext', getLatestText)
router.post('/recordtext', recordText)
router.options('/text', cors())
router.get('/getalltexts', getAllTexts)

module.exports = router