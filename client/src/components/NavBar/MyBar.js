import React from "react";

import { styled } from "@mui/material/styles";
//import clsx from "clsx";

import MuiAppBar from "@mui/material/AppBar";
//import CssBaseline from "@material-ui/core/CssBaseline";

import IconButton from "@mui/material/IconButton"; //Container

// import AccountCircleIcon from '@material-ui/icons/AccountCircle'
//import MenuIcon from "@material-ui/icons/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PatientIcon from "@mui/icons-material/PermContactCalendar";

import Toolbar from "@mui/material/Toolbar";
// import Typography from '@material-ui/core/Typography'

import { SIGNOUT } from "../../graphqlClient/gqlQueries_sessions";
//import { useMutation } from "@apollo/client";
import { useMutation } from "react-query";
import request from "graphql-request";
import { useNavigate } from "react-router-dom";
//import { GlobalContext } from "../../context/GlobalState";
import PatientSummary from "../patient/PatientSummary";
import Notify from "../notification/Notify";
import { isAuthState, currentUserState } from "../../context/RecoilStore";
import { useSetRecoilState } from "recoil";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "openLeft" && prop !== "openRight",
})(({ theme, openLeft, openRight }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(openLeft && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  // ...(openRight && {
  //   width: `calc(100%)`,
  //   marginRight: 0,
  //   transition: theme.transitions.create(["margin", "width"], {
  //     easing: theme.transitions.easing.easeOut,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  // }),
}));

async function signoutHelper() {
  //console.log("addData: ", data);
  const res = await request("/graphql", SIGNOUT);
  //console.log("signout-res:", res.signOut);
  return res.signOut;
}

function ResponsiveAppBar(props) {
  // const { window } = props;
  //const classes = useStyles();
  // const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  const setIsAuth = useSetRecoilState(isAuthState);
  const setCurrentUser = useSetRecoilState(currentUserState);
  const navigate = useNavigate();

  // const handleDrawerToggle = () => {
  //   console.log("appbar");
  //   setMobileOpen(!mobileOpen);
  // };

  const signOut = useMutation(signoutHelper, {
    onSuccess: (data, variables) => {
      // I will fire first
      //console.log("onSuccess:", data);
      //Notify({ message: "Datos de Paciente actualizados", status: "success" });
      //setAction(SEARCH);
      //reloadCurrentPatient(data);
      Notify({
        message: "Terminó la sesión",
        status: "success",
      });
      //updateCurrentUser(null);
      setCurrentUser(null);
      setIsAuth(false);
      navigate("/landing");
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      // I will fire first
      console.log("onError");
      Notify({
        message: "Error: Terminó la sessión",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });
  const handelAccountCircleIcon = () => {
    console.log("sigOut");
    //singOut({});
    signOut.mutate({});
  };
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  return (
    <AppBar
      position="fixed"
      openLeft={props.drawerLeftOpen}
      openRight={props.drawerRightOpen}
      //position='sticky'
      //zIndex='theme.zIndex.drawer + 1'

      // className={classes.appBar}
      // className={clsx(classes.appBar, {
      //   [classes.appBarShift]: props.drawerOpen,
      // })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.onClickHandleDrawerLeftOpen}
          //sx={{ mr: 2, ...(props.drawerOpen && { display: "none" }) }} //!!!!!!!!!!!!this was set

          //className={classes.menuButton}
          // className={clsx(
          //   classes.menuButton,
          //   props.drawerOpen && classes.hide
          // )}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          onClick={props.onClickHandleDrawerLeftClose}
          color="inherit"
        >
          <ChevronLeftIcon />
        </IconButton>

        <IconButton color="inherit" onClick={handelAccountCircleIcon}>
          <PatientIcon />
        </IconButton>
        <PatientSummary />
        <IconButton
          onClick={props.onClickHandleDrawerRightOpen}
          color="inherit"
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={props.onClickHandleDrawerRightClose}
          color="inherit"
        >
          <ChevronRightIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;

/* <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography> */

/*
 <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={props.drawerOpen}
        //position='sticky'
        //zIndex='theme.zIndex.drawer + 1'

        // className={classes.appBar}
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: props.drawerOpen,
        // })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.onClickHandleDrawerOpen}
            sx={{ mr: 2, ...(props.drawerOpen && { display: "none" }) }}
            //className={classes.menuButton}
            // className={clsx(
            //   classes.menuButton,
            //   props.drawerOpen && classes.hide
            // )}
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={props.onClickHandleDrawerClose} color="inherit">
            <ChevronLeftIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handelAccountCircleIcon}>
            <PatientIcon />
          </IconButton>
       
          <PatientSummary />
        </Toolbar>
      </AppBar>
    </div>
*/

/*
 <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        //position='sticky'
        //zIndex='theme.zIndex.drawer + 1'

        //className={classes.appBar}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.drawerOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.onClickHandleDrawerOpen}
            //className={classes.menuButton}
            className={clsx(
              classes.menuButton,
              props.drawerOpen && classes.hide
            )}
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={props.onClickHandleDrawerClose} color="inherit">
            <ChevronLeftIcon />
          </IconButton>

          <IconButton color="inherit" onClick={handelAccountCircleIcon}>
            <PatientIcon />
          </IconButton>

          <PatientSummary />
        </Toolbar>
      </AppBar>
    </div>
*/
// export default withRouter(ResponsiveDrawer);
// onLeftIconButtonTouchTap={props.drawerToggleClickHandler }
