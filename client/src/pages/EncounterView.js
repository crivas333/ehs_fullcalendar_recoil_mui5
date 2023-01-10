import React, { useState } from "react";
//import { useQuery, useQueryClient } from "react-query";
//import request from "graphql-request";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
//import IconAdd from "@material-ui/icons/Add";
import AppBar from "@mui/material/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import Close from "@material-ui/icons/Close";
// import Typography from "@material-ui/core/Typography";
// import Add from "@material-ui/icons/Add";
//import Close from "@material-ui/icons/Close";
//import Box from "@material-ui/core/Box";

//import { GET_APPLICATIONSFIELDS } from "../graphqlClient/gqlQueries";
import { queryClient } from "../graphqlClient/reactQueryClient";
import Encounter from "../components/encounter/Encounter";
import Encounters from "../components/encounter/Encounters";
//import CustomTab from "../components/reusableForms/reusableTab";
//const Encounter = React.lazy(() => import("../components/encounter/Encounter"));

export default function EncounterView() {
  //const queryClient = useQueryClient();
  const data = queryClient.getQueryData("applicationFields");
  const indexToTabName = {
    Datos: 0,
    Contacto: 1,
    Misc: 2,
  };
  const [selectedTab, setSelectedTab] = useState(indexToTabName["Datos"]);
  const [showThirdTab, setShowThirdTab] = React.useState(false);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const deleteTab = (e) => {
    e.stopPropagation();
  };
  const ButtonInTabs = ({ className, onClick, children }) => {
    return (
      <Button className={className} onClick={onClick} children={children} />
    );
  };
  // <Box sx={{ width: "100%" }}>
  return (
    <Grid container direction="row">
      <Grid xs={12} sm={8}>
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
        {selectedTab === 1 && <Encounters applicationFields={data} />}
      </Grid>
      <Grid xs={12} sm={4}>
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
        {selectedTab === 1 && <Encounters applicationFields={data} />}
      </Grid>
    </Grid>
  );
}
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
