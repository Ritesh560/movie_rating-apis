const express = require("express")
const router = express.Router()
const { check, validationResult, Result } = require("express-validator")
const config = require("config")

//importing models
const Movies = require("../models/movie")
const Reviews = require("../models/reviews")

router.get("/", [check("movie", "please Enter a movie name to search.").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const fetchMovie = req.body.movie

  try {
    const MovieArray = await Movies.find({ movie: { $regex: fetchMovie } })

    if (!MovieArray) {
      return res.status(400).json({ errors: [{ msg: "No data for this movie." }] })
    } else {
      var result = []

      for (var Movie of MovieArray) {
        var totalRating = 0
        var no_of_ratings = 0

        for (var rating of Movie.ratings) {
          no_of_ratings++
          const rate = await fetchRating(rating)
          totalRating = totalRating + rate
        }

        const Average_Rating = totalRating / no_of_ratings

        result.push({ movie: Movie.movie, Average_Rating })
      }

      return res.status(200).json(result)
    }
  } catch (err) {
    console.log(err)
    req.status(400).send(err)
  }
})

const fetchRating = async (rating) => {
  var reviewId = rating.id
  var currReview = await Reviews.findOne({ _id: reviewId })

  var RatingArray = currReview.rating
  var currRate = RatingArray[RatingArray.length - 1].rate

  return currRate
}

module.exports = router
