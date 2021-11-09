const { UserProfile, Interest } = require("../models/index");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
// const fs = require("fs");
// const path = require("path");
const { GraphQLUpload, GraphQLUploadExpress } = require("graphql-upload");

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    profiles: async () => {
      return await UserProfile.find();
    },

    profile: async (parent, { profileId }) => {
      return await UserProfile.findOne({ _id: profileId });
    },

    match: async (parent, { meetingId: interestId }) => {
      return await Interest.findOne({ _id: interestId });
    },
  },

  Mutation: {
    addProfile: async (parent, { surname, email, password }) => {
      const profile = await UserProfile.create({ surname, email, password });
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
      return await UserProfile.updateNewInfo(
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
