import { gql } from "@apollo/client";

export const MATCH_GURUS = gql`
  query match{
  match($skill: String){
    _id
    surname
    location
    photo
    skills
    age
    email
  }
}
`;

export const ONE_GURU_BY_ID = gql`
  query oneguru {
    oneguru($guruId: ID!) {
      surname
      location
      skills
      age
      email
      photo
    }
  }
`;

//NOT USING IT
// export const QUERY_MATCH = gql`
//   query showMatch($gurus: [ID]!) {
//     showMatch(gurus: $gurus) {
     
//     }
//   }
// `;

export const ONE_STUDENT_BY_ID = gql`
  query onestudent($studentId: ID!) {
    onestudent(studentId: $studentId) {
      _id
      surname
      email
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
      skills
      photo
      age
    }
  }
`;
