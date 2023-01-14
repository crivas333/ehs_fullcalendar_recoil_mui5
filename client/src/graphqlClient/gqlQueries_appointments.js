import { gql } from "graphql-request";

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
