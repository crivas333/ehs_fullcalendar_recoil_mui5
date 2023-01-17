import React from "react";
import {
  //useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import request from "graphql-request";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import EncounterControl from "../components/systemConfig/EncounterControl";
import ExamControl from "../components/systemConfig/ExamControl";
import AppointmentControl from "../components/systemConfig/AppointmentControl";
import {
  //GET_APPLICATIONSFIELDS,
  DELETE_APPLICATIONFIELDS,
  UPDATE_APPLICATIONFIELDS,
  ADD_APPLICATIONFIELDS,
} from "../graphqlClient/gqlQueries_sysconf";
import Notify from "../components/notification/Notify";

//const SiteLayout = React.lazy(() => import("../layouts/SiteLayout"));
// const EncounterControl = React.lazy(() =>
//   import("../components/systemConfig/EncounterControl")
// );
// const ExamControl = React.lazy(() =>
//   import("../components/systemConfig/ExamControl")
// );
// const AppointmentControl = React.lazy(() =>
//   import("../components/systemConfig/AppointmentControl")
// );

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
  //const classes = useStyles();
  //const { customData } = useContext(GlobalContext)
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["applicationFields"]);

  const addField = useMutation(addHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      //force loading: "[ApplicationFields]"
      //Notify({ message: "Campo Ingresado", status: "success" });
      queryClient.invalidateQueries({ queryKey: ["applicationFields"] });
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
      queryClient.invalidateQueries(["applicationFields"]);
      Notify({ message: "Datos de Paciente actualizados", status: "success" });
      //setCurrentPatient(data);
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      queryClient.invalidateQueries("applicationFields");
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
      queryClient.invalidateQueries(["applicationFields"]);
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

  // const { isLoading, isError, data, error } = useQuery(
  //   ["applicationFields"],
  //   async () => {
  //     const res = await request("/graphql", GET_APPLICATIONSFIELDS);
  //     console.log("SystemConfig: ", res.getApplicationFields);
  //     if (res && res.getApplicationFields) {
  //       return res.getApplicationFields;
  //     } else {
  //       throw new Error("Network response was not ok");
  //     }
  //   },
  //   { refetchOnWindowFocus: false }
  // );
  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  return (
    <div //className={classes.root}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            elevation={4}
            sx={{ borderColor: "primary.main" }}
          >
            <EncounterControl
              applicationFields={data}
              addField={addField}
              updateField={updateField}
              deleteField={deleteField}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            elevation={4}
            sx={{ borderColor: "primary.main" }}
          >
            <ExamControl
              applicationFields={data}
              addField={addField}
              updateField={updateField}
              deleteField={deleteField}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            variant="outlined"
            elevation={4}
            sx={{ borderColor: "primary.main" }}
          >
            <AppointmentControl
              applicationFields={data}
              addField={addField}
              updateField={updateField}
              deleteField={deleteField}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
//<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
