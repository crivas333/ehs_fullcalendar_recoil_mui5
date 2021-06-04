import React, { useEffect, Suspense } from "react";
import { useQuery, useQueryClient } from "react-query";
import request from "graphql-request";
//import clsx from 'clsx';
//import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
//import Box from '@material-ui/core/Box';
// import { Scrollbars } from 'react-custom-scrollbars'
//import { useLocation } from 'react-router-dom'
//import { GlobalContext } from "../context/GlobalState";
import { GET_APPLICATIONSFIELDS } from "../graphqlClient/gqlQueries";
import { queryClient } from "../graphqlClient/reactQueryClient";
//import Encounter from "../components/encounter/Encounter";
const Encounter = React.lazy(() => import("../components/encounter/Encounter"));
//var data = undefined;
export default function EncounterView() {
  //const classes = useStyles();
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  //const { loadedConfigData } = useContext(GlobalContext);
  //const queryClient = useQueryClient();
  const data = queryClient.getQueryData("applicationFields");

  // useEffect(() => {
  //   //data = queryClient.getQueryData("applicationFields");
  //   //const queryCache = queryClient.getQueryCache();

  //   console.log("loadedConfigData: ", data);
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []); // Or [] if effect doesn't need props or state
  // if (data === undefined) {
  //   return <span>Encounter------Loading...</span>;
  // }

  // const { isLoading, isError, data, error } = useQuery(
  //   ["applicationFields"],
  //   async () => {
  //     const res = await request("/graphql", GET_APPLICATIONSFIELDS);
  //     console.log(res.getApplicationFields);
  //     if (res && res.getApplicationFields) {
  //       return res.getApplicationFields;
  //     } else {
  //       throw new Error("Network response was not ok");
  //     }
  //   },
  //   { refetchOnWindowFocus: false }
  // );
  // if (isLoading) {
  //   //return <span>1111111111111111111111Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  return (
    <div>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Chart className={fixedHeightPaper}*/}
          <Grid item xs={12} md={8} lg={9}>
            <Suspense fallback={<div>Suspense: Loading...</div>}>
              <Encounter applicationFields={data} />
            </Suspense>
          </Grid>

          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}></Grid>

          {/* Recent Orders */}
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
    </div>
  );
}

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
