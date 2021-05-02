import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
//import { numberWithCommas } from "../utils/format";
//import { deletePatientData } from "../../../controllers/patientData";

export const PatientData = ({ patientData }) => {
  const { deletePatientDataAxios } = useContext(GlobalContext);

  //const sign = patientData.amount < 0 ? '-' : '+';

  return (
    //<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
    <li>
      {patientData.firstName} <span>{patientData.lastName}</span>
      
  
    </li>
  );
};
