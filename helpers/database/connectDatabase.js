const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb+srv://kemalege:kemalege123@kemalege.lphpekg.mongodb.net/project-cryptology?retryWrites=true&w=majority")
    .then(() => {
      console.log("MongoDb connection Succesful");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = connectDatabase;