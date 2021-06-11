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

//import { GET_APPLICATIONSFIELDS } from "../graphqlClient/gqlQueries";
import { queryClient } from "../graphqlClient/reactQueryClient";
import Encounter from "../components/encounter/Encounter";
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
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static" color="default">
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          //style={{ maxHeight: "24px" }}
        >
          <Tab label="Datos" />
          <ButtonInTabs onClick={() => setShowThirdTab(true)}>
            <IconAdd color="secondary" />
            New Tab
          </ButtonInTabs>
        </Tabs>
      </AppBar>
      {selectedTab === 0 && <Encounter applicationFields={data} />}
    </Box>
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
