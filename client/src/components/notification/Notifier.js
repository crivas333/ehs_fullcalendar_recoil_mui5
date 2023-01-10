import React from "react";
//import Button from '@material-ui/core/Button';
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
//import MuiAlert from '@material-ui/lab/Alert';

//import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  content_success: {
    //backgroundColor: theme.palette.success.light
    backgroundColor: theme.palette.success.main,
  },
  content_error: {
    backgroundColor: theme.palette.error.main,
  },
}));
// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

let openSnackbarFn;

// function openSnackbarExported({ message }) {
//   openSnackbarFn({ message });
// }
// function openSnackbarExported({notificationObj} ) {
//   console.log('openSnackbarExported: ',{notificationObj})
//   openSnackbarFn({notificationObj} );
// }
function openSnackbarExported({ message, status }) {
  console.log("openSnackbarExported: ", { message, status });
  openSnackbarFn({ message, status });
}

function Notifier(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  React.useEffect(() => {
    openSnackbarFn = openSnackbar;
    return () => {
      //cleanup
    };
  }, []);

  const openSnackbar = ({ message, status }) => {
    setOpen(true);
    setMessage(message);
    setStatus(status);
  };

  const handleSnackbarRequestClose = () => {
    setOpen(false);
    setMessage("");
    setStatus("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={4000}
        //onClose={handleClose}
        //message={message}
        onClose={handleSnackbarRequestClose}
      >
        <SnackbarContent
          //className={classes.content_success}
          className={
            status === "success"
              ? classes.content_success
              : classes.content_error
          }
          message={message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </div>
  );
}
export { Notifier, openSnackbarExported };

/*
 <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
*/

/*
  <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={5000}
        //onClose={handleClose}
        message={message}
        onClose={handleSnackbarRequestClose}
        ContentProps={{
          'aria-describedby': 'snackbar-message-id',
        }}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

*/
