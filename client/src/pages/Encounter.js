
import React, {useContext,useEffect} from 'react'
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
//import Box from '@material-ui/core/Box';
// import { Scrollbars } from 'react-custom-scrollbars'
//import { useLocation } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
import Encounter from '../components/encounter/Encounter'
//import AsyncPaginationExample from '../components/patientData/asyncPagination'
// import "./styles.css";
//import { currSessionVar } from '../apolloConfig/apolloClient'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper1: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

//export default function Appointment () {
export default function Calendar () { 
  const classes = useStyles()
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { loadedConfigData } = useContext(GlobalContext)

  useEffect(() => {
   console.log('loadedConfigData: ', loadedConfigData)
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Or [] if effect doesn't need props or state

  return (
    <div className={classes.root}>
     <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart className={fixedHeightPaper}*/}
            <Grid item xs={12} md={8} lg={9}>
              <Paper >
              
                {loadedConfigData&&<Encounter />}
            
              </Paper>
            </Grid>
          
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
      
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
          
          
      </Container>
   </div>
  )
}

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