const mongoose = require("mongoose")

const useSchema = new mongoose.Schema({
  name: {
    type: string,
    required: false,
  },
  email: {
    type: string,
    required: true,
  },
  password: {
    type: password,
    required: true,
  },
  age: {
    type: Int32,
    required: false,
  },
})

module.exports = User = mongoose.model("users", useSchema)
