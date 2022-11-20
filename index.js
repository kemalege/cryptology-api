const express = require("express");
const connectDatabase = require("./helpers/database/connectDatabase");
// const route = require("./routers/indexRouter")
var cors = require('cors')

const app = express();

// if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const PORT = 8080;

app.use(express.json());

app.use(cors())

// app.use("/", route)

connectDatabase();

app.get("/", (req, res) => {
  res.send("Kemal ege");
});

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
