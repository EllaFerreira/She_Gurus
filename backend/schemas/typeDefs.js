const { gql } = require("apollo-server-express");
const { GraphQLUpload, GraphQLUploadExpress } = require("graphql-upload");

const typeDefs = graphQL`
  type UserProfile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]
    interest: [String]!
    location: String
  }
  type UserMatcher {
      user_matcher: String!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): UserProfile
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addDetailsToProfile(profileId: ID!, skill: String!, location: String!, interest: Datatype.INTEGER, age: Datatype.INTEGER, user_type: Datatype.INTEGER): UserProfile
    removeProfile(profileId: ID!): UserProfile
    removeSkill(profileId: ID!, skill: String!): UserProfile
    removeLocation(profileId: ID!, location: String!): UserProfile
    removeInterest(profileId: ID!, interest: DataType.INTEGER): UserProfile
  }
`;

module.exports = typeDefs;
