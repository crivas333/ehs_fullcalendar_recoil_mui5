import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
//' Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
//import {Select as MuiSelect} from '@material-ui/core/'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
// }));
export default function CustomSelect(props) {
  //const classes = useStyles();
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
  return (
    <FormControl
      variant={variant}
      size="small"
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
        label={label}
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
