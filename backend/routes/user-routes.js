const router = require("express").Router();
let UserProfile = require("../models/User");

//first endpoint handle https get
router.route("/").get((req, res) => {
  UserProfile.find()
    .then((users) => res.json(users))
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
