import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($surname: String!) {
    user(surname: $surname) {
      _id
      surname
      email
      password
      interest
      user_type
      age
    }
  }
`;

export const QUERY_MATCH = gql`
  query interest ($interest: [String!])
    ($user_type: [String!])
`;


