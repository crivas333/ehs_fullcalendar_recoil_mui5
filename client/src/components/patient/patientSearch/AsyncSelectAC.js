import React, { useState } from "react";
import {
  //RecoilRoot,
  //atom,
  //selector,
  //useRecoilState,
  //useRecoilValue,
  useSetRecoilState,
} from "recoil";
import AsyncSelect from "react-select/async";
import request from "graphql-request";
//import { GlobalContext } from "../../../context/GlobalState";
//import { currentPatientState } from "../../../context/RecoilStore";
import {
  SEARCH_PATIENT_BY_LASTNAME,
  SEARCH_PATIENT_BY_ID,
} from "../../../graphqlClient/gqlQueries_patient";
import {
  currentPatientState,
  //getPatientByIdFamSel,
} from "../../../context/RecoilStore";

import "./asyncSelect.css"; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
    //textTransform: "uppercase",
  }),
  // control: (baseStyles, state) => ({
  //   ...baseStyles,
  //   borderColor: state.isFocused ? "violet" : "red",
  //}),
  // input: (styles) => ({
  //   ...styles,
  //   color: "green",
  //   //margin: 100,
  // }),
  // input: (provided) => ({
  //   ...provided,
  //   color: "red",
  //   ":before": {
  //     textTransform: "uppercase",
  //   },
  // }),
  // input: (provided) => ({
  //   ...provided,
  //   color: "red",
  //   textTransform: "uppercase",
  // }),
  input: (base) => ({
    ...base,
    color: "red",
    textTransform: "uppercase",
  }),
  // input: () => ({
  //   color: "violet",
  //   textTransform: "uppercase",
  // }),
  // input: (style) => ({
  //   ...style,
  //   //color: "red",
  //   textTransform: "uppercase",
  // }),
  // valueContainer: (styles) => ({
  //   ...styles,
  //   textTransform: "uppercase",
  //   borderInlineStartColor: "lavender",
  // }),
  // indicatorContainer: (styles) => ({
  //   ...styles,
  //   textTransform: "uppercase",
  //   borderInlineStartColor: "lavender",
  // }),
  //singleValue: (styles) => ({ ...styles, textTransform: "uppercase" }),
  // input: (base) => ({
  //   ...base,
  //   textTransform: "uppercase",
  // }),
  // control: (baseStyles, state) => ({
  //   ...baseStyles,
  //   transform: "uppercase",
  // }),
  //placeholder: (styles) => ({ ...styles, textTransform: "lowercase" }),
};

// const formatOptionLabel = ({ historyId, lastName, lastName2, firstName }) => (
//   <span>{`${historyId} - ${lastName} ${lastName2}, ${firstName}`}</span>
// );
const formatOptionLabel = ({ historyId, fullName }) => (
  <span>{`${historyId} - ${fullName}`}</span>
);

const loadOptions = async (input, cb) => {
  if (input && input.trim().length < 2) {
    return [];
  }
  try {
    const res = await request("/graphql", SEARCH_PATIENT_BY_LASTNAME, {
      lastName: input,
    });
    //console.log("loadOptions-res:", res.searchPatientsByLastName);
    //if (res.data && res.data.searchPatientsByLastName) {
    if (res && res.searchPatientsByLastName) {
      //console.log('res:',res.data.searchPatientsByLastName)
      //return res.data.searchPatientsByLastName.map((a) => ({
      return res.searchPatientsByLastName.map((a) => ({
        id: a.id,
        historyId: a.historyId,
        //lastName: a.lastName,
        //lastName2: a.lastName2,
        //firstName: a.firstName,
        fullName: a.fullName,
      }));
    }
    return [];
  } catch (err) {
    //console.log('AsyncSelectAC - error: ',err)
    console.log(err);
  }
};

async function getPatientById(id) {
  try {
    const res = await request("/graphql", SEARCH_PATIENT_BY_ID, {
      id: id,
    });
    //console.log("GlobalState - getPatientByIdAPOLLO - res: ", res);
    if (res && res.patient) {
      return res.patient;
    }
  } catch (err) {
    console.log("getPatientByIdAPOLLO-err: ", err);
    return null;
  }
}
export default function AsyncSelectAC() {
  const setCurrentPatient = useSetRecoilState(currentPatientState);
  //const patientId = useRecoilValue(getPatientByIdFamSel(currentPatient.id));

  const [selectedValue, setSelectedValue] = useState(null);

  // const handleOnKeyDown = (e) => {
  //   //console.log(e.key.toUpperCase());
  //   console.log(e.key);
  // };
  // handle input change event
  const handleInputChange = (inputValue) => {
    //console.log("AsyncSelect-inputValue: ", inputValue.toUpperCase());
    return inputValue.toUpperCase();
  };

  // handle selection
  const handleChange = (inputValue) => {
    if (inputValue) {
      //updateActionExam(0);
      //const res = getPatientById(inputValue.id);
      getPatientById(inputValue.id).then((res) => setCurrentPatient(res));
      //setCurrentPatient(res);
      setSelectedValue(null);
    }
  };

  return (
    <div>
      <AsyncSelect
        styles={selectStyles}
        autoFocus
        isClearable
        //styles={customStyles}
        //style={{ width: "100px" }}
        //components={{ Input }}
        formatOptionLabel={formatOptionLabel}
        //className="boxSize"

        //className="inputText" //works on options
        placeholder="Busque por A. Paterno"
        //className="select"
        //cacheOptions
        //defaultOptions
        value={selectedValue} //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //getOptionLabel={e => e.lastName}
        //getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        //onKeyDown={handleOnKeyDown}
        //formatGroupLabel={formatGroupLabel}
      />
    </div>
  );
}
