//import { gql } from '@apollo/client'
import { gql } from "graphql-request";

export const GET_OPEN_SESSION = gql`
  query getCurrentSession {
    currentSession @client
  }
`;
export const IS_USER_LOGGED_IN = gql`
  query isUserLoggedIn {
    isUserLoggedIn @client
  }
`;

export const IS_THERE_OPEN_SESSION = gql`
  query {
    openSession {
      id
      firstName
      lastName
      userName
      email
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      firstName
      lastName
      userName
      email
    }
  }
`;

export const SIGNUP = gql`
  mutation signUp(
    $email: String!
    $userName: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    signUp(
      email: $email
      userName: $userName
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      id
      firstName
      lastName
      userName
      email
    }
  }
`;
export const SIGNIN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      firstName
      lastName
      userName
      email
    }
  }
`;
export const SIGNOUT = gql`
  mutation {
    signOut
  }
`;

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
      birthDay
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
      age_years
      age_months
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
      birthDay
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
      birthDay
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

export const GET_APPOINTMENTS = gql`
  query {
    appointments {
      id
      appointmentId
      type
      status
      start
      end
      #patientId
      fullName
      notRegistered
      description
    }
  }
`;
export const GET_APPOINTMENTS_BY_TIMEFRAME = gql`
  query GetAppointmentsByTimeframe($start: String!, $end: String!) {
    getAppointmentsByTimeframe(start: $start, end: $end) {
      id
      appointmentId
      type
      status
      start
      end
      patientId {
        id
        fullName
        historyId
      }
      fullName
      notRegistered
      description
    }
  }
`;

export const ADD_APPOINTMENT = gql`
  mutation addAppointment($appointmentInput: AppointmentInput) {
    addAppointment(appointmentInput: $appointmentInput) {
      id
      appointmentId
      type
      status
      start
      end
      patientId {
        id
        lastName
      }
      #patientId   #this requires for typeDef: Paitien Id (not Patient Object)
      fullName
      notRegistered
      description
      backgroundColor
    }
  }
`;
export const UPDATE_APPOINTMENT = gql`
  mutation updateAppointment(
    $id: ID!
    $appointmentInput: updateAppointmentInput
  ) {
    updateAppointment(id: $id, appointmentInput: $appointmentInput) {
      id
      appointmentId
      type
      status
      start
      end
      patientId {
        id
      }
      fullName
      notRegistered
      description
    }
  }
`;

export const DELETE_APPOINTMENT = gql`
  mutation deleteAppointment($id: ID!) {
    deleteAppointment(id: $id) {
      id
    }
  }
`;

export const CREATE_ENCOUNTER = gql`
  mutation createEncounter($encounterInput: EncounterInput) {
    createEncounter(encounterInput: $encounterInput) {
      id
    }
  }
`;
export const GET_APPLICATIONSFIELDS = gql`
  query {
    getApplicationFields {
      id
      fieldView
      fieldType
      fieldData
    }
  }
`;

export const ADD_APPLICATIONFIELDS = gql`
  mutation AddApplicationFields(
    $fieldView: String!
    $fieldType: String!
    $fieldData: String!
  ) {
    addApplicationFields(
      fieldView: $fieldView
      fieldType: $fieldType
      fieldData: $fieldData
    ) {
      id
      fieldView
      fieldType
      fieldData
    }
  }
`;
export const UPDATE_APPLICATIONFIELDS = gql`
  mutation UpdateApplicationFields($id: ID!, $fieldData: String!) {
    updateApplicationFields(id: $id, fieldData: $fieldData) {
      id
      fieldView
      fieldType
      fieldData
    }
  }
`;
export const DELETE_APPLICATIONFIELDS = gql`
  mutation DeleteApplicationFields($id: ID!) {
    deleteApplicationFields(id: $id) {
      id
      fieldView
      fieldType
      fieldData
    }
  }
`;
export const GET_EXAM_BY_PATIENT_ID = gql`
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
export const GET_EXAMS = gql`
  query exams {
    exams {
      id
      examType
      examStatus
      #historyId
    }
  }
`;
export const ADD_EXAMDATA = gql`
  mutation AddExamData($examInput: ExamInput!) {
    addExamData(examInput: $examInput) {
      id
      #examId
      #examDateReg
      #examDateProg
      #examDateExe
      examType
      examStatus
      historyId
    }
  }
`;
export const UPDATE_ROWEXAM = gql`
  mutation UpdateRowExam($id: ID!, $examInput: ExamInput!) {
    updateRowExam(id: $id, examInput: $examInput) {
      id
      #examId
      #examDateReg
      #examDateProg
      #examDateExe
      examType
      examStatus
      historyId
    }
  }
`;
