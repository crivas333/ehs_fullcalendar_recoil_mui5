import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

export function useReusableForm(
  initialFValues,
  validateOnChange = false,
  validate
) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("useReusableForm-handleInputChange:", name);
    setValues({
      ...values,
      [name]: value,
    });

    if (validateOnChange) {
      //console.log("validateOnChange");
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      //margin: theme.spacing(1)
      margin: theme.spacing(0),
      //minWidth: 120,
    },
  },
}));

export function ReusableForm(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
    </form>
  );
}
