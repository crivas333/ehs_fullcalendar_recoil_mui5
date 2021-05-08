import React, { useState } from "react";
import AsyncSelect from "react-select/async";
//import AsyncSelect from 'react-select';
//import {components} from 'react-select';
import { client } from "../../../graphqlClient/apolloClient";
//import { GlobalContext } from '../../context/GlobalState'
import {
  SEARCH_PATIENT_BY_LASTNAME,
  AUTOCOMPLETE_SEARCH_PATIENT_BY_ID,
} from "../../../graphqlClient/gqlQueries";
import "./asyncSelect.css";

const formatOptionLabel = ({ historyId, lastName, lastName2, firstName }) => (
  <span>{`${historyId} - ${lastName} ${lastName2}, ${firstName}`}</span>
);

const loadPatient = async (input) => {
  try {
    const res = await client.query({
      query: AUTOCOMPLETE_SEARCH_PATIENT_BY_ID,
      variables: { id: input },
    });
    if (res.data && res.data.patient) {
      //console.log('res-patiente:',res.data.patient.id)
      //return (res.data.patient.id)
      return res.data.patient;
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
    const res = await client.query({
      query: SEARCH_PATIENT_BY_LASTNAME,
      variables: { lastName: input },
    });
    if (res.data && res.data.searchPatientsByLastName) {
      //console.log('res:',res.data.searchPatientsByLastName)
      return res.data.searchPatientsByLastName.map((a) => ({
        id: a.id,
        historyId: a.historyId,
        lastName: a.lastName,
        lastName2: a.lastName2,
        firstName: a.firstName,
      }));
    }
    return [];
  } catch (err) {
    console.log(err);
  }
};

export default function AsyncSelectDummy(props) {
  //const { getPatientByIdAPOLLO} = useContext(GlobalContext)
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = (inputValue) => {
    return inputValue.toUpperCase();
  };

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
        placeholder="Search by Last Name"
        className="boxSize"
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
