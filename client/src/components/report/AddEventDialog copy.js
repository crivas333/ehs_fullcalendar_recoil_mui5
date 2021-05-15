import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import {
  useReusableForm,
  ReusableForm,
} from "../reusableForms/useReusableForm";
//import { useRecoilState } from "recoil";
//import { appoEvtState } from "../../context/recoilStore";
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
let temp;
export default function AddEventDialog(props) {
  const { applicationFields } = useContext(GlobalContext);
  //const [appoEvt, setAppoEvt] = useRecoilState(appoEvtState);
  const { evt, closeDialog, handleEvt } = props;

  const validate = (fieldValues = values) => {
    //let temp = { ...errors };
    temp = { ...errors };
    // if ("fullName" in fieldValues && "notRegistered" in fieldValues) {
    //   // console.log("values.fullName: ", values.fullName);
    //   // console.log("values.notRegistered: ", values.notRegistered);
    //   if (fieldValues.fullName === "") {
    //     temp.notRegistered = fieldValues.notRegistered ? "" : "Campo requerido";
    //   } else {
    //     temp = { ...temp, notRegistered: "" };
    //   }
    //   if (fieldValues.notRegistered === "") {
    //     temp.fullName = fieldValues.fullName ? "" : "Campo requerido";
    //   } else {
    //     console.log("fieldValues.notRegisteres: ", fieldValues.fullName);
    //     temp = { ...temp, fullName: "" };
    //   }
    // }
    // if ("fullName" in fieldValues) {
    //   console.log("fieldValues.fullName: ", fieldValues.fullName);
    //   temp.fullName = fieldValues.fullName ? "" : "Ingrese A. Paterno.";
    // }
    console.log("BEFORE: fieldValues.fullName: ", fieldValues.fullName);
    if ("fullName" in fieldValues) {
      console.log("fieldValues.fullName: ", fieldValues.fullName);
      //temp.notRegistered = fieldValues.notRegistered ? "" : "Campo requerido";
      //if (fieldValues.fullName !== "")
      if (
        fieldValues.fullName !== "" &&
        (fieldValues.notRegistered === undefined ||
          fieldValues.notRegistered === "")
      ) {
        temp.notRegistered = "";
        temp.fullName = "";
        //setErrors({ ...temp, notRegistered: "" });
        //setErrors({ ...errors, notRegistered: "" });
        setValues({
          ...values,
          fullName: fieldValues.fullName,
          notRegistered: "",
        });
      } else {
        temp.fullName = "Seleccione Paciente";
      }
    }
    if ("notRegistered" in fieldValues) {
      console.log("fieldValues.notRegistered: ", fieldValues.notRegistered);
      //temp.notRegistered = fieldValues.notRegistered ? "" : "Campo requerido";
      if (
        fieldValues.notRegistered !== "" &&
        (fieldValues.fullName === undefined || fieldValues.fullName === "")
      ) {
        temp.notRegistered = "";
        temp.fullName = "";
        //setErrors({ ...errors, fullName: "" });
        setValues({
          ...values,
          notRegistered: fieldValues.notRegistered,
          fullName: "",
        });
      } else {
        temp.notRegistered = "Ingrese Paciente No registrado";
      }
    }

    setErrors({
      ...temp,
    });
    console.log("errors:", errors);
    if (fieldValues === values) {
      console.log("temp: ", temp.notRegistered, "", temp.fullName);
      return Object.values(temp).every((x) => x === "");
      //return Object.values(errors).every((x) => x === "");
    }
    //return Object.values(temp).every((x) => x === "");
  };
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    //} = useReusableForm(initialFValues, true, validate);
  } = useReusableForm(evt, true, validate);

  React.useEffect(() => {
    setValues(evt);
    //console.log("useEffect - addEventDialog - evt: ", evt);

    return () => {};
  }, [evt]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("AddEventDialog - handleSubmit");
  //   if (validate()) {
  //     //employeeService.insertEmployee(values)
  //     //resetForm();
  //     console.log(values);
  //     closeDialog();
  //   }
  // };
  const handleClose = () => {
    resetForm();
    closeDialog();
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log("handleAdd - values: ", values);
    if (validate()) {
      //console.log("inside validation");

      //if ("notRegistered" in values)
      handleEvt(values);
      resetForm();
      //setValues({});
      closeDialog();
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
    temp.notRegistered = "";
    temp.fullName = "";
    setErrors({ ...errors, notRegistered: "", fullName: "" });
  };

  const handleIconFullName = () => {
    console.log("handleIconFullName");
    setValues({ ...values, fullName: "", patient: "" });
  };
  const handleIconNotRegistered = () => {
    console.log("handleIconNotRegistered");
    setValues({ ...values, notRegistered: "" });
  };
  return (
    <div>
      <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Añadir Cita</DialogTitle>
        <DialogContent>
          <ReusableForm
          //onSubmit={handleSubmit}
          >
            <Grid container>
              <Grid item xs={12} sm={6}>
                <AsyncSelectForFullCalendar
                  onValChange={onAutoCompleteChange}
                />
                <ReusableControls.CustomInputIconDelete
                  name="fullName"
                  label="Seleccione Paciente Registrado"
                  value={values.fullName}
                  error={errors.fullName}
                  handleIconClick={handleIconFullName}
                />
                <ReusableControls.CustomInputIconEdit
                  name="notRegistered"
                  label="Paciente No Registrado"
                  value={values.notRegistered}
                  onChange={handleInputChange}
                  error={errors.notRegistered}
                  handleIconClick={handleIconNotRegistered}
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
                <ReusableControls.PlainDateTimePicker
                  name="start"
                  label="Fecha de Inicio de Cita"
                  value={values.start}
                  onChange={handleInputChange}
                  error={errors.start}
                />
                <ReusableControls.PlainDateTimePicker
                  name="end"
                  label="Fecha de Fin de Cita"
                  value={values.end}
                  onChange={handleInputChange}
                  error={errors.end}
                />
              </Grid>
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

/*
 <Button
                type="submit"
                //fullWidth
                variant="contained"
                color="primary"
                //className={classes.button}
              >
                ENVIAR
              </Button>
*/
