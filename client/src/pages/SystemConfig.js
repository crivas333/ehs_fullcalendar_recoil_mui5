import React from "react";
//import clsx from 'clsx';
import { useMutation, useQueryClient } from "react-query";
import request from "graphql-request";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EncounterControl from "../components/systemConfig/EncounterControl";
import ExamControl from "../components/systemConfig/ExamControl";
import AppointmentControl from "../components/systemConfig/AppointmentControl";
import {
  //GET_APPLICATIONSFIELDS,
  DELETE_APPLICATIONFIELDS,
  UPDATE_APPLICATIONFIELDS,
  ADD_APPLICATIONFIELDS,
} from "../graphqlClient/gqlQueries";
import Notify from "../components/notification/Notify";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
}));
async function addHelper(data) {
  console.log("addHelper: ", data);
  //const res = await request("/graphql", ADD_APPLICATIONFIELDS, data.variables);
  const res = await request("/graphql", ADD_APPLICATIONFIELDS, data);
  //console.log("addData-res:", res);
  return res.addApplicationFields;
}
async function updateHelper(data) {
  console.log("addHelper: ", data);
  const res = await request("/graphql", UPDATE_APPLICATIONFIELDS, data);
  //console.log("addData-res:", res);
  return res.updateApplicationFields;
}
async function deleteHelper(data) {
  const res = await request("/graphql", DELETE_APPLICATIONFIELDS, data);
  //console.log("addData-res:", res);
  return res.deleteApplicationFields;
}

export default function SystemConfig() {
  const classes = useStyles();
  //const { customData } = useContext(GlobalContext)
  const queryClient = useQueryClient();

  const addField = useMutation(addHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      queryClient.invalidateQueries("applicationFields");
      Notify({ message: "Datos de Paciente ingresados", status: "success" });
      //setCurrentPatient(data);
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Datos de Paciente NO ingresados",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      //console.log("onSettled");
    },
  });

  const updateField = useMutation(updateHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      Notify({ message: "Datos de Paciente actualizados", status: "success" });
      //setCurrentPatient(data);
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Datos de Paciente NO actualizadoss",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      //console.log("onSettled");
    },
  });

  const deleteField = useMutation(deleteHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      //setCurrentPatient([]);
      Notify({ message: "Datos de Paciente borrados", status: "success" });
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Datos de Paciente NO borrados",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      //console.log("onSettled");
    },
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EncounterControl
            addField={addField}
            updateField={updateField}
            deleteField={deleteField}
          />
        </Grid>
        <Grid item xs={12}>
          <ExamControl
            addField={addField}
            updateField={updateField}
            deleteField={deleteField}
          />
        </Grid>
        <Grid item xs={12}>
          <AppointmentControl
            addField={addField}
            updateField={updateField}
            deleteField={deleteField}
          />
        </Grid>
      </Grid>
    </div>
  );
}
//<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
