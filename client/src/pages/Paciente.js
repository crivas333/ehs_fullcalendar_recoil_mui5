
import React, { useState, useContext } from 'react'

import { useMutation } from '@apollo/client'
import { CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT } from '../apolloConfig/gqlQueries'

import Button from '@material-ui/core/Button'
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from '@material-ui/core/Grid'
//import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

//import AsyncPaginationExample from '../components/patientData/asyncPagination'
//import AsyncPaginationSearch from '../components/patient/patientSearch/AsyncPaginationSearch'
import AsyncSelectAC from '../components/patient/patientSearch/AsyncSelectAC'
import {DisplayPatientTabForm} from '../components/patient/patientNew/DisplayPatientTabForm'
import {NewPatientTabForm} from '../components/patient/patientNew/NewPatientTabForm'
import {UpdatePatientTabForm} from '../components/patient/patientNew/UpdatePatientTabForm'
import { GlobalContext } from '../context/GlobalState'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //overflow: 'auto'
    overflow: 'hidden'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))
const SEARCH=0
const CREATE=1
const UPDATE=2

export default function Paciente () {
  const classes = useStyles()
 
  const { currentPatient, clearCurrentPatient, reloadCurrentPatient } = useContext(GlobalContext)
  const [action,setAction]=useState(SEARCH)
  

  
  // const [createPatient, { dataCreatePatient, error: errorCreatePatient }] = useMutation(CREATE_PATIENT,
  const [createPatient] = useMutation(CREATE_PATIENT,
    {
      // destructured result (data): createPatient
      onCompleted ({createPatient}) {
 
        //setOpenCreatePatient(false)
        setAction(SEARCH)
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
        //setOpenUpdatePatient(false)
        setAction(SEARCH)
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

 
  const handleCancel = () => {
    //console.log('handleCancel')
    setAction(SEARCH)
  }

  const handleCreatePatient = () => {
    clearCurrentPatient()
    setAction(CREATE)
  }
  
  const handleUpdatePatient = () => {
    setAction(UPDATE)
  }
 
  const handleDeletePatient = () => {
    deletePatient({ variables: { id: currentPatient.id } })
  }
  
  //<AsyncPaginationSearch />
  return (
    <div className={classes.root}>
      <Grid 
        container
        direction='column' 
        spacing={2} 

        >
        <Grid item xs={12} >
          <AsyncSelectAC />       
        </Grid>
       
        <Grid item container   xs={12} alignItems="flex-start" direction='column'>
          <Grid item>
            <ButtonGroup variant="contained" >
            <Button 
              color='primary'
              disabled={action===2}
              onClick={handleCreatePatient}
            >
              CREAR PACIENTE
            </Button>
            <Button
              color='primary'
              disabled={action===1}
              onClick={handleUpdatePatient}
            >
              ACTUALIZAR PACIENTE
            </Button>
            <Button
              color='secondary'
              disabled={action===1||action===2}
              onClick={handleDeletePatient}
            >
              BORRAR PACIENTE
            </Button>
          </ButtonGroup>
          </Grid>
          <Grid item >
            {(action===SEARCH)&& 
              <DisplayPatientTabForm />}
            {(action===CREATE)&& 
              <NewPatientTabForm 
                createPatient={createPatient}
                handleCancel={handleCancel}
                />}
            {(action===UPDATE)&& 
              <UpdatePatientTabForm 
                updatePatient={updatePatient}
                handleCancel={handleCancel}
              />}
          </Grid>
          
        </Grid>
      </Grid>

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