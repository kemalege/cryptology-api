const PlainText = require("../models/PlainText");
var CryptoJS = require("crypto-js");
const CipherText = require("../models/CipherText");
const CipherKey = require("../models/CipherKey");

const recordPlainText = async (req, res, next) => {
  const { content } = req.body;

  const newText = await PlainText.create({
    content,
  });
  
  res.status(200).json({
    success: true,
    data: newText,
  });
};

const recordText = async (req, res, next) => {
  const { content } = req.body;
  
  const key = await CipherKey.findOne();

  const ciphertext = CryptoJS.AES.encrypt(content, key.value).toString();
  
  const newCipherText = await CipherText.create({
    content: ciphertext,
  });

  // const newCipherKey = await CipherKey.create({
  //   value: "5468617473206D79204B756E67204675"
  // })
  
  res.status(200).json({
    success: true,
    data: newCipherText,
  });
};

const getLatestText = async (req, res, next) => {
  
  const latestText = await CipherText.findOne()
    .sort({ createdAt: -1 })
    .limit(10);

  const key = await CipherKey.findOne();

  const bytes  = CryptoJS.AES.decrypt(latestText.content, key.value);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  res.json(originalText);
};

module.exports = {
  getLatestText,
  recordText,
};
