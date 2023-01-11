import React, { useState, useEffect } from "react";
//import {makeStyles} from '@material-ui/core/styles'
import { makeStyles } from "@mui/styles";
//import CssBaseline from '@material-ui/core/CssBaseline'
//import Container from '@material-ui/core/Container'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import FormControl from '@material-ui/core/FormControl'
import ButtonGroup from "@mui/material/ButtonGroup";

// const useStyles = makeStyles((theme) => ({
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1)
//     }
//   }))
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      //width: '25ch',
      width: "100%", // Fix IE 11 issue.
    },
  },
  input: {
    textTransform: "uppercase",
    // autoComplete: 'off'
  },
}));

const EditFieldForm = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(props.editingValue);
  //const [ data, setData ] = useState('')
  useEffect(() => {
    setData(props.editingValue);
    //console.log(field)
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    //const { name, value } = event.target
    //setData({ ...data, [name]: value.toUpperCase() })
    setData(event.target.value);
    //console.log('EditForm - EditForm: ',event.target.value)
  };

  return (
    <form
      className={classes.root}
      onSubmit={(event) => {
        event.preventDefault();
        props.updateField(data);
        //console.log(data)
      }}
    >
      <div>
        <TextField
          inputProps={{ className: classes.input }}
          label="Campo"
          variant="outlined"
          size="small"
          autoComplete="off"
          type="text"
          name="fieldData"
          value={data}
          onChange={handleInputChange}
        />
      </div>
      <ButtonGroup variant="contained">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          ACTUALIZAR
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          //className={classes.submit}
          className="button muted-button"
          onClick={() => props.setEditingFlag(false)}
        >
          CANCELAR
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default EditFieldForm;
