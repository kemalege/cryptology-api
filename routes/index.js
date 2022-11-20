const express = require('express');
const text = require('./text');
const auth = require('./auth');

//api
const router = express.Router();

router.use("/auth",auth);
router.use("/text",text);

module.exports = router;