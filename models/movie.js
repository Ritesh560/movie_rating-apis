const mongoose = require("mongoose")

const useSchema = new mongoose.Schema(
  {
    movie: {
      type: String,
      required: true,
    },
    ratings: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = Movies = mongoose.model("movies", useSchema)
