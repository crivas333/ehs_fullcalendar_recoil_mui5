import React from "react";
//import useMediaQuery from "@material-ui/core/useMediaQuery";

import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
//import { useTheme } from "@material-ui/styles";
// import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

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

  // <Profile> instead of <div className={classes.toolbar} />
  const drawer = (
    <div>
      <Divider />
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        //for Mobile
        container={container}
        variant="temporary"
        //anchor={theme.direction === "rtl" ? "right" : "left"}
        anchor="right"
        open={props.drawerOpen}
        onClose={props.onClickHandleDrawerToggle}
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

      <Drawer
        // for Desktop
        variant="persistent"
        anchor="right"
        open={props.drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveDrawer;
// export default withRouter(ResponsiveDrawer);

/*
 <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          //for Mobile
          container={container}
          variant="temporary"
          //anchor={theme.direction === "rtl" ? "right" : "left"}
          anchor="right"
          open={props.drawerOpen}
          onClose={props.onClickHandleDrawerToggle}
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

        <Drawer
          // for Desktop
          variant="persistent"
          anchor="right"
          open={props.drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>

*/
