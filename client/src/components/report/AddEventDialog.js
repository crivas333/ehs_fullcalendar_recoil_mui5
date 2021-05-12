import React, { useState } from "react";

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

const initialUser = {
  firstName: "",
  lastName: "",
  age: 0,
  visits: 0,
  status: "single",
  progress: 0,
  subRows: undefined,
};

const AddEventDialog = (props) => {
  const [event, setEvent] = useState(initialUser);
  //const { addEventHandler } = props;
  //const [open, setOpen] = React.useState(false);

  // const [switchState, setSwitchState] = React.useState({
  //   addMultiple: false,
  // });

  // React.useEffect(() => {
  //   setOpen(props.show);
  //   console.log({ open });
  //   return () => {
  //   };
  // }, [props.show]);

  // React.useEffect(() => {
  //   //setOpen(props.show);
  //   console.log(open);
  //   console.log({open})
  //   return () => {};
  // }, []);

  // const handleSwitchChange = (name) => (event) => {
  //   setSwitchState({ ...switchState, [name]: event.target.checked });
  // };

  // const resetSwitch = () => {
  //   setSwitchState({ addMultiple: false });
  // };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    //setOpen(false);
    props.closeDialog();
  };

  const handleAdd = (event) => {
    //addEventHandler(event);
    setEvent(initialUser);
    //switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange = (name) => ({ target: { value } }) => {
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
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Demo add item to react table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={event.firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={event.lastName}
            onChange={handleChange("lastName")}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={event.age}
            onChange={handleChange("age")}
          />
          <TextField
            margin="dense"
            label="Visits"
            type="number"
            fullWidth
            value={event.visits}
            onChange={handleChange("visits")}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={event.status}
            onChange={handleChange("status")}
          />
          <TextField
            margin="dense"
            label="Profile Progress"
            type="number"
            fullWidth
            value={event.progress}
            onChange={handleChange("progress")}
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
