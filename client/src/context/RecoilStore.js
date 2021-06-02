import { atom, selector } from "recoil";
import request from "graphql-request";
import intervalToDuration from "date-fns/intervalToDuration";
import { SEARCH_PATIENT_BY_ID } from "../graphqlClient/gqlQueries";

// const appoEvtState = atom({
//   key: "appEvtState", // unique ID (with respect to other atoms/selectors)
//   default: {
//     appointmentType: "CONSULTA",
//     appointmentStatus: "PROGRAMADA",
//     start: "",
//     end: "",
//     fullname: "",
//   }, // default value (aka initial value)
// });
export const isAuthState = atom({
  key: "isAuthState",
  default: false,
});
export const currentUserState = atom({
  key: "currentUserState",
  default: [],
});
export const currentPatientState = atom({
  key: "currentPatientState",
  default: [],
});
export const searchDateState = atom({
  key: "searchDateState",
  default: new Date(),
});

// export const reloadCurrentPatient = selector({
//   key: "currentPatientState",
//   get: ({ get }) => {
//     //const loading = get(loadingState);

//     return;
//   },
// });

async function requestPatientById(id) {
  try {
    const res = await request("/graphql", SEARCH_PATIENT_BY_ID, {
      id: id,
    });
    //console.log("GlobalState - getPatientByIdAPOLLO - res: ", res);
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
    return tempPatient;
  } catch (err) {
    console.log("getPatientByIdAPOLLO-err: ", err);
  }
}

// export const getPatientByIdFamSel = selectorFamily({
//   key: "PatientId",
//   get: (id) => async () => {
//     const response = await requestPatientById({ id });
//     console.log("RecoilStore-response: ", response);
//     if (response.error) {
//       throw response.error;
//     }
//     return response.name;
//   },
// });
/*
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
*/
