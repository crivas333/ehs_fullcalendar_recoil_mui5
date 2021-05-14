import React, { useState, useContext } from "react";
import AsyncSelect from "react-select/async";
//import {components} from 'react-select';
//import { client } from "../../../graphqlClient/apolloClient";
import request from "graphql-request";
import { GlobalContext } from "../../../context/GlobalState";
import {
  AUTOCOMPLETE_SEARCH_PATIENT_BY_ID,
  SEARCH_PATIENT_BY_LASTNAME,
} from "../../../graphqlClient/gqlQueries";
import "./asyncSelect.css";

const formatOptionLabel = ({ historyId, lastName, lastName2, firstName }) => (
  <span>{`${historyId} - ${lastName} ${lastName2}, ${firstName}`}</span>
);
const loadPatient = async (input) => {
  try {
    // const res = await client.query({
    //   query: AUTOCOMPLETE_SEARCH_PATIENT_BY_ID,
    //   variables: { id: input },
    // });
    const res = await request("/graphql", AUTOCOMPLETE_SEARCH_PATIENT_BY_ID, {
      id: input,
    });
    //console.log(res);
    //if (res.data && res.data.patient) {
    if (res && res.patient) {
      //console.log('res-patiente:',res.data.patient.id)
      //return (res.data.patient.id)
      return res.patient;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};
const loadOptions = async (input, cb) => {
  if (input && input.trim().length < 2) {
    return [];
  }
  try {
    const res = await request("/graphql", SEARCH_PATIENT_BY_LASTNAME, {
      lastName: input,
    });

    if (res && res.searchPatientsByLastName) {
      return res.searchPatientsByLastName.map((a) => ({
        id: a.id,
        historyId: a.historyId,
        lastName: a.lastName,
        lastName2: a.lastName2,
        firstName: a.firstName,
      }));
    }
    return [];
  } catch (err) {
    //console.log('AsyncSelectAC - error: ',err)
    console.log(err);
  }
};

export default function AsyncSelectAC(props) {
  const { getPatientByIdAPOLLO, updateActionExam } = useContext(GlobalContext);

  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = (inputValue) => {
    return inputValue.toUpperCase();
  };

  // handle selection
  const handleChange = (inputValue) => {
    if (inputValue) {
      //console.log('handle change: ',inputValue)
      loadPatient(inputValue.id).then((resp) => props.onValChange(resp));
    }
  };

  return (
    <div>
      <AsyncSelect
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
