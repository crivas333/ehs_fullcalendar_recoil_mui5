import React from 'react'

//' Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
//import {Select as MuiSelect} from '@material-ui/core/'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'

export default function CustomSelect(props) {

    const { name, label, value,error=null, onChange, options} = props;
    //<InputLabel>{label}</InputLabel>
    return (
      <FormControl 
        variant='standard'
        {...(error && {error:true})}>
        <InputLabel >{label}</InputLabel>
        <Select
					//variant='standard'
					//label={label}
					//native
					fullWidth
					name={name}
					value={value}
					onChange={onChange}>  
					{
						options.map(
										item => (<MenuItem key={item.id} value={item.field}>{item.field}</MenuItem>)
						)
					}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    )
}

/*
   <MuiSelect
        //label={label}
        //native
        name={name}
        value={value}
        onChange={onChange}>
        
        <MenuItem value="">None</MenuItem>
        {
            options.map(
                //item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                item => (<MenuItem key={item.id} value={item.fieldData}>{item.fieldData}</MenuItem>)
            )
        }
    </MuiSelect>
*/