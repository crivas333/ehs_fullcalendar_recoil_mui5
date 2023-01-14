//import { gql } from '@apollo/client'
import { gql } from "graphql-request";

export const GET_PATIENTS = gql`
  query {
    patients {
      id
      historyId
      dni
      firstName
      lastName
      lastName2
      birthDay
      sex
      email
      #age # dummy field
    }
  }
`;

export const SEARCH_PATIENT_BY_LASTNAME = gql`
  query searchPatientsByLastName($lastName: String!) {
    searchPatientsByLastName(lastName: $lastName) {
      id
      historyId
      #firstName
      #lastName
      #lastName2
      fullName
    }
  }
`;
export const AUTOCOMPLETE_SEARCH_PATIENT_BY_ID = gql`
  query patient($id: ID!) {
    patient(id: $id) {
      id
      historyId
      firstName
      lastName
      lastName2
      fullName
    }
  }
`;
export const SEARCH_PATIENT_BY_ID = gql`
  query patient($id: ID!) {
    patient(id: $id) {
      id
      historyId
      idType
      idTypeNo
      firstName
      lastName
      lastName2
      fullName
      birthDay
      age_years
      age_months
      sex
      phone1
      phone2
      email
      address
      gName
      gPhone1
      gPhone2
      gRelation
      bloodType
      marital
      occupation
      religion
      referral
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation createPatient($patientInput: PatientInput) {
    createPatient(patientInput: $patientInput) {
      id
      historyId
      idType
      idTypeNo
      firstName
      lastName
      lastName2
      fullName
      birthDay
      age_years
      age_months
      sex
      phone1
      phone2
      email
      address
      gName
      gPhone1
      gPhone2
      gRelation
      bloodType
      marital
      occupation
      religion
      referral
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation updatePatient($id: ID!, $patientInput: PatientInput) {
    updatePatient(id: $id, patientInput: $patientInput) {
      id
      historyId
      idType
      idTypeNo
      firstName
      lastName
      lastName2
      fullName
      birthDay
      age_years
      age_months
      sex
      phone1
      phone2
      email
      address
      gName
      gPhone1
      gPhone2
      gRelation
      bloodType
      marital
      occupation
      religion
      referral
    }
  }
`;
export const DELETE_PATIENT = gql`
  mutation deletePatient($id: ID!) {
    deletePatient(id: $id) {
      id
    }
  }
`;
