import React, { useState } from "react";

import { useRecoilState } from "recoil";
//import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

import AsyncSelectAC from "../components/patient/patientSearch/AsyncSelectAC";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {
  CREATE_PATIENT,
  UPDATE_PATIENT,
  DELETE_PATIENT,
} from "../graphqlClient/gqlQueries_patient";

import { DisplayPatientTabForm } from "../components/patient/patientNew/DisplayPatientTabForm";
import { NewPatientTabForm } from "../components/patient/patientNew/NewPatientTabForm";
import { UpdatePatientTabForm } from "../components/patient/patientNew/UpdatePatientTabForm";
//import { GlobalContext } from "../context/GlobalState";
import { currentPatientState } from "../context/RecoilStore";
import Notify from "../components/notification/Notify";

const SEARCH = 0;
const CREATE = 1;
const UPDATE = 2;

async function createHelper(data) {
  //console.log("addData: ", data);
  //const res = await request("/graphql", CREATE_PATIENT, data);
  const res = await request("/graphql", CREATE_PATIENT, data.variables);
  //console.log("addData-res:", res);
  return res.createPatient;
}
async function updateHelper(data) {
  //console.log("addData: ", data);
  //const res = await request("/graphql", UPDATE_PATIENT, data);
  const res = await request("/graphql", UPDATE_PATIENT, data.variables);
  //console.log("addData-res:", res);
  return res.updatePatient;
}
async function deleteHelper(data) {
  //console.log("addData: ", data.variables);
  //const res = await request("/graphql", DELETE_PATIENT, data);
  const res = await request("/graphql", DELETE_PATIENT, data.variables);
  //console.log("addData-res:", res);
  return res.deletePatient;
}

export default function Paciente() {
  const [currentPatient, setCurrentPatient] =
    useRecoilState(currentPatientState);
  const [action, setAction] = useState(SEARCH);

  const createPatient = useMutation(createHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      //Notify({ message: "Datos de Paciente ingresados", status: "success" });
      //setAction(SEARCH);
      //reloadCurrentPatient(data);
      setCurrentPatient(data);
      setAction(SEARCH);
      Notify({ message: "Datos de Paciente ingresados", status: "success" });
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      //console.log("onError");
      Notify({
        message: "Error: Datos de Paciente NO ingresados",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });

  const updatePatient = useMutation(updateHelper, {
    onSuccess: (data, variables) => {
      // I will fire first
      //console.log("onSuccess:", data);
      //Notify({ message: "Datos de Paciente actualizados", status: "success" });
      //setAction(SEARCH);
      //reloadCurrentPatient(data);
      setCurrentPatient(data);
      setAction(SEARCH);
      Notify({ message: "Datos de Paciente actualizados", status: "success" });
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      // I will fire first
      console.log("onError");
      Notify({
        message: "Error: Datos de Paciente NO actualizadoss",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });

  const deletePatient = useMutation(deleteHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);

      //setAction(SEARCH);
      //clearCurrentPatient();
      setCurrentPatient([]);
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

  const handleCancel = () => {
    //console.log('handleCancel')
    setAction(SEARCH);
  };

  const handleCreatePatient = () => {
    //clearCurrentPatient();
    setCurrentPatient([]);
    setAction(CREATE);
  };

  const handleUpdatePatient = () => {
    setAction(UPDATE);
  };

  const handleDeletePatient = () => {
    //deletePatient({ variables: { id: currentPatient.id } });
    //deletePatient.mutate({ id: currentPatient.id });
    deletePatient.mutate({ variables: { id: currentPatient.id } });
  };

  //<Grid container spacing={2}>
  //<Grid item xs={8}></Grid>
  return (
    <Box
      sx={{
        flexDirection: "row",
        //overflow: 'auto'
        //overflow: "hidden",
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <AsyncSelectAC />
        </Grid>

        <Grid
          item
          xs={12}
          container
          //alignItems="flex-center"
          direction="column"
        >
          <Grid item xs>
            <ButtonGroup size="small" variant="contained">
              <Button
                color="primary"
                disabled={action === 2}
                onClick={handleCreatePatient}
              >
                CREAR PACIENTE
              </Button>
              <Button
                color="primary"
                disabled={action === 1}
                onClick={handleUpdatePatient}
              >
                ACTUALIZAR PACIENTE
              </Button>
              <Button
                color="secondary"
                disabled={action === 1 || action === 2}
                onClick={handleDeletePatient}
              >
                BORRAR PACIENTE
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            {action === SEARCH && <DisplayPatientTabForm />}
            {action === CREATE && (
              <NewPatientTabForm
                createPatient={createPatient}
                handleCancel={handleCancel}
              />
            )}
            {action === UPDATE && (
              <UpdatePatientTabForm
                updatePatient={updatePatient}
                handleCancel={handleCancel}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid container></Grid>
    </Box>
  );
}

/*
<Grid container spacing={3}>
        <Grid container item xs={12}>
          <AsyncPaginationSearch />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid container direction='row' justify='space-around'>
            <Button
              margin={1}
              variant='contained'
              color='primary'
              onClick={handleClickOpenCreatePatient}
            >
              CREAR PACIENTE
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleClickOpenUpdatePatient}
            >
              ACTUALIZAR PACIENTE
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClickDeletePatient}
            >
              BORRAR PACIENTE
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DisplayPatientTabForm />
          </Grid>
          
        </Grid>
      </Grid>
*/

/*
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <AsyncPaginationSearch />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid container direction='row' justify='space-around'>
            <Button
              margin={1}
              variant='contained'
              color='primary'
              onClick={handleClickOpenCreatePatient}
            >
              CREAR PACIENTE
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleClickOpenUpdatePatient}
            >
              ACTUALIZAR PACIENTE
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClickDeletePatient}
            >
              BORRAR PACIENTE
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DisplayPatientData />
          </Grid>
          
        </Grid>
      </Grid>

      <Dialog
        open={openCreatePatient}
        onClose={handleCloseCreatePatient}
        scroll='paper'
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Crear Paciente</DialogTitle>
        <DialogContent>
          <DialogContentText>Ingrese Datos del Paciente</DialogContentText>
          <NewPatientTabForm createPatient={createPatient} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreatePatient} color='primary'>
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdatePatient}
        onClose={handleCloseUpdatePatient}
        scroll='paper'
        aria-labelledby='form-dialog-title1'
      >
        <DialogTitle id='form-dialog-title1'>Actualizar Paciente</DialogTitle>
        <DialogContent>
          <DialogContentText>Actualice Datos del Paciente</DialogContentText>
          <UpdatePatientForm updatePatient={updatePatient} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdatePatient} color='primary'>
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
*/
