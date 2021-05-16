import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAppointmentsByTimeframe(start: String!, end: String!): [Appointment!]!
      @auth
    getAppointmensByPatientID(id: ID!): [Appointment!]! @auth
    appointments: [Appointment!]! @auth
  }

  extend type Mutation {
    #createAppointment(Subject: String!, patientId: ID!):  Appointment @auth
    #createPatient(patientInput: PatientInput): Patient @auth
    addAppointment(appointmentInput: AppointmentInput): Appointment @auth
    updateAppointment(id: ID!, appointmentInput: AppointmentInput): Appointment
      @auth
    #updateAppointment(id: ID!, appointmentId: Int): Appointment @auth
  }

  input AppointmentInput {
    #appointmentId: Int!
    appointmentType: String!
    appointmentStatus: String!
    start: String!
    end: String! #Syncfusion Type
    patient: ID #patient: Patient does not work
    fullName: String
    notRegistered: String
    creator: ID #creator: User
    description: String
    #title: String #Syncfusion Type - mapped to appointmentType
    #IsAllDay: Boolean
    #StartTimezone: String
    #EndTimezone: String
  }
  type Appointment {
    id: ID!
    appointmentId: Int!
    appointmentType: String!
    appointmentStatus: String!
    start: String!
    end: String! #Syncfusion Type
    patient: Patient #will store only PatientId
    fullName: String
    notRegistered: String
    creator: User
    description: String
    #title: String #Syncfusion Type - mapped to appointmentType
    #IsAllDay: Boolean
    #StartTimezone: String
    #EndTimezone: String
    createdAt: String!
    updatedAt: String!
  }
`;
// addAppointment(subject: String, patient: ID!, creator: ID!):  Appointment
