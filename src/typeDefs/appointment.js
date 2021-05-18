import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAppointmentsByTimeframe(start: String!, end: String!): [Appointment!]!
      @auth
    getAppointmensByPatientID(id: ID!): [Appointment!]! @auth
    appointments: [Appointment!]! @auth
  }

  extend type Mutation {
    addAppointment(appointmentInput: AppointmentInput): Appointment @auth
    updateAppointment(id: ID!, appointmentInput: AppointmentInput): Appointment
      @auth
  }

  input AppointmentInput {
    #appointmentId: Int!
    type: String!
    status: String!
    start: String!
    end: String! #Syncfusion Type
    patientId: ID #in appointmentInput - we are sending only the patientId (not the object)
    #patientId: Patient (this does not compilate)
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
    type: String!
    status: String!
    start: String!
    end: String! #Syncfusion Type
    #patientId: ID #this does not work
    patientId: Patient #This works - but we are storing only the PatientId
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
