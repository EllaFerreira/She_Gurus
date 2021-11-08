const { UserProfile } = require("../models/index");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    profiles: async () => {
      return UserProfile.find();
    },

    profile: async (parent, { profileId }) => {
      return UserProfile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await UserProfile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await UserProfile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const passawordIsCorrect = await profile.isCorrectPassword(password);

      if (!passawordIsCorrect) {
        throw new AuthenticationError("Incorrect password! Please try again!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addDetailsToProfile: async (
      parent,
      { profileId, skill, location, interest, age, user_type }
    ) => {
      return UserProfile.updateNewInfo(
        { _id: profileId },
        {
          $addToSet: { skills: skill },
          $addToSet: { location: location },
          $addToSet: { interest: interest },
          $addToSet: { location: age },
          $addToSet: { location: user_type },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeProfile: async (parent, { profileId }) => {
      return UserProfile.findOneAndDelete({ _id: profileId });
    },
    removeSkill: async (parent, { profileId, skill }) => {
      return UserProfile.updateNewInfo(
        { _id: profileId },
        { $pull: { skills: skill } },
        { new: true }
      );
    },
    removeLocation: async (parent, { profileId, location }) => {
      return UserProfile.updateNewInfo(
        { _id: profileId },
        { $pull: { location: location } },
        { new: true }
      );
    },
    removeInterest: async (parent, { profileId, interest }) => {
      return UserProfile.updateNewInfo(
        { _id: profileId },
        { $pull: { interest: interest } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
