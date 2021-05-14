//import {useContext} from 'react'
//import { GlobalContext } from '../../context/GlobalState'

export const getSexCollection = () => [
  { id: "1", field: "" },
  { id: "2", field: "MASCULINO" },
  { id: "3", field: "FEMENINO" },
];

export const getMaritalCollection = () => [
  { id: "1", field: "" },
  { id: "2", field: "SOLTERO(A)" },
  { id: "3", field: "CONVIVIENTE" },
  { id: "4", field: "CASADO(A)" },
  { id: "5", field: "DIVORSIADO(A)" },
  { id: "6", field: "VIUDO(A)" },
];

export const getBloodTypeCollection = () => [
  { id: "1", field: "A+" },
  { id: "2", field: "A-" },
  { id: "3", field: "B+" },
  { id: "4", field: "B-" },
  { id: "5", field: "AB+" },
  { id: "6", field: "AB-" },
  { id: "7", field: "O+" },
  { id: "8", field: "O-" },
];

export const getIdTypeCollection = () => [
  { id: "1", field: "DNI" },
  { id: "2", field: "PASAPORTE" },
  { id: "3", field: "CARNET_EXTRANJERÍA" },
  { id: "4", field: "OTRO" },
];

export const getEncounterFieldsCollection = () => [
  { id: "1", field: "Tipo de Visita" },
  { id: "2", field: "Tipo de Paciente" },
  { id: "3", field: "Tipo de Atención" },
  { id: "4", field: "Sensibilidad" },
  { id: "5", field: "Paquete de Servicios" },
];
export const getExamFieldsCollection = () => [
  { id: "1", field: "Tipo de Examen" },
  { id: "2", field: "Estado de Examen" },
];
export const getAppointmentFieldsCollection = () => [
  { id: "1", field: "Tipo de Cita" },
  { id: "2", field: "Estado de Cita" },
];

export const getFieldsDataCollection = (data, fieldView, fieldType) => {
  const options = data
    .filter(
      (item) => item.fieldView === fieldView && item.fieldType === fieldType
    )
    .map((item) => ({
      id: item.id,
      field: item.fieldData,
    }));
  //console.log(options)
  return options;
};

// export const getEncounterFieldsDataCollection =(data)=>{
//     //const options = data.filter(item => item.fieldType ==='encounterType')
//     const options = data.filter(item => (item.fieldView ==='encounterView'&&item.fieldType==='encounterType'))
//         .map((item) => ({
//             id: item.id,
//             field: item.fieldData
//           }))
//     //console.log(options)
//     return options
// }
// export const getExamFieldsDataCollection =(data)=>{
//     //const options = data.filter(item => item.fieldType ==='encounterType')
//     const options = data.filter(item => item.fieldView ==='examView')
//         .map((item) => ({
//             id: item.id,
//             field: item.fieldData
//           }))
//     //console.log(options)
//     return options
// }

// const KEYS ={
//     employees:'employees',
//     employeeId:'employeeId'
// }
// export function insertEmployee(data) {
//     let employees=getAllEmployees();
//     data['id'] = generateEmployeeId()
//     employees.push(data)
//     localStorage.setItem(KEYS.employees,JSON.stringify(employees))
// }

// export function generateEmployeeId() {
//     if (localStorage.getItem(KEYS.employeeId) == null)
//         localStorage.setItem(KEYS.employeeId, '0')
//     var id = parseInt(localStorage.getItem(KEYS.employeeId))
//     localStorage.setItem(KEYS.employeeId, (++id).toString())
//     return id;
// }

// export function getAllEmployees() {
//     if (localStorage.getItem(KEYS.employees) == null)
//         localStorage.setItem(KEYS.employees, JSON.stringify([]))
//     return JSON.parse(localStorage.getItem(KEYS.employees));
// }
