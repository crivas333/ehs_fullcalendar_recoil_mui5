import React from "react";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
//import {Select as MuiSelect} from '@material-ui/core/'
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

export default function CustomSelect(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    variant,
    options,
  } = props;
  //<InputLabel>{label}</InputLabel>
  //<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
  //   <TextField
  //   id="filled-select-currency"
  //   select //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   label="Select"
  //   value={currency}
  //   onChange={handleChange}
  //   helperText="Please select your currency"
  //   variant="filled"
  // >
  return (
    <FormControl
      variant={variant}
      size="small"
      margin="dense"
      //className={classes.formControl}
      //{...error && { error: true }}
    >
      <InputLabel
      //shrink
      >
        {label}
      </InputLabel>
      <Select
        //variant='standard'
        label={label} //keep this for lebel display consistance
        //native
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <MenuItem key={item.id} value={item.field}>
            {item.field}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
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
