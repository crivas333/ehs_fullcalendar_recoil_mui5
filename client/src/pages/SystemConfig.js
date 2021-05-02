
import React from 'react'
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
//import Container from '@material-ui/core/Container';
//import Paper from '@material-ui/core/Paper'
//import Box from '@material-ui/core/Box';
//import { GlobalContext } from '../context/GlobalState'
import EncounterControl from '../components/systemConfig/EncounterControl'
import ExamControl from '../components/systemConfig/ExamControl'



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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },

}))

export default function SystemConfig () { 
  const classes = useStyles()
  //const { customData } = useContext(GlobalContext)
 



  return (
    <div className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <EncounterControl />
        </Grid>
        <Grid item xs={12} >
          <ExamControl />
        </Grid>
      </Grid>
          
   </div>
  )
}
//<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />