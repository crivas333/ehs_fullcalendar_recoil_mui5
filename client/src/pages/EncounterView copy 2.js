import React, { useState } from "react";
//import { useQuery, useQueryClient } from "react-query";
//import request from "graphql-request";
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
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";

//import { GET_APPLICATIONSFIELDS } from "../graphqlClient/gqlQueries";
import { queryClient } from "../graphqlClient/reactQueryClient";
import Encounter from "../components/encounter/Encounter";
import Encounters from "../components/encounter/Encounters";
import { ThemeProvider } from "@material-ui/core";
//import CustomTab from "../components/reusableForms/reusableTab";
//const Encounter = React.lazy(() => import("../components/encounter/Encounter"));

export default function EncounterView() {
  //const queryClient = useQueryClient();
  const theme = useTheme();
  const data = queryClient.getQueryData("applicationFields");
  const indexToTabName = {
    Datos: 0,
    Contacto: 1,
    Misc: 2,
  };
  const [selectedTab, setSelectedTab] = useState(indexToTabName["Datos"]);
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const MyBox = (
    <>
      <Switch
        checked={checked}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          //style={{ maxHeight: "24px" }}
        >
          <Tab label="Buscar" />
          <Tab label="Consulta" />
        </Tabs>
      </AppBar>
    </>
  );
  return (
    <Grid
      container
      direction="row"
      //padding={theme.spacing(0, 1)}
      //padding={theme.spacing(1, 0)}
      //padding={theme.spacing(0, 0)}
      //padding={theme.spacing(0)}
      //spacing={1}
      sx={{ border: "1px solid green" }}
    >
      <Grid item xs>
        <AppBar position="static" color="default">
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            //style={{ maxHeight: "24px" }}
          >
            <Tab label="Buscar" />
            <Tab label="Consulta" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && <Encounter applicationFields={data} />}
        {/* {selectedTab === 1 && <Encounters applicationFields={data} />} */}
      </Grid>

      <Collapse in={checked} orientation="horizontal" collapsedSize={50}>
        {MyBox}
      </Collapse>
    </Grid>
  );
}

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
