import React, { useState } from "react";
import { useMutation } from "react-query";
import request from "graphql-request";
import {
  ADD_ENCOUNTER,
  //UPDATE_PATIENT,
  //DELETE_PATIENT,
} from "../graphqlClient/gqlQueries";
//import { MemoryRouter, Route, Link, useRouteMatch } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconAdd from "@material-ui/icons/Add";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Close from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Add from "@material-ui/icons/Add";
//import Close from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Switch from "@material-ui/core/Switch";
import { useTheme } from "@material-ui/core/styles";

//import { GET_APPLICATIONSFIELDS } from "../graphqlClient/gqlQueries";
import { queryClient } from "../graphqlClient/reactQueryClient";
import Encounter from "../components/encounter/Encounter";
import Encounters from "../components/encounter/Encounters";
import { ThemeProvider } from "@material-ui/core";
import Notify from "../components/notification/Notify";
import { useRecoilTransactionObserver_UNSTABLE } from "recoil";

async function addHelper(data) {
  //console.log("addData: ", data);
  const res = await request("/graphql", ADD_ENCOUNTER, data);
  //console.log("addData-res:", res);
  return res.addEncounter;
}

const indexToTabName = {
  Datos: 0,
  Contacto: 1,
  Misc: 2,
};

function Test() {
  return <div>test</div>;
}
export default function EncounterView() {
  //const queryClient = useQueryClient();
  const theme = useTheme();
  const data = queryClient.getQueryData("applicationFields");

  //const [selectedTab, setSelectedTab] = useState(indexToTabName["Datos"]);
  const [selectedTab, setSelectedTab] = useState(indexToTabName.Datos);
  const [checked, setChecked] = React.useState(false);
  const routeMatch = useLocation(["/consulta", "/consulta/buscar"]);
  const currentTab = routeMatch?.pathname;

  const addEncounter = useMutation(addHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      Notify({ message: "Consulta creada", status: "success" });
      //setCurrentPatient(data);
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Consulta NO creada",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      //console.log("onSettled");
    },
  });

  React.useEffect(() => {
    console.log(currentTab);
    switch (routeMatch.pathname) {
      case "/consultas":
        setSelectedTab(0);
        break;
      case "/consultas/consulta":
        setSelectedTab(1);
        break;
    }
    return () => {
      //cleanup
    };
  }, [selectedTab]);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  //const handleChangeTab = (event, newValue) => {
  const handleChangeTab = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid
      container
      direction="row"
      sx={{ border: "1px solid green" }}
      justifyContent="space-between"
    >
      <Grid item xs>
        <Grid container direction="row" justifyContent="flex-end">
          <Switch
            size="small"
            checked={checked}
            onChange={handleChange}
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Grid>
        <AppBar position="static" color="default">
          <Tabs value={selectedTab} onChange={handleChangeTab}>
            <Tab label="buscar" to={"/consultas"} component={Link} />
            <Tab label="consulta" to={"/consultas/consulta"} component={Link} />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && <Test />}
        {selectedTab === 1 && (
          <Encounter applicationFields={data} addEncounter={addEncounter} />
        )}
      </Grid>

      <Collapse
        in={checked}
        orientation="horizontal"
        //collapsedSize={30}
      >
        <Box paddingTop={3} paddingLeft={1}>
          <AppBar position="static" color="default">
            <Tabs value={selectedTab} onChange={handleChangeTab}>
              <Tab label="Buscar" />
              <Tab label="Consulta" />
              <Tab label="Consulta2" />
            </Tabs>
          </AppBar>
        </Box>
      </Collapse>
    </Grid>
  );
}
//{selectedTab === 0 && <Encounters applicationFields={data} />}
/*
   <Grid
        item
        //container //!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!doesnt work
        //padding={theme.spacing(0, 0, 0, 1)}
        //paddingLeft={theme.spacing(1)} // !!!!!!working
        //margingLeft={theme.spacing(1)}
        sx={{ border: "1px solid green" }}
      >
        <Collapse in={checked} orientation="horizontal" collapsedSize={50}>
          {MyBox}
        </Collapse>
      </Grid>
*/

/*
 <Collapse in={checked} orientation="horizontal" collapsedSize={50}>
          {MyBox}
        </Collapse>
*/
/*
 <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
        {MyBox}
      </Slide>
*/

/*
 <Collapse in={checked} orientation="horizontal" collapsedSize={50}>
        {MyBox}
      </Collapse>
*/
//
/*
 <Grid item xs={12} md={8} lg={9}>
          <Encounter applicationFields={data} />
        </Grid>
*/
/*
 <Suspense fallback={<div>Suspense: Loading...</div>}>
              <Encounter applicationFields={data} />
            </Suspense>
*/
/*
<div className={classes.root}>
     <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            
            <Grid item xs={12} md={8} lg={9}>
              <Paper >
                <Encounter />
              </Paper>
            </Grid>
          
            
            <Grid item xs={12} md={4} lg={3}>
      
            </Grid>

          
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                
              </Paper>
            </Grid>
          </Grid>
          
          
      </Container>
   </div>
*/
