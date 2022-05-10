const mongoose = require("mongoose")

const useSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    movie: {
      type: String,
      required: true,
    },
    rating: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = reviews = mongoose.model("reviews", useSchema)
