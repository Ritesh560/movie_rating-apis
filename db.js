const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose")

let connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected")
  } catch (err) {
    console.log(err.message)
    //exit the process with failure
    process.exit(1)
  }
}

module.exports = connectDB
