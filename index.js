const express = require("express");
const connectDatabase = require("./helpers/database/connectDatabase");
const routes = require("./routes")
var cors = require('cors')
const path = require("path");

const app = express();

app.use(cors({
  origin: "*"
}))

if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const PORT = process.env.PORT || 8080;

app.use(express.json());


connectDatabase();

app.use("/", routes)

app.get("/", (req, res) => {
  res.send("Kemal ege");
});

app.use(express.static(path.join(__dirname,"public")))

app.listen(PORT, () => {
  console.log(`App started on ${PORT}`);
});
