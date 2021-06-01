import React, { useContext, useState } from "react";
//import { Grid } from "@material-ui/core";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import {
  useReusableForm,
  ReusableForm,
} from "../reusableForms/useReusableForm";
//import { useRecoilState } from "recoil";
//import { appoEvtState } from "../../context/recoilStore";
import * as appointmentService from "../../services/configService";
import { GlobalContext } from "../../context/GlobalState";
//import { makeStyles } from "@material-ui/styles";
//import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
//import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";

import AsyncSelectForFullCalendar from "../patient/patientSearch/AsyncSelectForFullCalendar";
import { Span } from "../reusableForms/reusableComponents";
//import { ADD_APPOINTMENT } from "../../graphqlClient/gqlQueries";

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

const initialEvt = {
  id: null, //will store MongoDB id
  start: "",
  end: "",
  appointmentId: "",
  type: "CONSULTA",
  status: "PROGRAMADA",
  patientId: null,
  fullName: "",
  notRegistered: "",
  description: "",
  backgroundColor: "",
};

export default function EventDialog(props) {
  //const theme = useTheme();
  //const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  //const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { applicationFields } = useContext(GlobalContext);

  const {
    //evt,
    //closeDialog,
    //handleAddingEvt,
    //handleChangingEvt,
    //handleRemovingEvt,
    //isEditing,
    addEventHandler,
  } = props;

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp = { ...errors };

    if ("fullName" in fieldValues) {
      //console.log("fieldValues.fullName: ", fieldValues.fullName);
      //temp.notRegistered = fieldValues.notRegistered ? "" : "Campo requerido";
      if (fieldValues.fullName !== "") {
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
      //console.log("fieldValues.notRegistered: ", fieldValues.notRegistered);
      //temp.notRegistered = fieldValues.notRegistered ? "" : "Campo requerido";
      if (fieldValues.notRegistered !== "") {
        temp.notRegistered = "";
        temp.fullName = "";
        //setErrors({ ...errors, fullName: "" });
        setValues({
          ...values,
          notRegistered: fieldValues.notRegistered,
          fullName: "",
        });
      }
      //else {
      //   temp.notRegistered = "Ingrese Paciente No registrado";
      // }
    }

    setErrors({
      ...temp,
    });
    //console.log("errors:", errors);
    if (fieldValues === values) {
      //console.log("temp: ", temp.notRegistered, "", temp.fullName);
      return Object.values(temp).every((x) => x === "");
      //return Object.values(errors).every((x) => x === "");
    }
    //return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useReusableForm(initialEvt, true, validate);

  // useEffect(() => {
  //   //console.log("EventDialog-evt: ", evt);
  //   setValues(evt);
  //   return () => {};
  // }, [evt, setValues]);

  const onAutoCompleteChange = (val) => {
    //console.log("onAutoCompleteChange: ", val.fullName);
    setValues({
      ...values,
      fullName: val.fullName,
      notRegistered: "",
      patientId: val.id,
    });
    //temp.notRegistered = "";
    //temp.fullName = "";
    setErrors({ ...errors, notRegistered: "", fullName: "" });
  };
  const handleIconFullName = () => {
    setValues({ ...values, fullName: "", patientId: "" });
  };
  const handleIconNotRegistered = () => {
    setValues({ ...values, notRegistered: "" });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    resetForm();
    setOpen(false);
  };
  const handleDialogAdd = (e) => {
    e.preventDefault();
    console.log(values);
    if (validate()) {
      addEventHandler(values);
      resetForm();
      //setValues({});
      //closeDialog();
      setOpen(false);
    }
  };

  return (
    <>
      <Tooltip title="Añadir Cita">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        fullScreen={matches}
        open={open}
        //onClose={handleDialogClose}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleDialogClose(event, reason);
          }
        }}
      >
        <DialogTitle>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            //alignItems="center"
          >
            <span>Añadir Cita</span>

            <IconButton aria-label="close" onClick={handleDialogClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <ReusableForm
          //onSubmit={handleSubmit}
          >
            <ReusableControls.CustomInput
              variant="outlined"
              name="id"
              label="id"
              value={values.id}
              //onChange={handleInputChange}
              error={errors.id}
            />
            <AsyncSelectForFullCalendar onValChange={onAutoCompleteChange} />
            <ReusableControls.CustomInputIconDelete
              //autosize={true}
              variant="outlined"
              name="fullName"
              label="Paciente Registrado"
              value={values.fullName}
              error={errors.fullName}
              handleIconClick={handleIconFullName}
              readOnly={true}
            />
            <ReusableControls.CustomInputIconEdit
              variant="outlined"
              name="notRegistered"
              label="Paciente NO Registrado"
              value={values.notRegistered}
              onChange={handleInputChange}
              error={errors.notRegistered}
              handleIconClick={handleIconNotRegistered}
            />
            <ReusableControls.CustomSelect
              variant="outlined"
              name="type"
              label="Tipo de Cita"
              value={values.type}
              onChange={handleInputChange}
              options={appointmentService.getFieldsDataCollection(
                applicationFields,
                "appointmentView",
                "appointmentType"
              )}
              error={errors.type}
            />

            <ReusableControls.CustomSelect
              variant="outlined"
              name="status"
              label="Estado de la Cita"
              value={values.status}
              onChange={handleInputChange}
              options={appointmentService.getFieldsDataCollection(
                applicationFields,
                "appointmentView",
                "appointmentStatus"
              )}
            />
            <ReusableControls.PlainDateTimePicker
              inputVariant="outlined"
              disablePast={true}
              name="start"
              label="Inicio de Cita"
              value={values.start}
              onChange={handleInputChange}
              error={errors.start}
            />
            <ReusableControls.PlainDateTimePicker
              inputVariant="outlined"
              disablePast={true}
              name="end"
              label="Fin de Cita"
              value={values.end}
              onChange={handleInputChange}
              error={errors.end}
            />
            <ReusableControls.CustomInputMulti
              variant="outlined"
              name="description"
              label="Descripción"
              maxLines={2}
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
            />
          </ReusableForm>
        </DialogContent>
        <DialogActions>
          <>
            <Button
              onClick={handleDialogAdd}
              color="primary"
              //variant="contained"
              startIcon={<SaveIcon />}
            >
              <Span show={matches}>Guardar</Span>
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </>
  );
}

/*
 <DialogTitle>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {isEditing ? (
              <span>Actualizar Cita</span>
            ) : (
              <span>Añadir Cita</span>
            )}
            <IconButton aria-label="close" onClick={handleDialogClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
*/
/*
 <Button
                onClick={handleDialogClose}
                color="primary"
                //variant="outlined"
              >
                Cancelar
              </Button>
*/
/*
<DialogTitle id="form-dialog-title">
          {isEditing ? <span>Actualizar Cita</span> : <span>Añadir Cita</span>}
          <IconButton>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
*/

/*
 <Grid container>
              <Grid item xs={12}>
                <AsyncSelectForFullCalendar
                  onValChange={onAutoCompleteChange}
                />
                <ReusableControls.CustomInputIconDelete
                  name="fullName"
                  label="Seleccione Paciente Registrado"
                  value={values.fullName}
                  error={errors.fullName}
                  handleIconClick={handleIconFullName}
                  readOnly={true}
                  variante="outlined"
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
*/
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
