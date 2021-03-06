import { gql } from "@apollo/client";

export const STUDENT_LOGIN = gql`
  mutation loginstudent($email: String!, $password: String!) {
    loginstudent(email: $email, password: $password) {
      token
      student {
        _id
        surname
        email
      }
    }
  }
`;

export const GURU_LOGIN = gql`
  mutation loginguru($email: String!, $password: String!) {
    loginguru(email: $email, password: $password) {
      token
      guru {
        _id
        surname
        email
      }
    }
  }
`;

export const ADD_STUDENT = gql`
  mutation addStudent(
    $surname: String!
    $email: String!
    $password: String!
    $age: Int!
    $photo: String!
    $location: String!
  ) {
    addStudent(
      surname: $surname
      email: $email
      password: $password
      age: $age
      photo: $photo
      location: $location
    ) {
      token
      student {
        _id
        surname
        email
      }
    }
  }
`;

export const ADD_GURU = gql`
  mutation addGuru(
    $surname: String!
    $email: String!
    $password: String!
    $age: Int!
    $photo: String!
    $location: String!
    $skills: String!
  ) {
    addGuru(
      surname: $surname
      email: $email
      password: $password
      age: $age
      photo: $photo
      location: $location
      skills: $skills
    ) {
      token
      guru {
        _id
        surname
        email
      }
    }
  }
`;

export const UPDATE_STUDENT = gql`
  mutation updateStudent(
    $studentId: ID!
    $surname: String
    $email: String
    $password: String
    $age: Int
    $photo: String
    $location: String
  ) {
    updateStudent(
      studentId: $studentId
      surname: $lastName
      email: $email
      password: $password
      age: $age
      photo: $photo
      location: $location
    ) {
      token
      student {
        surname
        email
      }
    }
  }
`;

export const UPDATE_GURU = gql`
  mutation updateGuru(
    $guruId: ID!
    $surname: String
    $email: String
    $password: String
    $age: Number
    $photo: String
    $location: String
    $skills: String
  ) {
    updateGuru(
      surname: $surname
      email: $email
      password: $password
      age: $age
      photo: $photo
      location: $location
      skills: $skills
    ) {
      token
      guru {
        surname
        email
      }
    }
  }
`;
export const REMOVE_STUDENT = gql`
  mutation removeStudent($studentId: ID!) {
    removeStudent(studentId: $studentId) {
      _id
      surname
    }
  }
`;
export const UPDATE_GURU_SKILL = gql`
  mutation updateGuruSkill($guruId: ID!) {
    updateGuruSkill(guruId: $guruId) {
      _id
      surname
    }
  }
`;

export const ADD_MATCH = gql`
  mutation addmatch($gurus: [ID]!) {
    addMatch(gurus: [ID]) {
      _id
      gurus {
        _id
        surname
        email
      }
      matchDate
    }
  }
`;
