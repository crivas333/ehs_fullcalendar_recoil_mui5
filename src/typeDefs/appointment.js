import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {  
    getAppointmentsByDate(StartTime: String!): [Appointment!]! @auth
    getAppointmensByPatientID(id: ID!): [Appointment!]! @auth
    appointments: [Appointment!]! @auth
  }
  
  extend type Mutation {
    #createAppointment(Subject: String!, patientId: ID!):  Appointment @auth
    #createPatient(patientInput: PatientInput): Patient @auth
    createAppointment(appointmentInput: AppointmentInput): Appointment @auth
    updateAppointment(id: ID!, appointmentInput: AppointmentInput): Appointment @auth
    #updateAppointment(id: ID!, appointmentId: Int): Appointment @auth
  }

  input AppointmentInput{
    appointmentId: Int!
    appointmentType: String!
    appointmentStatus: String!
    StartTime: String!
    EndTime: String!  #Syncfusion Type
    patient: ID #patient: Patient does not work
    fullName: String
    noRegistered: String
    creator: ID #creator: User
    Description: String
    Subject: String #Syncfusion Type - mapped to appointmentType
    IsAllDay: Boolean
    StartTimezone: String
    EndTimezone: String
  }
  type Appointment {
    id: ID!
    appointmentId: Int!
    appointmentType: String!
    appointmentStatus: String!
    StartTime: String!
    EndTime: String!  #Syncfusion Type
    patient: Patient  #will store only PatientId
    fullName: String
    noRegistered: String
    creator: User
    Description: String
    Subject: String #Syncfusion Type - mapped to appointmentType
    IsAllDay: Boolean
    StartTimezone: String
    EndTimezone: String
    createdAt: String!
    updatedAt: String!
  }
`
// addAppointment(subject: String, patient: ID!, creator: ID!):  Appointment