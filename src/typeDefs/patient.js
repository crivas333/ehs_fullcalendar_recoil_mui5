import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    patient(id: ID!): Patient @auth
    patients: [Patient!]! @auth
    searchPatientsByLastName(lastName: String!): [Patient!]! @auth
  }

  extend type Mutation {
    createPatient(patientInput: PatientInput): Patient @auth
    #updatePatient(id: ID!, dni: Int!, firstName: String!, lastName: String!, email: String): Patient @auth
    updatePatient(id: ID!, patientInput: PatientInput): Patient @auth
    deletePatient(id: ID!): Patient @auth
  }

  input PatientInput {
    idType: String
    idTypeNo: String
    firstName: String!
    lastName: String!
    lastName2: String
    fullName: String
    #birthDay: Date
    birthDay: String
    sex: String
    phone1: String
    phone2: String
    email: String
    address: String
    gName: String
    gPhone1: String
    gPhone2: String
    gRelation: String
    bloodType: String
    marital: String
    occupation: String
    religion: String
    referral: String
  }
  type Patient {
    id: ID!
    historyId: Int!
    #dni: Int
    idType: String
    idTypeNo: String
    firstName: String!
    lastName: String!
    lastName2: String
    fullName: String
    #birthDay: Date
    birthDay: String
    sex: String
    phone1: String
    phone2: String
    email: String
    address: String
    gName: String
    gPhone1: String
    gPhone2: String
    gRelation: String
    bloodType: String
    marital: String
    occupation: String
    religion: String
    referral: String
    appointments: [Appointment!]
    age_years: String
    age_months: String
    createdAt: String!
    updatedAt: String!
    #age: String #dymmy field
  }
`;
//createPatient(dni: Int!, firstName: String!, lastName: String!, email: String): Patient @auth
