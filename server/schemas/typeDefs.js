const { gql } = require("apollo-server-express");
const { GraphQLUpload, GraphQLUploadExpress } = require("graphql-upload");

const typeDefs = gql`
  type Student {
    _id: ID
    surname: String
    email: String
    password: String
    age: Number
    photo: String
    location: String
    user_type: String
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
    age: Number
    location: String
    skills: String
    photo: String
    user_type: String
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
    match(skilss: String): [Guru]
    oneguru(guruId: ID!): Guru
    onestudent(studentId: ID!): Student
    studentreq: Student
    gurureq: Guru
    showMatch(_id: ID!): showMatch
  }

  type Mutation {
    loginstudent(email: String!, password: String!): AuthStudent
    loginguru(email: String!, password: String!): AuthGuru
    addMatch(gurus: [ID]!): Match
    addStudent(
      surname: String!,
      email: String!,
      password: String!,
      age: Number!,
      photo: String!,
      location: String!,
      user_type: String!,
    ): AuthStudent
    addGuru(
      surname: String!,
      email: String!,
      password: String!,
      age: Number!,
      photo: String!,
      location: String!,
      skills: String!,
      user_type: String!,
    ): AuthGuru
    updateStudent(
      studentId: ID,
      surname: String,
      email: String,
      password: String,
      age: Number!,
      photo: String!,
      location: String!,
      user_type: String!,
    ): AuthStudent
    updateGuru(
      surname: String!,
      email: String!,
      password: String!,
      age: Number!,
      photo: String!,
      location: String!,
      skills: String!,
      user_type: String!,
    ): AuthGuru
    removeStudent(
      studentId: ID!): Student
    ): AuthStudent
    removeGuruSkill(
      guruId: ID!, skills: String!): Guru
    ): AuthGuru
  }
`;

module.exports = typeDefs;
