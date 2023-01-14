import { gql } from "graphql-request";

export const CREATE_ENCOUNTER = gql`
  mutation createEncounter($encounterInput: EncounterInput) {
    createEncounter(encounterInput: $encounterInput) {
      id
    }
  }
`;

export const GET_ENCOUNTERS_BY_PATIENT_ID = gql`
  query getExamByPatientID($id: ID!) {
    getExamByPatientID(id: $id) {
      id
      #examId
      examDateTime
      #examDateReg
      #examDateProg
      #examDateExe
      examType
      examStatus
      historyId
    }
  }
`;
