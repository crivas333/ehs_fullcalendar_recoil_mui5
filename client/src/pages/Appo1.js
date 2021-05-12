import React from "react";

//import { useMutation } from '@apollo/client'
//import { CREATE_APPOINTMENT, UPDATE_APPOINTMENT, DELETE_APPOINTMENT } from '../apolloConfig/gqlQueries'
// import DisplayPatientData from '../components/patientData/DisplayPatientData'
// import PatientSummary from '../components/patientData/PatientSummary'
// import Box from '@material-ui/core/Box';
// import Paper from '@material-ui/core/Paper'
// import Button from '@material-ui/core/Button'
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import TextField from "@material-ui/core/TextField";
//import Dialog from '@material-ui/core/Dialog'
//import DialogActions from '@material-ui/core/DialogActions'
//import DialogContent from '@material-ui/core/DialogContent'
//import DialogContentText from '@material-ui/core/DialogContentText'
//import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from '@material-ui/core/Paper'
// import Scrollbar from 'rmw-shell/lib/components/Scrollbar'
// import { Scrollbars } from 'react-custom-scrollbars'

// import AsyncPaginationExample from '../components/patientData/asyncPagination'
// import AsyncPaginationSearch from '../components/patientData/AsyncPaginationSearch'
//import { NewAppointmentForm } from '../components/dataGrid/NewAppointmentForm'
//import { UpdateAppointmentForm } from '../components/dataGrid/UpdateAppointmentForm'
// import { PatientList } from '../components/PatientList'
// import AutoBootstrap from "../components/autoBootstrap";
//import { GlobalContext } from '../context/GlobalState'
//import { PatientList } from '../components/patientData/PatientList'
//import DailyAppo1 from '../components/dataGrid1/DailyAppo1'
//import AppoView from '../components/appointment/AppoView'
// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxHeight: 550,
  },
}));

export default function Appointment() {
  const classes = useStyles();
  //const { currentPatient } = useContext(GlobalContext)

  // {params.isCreating && <Backdrop />}
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          {/*<DailyAppo1 />*/}
        </Grid>
      </Grid>
    </div>
  );
}
