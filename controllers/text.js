const PlainText = require("../models/PlainText");
var CryptoJS = require("crypto-js");
const CipherText = require("../models/CipherText");
const CipherKey = require("../models/CipherKey");

// const recordPlainText = async (req, res, next) => {
//   const { content } = req.body;

//   const newText = await PlainText.create({
//     content,
//   });

//   res.status(200).json({
//     success: true,
//     data: newText,
//   });
// };

const recordText = async (req, res, next) => {
  const { content, keyId } = req.body;

  const key = await CipherKey.findOne({ id: keyId });

  const ciphertext = CryptoJS.AES.encrypt(content, key.value).toString();

  const newCipherText = await CipherText.create({
    content: ciphertext,
    keyId: keyId,
  });

  res.status(200).json({
    success: true,
    data: newCipherText,
  });
};

const getLatestText = async (req, res, next) => {
  const latestText = await CipherText.findOne()
    .sort({ createdAt: -1 })
    .limit(10);

  const key = await CipherKey.findOne({ id: latestText.keyId });

  const bytes = CryptoJS.AES.decrypt(latestText.content, key.value);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  res.json(originalText);
};

const getAllTexts = async (req, res, next) => {
  const cipherTexts = await CipherText.find();
  const cipherKeys = await CipherKey.find();

  let plainTexts = []

  for(let text of cipherTexts) {
    let key = await CipherKey.findOne({ id: text.keyId})  
    plainTexts.push(CryptoJS.AES.decrypt(text.content, key.value ).toString(CryptoJS.enc.Utf8))
  }
  console.log(plainTexts)

  res.status(200).json({
    plainTexts: plainTexts, 
    cipherTexts: cipherTexts
  })
};

module.exports = {
  getLatestText,
  recordText,
  getAllTexts,
};
