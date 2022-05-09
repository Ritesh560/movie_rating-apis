const express = require("express")
const app = express()

//routes
app.use("/login", require("../controllers/auth"))
app.use("/signup", require("../controllers/user"))
app.use("/basicInfo", require("../controllers/info"))
app.use("/fetchRating", require("../controllers/fetchRating"))

module.exports = app
