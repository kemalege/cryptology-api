const User = require("../models/User");
var CryptoJS = require("crypto-js");
const {decryptData, encryptData} = require("../helpers/cryption/cryptionHelpers");

const register = async (req, res, next) => {
  // POST DATA
  const { name, password } = req.body;
  //async await

  const user = await User.create({
    name,
    password,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};

const getUser = async (req, res, next) => {
  const kullanici = await User.findOne({ name: req.body.name });

  if (
    kullanici?.name === req.body.name &&
    kullanici?.password === req.body.password
  ) {
    res.json({
      success: true,
      message: "Giriş başarılı",
      data: {
        name: kullanici.name,
        password: kullanici.password,
      },
    });
  } else {
    res.json({
      success: false,
      message: 'Hatalı kullanıcı adı veya şifre'
    });
  }
};
const imageUplaod = (async (req, res, next) => {
  // Image Upload Success

  const cipherImage = await encryptData(req.file)
  
  const user = await User.findOneAndUpdate({ name: "kemalege" },{
    "profile_image": cipherImage
  },{
    new: true,
    runValidators: true
  })
  res.status(200).json({
    success: true,
    message: "Image Upload Succesfull",
    data: user
  });
})

const getProfileImage = async (req, res, next) => {
  const user = await User.findOne({ name: "kemalege" });

  const cipherImage = user.profile_image

  const decryptedImage = await decryptData(cipherImage)

  res.status(200).json({
    success: true,
    data: decryptedImage
  })
}
module.exports = { register, getUser, imageUplaod, getProfileImage };
