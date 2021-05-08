import React, { useContext } from "react";
// import PropTypes from "prop-types";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
// import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PatientIcon from "@material-ui/icons/PermContactCalendar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles";

import { SIGNOUT } from "../../graphqlClient/gqlQueries";
//import { useMutation } from "@apollo/client";
import { useMutation } from "react-query";
import request from "graphql-request";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import PatientSummary from "../patient/PatientSummary";
import Notify from "../notification/Notify";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: 1000, // Syncfusion Quick Popup z-Index: 1001
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
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
}));

async function signoutHelper() {
  //console.log("addData: ", data);
  const res = await request("/graphql", SIGNOUT);
  //console.log("signout-res:", res.signOut);
  return res.signOut;
}

function ResponsiveAppBar(props) {
  // const { window } = props;
  const classes = useStyles();
  // const theme = useTheme();
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  const { updateCurrentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  // const handleDrawerToggle = () => {
  //   console.log("appbar");
  //   setMobileOpen(!mobileOpen);
  // };

  // const [singOut] = useMutation(SIGNOUT, {
  //   onCompleted({ resultSignOut }) {
  //     console.log("on complete: ", resultSignOut);
  //     updateCurrentUser(null);
  //     navigate("/landing");
  //   },
  //   onError(...error) {
  //     console.log("SignOut - onError: ", { error });
  //   },
  // });

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
      updateCurrentUser(null);
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
  );
}

export default ResponsiveAppBar;
// export default withRouter(ResponsiveDrawer);
// onLeftIconButtonTouchTap={props.drawerToggleClickHandler }
