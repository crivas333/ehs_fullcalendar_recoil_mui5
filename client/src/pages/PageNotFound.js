import React from "react";
import { injectIntl } from "react-intl";
import Page from "material-ui-shell/lib/containers/Page/Page";
import Button from "@mui/material/Button";
import Home from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/material/styles";

const styles = (theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
  paper: {
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
});

const PageNotFound = ({ intl, classes }) => {
  return (
    <Page pageTitle={intl.formatMessage({ id: "page_not_found" })}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Typography variant="h4">404</Typography>
          <Typography variant="subtitle1">
            {intl.formatMessage({ id: "page_not_found" })}
          </Typography>
          <Button
            color="secondary"
            aria-label="home"
            href="/"
            className={classes.button}
          >
            <Home />
          </Button>
        </div>
      </Paper>
    </Page>
  );
};

export default injectIntl(
  withStyles(styles, { withTheme: true })(PageNotFound)
);
