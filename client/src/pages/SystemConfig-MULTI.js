
import React, { useContext} from 'react'
//import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'
//import Box from '@material-ui/core/Box';
// import { Scrollbars } from 'react-custom-scrollbars'

import { GlobalContext } from '../context/GlobalState'
import CustomControl from '../components/systemConfig/CustomControl'


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

//export default function Appointment () {
export default function SystemConfig () { 
  const classes = useStyles()
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { customData } = useContext(GlobalContext)


  return (
    <div className={classes.root}>
      <Container>
          <Grid container spacing={2}>
            {/* Chart className={fixedHeightPaper}*/}
            <Grid item xs={12} sm={6}>
              <Paper >
                <CustomControl 
                  title='Tipo de Visita'
                  dataSource={ customData.filter(item => item.fieldType ==='encounterType')
                 }
                />
              </Paper>
            </Grid>
          
            {/* Recent Deposits */}
            <Grid item xs={12} sm={6}>
              <Paper >
                  <CustomControl 
                    title='Tipo de Paciente'
                    dataSource={ customData.filter(item => item.fieldType ==='patientType')
                  }
                  />
                </Paper>
      
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12} sm={6}>
              <Paper >
                <CustomControl 
                  title='Tipo de Atención'
                  dataSource={ customData.filter(item => item.fieldType ==='serviceType')
                }
                />
              </Paper>
            </Grid>
              {/* Recent Orders */}
            <Grid item xs={12} sm={6}>
              <Paper >
                <CustomControl 
                  title='Paquete de Servicios'
                  dataSource={ customData.filter(item => item.fieldType ==='serviceBundle')
                }
                />
              </Paper>
            </Grid>
          </Grid>
          
      </Container> 
   </div>
  )
}
//<UserTable users={users} editRow={editRow} deleteUser={deleteUser} />