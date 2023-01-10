import React from "react";
import { TextField } from "@mui/material";
//import FormControl from '@material-ui/core/FormControl'
//import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from "@mui/material/InputAdornment";
//import EditIcon from "@material-ui/icons/Edit";
//import DeleteIcon from "@material-ui/icons/Clear";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
//import { makeStyles } from "@material-ui/core/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(0),
  },
  textfieldReadOnly: {
    marginTop: theme.spacing(2),
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
  input: {
    textTransform: "uppercase",
    // autoComplete: 'off'
  },
  formControl: {
    marginTop: theme.spacing(0),
  },
}));

export default function CustomInputIconDelete(props) {
  const classes = useStyles();
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    readOnly,
    variant,
    handleIconClick,
  } = props;
  return (
    <TextField
      variant={variant}
      size="small"
      type="text"
      margin="normal"
      fullWidth
      label={label}
      name={name}
      value={value || ""}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      inputProps={{ className: classes.input }}
      InputProps={{
        readOnly: readOnly,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleIconClick}>
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
//<DeleteIcon onClick={handleIconClick} />

/*
<IconButton aria-label="delete">
              <DeleteIcon onClick={handleIconClick} />
            </IconButton>
*/
/*
   <FormControl
            className={classes.formControl}
          >
            <TextField
                //variant='normal'
                size='small'
                type='text'
                margin='normal'
								fullWidth
								variant='outlined'
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                {...(error && {error:true,helperText:error})}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </FormControl>
*/
