const { UserProfile } = require("../models");

module.exports = {
  async createProfile({ body }, res) {
    const profile = await UserProfile.create(body);

    if (!profile) {
      return res
        .status(400)
        .json({ message: "Unable to create a profile, please try again!" });
    }

    res.status(200).json(profile);
  },

  async searchForGurus(req, res) {
    const getGurus = await UserProfile.find({});

    if (!getGurus) {
      return res
        .status(400)
        .json({ message: "Sorry, no gurus was founded, please try again!" });
    }

    res.status(200).json(getGurus);
  },
  async getGurusById({ params }, res) {
    const getGurusById = await UserProfile.findOne({ _id: params.id });

    if (!profile) {
      return res
        .status(400)
        .json({ message: "Sorry, no gurus was founded with this id!" });
    }

    res.status(200).json(profile);
  },
};
