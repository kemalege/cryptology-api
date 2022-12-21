const CryptoJS = require("crypto-js");

const decryptData = async (req) => {
  const { AES_KEY } = process.env;

  const bytes = CryptoJS.AES.decrypt(req, AES_KEY);
  const decryptedImage = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedImage;
};

const encryptData = async (req) => {
  const { AES_KEY } = process.env;

  const cipherImage = CryptoJS.AES.encrypt(JSON.stringify(req), AES_KEY).toString();

  return cipherImage;
};

module.exports = { decryptData, encryptData };
