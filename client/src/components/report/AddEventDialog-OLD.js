import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { appoEvtState } from "../../context/recoilStore";
//import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//import IconButton from "@material-ui/core/IconButton";
//import PropTypes from "prop-types";
//import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
//import Tooltip from "@material-ui/core/Tooltip";

const initialEvent = {
  title: "",
  appointmentStatus: "",
  start: "",
  end: "",
  appointmentId: "",
};

const AddEventDialog = (props) => {
  //const [event, setEvent] = useState(initialEvent);
  const [appoEvt, setAppoEvt] = useRecoilState(appoEvtState);
  const [event, setEvent] = useState(appoEvt);
  const { addEventHandler } = props;
  //const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    //setOpen(props.show);

    setEvent(appoEvt);
    //console.log("addEventDialog - appoEvt: ", event);
    return () => {};
  }, [appoEvt]);

  const handleClose = () => {
    props.closeDialog();
  };

  const handleAdd = (event) => {
    //addEventHandler(event);
    //setEvent(event);
    setAppoEvt(event);
    props.closeDialog();
  };

  const handleChange =
    (name) =>
    ({ target: { value } }) => {
      setEvent({ ...event, [name]: value });
    };

  return (
    <div>
      <Dialog
        open={props.show}
        //open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Añadir Cita</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="appointmentType"
            type="text"
            fullWidth
            value={event.appointmentType}
            onChange={handleChange("appointmentType")}
          />
          <TextField
            margin="dense"
            label="appointmentStatus"
            type="text"
            fullWidth
            value={event.appointmentStatus}
            onChange={handleChange("appointmentStatus")}
          />
          <TextField
            margin="dense"
            label="start"
            type="text"
            fullWidth
            value={event.start}
            onChange={handleChange("start")}
          />
          <TextField
            margin="dense"
            label="End"
            type="text"
            fullWidth
            value={event.end}
            onChange={handleChange("end")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// AddEventDialog.propTypes = {
//   addEventHandler: PropTypes.func.isRequired,
// };

export default AddEventDialog;

/*
<DialogContentText>
            Demo add item to react table. {appoEvt.start}
          </DialogContentText>
*/
