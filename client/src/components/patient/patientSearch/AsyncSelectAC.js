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
} from "../../../graphqlClient/gqlQueries";
import {
  currentPatientState,
  //getPatientByIdFamSel,
} from "../../../context/RecoilStore";
import "./asyncSelect.css";

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
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
    // const res = await client.query({
    //   query: SEARCH_PATIENT_BY_LASTNAME,
    //   variables: { lastName: input },
    // });
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
  //const setCurrentUser = useSetRecoilState(currentUserState);
  //const { getPatientByIdAPOLLO, updateActionExam } = useContext(GlobalContext);
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = (inputValue) => {
    return inputValue.toUpperCase();
  };

  // handle selection
  const handleChange = (inputValue) => {
    if (inputValue) {
      //getPatientByIdAPOLLO(inputValue.id);

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
        //style={{width:"300px"}}
        //components={{ Input }}
        formatOptionLabel={formatOptionLabel}
        //className='boxSize'
        placeholder="Search by Last Name"
        //className="select"
        //cacheOptions
        //defaultOptions
        value={selectedValue} //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //getOptionLabel={e => e.lastName}
        //getOptionValue={e => e.id}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
        //onChange={opt => setArtist(opt)}
        //formatGroupLabel={formatGroupLabel}
      />
    </div>
  );
}
