import React from "react";
//import Button from '@material-ui/core/Button';
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

let openSnackbarFn;

function openSnackbarExported({ message }) {
  openSnackbarFn({ message });
}

function Notifier(props) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    openSnackbarFn = openSnackbar;
    return () => {
      //cleanup
    };
  }, []);

  const openSnackbar = ({ message }) => {
    setOpen(true);
    setMessage(message);
  };

  const handleSnackbarRequestClose = () => {
    setOpen(false);
    setMessage("");
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
        autoHideDuration={5000}
        //onClose={handleClose}
        message={message}
        onClose={handleSnackbarRequestClose}
        ContentProps={{
          "aria-describedby": "snackbar-message-id",
        }}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
export { Notifier, openSnackbarExported };
