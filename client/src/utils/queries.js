import { gql } from "@apollo/client";

export const GET_GURUS = gql`
  query match($skills: String) {
    match(skills: $skills) {
      _id
      surname
      email
      user_type
      location
      photo
      skills
      age
    }
  }
`;

export const GURU_BY_ID = gql`
  query gurubyid($guruId: ID!) {
    guru(guruId: $guruId) {
      _id
      surname
      email
      phone
      user_type
      location
      photo
      skills
      age
    }
  }
`;

export const QUERY_MATCH = gql`
  query getMatch($gurus: [ID]!) {
    showMatch(gurus: $gurus) {
     
    }
  }
`;

export const STUDENT_BY_ID = gql`
  query getSingleStudent($studentId: ID!) {
    onestudent(studentId: $studentId) {
      _id
      surname
      email
      user_type
      matchs {
        _id
        matchDate
        gurus {
          _id
          surname
          email
        }
      }
    }
  }
`;

export const STUDENT_REQ = gql`
  query studentreq {
    studentreq {
      _id
      surname
      email
      age
      location
      photo
      user_type
      matchs {
        _id
        matchDate
        gurus {
          _id
          surname
          email
        }
      }
    }
  }
`;

export const GURU_REQ = gql`
  query gurureq {
    gurureq {
      _id
      surname
      email
      location
      user_type
      skills
      photo
      age
    }
  }
`;
export const REMOVE_STUDENT = gql`
  mutation removeStudent($studentId: ID!) {
    removeStudent(studentId: $studentId) {
      _id
    }
  }
`;
export const REMOVE_GURU_SKILL = gql`
  mutation removeGuruSkill($guruId: ID!) {
    removeGuruSkill(guruId: $guruId) {
      _id
    }
  }
`;