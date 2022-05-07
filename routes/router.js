const express = require("express")
const app = express()

//routes

app.use("/login", require("../controllers/auth"))
app.use("/signup", require("../controllers/user"))

module.exports = app
