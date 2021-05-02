
import React, { useState, useContext } from 'react'

import { useMutation } from '@apollo/client'
import { CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT } from '../apolloConfig/gqlQueries'


import Button from '@material-ui/core/Button'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
// import Scrollbar from 'rmw-shell/lib/components/Scrollbar'
// import { Scrollbars } from 'react-custom-scrollbars'

//import AsyncPaginationExample from '../components/patientData/asyncPagination'
import AsyncPaginationSearch from '../components/patient/patientSearch/AsyncPaginationSearch'
//import { NewPatientForm } from '../components/patient/NewPatientTabForm'
import { UpdatePatientForm } from '../components/patient/UpdatePatientForm'
import { NewPatientTabForm } from '../components/patient/patientNew/NewPatientTabForm'
//import DisplayPatientData from '../components/patient/DisplayPatientData'
import {DisplayPatientTabForm} from '../components/patient/patientNew/DisplayPatientTabForm'
// import AutoBootstrap from "../components/autoBootstrap";
import { GlobalContext } from '../context/GlobalState'
// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export default function Paciente () {
  const classes = useStyles()
  const { currentPatient } = useContext(GlobalContext)
  const [openCreatePatient, setOpenCreatePatient] = useState(false)
  const [openUpdatePatient, setOpenUpdatePatient] = useState(false)
  // const [scroll, setScroll] = React.useState('paper')

  const { clearCurrentPatient, reloadCurrentPatient } = useContext(GlobalContext)
  // const [createPatient, { dataCreatePatient, error: errorCreatePatient }] = useMutation(CREATE_PATIENT,
  //const [createPatient, {  error: errorCreatePatient }] = useMutation(CREATE_PATIENT,
  const [createPatient] = useMutation(CREATE_PATIENT,
    {
      // destructured result (data): createPatient
      onCompleted ({createPatient}) {
        // console.log('createPatient: ', createPatient)
        // console.log('dataCreatePatient: ', createPatient.historyId)
        setOpenCreatePatient(false)
        reloadCurrentPatient(createPatient) // set isAuth: true
        // navigate('/paciente');
      },
      //onError (...errorCreatePatient) {
      onError (errorCreatePatient) {
        console.log('createPatient - onError: ', { errorCreatePatient })
      }
    }
  )
  const [updatePatient] = useMutation(UPDATE_PATIENT,
    {
      onCompleted ({ updatePatient }) {
        // console.log('updatePatient: ', updatePatient)
        setOpenUpdatePatient(false)
        reloadCurrentPatient(updatePatient)
      },
      onError (...errorUpdatePatient) {
        console.log('updatePatient - onError: ', { errorUpdatePatient })
      }
    }
  )
  const [deletePatient] = useMutation(DELETE_PATIENT,
    {
      onCompleted ({ deletePatient }) {
        console.log('deletePatient: ', deletePatient)
        clearCurrentPatient()
      },
      onError (...errorDeletePatient) {
        console.log('deletePatient - onError: ', { errorDeletePatient })
      }
    }
  )

  const handleClickOpenCreatePatient = () => {
    clearCurrentPatient()
    setOpenCreatePatient(true)
  }
  const handleCloseCreatePatient = () => {
    setOpenCreatePatient(false)
  }

  const handleClickOpenUpdatePatient = () => {
    setOpenUpdatePatient(true)
  }

  const handleCloseUpdatePatient = () => {
    setOpenUpdatePatient(false)
  }
  const handleClickDeletePatient = () => {
    deletePatient({ variables: { id: currentPatient.id } })
  }
  // {params.isCreating && <Backdrop />}
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <AsyncPaginationSearch />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <ButtonGroup variant="contained" >
            <Button
              color='primary'
              onClick={handleClickOpenCreatePatient}
            >
              CREAR PACIENTE
            </Button>
            <Button
              color='primary'
              onClick={handleClickOpenUpdatePatient}
            >
              ACTUALIZAR PACIENTE
            </Button>
            <Button
              color='secondary'
              onClick={handleClickDeletePatient}
            >
              BORRAR PACIENTE
            </Button>
          </ButtonGroup>
          <Grid item xs={12}>
            <DisplayPatientTabForm />
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
  )
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