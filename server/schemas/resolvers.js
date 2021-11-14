const { Student, Guru, Match } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { GraphQLUpload, GraphQLUploadExpress } = require("graphql-upload");
require("dotenv").config();

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    students: async () => {
      return await Student.find();
    },
    gurus: async () => {
      return await Guru.find();
    },
    onestudent: async (parent, { studentId }) => {
      return await Student.findOne({ _id: studentId });
    },
    oneguru: async (parent, { guruId }) => {
      return await Guru.findOne({ _id: guruId });
    },
    studentreq: async (parent, args, context) => {
      if (context.user) {
        return Student.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please sign in to do this request!");
    },
    gurureq: async (parent, args, context) => {
      if (context.user) {
        return Guru.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please sign in to do this request!");
    },
    match: async (parent, { skill }) => {
      const params = skill ? { skill } : {};
      return Guru.find({
        skills: {
          $regex: new RegExp("^" + skill.toLowerCase(), "i"),
        },
      });
    },
    showMatch: async (parent, args, context) => {
      const match = new Match({ gurus: args.gurus });
      const list = [];

      const { gurus } = await match.populate("gurus");

      for (let i = 0; i < gurus.length; i++) {
        const displayGurus = match.create({
          name: `Guru name is: ${gurus[i].surname}`,
          presentation: `${gurus[i].surname} will be happy to get in with you, her skills are ${gurus[i].skills}.`,
          image: [`${gurus[0].photo}`],
        });

        list.push({
          quantity: 1,
        });
      }
    },
  },

  Mutation: {
    addStudent: async (parent, args) => {
      const student = await Student.create(args);
      const token = signToken(student);
      return { token, student };
    },
    addGuru: async (parent, args) => {
      const guru = await Guru.create(args);
      const token = signToken(guru);
      return { token, guru };
    },
    loginstudent: async (parent, { email, password }) => {
      const student = await Student.findOne({ email });

      if (!student) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const passawordIsCorrect = await student.isCorrectPassword(password);

      if (!passawordIsCorrect) {
        throw new AuthenticationError("Incorrect password! Please try again!");
      }

      const token = signToken(student);
      return { token, student };
    },
    loginguru: async (parent, { email, password }) => {
      const guru = await Guru.findOne({ email });

      if (!guru) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const passawordIsCorrect = await guru.isCorrectPassword(password);

      if (!passawordIsCorrect) {
        throw new AuthenticationError("Incorrect password! Please try again!");
      }

      const token = signToken(guru);
      return { token, guru };
    },

    updateStudent: async (
      parent,
      { studentId, surname, location, photo, age, email, password },
      context
    ) => {
      const saltRounds = 10;

      if (context.user) {
        const student = await Student.findOneAndUpdate(
          { _id: studentId },
          {
            $set: {
              surname: surname,
              location: location,
              photo: photo,
              age: age,
              email: email,
              password: password
                ? await bcrypt.hash(password, saltRounds)
                : undefined,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!student) {
          throw new AuthenticationError("Not authorized to update it!");
        }

        const token = signToken(student);

        return { token, student };
      }
      throw new AuthenticationError(
        "Sorry, something went wrong can't update it!"
      );
    },

    updateGuru: async (
      parent,
      { guruId, surname, skills, location, photo, age, email, password },
      context
    ) => {
      const saltRounds = 10;

      if (context.user) {
        const guru = await Guru.findOneAndUpdate(
          { _id: guruId },
          {
            $set: {
              surname: surname,
              location: location,
              skills: skills,
              photo: photo,
              age: age,
              email: email,
              password: password
                ? await bcrypt.hash(password, saltRounds)
                : undefined,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        if (!guru) {
          throw new AuthenticationError("Not authorized to update it!");
        }

        const token = signToken(guru);

        return { token, guru };
      }
      throw new AuthenticationError(
        "Sorry, something went wrong can't update it!"
      );
    },

    addMatch: async (parent, { gurus }, context) => {
      const guruId = gurus[0];

      if (context.user) {
        const guru = await Guru.findById(guruId).exec();
        const match = new Match({ gurus: guru });
        // TODO check if is not the same guru
        await Student.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: { matchs: match },
          }
        );

        return match.populate("gurus");
      }
      throw new AuthenticationError("Please sign in to process with the match");
    },
    removeStudent: async (parent, { studentId }) => {
      return Student.findOneAndDelete({ _id: studentId });
    },
    removeGuruSkill: async (parent, { guruId, skills }) => {
      return Guru.updateNewInfo(
        { _id: guruId },
        { $pull: { skills: skills } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
