import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import {
  useReusableForm,
  ReusableForm,
} from "../reusableForms/useReusableForm";
import { useRecoilState } from "recoil";
import { appoEvtState } from "../../context/recoilStore";
import * as appointmentService from "../../services/configService";
import { GlobalContext } from "../../context/GlobalState";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AsyncSelectForFullCalendar from "../patient/patientSearch/AsyncSelectForFullCalendar";

// const initialFValues = {
//   appointmentType: "CONSULTA",
//   appointmentStatus: "PROGRAMADA",
//   start: "",
//   end: "",
// };

export default function AddEventDialog(props) {
  const { applicationFields } = useContext(GlobalContext);
  const [appoEvt, setAppoEvt] = useRecoilState(appoEvtState);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues) {
      console.log("values.fullName1: ", values.fullName);
      temp.fullName = fieldValues.fullName ? "" : "Seleccione un Paciente";
    }
    // if ("lastName" in fieldValues)
    //   temp.lastName = fieldValues.lastName ? "" : "Ingrese A. Paterno.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      console.log(
        "object:",
        Object.values(temp).every((x) => x === "")
      );
      console.log("errors: ", errors);
      console.log("temp: ", temp);
      console.log("values.fullName2: ", values.fullName);
      return Object.values(temp).every((x) => x === "");
    }
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    //} = useReusableForm(initialFValues, true, validate);
  } = useReusableForm(appoEvt, true, validate);

  React.useEffect(() => {
    //setOpen(props.show);
    setValues(appoEvt);
    //setEvent(appoEvt);
    //console.log("addEventDialog - values1: ", values);
    console.log("addEventDialog - appoEvt: ", appoEvt);
    //console.log("addEventDialog - values2: ", values);

    return () => {};
  }, [appoEvt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("AddEventDialog - handleSubmit");
    if (validate()) {
      //employeeService.insertEmployee(values)
      //resetForm();
      console.log(values);
      props.closeDialog();
    }
  };
  const handleClose = () => {
    props.closeDialog();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    //setEvent(event);
    //setAppoEvt(event);
    console.log("validate: ", validate());
    if (validate()) {
      console.log("inside validation");
      //resetForm();
      //return;
      console.log(values);
      props.closeDialog();
    }
  };

  const onAutoCompleteChange = (val) => {
    //console.log("onAutoCompleteChange: ", val.fullName);
    setValues({
      ...values,
      fullName: val.fullName,
      notRegistered: "",
      patient: val.id,
    });
  };
  return (
    <div>
      <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">
          Añadir Cita: {values.start}
        </DialogTitle>
        <DialogContent>
          <ReusableForm onSubmit={handleSubmit}>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <AsyncSelectForFullCalendar
                  onValChange={onAutoCompleteChange}
                />
                <ReusableControls.CustomInput
                  name="fullName"
                  label="Paciente Registrado"
                  value={values.fullName}
                  error={errors.fullName}
                />
                <ReusableControls.CustomInput
                  name="notRegistered"
                  label="Paciente No Registrado"
                  value={values.notRegistered}
                  onChange={handleInputChange}
                  error={errors.notRegistered}
                />

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
                  error={errors.appointmentType}
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
                <ReusableControls.CustomKeyboardDateTimePicker
                  name="start"
                  label="Fecha de Inicio de Cita"
                  value={values.start}
                  onChange={handleInputChange}
                  error={errors.start}
                />
                <ReusableControls.CustomKeyboardDateTimePicker
                  name="end"
                  label="Fecha de Fin de Cita"
                  value={values.end}
                  onChange={handleInputChange}
                  error={errors.end}
                />
              </Grid>
              <Button
                type="submit"
                //fullWidth
                variant="contained"
                color="primary"
                //className={classes.button}
              >
                ENVIAR
              </Button>
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
