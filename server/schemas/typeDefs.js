const { gql } = require("apollo-server-express");
const { GraphQLUpload, GraphQLUploadExpress } = require("graphql-upload");

const typeDefs = gql`
  type Student {
    _id: ID
    surname: String
    email: String
    password: String
    age: Int
    photo: String
    location: String
    matchs: [Match]
  }

  type Match {
    _id: ID
    matchDate: String
    gurus: [Guru]
  }

  type Guru {
    _id: ID
    surname: String
    email: String
    password: String
    age: Int
    location: String
    skills: [String]
    photo: String
  }

  type AuthStudent {
    token: ID!
    student: Student
  }

  type AuthGuru {
    token: ID!
    guru: Guru
  }

  type Query {
    students: [Student]!
    gurus: [Guru]!
    match(skill: String): [Guru]
    oneguru(guruId: ID!): Guru
    onestudent(studentId: ID!): Student
    studentreq: Student
    gurureq: Guru
  }

  type Mutation {
    loginstudent(email: String!, password: String!): AuthStudent
    loginguru(email: String!, password: String!): AuthGuru
    addMatch(gurus: [ID]!): Match

    addStudent(
      surname: String!
      email: String!
      password: String!
      age: Int!
      photo: String!
      location: String!
    ): AuthStudent

    addGuru(
      surname: String!
      email: String!
      password: String!
      age: Int!
      photo: String!
      location: String!
      skills: [String]!
    ): AuthGuru

    updateStudent(
      studentId: ID!
      surname: String
      email: String
      password: String
      age: Int
      photo: String
      location: String
    ): AuthStudent
    updateGuru(
      guruId: ID!
      surname: String
      email: String
      password: String
      age: Int
      photo: String
      location: String
      skills: [String]
    ): AuthGuru

    removeStudent(studentId: ID!): Student

    updateGuruSkill(guruId: ID!, skills: [String]!): Guru
  }
`;

module.exports = typeDefs;
