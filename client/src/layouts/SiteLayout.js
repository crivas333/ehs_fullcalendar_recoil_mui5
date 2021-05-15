// import Head from "next/head";
import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MyBar from "../components/NavBar/MyBar";
import MyDrawer from "../components/NavBar/MyDrawer";
//import { Container } from '@material-ui/core'
import Container from "@material-ui/core/Container";
// import Toolbar from '@material-ui/core/Toolbar'
// import Backdrop from "../components/NavBar/Backdrop";
//import Notifier from '../components/notification/Notifier'; //!!!!!!!this works
//import {Notifier} from '../components/notification/Notifier';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    //the following was added for testing purposses
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    //marginTop: '70px',
    flexGrow: 1,
    padding: theme.spacing(0.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    //overflow: 'hidden',
    //paddingTop: 64
    overflow: "auto",
  },
}));

export default function SiteLayout(props) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const classes = useStyles();

  // const handleDrawerToggle = () => {
  //   //console.log('click1')
  //   setSideDrawerOpen(!sideDrawerOpen)
  // }
  const handleDrawerOpen = () => {
    // setMobileOpen(false);
    setSideDrawerOpen(true);
    //console.log('handleDrawerOpen: ',sideDrawerOpen)
  };
  const handleDrawerClose = () => {
    // setMobileOpen(false);
    //console.log('click2')
    setSideDrawerOpen(false);
  };
  // className={`${classes.content} ${classes.toolbar}`}
  return (
    <div className={classes.root}>
      <MyBar
        drawerOpen={sideDrawerOpen}
        onClickHandleDrawerOpen={handleDrawerOpen}
        onClickHandleDrawerClose={handleDrawerClose}
      />
      <MyDrawer
        drawerOpen={sideDrawerOpen}
        //onClickHandleDrawerToggle={handleDrawerClose}
        onClickHandleDrawerClose={handleDrawerClose}
      />

      <Container
        className={clsx(classes.content, {
          [classes.contentShift]: sideDrawerOpen,
        })}
      >
        <div className={classes.toolbar} />
        <div className={classes.wrapper}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            {props.children}
          </MuiPickersUtilsProvider>
        </div>
      </Container>

      {/*<Notifier />*/}
    </div>
  );
}

/*
   <main
        className={clsx(classes.content, {
          [classes.contentShift]: sideDrawerOpen,
        })}
      >
        <div className={classes.toolbar} />
        {props.children}
      </main>

*/
/*
 <Container
  className={clsx(classes.content, {
    [classes.contentShift]: sideDrawerOpen,
  })}
>
  {props.children}
</Container>

*/

//  <div className={classes.root}>
//       <MyBar click={drawerToggleClickHandler}/>
//       <MyDrawer show={sideDrawerOpen} click={drawerhandleClose}/>
//       <div className="container">{props.children}</div>
//     </div>

// <div className={classes.root}>
// <MyBar click={drawerToggleClickHandler} />
// <MyDrawer
//   show={sideDrawerOpen}
//   click={drawerhandleClose}
// />
// <main className={classes.content}>
//   {props.children}
// </main>
// </div>
