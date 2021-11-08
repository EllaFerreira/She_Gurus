const { UserMatcher, Interest, UserProfile } = require("../models");
// const withAuth = require("../utils/auth");

module.exports = {
  async userMatcherData(req, res) {
    const userMatcherDt = await UserMatcher.create({
      userId: req.session.user_id,
      matchId: req.body.match_id,
    });
    if (!userMatcherDt) {
      return res.status(400).json({ message: "Unsuccessful match!" });
    }
    res
      .status(200)
      .json({ userMatcher: userMatcherDt, message: "Successfull match!" });
  },
};
