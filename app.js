const express = require("express")
const cors = require("cors")
const connectDB = require("./db")

//port for listing requests
const PORT = process.env.PORT || 8080

//creating express app
const app = express()

//connsecting database
connectDB()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cors policy
app.use(cors())

//redirecting to routers for different routes
const router = require("./routes/router")
app.use("/", router)

//starting the server for requests
app.listen(PORT, () => {
  console.log(`server is running on PORT: ${PORT}.`)
})
