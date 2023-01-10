import React, { useState, useEffect } from "react";
//import { Grid } from "@material-ui/core";
import { useQueryClient } from "react-query";
import ReusableControls from "../reusableForms/reusableControls/ReusableControls";
import {
  useReusableForm,
  ReusableForm,
} from "../reusableForms/useReusableForm";
//import { useRecoilState } from "recoil";
//import { appoEvtState } from "../../context/recoilStore";
import * as appointmentService from "../../services/configService";
//import { GlobalContext } from "../../context/GlobalState";
//import { makeStyles } from "@material-ui/styles";
//import { useTheme } from "@material-ui/core/styles";
//import useMediaQuery from "@material-ui/core/useMediaQuery";
import useMediaQuery from "@mui/material/useMediaQuery";
//import Button from "@material-ui/core/Button";
import Button from "@mui/material/Button";
//import Dialog from "@material-ui/core/Dialog";
//import DialogActions from "@material-ui/core/DialogActions";
//import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

//import DialogTitle from "@material-ui/core/DialogTitle";
//import SaveIcon from "@material-ui/icons/Save";
//import DeleteIcon from "@material-ui/icons/Delete";
//import CloseIcon from "@material-ui/icons/Close";
//import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@mui/material/DialogTitle";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
//import Grid from "@material-ui/core/Grid";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@material-ui/core/styles";
//import { styled } from "@material-ui/styles";
import AsyncSelectForFullCalendar from "../patient/patientSearch/AsyncSelectForFullCalendar";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(1),
//     display: "flex",
//     flexDirection: "column",
//     //alignItems: 'center'
//   },
//   buttonText: {
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//   },
// }));

const Span = styled("span", {
  shouldForwardProp: (prop) => prop !== "show",
})(({ theme, show }) => ({
  ...(show && {
    display: "none",
  }),
}));

export default function EventDialog(props) {
  //const matches = useMediaQuery(theme.breakpoints.up("sm"));
  //const theme = useTheme();
  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  //const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  //const { applicationFields } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  const applicationFields = queryClient.getQueryData("applicationFields");
  const {
    evt,
    closeDialog,
    handleAddingEvt,
    handleChangingEvt,
    handleRemovingEvt,
    isEditing,
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
    useReusableForm(evt, true, validate);

  useEffect(() => {
    //console.log("EventDialog-evt: ", evt);
    setValues(evt);
    return () => {};
  }, [evt, setValues]);

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

  const handleDialogClose = () => {
    resetForm();
    closeDialog();
  };
  const handleDialogAdd = (e) => {
    e.preventDefault();

    if (validate()) {
      handleAddingEvt(values);
      resetForm();
      //setValues({});
      closeDialog();
    }
  };
  const handleDialogChange = (e) => {
    e.preventDefault();
    if (validate()) {
      handleChangingEvt(values);
      resetForm();
      //setValues({});
      closeDialog();
    }
  };
  const handleDialogDelete = (e) => {
    resetForm();
    closeDialog();
    setOpenConfirmation(true);
  };
  const handleConfirmationCancel = (e) => {
    resetForm();
    setOpenConfirmation(false);
  };
  const handleConfirmationOk = (e) => {
    e.preventDefault();
    handleRemovingEvt(values);
    resetForm();
    setOpenConfirmation(false);
  };

  return (
    <>
      <Dialog
        fullScreen={matches}
        open={props.show}
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
          {isEditing ? (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              //alignItems="center"
            >
              <Button
                onClick={handleDialogDelete}
                color="secondary"
                //variant="outlined"
                startIcon={<DeleteIcon />}
              >
                <Span show={matches}>Eliminar</Span>
              </Button>
              <Button
                onClick={handleDialogChange}
                color="primary"
                //variant="contained"
                startIcon={<SaveIcon />}
              >
                <Span show={matches}>Guardar</Span>
              </Button>
            </Grid>
          ) : (
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
          )}
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmation}
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
              autoFocus
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
    </>
  );
}
//<span style={{ display: matches ? "inline" : "none" }}>
//<span className={classes.buttonText}>Guardar</span>
/*
const useStyles = makeStyles((theme) => ({
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));
*/

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
