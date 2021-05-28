import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
//import formatISO from 'date-fns/formatISO'
//import format from 'date-fns/format';//import axios from 'axios'
//import fetch from 'cross-fetch'
import intervalToDuration from "date-fns/intervalToDuration";
//import { client } from "../graphqlClient/apolloClient";
import request from "graphql-request";
import {
  SEARCH_PATIENT_BY_ID,
  GET_PATIENTS,
  GET_EXAM_BY_PATIENT_ID,
  ADD_EXAMDATA,
  UPDATE_ROWEXAM,
  CREATE_ENCOUNTER,
  GET_APPLICATIONSFIELDS,
  ADD_APPLICATIONFIELDS,
  UPDATE_APPLICATIONFIELDS,
  DELETE_APPLICATIONFIELDS,
} from "../graphqlClient/gqlQueries";
// import { object } from 'joi'
// Initial state
var initialState = {
  //currentPatient: [],
  currentPatient: {
    id: "",
    historyId: "",
    idType: "DNI",
    idTypeNo: "",
    firstName: "",
    lastName: "",
    lastName2: "",
    birthDay: "",
    sex: "",
    phone1: "",
    phone2: "",
    email: "",
    address: "",
    gName: "",
    gPhone1: "",
    gPhone2: "",
    gRelation: "",
    bloodType: "",
    marital: "",
    occupation: "",
    religion: "",
    referral: "",
  },
  //patientData: [],
  error: null,
  //loading: true,
  loadedConfigData: false,
  //currentUser: [],
  //isAuth: false,
  applicationFields: [],
  dataExam: [],
  rowExam: [],
  actionExam: 0,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function updateActionExam(data) {
    // const session =await currSessionVar();
    if (data !== null) {
      // console.log("updateCurrentUser1: ", session);
      dispatch({
        type: "ACTION_EXAM",
        payload: data,
      });
    }
    // else {
    //   // console.log("updateCurrentUser2: ", session);
    //   dispatch({
    //     type: 'USER_NOT_LOGGEDIN',
    //     payload: null
    //   })
    // }
  }
  // function updateCurrentUser(session) {
  //   // const session =await currSessionVar();
  //   if (session !== null) {
  //     // console.log("updateCurrentUser1: ", session);
  //     dispatch({
  //       type: "USER_LOGGEDIN",
  //       payload: session,
  //     });
  //   } else {
  //     // console.log("updateCurrentUser2: ", session);
  //     dispatch({
  //       type: "USER_NOT_LOGGEDIN",
  //       payload: null,
  //     });
  //   }
  // }

  function clearCurrentPatient() {
    dispatch({
      type: "CLEAR_PATIENTDATA",
      // payload: [],
      payload: {
        id: "",
        historyId: "",
        dni: "",
        firstName: "",
        lastName: "",
        lastName2: "",
        birthDay: null,
        sex: "",
        email: "",
      },
    });
  }

  function reloadCurrentPatient(currPatient) {
    let tempPatient = {};
    let dt = null;
    if (currPatient.birthDay) {
      dt = new Date(parseInt(currPatient.birthDay)); //to local time from UTC milliseconds
      const duration = intervalToDuration({
        start: new Date(),
        end: dt, //convert UTC to LocalTime
      });
      const newPatient = Object.keys(currPatient).reduce((object, key) => {
        if (key === "birthDay") {
          object[key] = dt;
        } else {
          object[key] = currPatient[key];
        }
        return object;
      }, {});
      tempPatient = {
        ...newPatient,
        age_years: duration.years,
        age_months: duration.months,
      };
    } else {
      tempPatient = currPatient;
    }
    dispatch({
      type: "RELOAD_PATIENTDATA",
      // payload: currPatient
      payload: tempPatient,
    });
  }

  async function createEncounterAPOLLO(appointmentId) {
    try {
      // const res = await client.query({
      //   query: CREATE_ENCOUNTER,
      //   variables: { appointmentId: appointmentId },
      // });
      const res = await request("/graphql", CREATE_ENCOUNTER, {
        appointmentId: appointmentId,
      });
      // console.log('getPatientsAPOLLO- res: ', res)
      dispatch({
        type: "CREATE_ENCOUNTER",
        //payload: res.data.patients,
        payload: res.patients,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.res.data.error,
      });
    }
  }

  async function getExamByPatientID_APOLLO(id) {
    try {
      //console.log('getExamByPatientID_APOLLO- id: ', id)
      // const res = await client.query({
      //   query: GET_EXAM_BY_PATIENT_ID,
      //   variables: { id: id },
      // });
      const res = await request("/graphql", GET_EXAM_BY_PATIENT_ID, {
        id: id,
      });
      console.log(
        "getExamByPatientID_APOLLO- res: ",
        //res.data.getExamByPatientID
        res.getExamByPatientID
      );
      //const data = res.data.getExamByPatientID;
      const data = res.getExamByPatientID;
      const dateToString = (dt) =>
        new Date(parseInt(dt)).toLocaleString("en-US", { hour12: true });
      const result = data.map((o) => ({
        ...o,
        examDateTime: dateToString(o.examDateTime),
      }));
      console.log("getExamByPatientID_APOLLO- result: ", result);
      dispatch({
        type: "GET_EXAMSDATA_GQL",
        payload: result,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        //payload: err.res.data.error
        payload: err,
      });
    }
  }
  async function updateEditingRowExam(row) {
    try {
      console.log("GlobalState - updateEditingRowExam: ", row);

      dispatch({
        type: "UPDATE_EDITINGROWEXAM_GQL",
        payload: row,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err,
      });
    }
  }
  async function updateRowExam_APOLLO(row) {
    try {
      console.log("GlobalState - updateRowExam_APOLLO: ", row);
      // const res = await client.mutate({
      //   mutation: UPDATE_ROWEXAM,
      //   variables: {
      //     id: row.id,
      //     examInput: {
      //       examType: row.examType,
      //       examStatus: row.examStatus,
      //       examDateTime: row.examDateTime,
      //       //patient: row.patient,
      //       historyId: row.historyId,
      //     },
      //   },
      // });
      const res = await request("/graphql", UPDATE_ROWEXAM, {
        id: row.id,
        examInput: {
          examType: row.examType,
          examStatus: row.examStatus,
          examDateTime: row.examDateTime,
          //patient: row.patient,
          historyId: row.historyId,
        },
      });
      //getExamByPatientID_APOLLO(row.patient);
      dispatch({
        type: "UPDATE_ROWEXAM_GQL",
        //payload: res.data.updateRowExam,
        payload: res.updateRowExam,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err,
      });
    }
  }
  async function addExamDataAPOLLO(row) {
    try {
      console.log("GlobalState - addExamDataAPOLLO: ", row);
      //const res = await client.mutate({ mutation: UPDATE_APPLICATIONSFIELDS, variables: { id: data.id, fieldData: data.fieldData} })
      // const res = await client.mutate({
      //   mutation: ADD_EXAMDATA,
      //   variables: {
      //     examInput: {
      //       examType: row.examType,
      //       examStatus: row.examStatus,
      //       examDateTime: row.examDateTime,
      //       patient: row.patient,
      //       historyId: row.historyId,
      //     },
      //   },
      // });
      const res = await request("/graphql", ADD_EXAMDATA, {
        examInput: {
          examType: row.examType,
          examStatus: row.examStatus,
          examDateTime: row.examDateTime,
          //patient: row.patient,
          historyId: row.historyId,
        },
      });
      getExamByPatientID_APOLLO(row.patient);
      dispatch({
        type: "ADD_EXAMDATA_GQL",
        payload: res.addExamData,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err,
      });
    }
  }

  async function getPatientsAPOLLO() {
    try {
      //const res = await client.query({ query: GET_PATIENTS });
      const res = await request("/graphql", GET_PATIENTS);
      // console.log('getPatientsAPOLLO- res: ', res)
      dispatch({
        type: "GET_PATIENTSDATA_GQL",
        payload: res.patients,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.res.data.error,
      });
    }
  }

  async function getApplicationFieldsAPOLLO() {
    try {
      //const res = await client.query({ query: GET_APPLICATIONSFIELDS });
      const res = await request("/graphql", GET_APPLICATIONSFIELDS);
      //console.log("getApplicationFieldsAPOLLO- res: ", res);
      dispatch({
        type: "GET_APPLICATIONFIELDS_GQL",
        //payload: res.data.getApplicationFields,
        payload: res.getApplicationFields,
      });
    } catch (err) {
      console.log("GlobalState - getApplicationFieldsAPOLLO: ", err);
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err,
      });
    }
  }
  async function addApplicationFieldAPOLLO(data) {
    try {
      console.log("GlobalState - addApplicationFieldAPOLLO: ", data);
      //const res = await client.mutate({ mutation: UPDATE_APPLICATIONSFIELDS, variables: { id: data.id, fieldData: data.fieldData} })
      // const res = await client.mutate({
      //   mutation: ADD_APPLICATIONFIELDS,
      //   variables: {
      //     fieldView: data.fieldView,
      //     fieldType: data.fieldType,
      //     fieldData: data.fieldData,
      //   },
      // });
      const res = await request("/graphql", ADD_APPLICATIONFIELDS, {
        fieldView: data.fieldView,
        fieldType: data.fieldType,
        fieldData: data.fieldData,
      });
      //console.log('updateApplicationFieldsAPOLLO- res: ', res)
      dispatch({
        type: "ADD_APPLICATIONFIELD_GQL",
        //payload: res.data.addApplicationFields,
        payload: res.addApplicationFields,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.res.data,
      });
    }
  }
  async function updateApplicationFieldAPOLLO(data) {
    try {
      console.log("GlobalState - updateCustomDateAPOLLO: ", data);

      //const res = await client.mutate({ mutation: UPDATE_APPLICATIONSFIELDS, variables: {id: data.id, fieldType: data.fieldType, fieldData: data.fieldData} })
      // const res = await client.mutate({
      //   mutation: UPDATE_APPLICATIONFIELDS,
      //   variables: { id: data.id, fieldData: data.fieldData },
      // });
      const res = await request("/graphql", UPDATE_APPLICATIONFIELDS, {
        id: data.id,
        fieldData: data.fieldData,
      });
      //console.log('updateApplicationFieldsAPOLLO- res: ', res)
      dispatch({
        type: "UPDATE_CUSTOMDATA_GQL",
        //payload: res.data.updateApplicationFields,
        payload: res.updateApplicationFields,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.res.data,
      });
    }
  }
  async function deleteApplicationFieldAPOLLO(id) {
    try {
      //console.log('deleteCustomDateAPOLLO: ',id)
      // const res = await client.mutate({
      //   mutation: DELETE_APPLICATIONFIELDS,
      //   variables: { id: id },
      // });
      const res = await request("/graphql", DELETE_APPLICATIONFIELDS, {
        id: id,
      });
      //console.log('updateApplicationFieldsAPOLLO- res: ', res)
      dispatch({
        type: "UPDATE_CUSTOMDATA_GQL",
        //payload: res.data.deleteApplicationFields,
        payload: res.deleteApplicationFields,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.res.data,
      });
    }
  }

  async function getPatientByIdAPOLLO(id) {
    try {
      // const res = await client.query({
      //   query: SEARCH_PATIENT_BY_ID,
      //   variables: { id: id },
      // });
      const res = await request("/graphql", SEARCH_PATIENT_BY_ID, {
        id: id,
      });
      console.log("GlobalState - getPatientByIdAPOLLO - res: ", res);
      let tempPatient = {};
      let dt = null;
      if (res.patient.birthDay) {
        dt = new Date(parseInt(res.patient.birthDay)); //to local time from UTC milliseconds
        //console.log("getPatientByIdAPOLLO - dob: ",dt);
        const duration = intervalToDuration({
          start: new Date(),
          end: dt, //convert UTC to LocalTime
        });
        const newPatient = Object.keys(res.patient).reduce((object, key) => {
          if (key === "birthDay") {
            object[key] = dt;
          } else {
            object[key] = res.patient[key];
          }
          return object;
        }, {});
        //tempPatient={...res.data.patient, dt, age_years:duration.years, age_months:duration.months}
        tempPatient = {
          ...newPatient,
          age_years: duration.years,
          age_months: duration.months,
        };
      } else {
        tempPatient = { ...res.patient, age_years: "", age_months: "" };
      }
      dispatch({
        type: "GET_PATIENTDATA",
        //payload: res.data.patient
        payload: tempPatient,
      });
    } catch (err) {
      console.log("getPatientByIdAPOLLO-err: ", err);
      dispatch({
        type: "TRANSACTION_ERROR",
        // payload: err.res.data.error
        payload: err,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        //patientData: state.patientData,
        currentPatient: state.currentPatient,
        error: state.error,
        //loading: state.loading,
        loadedConfigData: state.loadedConfigData,
        //currentUser: state.currentUser,
        //isAuth: state.isAuth,
        applicationFields: state.applicationFields,
        dataExam: state.dataExam,
        rowExam: state.rowExam,
        actionExam: state.actionExam,

        updateActionExam,
        //updateCurrentUser,
        // updateCurrentPatient,
        clearCurrentPatient,
        reloadCurrentPatient,
        getPatientByIdAPOLLO,
        getPatientsAPOLLO,
        updateRowExam_APOLLO,
        updateEditingRowExam,
        getExamByPatientID_APOLLO,
        addExamDataAPOLLO,
        //getPatientsFETCH,
        createEncounterAPOLLO,
        getApplicationFieldsAPOLLO,
        addApplicationFieldAPOLLO,
        updateApplicationFieldAPOLLO,
        deleteApplicationFieldAPOLLO,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// async function getPatientsFETCH () {
//   const requestBody = {
//     query: `
//         query{
//           patients{
//             id
//             dni
//             firstName
//             lastName
//             email
//           }
//         }
//       `
//   }
//   await fetch('/graphql', {
//     method: 'POST',
//     credentials: 'same-origin',
//     // credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(requestBody)
//   })
//     .then(res => {
//       if (res.status !== 200 && res.status !== 201) {
//         throw new Error('Failed!')
//       }
//       return res.json()
//     })
//     .then(resData => {
//       dispatch({
//         type: 'GET_PATIENTSDATA_GQL',
//         payload: resData.data.patients
//       })
//     })
//     .catch(err => {
//       console.log('getPatientsFETCH: ', err)
//       dispatch({
//         type: 'TRANSACTION_ERROR',
//         // payload: err.response.data.error
//       })
//     })
// }
// async function createExamAPOLLO(appointmentId) {
//   try {
//     const res = await client.query({ query: CREATE_ENCOUNTER, variables: { appointmentId: appointmentId } })
//     // console.log('getPatientsAPOLLO- res: ', res)
//     dispatch({
//       type: 'CREATE_ENCOUNTER',
//       payload: res.data.patients
//     })
//   } catch (err) {
//     dispatch({
//       type: 'TRANSACTION_ERROR',
//       payload: err.res.data.error
//     })
//   }
// }

/*
  async function signInAxiosGQL (patientData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = {
      query: `
        mutation ($email: String, $password: String){
          signIn ( email: $email,password: $password)
            {
            id
          }
        }
      `,
      variables: {
        email: patientData.email,
        password: patientData.password
      }
    }
    // console.log("Axios GQL add Patient",patientData);
    try {
      // const res = await axios.post("/api/v1/PatientData", patientData, config);
      // const res = await axios.post("http://localhost:4000/graphql/",body,config);
      const res = await axios.post('graphql/', body, config)
      // console.log("Axios return - addPatientDataAxiosGQL: ", res.data.data);
      dispatch({
        type: 'USER_SIGNIN',
        payload: res.data.data.signIn
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  async function getPatientsDataAxiosGQL () {
    // console.log("getPatientsDataAxiosGQL");
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    const body = {
      query: `
        query {
          patients{
          id
          dni
          firstName
          lastName
          }
        }
      `
    }
    axios.defaults.withCredentials = true
    try {
      const res = await axios.post('/graphql/', body, config)
      // console.log("getAxios: ",res.data.data.patients);
      dispatch({
        type: 'GET_PATIENTSDATA_GQL',
        payload: res.data.data.patients
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }
  async function getPatientDataAxiosGQL (id) {
    try {
      const res = await axios.post('/graphql/', {
        query: `
          query patient ($id: ID!){
            patient (id: $id){
            id
            dni
            firstName
            lastName
            }
          }`,
        variables: { id: id }
      })
      // console.log("Axios - getPatientDataAxiosGQL: ", res.data.data.patient);
      dispatch({
        type: 'GET_PATIENTDATA',
        payload: res.data.data.patient
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

  // createPatient(dni: Int!, firstName: String!, lastName: String!, email: String): Patient
  async function addPatientDataAxiosGQL (patientData) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = {
      query: `
        mutation ($dni: Int!, $firstName: String!, $lastName: String!, $email: String){
          createPatient (
            dni: $dni, 
            firstName: $firstName, 
            lastName: $lastName, 
            email: $email)
            {
            id
            dni
            firstName
            lastName
            email
          }
        }
      `,
      variables: {
        dni: patientData.dni,
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        email: patientData.email
      }
    }

    // console.log("Axios GQL add Patient",patientData);
    try {
      // const res = await axios.post("/api/v1/PatientData", patientData, config);
      const res = await axios.post('/graphql/', body, config)
      console.log('Axios return - addPatientDataAxiosGQL: ', res.data.data.createPatient)
      dispatch({
        type: 'ADD_PATIENTDATA',
        payload: res.data.data.createPatient
      })
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      })
    }
  }

*/

// currentPatient = [];
// currentPatient = {};
// currentPatient._id = null;
// currentPatient.dni = null;
// currentPatient.firstName = "";
// currentPatient.lastName = "";
// currentPatient.email = "";
// async function getTransactions() {
//   try {
//     const res = await axios.get("/api/v1/transactions");

//     dispatch({
//       type: "GET_TRANSACTIONS",
//       payload: res.data.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: "TRANSACTION_ERROR",
//       payload: err.response.data.error,
//     });
//   }
// }
// async function getTransaction(id) {
//   try {
//     const res = await axios.get(`/api/v1/transactions/?${id}`);

//     dispatch({
//       type: "GET_TRANSACTION",
//       //payload: id,
//       payload: res.data.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: "TRANSACTION_ERROR",
//       payload: err.response.data.error,
//     });
//   }
// }
// async function deleteTransaction(id) {
//   try {
//     await axios.delete(`/api/v1/transactions/${id}`);

//     dispatch({
//       type: "DELETE_TRANSACTION",
//       payload: id,
//     });
//   } catch (err) {
//     dispatch({
//       type: "TRANSACTION_ERROR",
//       payload: err.response.data.error,
//     });
//   }
// }

// async function addTransaction(transaction) {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const res = await axios.post("/api/v1/transactions", transaction, config);

//     dispatch({
//       type: "ADD_TRANSACTION",
//       payload: res.data.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: "TRANSACTION_ERROR",
//       payload: err.response.data.error,
//     });
//   }
// }

/*
 const body ={
      mutation:`{
        mutation (dni: $dni, firstName: $firstName, lastName: $lastName, email: $email){
          createPatient (
            dni: $dni,
            firstName: $firstName,
            lastName: $lastName,
            email: $email
          ){
            id
          }
        }
      }
*/
