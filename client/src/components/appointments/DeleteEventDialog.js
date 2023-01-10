import React from "react";
//import { Grid } from "@material-ui/core";
//import ReusableControls from "../reusableForms/reusableControls/ReusableControls";

//import { useRecoilState } from "recoil";
//import { appoEvtState } from "../../context/recoilStore";
//import * as appointmentService from "../../services/configService";
//import { GlobalContext } from "../../context/GlobalState";
//import { makeStyles } from "@material-ui/styles";
//import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
//import FormControl from "@material-ui/core/FormControl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
//import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
//import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import { Span } from "../reusableForms/reusableComponents";
//import AsyncSelectForFullCalendar from "../patient/patientSearch/AsyncSelectForFullCalendar";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(1),
//     display: "flex",
//     flexDirection: "column",
//     //alignItems: 'center'
//   },
//   button: {
//     margin: theme.spacing(1),
//     [theme.breakpoints.down("sm")]: {
//       minWidth: 32,
//       paddingLeft: 8,
//       paddingRight: 8,
//       "& .MuiButton-startIcon": {
//         margin: 0,
//       },
//     },
//   },
//   buttonText: {
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//   },
//   closeButton: {
//     position: "absolute",
//     right: theme.spacing(1),
//     top: theme.spacing(1),
//     color: theme.palette.grey[500],
//   },
// }));

export default function DeleteEventDialog(props) {
  //const theme = useTheme();
  //const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  //const classes = useStyles();
  //const [open, setOpen] = useState(false);
  //const { applicationFields } = useContext(GlobalContext);
  const { evt, handleRemovingEvt, closeDialog, show } = props;

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
    handleRemovingEvt(evt);
    //resetForm();
    //setOpen(false);
    closeDialog();
  };

  return (
    <Dialog
      open={show}
      //onClose={handleDialogClose}
      //disableBackdropClick
      disableEscapeKeyDown
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleDialogClose(event, reason);
        }
      }}
    >
      <DialogTitle>Confirmación</DialogTitle>
      <DialogContent>¿Seguro que desea ELIMINAR esta CITA?</DialogContent>
      <DialogActions>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          //alignItems="center"
        >
          <Button
            onClick={handleConfirmationOk}
            color="secondary"
            //variant="outlined"
            startIcon={<DeleteIcon />}
          >
            <Span show={matches}>Eliminar</Span>
          </Button>
          <Button
            //autoFocus
            onClick={handleConfirmationCancel}
            color="primary"
            //variant="contained"
            startIcon={<CloseIcon />}
          >
            <Span show={matches}>Cancelar</Span>
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
