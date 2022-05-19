const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const config = require("config")

//importing models
const User = require("../models/user")
const Reviews = require("../models/reviews")
const Movies = require("../models/movie")
const { request } = require("express")

router.post("/", [check("email", "please Enter a valid email.").isEmail(), check("name", "Name is required.").exists(), check("age", "age is required.").exists(), check("password", "Password is required.").exists()], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, age, password, reviews } = req.body

  try {
    let user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User does not exist." }] })
    }

    //authenticating password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] })
    }

    const updates = await User.updateOne({ id: user.id }, { $set: { name: name, age: age } })

    User.findOneAndUpdate({ email: user.email }, { $set: { name: name, age: age } })

    var userid = user.id

    for (const rev of reviews) {
      postRatings({ rev, userid })
    }

    res.status(200).json({ msg: "updated successfully.", userid })
  } catch (err) {
    console.log(err)
    req.status(400).send(err)
  }
})

async function postRatings({ rev, userid }) {
  var movie = rev.movie
  var rate = rev.rating

  const review = await Reviews.findOne({ userid: userid, movie: movie })

  if (!review) {
    const Review = new Reviews({
      userid,
      movie,
      rating: [{ rate, date: Date.now() }],
    })
    const newReview = await Review.save()

    var Movieobj = await Movies.findOne({ movie: movie })
    if (Movieobj) {
      const newReviewId = newReview.id
      Movieobj.ratings.push({ id: newReviewId })
      Movieobj.save()
    } else {
      const newReviewid = newReview.id
      Movieobj = new Movies({
        movie,
        ratings: [{ id: newReviewid }],
      })
      await Movieobj.save()
    }
  } else {
    await review.rating.push({ rate, date: Date.now() })
    await review.save()
  }
}

module.exports = router
