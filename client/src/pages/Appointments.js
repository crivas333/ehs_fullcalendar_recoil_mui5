import React from "react";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import DailyAppointments from "../components/appointments/Appointments";
import Box from "@material-ui/core/Box";

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
    <Grid container spacing={3}>
      <Grid container item xs={12}>
        <DailyAppointments />
      </Grid>
    </Grid>
  );
}
