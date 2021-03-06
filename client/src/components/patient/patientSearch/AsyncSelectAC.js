import React, { useState, useContext } from "react";
import AsyncSelect from "react-select/async";
//import {components} from 'react-select';
//import { client } from "../../../graphqlClient/apolloClient";
import request from "graphql-request";
import { GlobalContext } from "../../../context/GlobalState";
import { SEARCH_PATIENT_BY_LASTNAME } from "../../../graphqlClient/gqlQueries";
import "./asyncSelect.css";

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const formatOptionLabel = ({ historyId, lastName, lastName2, firstName }) => (
  <span>{`${historyId} - ${lastName} ${lastName2}, ${firstName}`}</span>
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

export default function AsyncSelectAC() {
  const { getPatientByIdAPOLLO, updateActionExam } = useContext(GlobalContext);
  //const [inputValue, setValue] = useState('');
  //const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  // handle input change event
  const handleInputChange = (inputValue) => {
    //console.log(value.toUpperCase())
    //setValue(inputValue.toUpperCase());
    //return value.replace(/[^0-9]/g, "");
    return inputValue.toUpperCase();
  };

  // handle selection
  const handleChange = (inputValue) => {
    //console.log('selectedValue:',value)
    //setSelectedValue(inputValue);
    if (inputValue) {
      getPatientByIdAPOLLO(inputValue.id);
      setSelectedValue(null);
      updateActionExam(0);
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
