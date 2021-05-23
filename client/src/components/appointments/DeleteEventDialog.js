import React, { useContext, useState, useEffect } from "react";
//import { Grid } from "@material-ui/core";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import {
  useReusableForm,
  ReusableForm,
} from "../reusableForms/useReusableForm";
//import { useRecoilState } from "recoil";
//import { appoEvtState } from "../../context/recoilStore";
//import * as appointmentService from "../../services/configService";
import { GlobalContext } from "../../context/GlobalState";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
//import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
//import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
//import AsyncSelectForFullCalendar from "../patient/patientSearch/AsyncSelectForFullCalendar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    //alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      minWidth: 32,
      paddingLeft: 8,
      paddingRight: 8,
      "& .MuiButton-startIcon": {
        margin: 0,
      },
    },
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default function DeleteEventDialog(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const classes = useStyles();
  //const [open, setOpen] = useState(false);
  //const { applicationFields } = useContext(GlobalContext);
  const { evtId, handleRemovingEvt, closeDialog, show } = props;

  // useEffect(() => {
  //   //console.log("EventDialog-evt: ", evt);
  //   setValues(evt);
  //   return () => {};
  // }, [evt, setValues]);

  const handleDialogClose = () => {
    //resetForm();
    closeDialog();
    //setOpenConfirmation(false);
  };

  // const handleDialogDelete = (e) => {
  //   //resetForm();
  //   //closeDialog();
  //   setOpen(true);
  // };

  const handleConfirmationCancel = (e) => {
    e.preventDefault();
    //resetForm();
    //setOpen(false);
    closeDialog();
  };
  const handleConfirmationOk = (e) => {
    e.preventDefault();
    handleRemovingEvt(evtId);
    //resetForm();
    //setOpen(false);
    closeDialog();
  };

  return (
    <div className={classes.paper}>
      <Dialog
        open={show}
        onClose={handleDialogClose}
        disableBackdropClick
        disableEscapeKeyDown
        //maxWidth="xs"
        //onEntering={handleEntering}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>¿Seguro que desea ELIMINAR esta CITA?</DialogContent>
        <DialogActions>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button
              onClick={handleConfirmationOk}
              color="secondary"
              //variant="outlined"
              startIcon={<DeleteIcon />}
            >
              <span className={classes.buttonText}>Eliminar</span>
            </Button>
            <Button
              autoFocus
              onClick={handleConfirmationCancel}
              color="primary"
              //variant="contained"
              startIcon={<CloseIcon />}
            >
              <span className={classes.buttonText}>Cancelar</span>
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
