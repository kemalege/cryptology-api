const User = require("../models/User");
const CryptoJS = require("crypto-js");
const crypto = require("crypto");
const sha256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const {
  decryptData,
  encryptData,
} = require("../helpers/cryption/cryptionHelpers");
const CipherText = require("../models/CipherText");
const VerificationCode = require("../models/SignPublicKey");
const SignPublicKey = require("../models/SignPublicKey");
const Sign = require("../models/Sign");

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
      message: "Hatalı kullanıcı adı veya şifre",
    });
  }
};
const imageUplaod = async (req, res, next) => {
  // Image Upload Success

  const cipherImage = await encryptData(req.file);

  const user = await User.findOneAndUpdate(
    { name: "kemalege" },
    {
      profile_image: cipherImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Image Upload Succesfull",
    data: user,
  });
};

const getProfileImage = async (req, res, next) => {
  const user = await User.findOne({ name: "kemalege" });

  const cipherImage = user.profile_image;

  const decryptedImage = await decryptData(cipherImage);

  res.status(200).json({
    success: true,
    data: decryptedImage,
  });
};

const verify = async (req, res, next) => {

  // const hash = sha256(nonce);
  // const hashDigest = Base64.stringify(hash);

  // // const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // //   modulusLength: 2048,
  // //   publicKeyEncoding: {
  // //     type: 'spki',
  // //     format: 'der'
  // //   },
  // //   privateKeyEncoding: {
  // //     type: 'pkcs8',
  // //     format: 'der'
  // //   }
  // // });
  
  let {hashdDigest} = req.body;

  const key = await SignPublicKey.findOne();
  const signatureData = await Sign.findOne();

  let publicKey = key.value
  let signature = signatureData.content

  publicKey = crypto.createPublicKey({
    key: Buffer.from(publicKey,"base64"),
    type: 'spki',
    format: 'der'
  })

  const verify = crypto.createVerify("SHA256")
  verify.update(hashdDigest)
  verify.end()

  let result = verify.verify(publicKey, Buffer.from(signature,"base64"))
  res.send({verify: result})

  // res.send({publicKey: publicKey.toString("base64"), privateKey: privateKey.toString("base64")});
};

const sign = async (req, res, next) => {

  const n = crypto.randomInt(0, 10000000000);
  const nonce = n.toString().padStart(10, "0");
  
  let privateKey = process.env.PRIVATE_KEY

  // const signpublickey = await SignPublicKey.create({
  //   value: process.env.PUBLIC_KEY
  // });
  const hash = sha256(nonce);
  const hashDigest = Base64.stringify(hash);

  privateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKey, 'base64'),
    type: 'pkcs8',
    format: 'der'
  })

  const sign = crypto.createSign('SHA256')
  sign.update(hashDigest)
  sign.end()
  const signature = sign.sign(privateKey).toString("base64")

  const newsignature = await Sign.findOneAndUpdate(
    {
      content: signature
    }
  );

  res.send({hashDigest, signature})
}

module.exports = {
  register,
  getUser,
  imageUplaod,
  getProfileImage,
  verify,
  sign
};
