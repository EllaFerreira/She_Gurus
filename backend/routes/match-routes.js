const router = require("express").Router();
let userMatcher = require("../models/UserMatcher");

//first endpoint handle https get
router.route("/").get((req, res) => {
  userMatcher.find()
    .then((matchs) => res.json(matchs))
    .catch((err) => res.status(400).json("Error: " + err));
});

//handle post request
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added sucessfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
