import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getEncounterssByTimeframe(start: String!, end: String!): [Encounter!]! @auth
    getEncountersByPatientID(id: ID!): [Encounter!]! @auth
    encounters: [Encounter!]! @auth
  }

  extend type Mutation {
    addEncounter(appointmentInput: EncounterInput): Encounter @auth
    updateEncounter(id: ID!, encounterInput: updateEncounterInput): Encounter
      @auth
    deleteEncounter(id: ID!): Encounter @auth
  }

  input EncounterInput {
    patientId: Patient!
    encounterDate: Date!
    facility: String!
    encounterType: String!
    patientType: String!
    serviceType: String!
    sensitivity: String
    servicesBudle: String!
    encounterStatus: String!
    healthProf: String!
    chiefComplain: String!
    referend: String
  }
  input updateEncounterInput {
    encounterId: Int!
    patientId: Patient!
    encounterDate: Date!
    facility: String!
    encounterType: String!
    patientType: String!
    serviceType: String!
    sensitivity: String
    servicesBudle: String!
    encounterStatus: String!
    healthProf: String!
    chiefComplain: String!
    referend: String
  }
  type Encounter {
    id: ID!
    encounterId: Int!
    patientId: Patient!
    encounterDate: Date!
    facility: String!
    encounterType: String!
    patientType: String
    serviceType: String
    sensitivity: String
    servicesBudle: String!
    encounterStatus: String!
    healthProf: String!
    chiefComplain: String!
    referend: String
    createdAt: String!
    updatedAt: String!
  }
`;
// addAppointment(subject: String, patient: ID!, creator: ID!):  Appointment
