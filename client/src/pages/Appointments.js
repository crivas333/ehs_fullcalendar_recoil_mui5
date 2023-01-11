import React from "react";

import Grid from "@mui/material/Grid";
import DailyAppointments from "../components/appointments/Appointments";
//import Box from "@material-ui/core/Box";

export default function Appointment() {
  //const { currentPatient } = useContext(GlobalContext)

  // {params.isCreating && <Backdrop />}
  return (
    <Grid container spacing={3}>
      <Grid container item xs={12}>
        {/*<DailyAppointments/> */}
        <DailyAppointments />
      </Grid>
    </Grid>
  );
}
