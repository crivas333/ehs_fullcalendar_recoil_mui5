
import React, { useContext} from 'react'

// import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
//import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Exam from '../components/exam/Exam'
import { GlobalContext } from '../context/GlobalState'
//import TableExams from '../components/exams/TableExams'
//import AutoCompleteSF from '../components/patient/patientSearch/AutoCompleteSF'
// import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

//export default function Appointment () {
export default function ExamView () { 
  const classes = useStyles()
  //const { currentPatient } = useContext(GlobalContext)
  const { loadedConfigData } = useContext(GlobalContext)

// useEffect(() => {
//   console.log('loadedConfigData: ', loadedConfigData)
//     //eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // Or [] if effect doesn't need props or state


//<ExamControl />
// <Container maxWidth="lg" className={classes.container}>
// <Grid item xs={12} md={8} lg={9}>
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {loadedConfigData&&<Exam />}  
            </Grid>
          
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
      
            </Grid>

           
          </Grid>
          
          
      </Container>
  </div>
  )
}