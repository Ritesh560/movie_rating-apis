const express = require("express")
const app = express()

//routes

app.use("/login", require("../controllers/auth"))
app.use("/signup", require("../controllers/user"))
app.use("/basicInfo", require("../controllers/info"))
app.use("/fetchRating", require("../controllers/fetchRating"))

app.use("/", (req, res) => {
  return res.send("<h2>server is up and running.</h2>")
})
module.exports = app
