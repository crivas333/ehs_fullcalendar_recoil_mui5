export const IS_THERE_OPEN_SESSION_FETCH = `
  query {
    openSession{
      id
      firstName
      lastName
      userName
      email
    }
  }
`



export const fetch_QUERY_APPOINTMENTS = `
query{
  appointments{
    id
    appointmentId
    appointmentType
    appointmentStatus
    StartTime
    EndTime
    patient{
      id
      fullName
    }
    noRegistered
    creator{id}
    Description
    Subject
    IsAllDay
    StartTimezone
    EndTimezone
  }
}
`

export const fetch_UPDATE_APPOINTMENT= `
    mutation updateAppointment ($id: ID!, $appointmentInput: AppointmentInput){
      updateAppointment (id: $id, appointmentInput: $appointmentInput)
        {
            id
            appointmentId
            appointmentType
            appointmentStatus
            StartTime
            EndTime
            patient{
            id
            fullName
            }
            noRegistered
      }
    }
`