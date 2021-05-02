import React from 'react'
// import PropTypes from "prop-types";
// import AppBar from "@material-ui/core/AppBar";
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'

import { makeStyles, useTheme } from '@material-ui/core/styles'
// import ListSubheader from "@material-ui/core/ListSubheader";
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { NavLink, useLocation } from 'react-router-dom'

import Profile from './Profile'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  hide: {
    display: 'none',
  },
  drawerMobile: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaperMobile: {
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

function ResponsiveDrawer (props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const {mobileOpen,updateMobileOpen} = useContext(GlobalContext);
  const location = useLocation()

  const [openPatient, setOpenPatient] = React.useState(true)
  const [openGyn, setOpenGyn] = React.useState(false)
  const [openConfig, setOpenConfig] = React.useState(false)
  const  handleExpandPatient= () => {
    setOpenPatient(!openPatient)
  }
  const  handleExpandGyn= () => {
    setOpenGyn(!openGyn)
  }
  const  handleExpandConfig= () => {
    setOpenConfig(!openConfig)
  }

  // <Profile> instead of <div className={classes.toolbar} />
  const drawer = (
    <div>
      <Profile className={classes.toolbar} />
      <Divider />
      <List
        component='nav'
        aria-labelledby='nested-list-subheader'
        className={classes.root1}
      >
        <ListItem button onClick={handleExpandPatient}>
          <ListItemText primary='GESTIÓN de PACIENTES' />
          {openPatient ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPatient} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Paciente'
              component={NavLink}
              to='/Paciente'
              selected={location.pathname === '/Paciente'}
            >
              <ListItemText primary='Ingreso de Pacientes' />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Agendamiento'
              component={NavLink}
              to='/Agendamiento'
              selected={location.pathname === '/Agendamiento'}
            >
              <ListItemText primary='Agendamiento' />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Citas'
              component={NavLink}
              to='/Citas'
              selected={location.pathname === '/Citas'}
            >
              <ListItemText primary='Citas del Día' />
            </ListItem>
          
          
         
          </List>
        </Collapse>
      
        <ListItem button onClick={handleExpandGyn}>
          <ListItemText primary='MÓDULO GINECOLOGÍA' />
          {openGyn ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGyn} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Consulta'
              component={NavLink}
              to='/Consulta'
              selected={location.pathname === '/Encounter'}
            >
              <ListItemText primary='Situación Actual' />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Diario Clínico'
              component={NavLink}
              to='/Diario Clínico'
              selected={location.pathname === '/Encounters'}
            >
              <ListItemText primary='Diario Clínico' />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Examenes'
              component={NavLink}
              to='/Examenes'
              selected={location.pathname === '/Examenes'}
            >
              <ListItemText primary='Exámenes' />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Informes'
              component={NavLink}
              to='/Informes'
              selected={location.pathname === '/Reports'}
            >
              <ListItemText primary='Informes' />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Documentos'
              component={NavLink}
              to='/Documentos'
              selected={location.pathname === '/Documents'}
            >
              <ListItemText primary='Documentos' />
            </ListItem>
          
          
         
          </List>
        </Collapse>
      
        <ListItem button onClick={handleExpandConfig}>
          <ListItemText primary='MÓDULO CONFIGURACIÓN' />
          {openConfig ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openConfig} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              className={classes.nested}
              key='Config'
              component={NavLink}
              to='/Config'
              selected={location.pathname === '/Config'}
            >
              <ListItemText primary='Configuración' />
            </ListItem>
                     
          
         
          </List>
        </Collapse>
      
      </List>
    </div>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined
  // open={mobileOpen}
  //<nav className={classes.drawer} aria-label='mailbox folders'>
  //<Hidden smUp implementation='css'>
  return (
    <div className={classes.root}>
      <CssBaseline />
    
      <nav className={classes.drawer} aria-label='mailbox folders'> 
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='js'>
          <Drawer
            //for Mobile
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.drawerOpen}
            //onClose={props.onClickHandleDrawerToggle}
            classes={{paper: classes.drawerPaperMobile}}
            //classes={{paper: classes.drawerPaper}}
            // Below Better open performance on mobile.
            //ModalProps={{keepMounted: true }}
            //ModalProps={{ onBackdropClick: props.onClickHandleDrawerToggle}}
            ModalProps={{ onBackdropClick: props.onClickHandleDrawerClose,
            keepMounted: true}}
          >
            {drawer}
          </Drawer>
        </Hidden>
        
        <Hidden xsDown implementation='css'>
          <Drawer
          // for Desktop
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={props.drawerOpen}
            classes={{paper: classes.drawerPaper}}
            //variant='permanent'
            //open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

export default ResponsiveDrawer
// export default withRouter(ResponsiveDrawer);
