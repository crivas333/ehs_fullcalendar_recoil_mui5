import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MyBar from "../components/NavBar/MyBar";
import MyDrawer from "../components/NavBar/MyDrawer";
import MyDrawerRight from "../components/NavBar/MyDrawerRight";

//import Container from "@material-ui/core/Container";
import Box from "@mui/material/Box";
//import { Container } from "@material-ui/core";
//import Notifier from '../components/notification/Notifier'; //!!!!!!!this works
// import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
// import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
// import esLocale from "date-fns/locale/es";

const drawerWidth = 240;

//const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "openLeft" && prop !== "openRight",
})(({ theme, openLeft, openRight }) => ({
  flexGrow: 1,
  //padding: theme.spacing(3),
  padding: theme.spacing(1),
  //overflow: "auto", //for testing

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(openLeft && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  marginRight: -drawerWidth,
  ...(openRight && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));
const DrawerHeader = styled("div")(({ theme }) => ({
  //display: "flex",
  //alignItems: "center",
  //padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  //justifyContent: "flex-end",
}));

export default function SiteLayout(props) {
  const [drawerLeftOpen, setDrawerLeftOpen] = useState(false);
  const [drawerRightOpen, setDrawerRightOpen] = useState(false);
  //const classes = useStyles();

  // const handleDrawerToggle = () => {
  //   //console.log('click1')
  //   setSideDrawerOpen(!sideDrawerOpen)
  // }
  const handleDrawerLeftOpen = () => {
    // setMobileOpen(false);
    setDrawerLeftOpen(true);
    //console.log('handleDrawerOpen: ',sideDrawerOpen)
  };
  const handleDrawerRightOpen = () => {
    // setMobileOpen(false);
    setDrawerRightOpen(true);
    //console.log('handleDrawerOpen: ',sideDrawerOpen)
  };
  const handleDrawerLeftClose = () => {
    // setMobileOpen(false);
    //console.log('click2')
    setDrawerLeftOpen(false);
  };
  const handleDrawerRightClose = () => {
    // setMobileOpen(false);
    //console.log('click2')
    setDrawerRightOpen(false);
  };
  // className={`${classes.content} ${classes.toolbar}`}
  //<Box overflow="auto" sx={{ display: "flex", height: "100%" }}></Box>
  return (
    <Box
      overflow="auto" //allows dialogs to open in fullscreen mode (only within the display)
      sx={{ display: "flex", height: "100%" }}
    >
      <CssBaseline />
      <MyBar
        drawerLeftOpen={drawerLeftOpen}
        drawerRightOpen={drawerRightOpen}
        onClickHandleDrawerLeftOpen={handleDrawerLeftOpen}
        onClickHandleDrawerLeftClose={handleDrawerLeftClose}
        onClickHandleDrawerRightOpen={handleDrawerRightOpen}
        onClickHandleDrawerRightClose={handleDrawerRightClose}
      />
      <MyDrawer
        drawerOpen={drawerLeftOpen}
        onClickHandleDrawerClose={handleDrawerLeftClose}
      />

      <Main
        openLeft={drawerLeftOpen}
        openRight={drawerRightOpen}
        //component="main"
        // sx={{
        //   flexGrow: 1,
        //   //overflow: "auto",
        //   //display: "flex",
        //   //flex: "1 1 auto",
        // }}
      >
        <DrawerHeader />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            //overflow: "auto",
          }}
        >
          {props.children}
        </Box>
      </Main>
      <MyDrawerRight
        drawerOpen={drawerRightOpen}
        //onClickHandleDrawerToggle={handleDrawerClose}
        onClickHandleDrawerClose={handleDrawerRightClose}
      />
      {/*<Notifier />*/}
    </Box>
  );
}
//<Main open={open}></Main>
/*
  <Main open={sideDrawerOpen} component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Main>
*/

// <div className={classes.wrapper}>{props.children}</div>
/*
  <Main
        open={sideDrawerOpen}
        //className={clsx(classes.content, {
        //  [classes.contentShift]: sideDrawerOpen,
        //})}
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
      
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            {props.children}
          </LocalizationProvider>
        
      </Main>
*/

/*
 <div className={classes.toolbar} />
        <div className={classes.wrapper}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
            {props.children}
          </LocalizationProvider>
        </div>
*/
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
