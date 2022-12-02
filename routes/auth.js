const express = require('express');
const { register, getUser, imageUplaod, getProfileImage } = require('../controllers/auth');
const profileImageUpload = require('../middlewares/library/profileImageUpload');
const router = express.Router();

router.post('/register', register)
router.post('/login', getUser )
router.post("/upload", profileImageUpload.single("profile_image"), imageUplaod);
router.get("/profileimg", getProfileImage);

module.exports = router