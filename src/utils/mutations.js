import { gql } from "@apollo/client";

export const USER_SIGN_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        surname
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addProfile($surname: String!, $email: String!, $password: String!) {
    addProfile(surname: $surname, email: $email, password: $password) {
      token
      user {
        _id
        surname
      }
    }
  }
`;

// export const ADD_INTEREST = gql`

// `;

export const REMOVE_INTEREST = gql`
  mutation removeInterest($profileId: ID!) {
    removeInterest(profileId: $profileId) {
      _id
    }
  }
`;
