const { Int32 } = require("mongodb")
const mongoose = require("mongoose")

const useSchema = new mongoose.Schema(
  {
    movie: {
      type: String,
      required: true,
    },
    review: {
      type: Int32,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = Reviews = mongoose.model("reviews", useSchema)
