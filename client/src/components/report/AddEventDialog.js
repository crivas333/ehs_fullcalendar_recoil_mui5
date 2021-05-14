import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import {
  useReusableForm,
  ReusableForm,
} from "../reusableForms/useReusableForm";
import * as appointmentService from "../../services/configService";
import { GlobalContext } from "../../context/GlobalState";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const initialFValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
};

export default function AddEventDialog(props) {
  const { applicationFields } = useContext(GlobalContext);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    values,
    //setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useReusableForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //employeeService.insertEmployee(values)
      resetForm();
    }
  };
  const handleClose = () => {
    props.closeDialog();
  };

  const handleAdd = (event) => {
    //addEventHandler(event);
    //setEvent(event);
    //setAppoEvt(event);
    props.closeDialog();
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
          <ReusableForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <ReusableControls.CustomSelect
                  name="appointmentType"
                  label="Tipo de Cita"
                  value={values.appointmentType}
                  onChange={handleInputChange}
                  options={appointmentService.getFieldsDataCollection(
                    applicationFields,
                    "appointmentView",
                    "appointmentType"
                  )}
                  error={errors.appontmentType}
                />
                <ReusableControls.CustomSelect
                  name="appointmentStatus"
                  label="Estado de la Cita"
                  value={values.appointmentStatus}
                  onChange={handleInputChange}
                  options={appointmentService.getFieldsDataCollection(
                    applicationFields,
                    "appointmentView",
                    "appointmentStatus"
                  )}
                />
                <ReusableControls.CustomDateTimePicker
                  name="eventStartTime"
                  label="Fecha de Inicio de Cita"
                  value={values.start}
                  onChange={handleInputChange}
                />
                <ReusableControls.CustomDateTimePicker
                  name="eventEndTime"
                  label="Fecha de Fin de Cita"
                  value={values.end}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
          </ReusableForm>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            //onClick={resetForm}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
