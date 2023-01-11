import React from "react";
//import useMediaQuery from "@material-ui/core/useMediaQuery";

import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
//import Hidden from "@material-ui/core/Hidden";

// import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { NavLink, useLocation } from "react-router-dom";

import Profile from "./Profile";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  //const classes = useStyles();
  //const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  // const {mobileOpen,updateMobileOpen} = useContext(GlobalContext);
  const location = useLocation();

  const [openPatient, setOpenPatient] = React.useState(true);
  const [openGyn, setOpenGyn] = React.useState(false);
  const [openConfig, setOpenConfig] = React.useState(false);
  const handleExpandPatient = () => {
    setOpenPatient(!openPatient);
  };
  const handleExpandGyn = () => {
    setOpenGyn(!openGyn);
  };
  const handleExpandConfig = () => {
    setOpenConfig(!openConfig);
  };

  // <Profile> instead of <div className={classes.toolbar} />
  const drawer = (
    <div>
      <Profile //className={classes.toolbar}
      />
      <Divider />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        //className={classes.root1}
      >
        <ListItem button onClick={handleExpandPatient}>
          <ListItemText primary="GESTIÓN de PACIENTES" />
          {openPatient ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPatient} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Paciente"
              component={NavLink}
              to="/Paciente"
              selected={location.pathname === "/Paciente"}
            >
              <ListItemText primary="Ingreso de Pacientes" />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Agendamiento"
              component={NavLink}
              to="/Agendamiento"
              selected={location.pathname === "/Agendamiento"}
            >
              <ListItemText primary="Agendamiento" />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Citas"
              component={NavLink}
              to="/Citas"
              selected={location.pathname === "/Citas"}
            >
              <ListItemText primary="Citas del Día" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleExpandGyn}>
          <ListItemText primary="MÓDULO GINECOLOGÍA" />
          {openGyn ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGyn} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Consulta"
              component={NavLink}
              to="/Consulta"
              selected={location.pathname === "/Encounter"}
            >
              <ListItemText primary="Situación Actual" />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Diario Clínico"
              component={NavLink}
              to="/Diario Clínico"
              selected={location.pathname === "/Encounters"}
            >
              <ListItemText primary="Diario Clínico" />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Examenes"
              component={NavLink}
              to="/Examenes"
              selected={location.pathname === "/Examenes"}
            >
              <ListItemText primary="Exámenes" />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Informes"
              component={NavLink}
              to="/Informes"
              selected={location.pathname === "/Reports"}
            >
              <ListItemText primary="Informes" />
            </ListItem>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Documentos"
              component={NavLink}
              to="/Documentos"
              selected={location.pathname === "/Documents"}
            >
              <ListItemText primary="Documentos" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={handleExpandConfig}>
          <ListItemText primary="MÓDULO CONFIGURACIÓN" />
          {openConfig ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openConfig} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={props.clickDrawerClose}
              //className={classes.nested}
              key="Config"
              component={NavLink}
              to="/Config"
              selected={location.pathname === "/Config"}
            >
              <ListItemText primary="Configuración" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  // const Hidden1 = () => {
  //   //const hidden = useMediaQuery((theme) => theme.breakpoints.up("xl"));
  //   const hidden = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  //   return hidden ? null : <Paper />;
  // };

  // open={mobileOpen}
  //<nav className={classes.drawer} aria-label='mailbox folders'>
  //<Hidden smUp implementation='css'>
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/*<nav className={classes.drawer} aria-label="mailbox folders">*/}
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/*<Hidden smUp implementation="js">*/}
        {/*<Hidden1>*/}
        <Drawer
          //for Mobile
          container={container}
          variant="temporary"
          //anchor={theme.direction === "rtl" ? "right" : "left"}
          anchor="left"
          open={props.drawerOpen}
          onClose={props.onClickHandleDrawerToggle}
          //classes={{ paper: classes.drawerPaperMobile }}
          //classes={{paper: classes.drawerPaper}}
          // Below Better open performance on mobile.
          //ModalProps={{keepMounted: true }}
          //ModalProps={{ onBackdropClick: props.onClickHandleDrawerToggle}}
          ModalProps={{
            onBackdropClick: props.onClickHandleDrawerClose,
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/*</Hidden>*/}
        {/*</Hidden1>*/}

        {/*<Hidden xsDown implementation="css">*/}
        {/*<Paper sx={{ display: { xl: "none", xs: "block" } }}>*/}
        <Drawer
          // for Desktop
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={props.drawerOpen}
        >
          {drawer}
        </Drawer>
        {/* </Hidden>*/}
        {/*</Paper>*/}
        {/*</nav>*/}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
// export default withRouter(ResponsiveDrawer);
