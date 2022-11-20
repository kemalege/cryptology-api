const User = require("../models/User");

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
module.exports = { register, getUser };
