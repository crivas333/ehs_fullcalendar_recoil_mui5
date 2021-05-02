import React, { useState, useContext } from 'react';
import AsyncSelect from 'react-select/async';
//import {components} from 'react-select';
import { client } from '../../../apolloConfig/apolloClient'
import { GlobalContext } from '../../../context/GlobalState'
import {SEARCH_PATIENT_BY_LASTNAME} from '../../../apolloConfig/gqlQueries'
import './asyncSelect.css'


const formatOptionLabel = ({ historyId, lastName, lastName2, firstName}) => (
 
    <span>{`${historyId} - ${lastName} ${lastName2}, ${firstName}`}</span>
);

const loadOptions = async (input, cb) => {
  if (input && input.trim().length < 2) {
    return [];
  }
  const res = await client.query({query: SEARCH_PATIENT_BY_LASTNAME, variables: { lastName: input } });

  if (res.data && res.data.searchPatientsByLastName) {
    console.log('res:',res.data.searchPatientsByLastName)
    return res.data.searchPatientsByLastName.map(
      (a) => ({
        id: a.id,
        historyId: a.historyId,
        lastName: a.lastName,
        lastName2: a.lastName2,
        firstName: a.firstName
      })
    );
  }

  return [];
};

export default function AsyncSelectForSchedule(props) {
  const { getPatientByIdAPOLLO} = useContext(GlobalContext)
  //const [inputValue, setValue] = useState('');
  //const [value, setValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  

  // handle input change event
  const handleInputChange = (inputValue) => {
    //console.log(value.toUpperCase())
    //setValue(inputValue.toUpperCase());
    //return value.replace(/[^0-9]/g, "");
    return inputValue.toUpperCase()
  };

  // handle selection
  const handleChange = inputValue => {
    //console.log('selectedValue:',value)
    //setSelectedValue(inputValue);
    if(inputValue){
    getPatientByIdAPOLLO(inputValue.id)
    setSelectedValue(null);
    //updateActionExam(0);
    }
  }


  return (
    <div>
     
      <AsyncSelect
        ref={handleRef}
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


