import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";

import { GlobalContext } from "../../../context/GlobalState";
import { experimentalStyled as styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import TabPanel from '@material-ui/lab/TabPanel'
//import { makeStyles } from "@material-ui/core/styles";

import { NewPatientTab1 } from "./NewPatientTab1";
import { NewPatientTab2 } from "./NewPatientTab2";
import { NewPatientTab3 } from "./NewPatientTab3";
import {
  useReusableForm,
  ReusableForm,
} from "../../reusableForms/useReusableForm";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(1),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },

//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   button: {
//     marginTop: "10px",
//   },
// }));
const MyBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  //margingTop: theme.spacing(1),
  padding: theme.spacing(1, 0),
  //alignItems: "center",
  //padding: theme.spacing(0, 1),

  //justifyContent: "flex-end",
}));

export const NewPatientTabForm = (props) => {
  //const classes = useStyles();
  const { currentPatient } = useContext(GlobalContext);
  //tabs
  const indexToTabName = {
    Datos: 0,
    Contacto: 1,
    Misc: 2,
  };
  const [selectedTab, setSelectedTab] = useState(indexToTabName["Datos"]);
  // const tabNameToIndex = {
  //   0: 'Datos',
  //   1: 'Contacto',
  //   2: 'Misc'
  // };

  const handleChangeTab = (event, newValue) => {
    //console.log('handleChangeTab: ',newValue)
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (currentPatient !== null) {
      //setValue('currPatient', { ...currentPatient })
    }
  }, [currentPatient]);

  const initialFValues = {
    idType: "DNI",
    idTypeNo: "",
    firstName: "",
    lastName: "",
    lastName2: "",
    birthDay: "",
    sex: "",
    phone1: "",
    phone2: "",
    email: "",
    address: "",
    gName: "",
    gPhone1: "",
    gPhone2: "",
    gRelation: "",
    bloodType: "",
    marital: "",
    occupation: "",
    religion: "",
    referral: "",
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "Ingrese Nombre(s)";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Ingrese A. Paterno";

    setErrors({
      ...temp,
    });

    if (fieldValues === values) {
      // console.log(
      //   "object: ",
      //   Object.values(temp).every((x) => x === "")
      // );
      return Object.values(temp).every((x) => x === "");
    }
  };

  const {
    values,
    //setValues,
    errors,
    setErrors,
    handleInputChange,
    //resetForm,
  } = useReusableForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NewPatientTabForm: ", values);
    if (validate()) {
      //console.log('validation')
      const newData = {
        //dni: parseInt(values.dni),
        idType: values.idType,
        idTypeNo: values.idTypeNo.toUpperCase(),
        firstName: values.firstName.toUpperCase(),
        lastName: values.lastName.toUpperCase(),
        lastName2: values.lastName2.toUpperCase(),
        //birthDay: (data.currPatient.birthDay||''),
        //birthDay: (data.currPatient.birthDay), //null
        birthDay: values.birthDay,
        sex: values.sex,
        phone1: values.phone1,
        phone2: values.phone2,
        email: values.email.toUpperCase(),
        address: values.address.toUpperCase(),
        gName: values.gName.toUpperCase(),
        gPhone1: values.gPhone1,
        gPhone2: values.gPhone2,
        gRelation: values.gRelation.toUpperCase(),
        bloodType: values.bloodType,
        marital: values.marital,
        occupation: values.occupation.toUpperCase(),
        religion: values.religion.toUpperCase(),
        referral: values.referral.toUpperCase(),
      };
      //props.createPatient({
      props.createPatient.mutate({
        variables: {
          patientInput: {
            idType: newData.idType,
            idTypeNo: newData.idTypeNo,
            firstName: newData.firstName,
            lastName: newData.lastName,
            lastName2: newData.lastName2,
            birthDay: newData.birthDay,
            sex: newData.sex,
            phone1: newData.phone1,
            phone2: newData.phone2,
            email: newData.email,
            address: newData.address,
            gName: newData.gName,
            gPhone1: newData.gPhone1,
            gPhone2: newData.gPhone2,
            gRelation: newData.gRelation,
            bloodType: newData.bloodType,
            marital: newData.marital,
            occupation: newData.occupation,
            religion: newData.religion,
            referral: newData.referral,
          },
        },
      });
      // props.createPatient.mutate({
      //   patientInput: {
      //     idType: newData.idType,
      //     idTypeNo: newData.idTypeNo,
      //     firstName: newData.firstName,
      //     lastName: newData.lastName,
      //     lastName2: newData.lastName2,
      //     birthDay: newData.birthDay,
      //     sex: newData.sex,
      //     phone1: newData.phone1,
      //     phone2: newData.phone2,
      //     email: newData.email,
      //     address: newData.address,
      //     gName: newData.gName,
      //     gPhone1: newData.gPhone1,
      //     gPhone2: newData.gPhone2,
      //     gRelation: newData.gRelation,
      //     bloodType: newData.bloodType,
      //     marital: newData.marital,
      //     occupation: newData.occupation,
      //     religion: newData.religion,
      //     referral: newData.referral,
      //   },
      // });

      //resetForm();
      //props.handleAction(0)
    }
  };

  return (
    <MyBox>
      <ReusableForm
        //className={classes.form}
        onSubmit={handleSubmit}
      >
        <AppBar position="static" color="default">
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            //variant="fullWidth"
            scrollButtons="auto"
            value={selectedTab}
            onChange={handleChangeTab}
          >
            <Tab label="Datos" />
            <Tab label="Contacto" />
            <Tab label="Misc" />
          </Tabs>
        </AppBar>
        {selectedTab === 0 && (
          <NewPatientTab1
            values={values}
            onChange={handleInputChange}
            errors={errors}
            //handleAction={handleAction}
          />
        )}

        {selectedTab === 1 && (
          <NewPatientTab2
            values={values}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        {selectedTab === 2 && (
          <NewPatientTab3
            values={values}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        )}
        <Button
          type="submit"
          //fullWidth
          variant="contained"
          color="primary"
          //className={classes.button}
        >
          ENVIAR
        </Button>
        <Button
          //type='submit'
          //fullWidth
          variant="outlined"
          color="primary"
          //className={classes.button}
          onClick={props.handleCancel}
        >
          CERRAR
        </Button>
      </ReusableForm>
    </MyBox>
  );
};

/*
   {(selectedTab===0)&&(<NewPatientTab1 
            values={values}
            handleInputChange={handleInputChange}
            errors={errors}
            />)}
          {(selectedTab===1)&&(<NewPatientTab2 
            values={values}
            handleInputChange={handleInputChange}
            errors={errors}
            />)}
            {(selectedTab===2)&&(<NewPatientTab3 
            values={values}
            handleInputChange={handleInputChange}
            errors={errors}
            />)}
*/

/*
const validate = (fieldValues = values) => {
  let temp = { ...errors }
  if ('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required."
  if ('lastName' in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required."
  if ('email' in fieldValues)
      temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
  if ('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required."
  if ('departmentId' in fieldValues)
      temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "This field is required."
  setErrors({
      ...temp
  })

  if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
}
*/

/*
 <TextField           
    className={classes.textField}
    variant='outlined'
    InputProps={{ readOnly: true }}
    type='text'
    autoComplete='off'
    size='small'
    margin='normal'
    fullWidth
    label='ID'
    id='id'
    name='currPatient.id'
    inputRef={register({ required: false, max: 8, maxLength: 8 })}
  />  
*/

/*
 <FormControl
            className={classes.formControl}
          >
            <TextField
              className={classes.textField}
              label='SEXO'
              id='sex'
              variant='outlined'
              type='text'
              autoComplete='off'
              size='small'
              margin='normal'
              fullWidth
              autoComplete='off'
              name='currPatient.sex'
              inputProps={{ className: classes.input }}
              inputRef={register({
                
                minLength: {
                  value: 2,
                  message: 'Ingrese más de 02 caracteres'
                },
                maxLength: {
                  value: 30,
                  message: 'Ingrese menos de 30 caracteres'
                }
              })}
            />
            <ErrorMessage errors={errors} name='currPatient.sex'>
              {({ message }) => <p>{message}</p>}
            </ErrorMessage>
          </FormControl>
*/

/*
<FormControl 
  className={classes.formControl}
  >
    <InputLabel shrink>Nro. HISTORIA</InputLabel>
    <TextField
      className={classes.textfieldReadOnly}
      id='historyId'
      fullWidth
      type='text'
      size='small'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly: true }}
      name='currPatient.historyId'
      inputRef={register({ required: false, max: 6, maxLength: 6 })}
    />
  </FormControl>
*/

/*
<FormControl 
  className={classes.formControl}
  >
    <InputLabel shrink>ID</InputLabel>
    <TextField
      className={classes.textfieldReadOnly}
      id='id'
      fullWidth
      type='text'
      size='small'
      variant='outlined'
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly: true }}
      name='currPatient.id1'
      inputRef={register({ required: false, max: 8, maxLength: 8 })}
    />
  </FormControl>
*/

/*
<MuiPickersUtilsProvider utils={DateFnsUtils}>
  <Controller
    as={
      <KeyboardDatePicker />
    }
    control={control}
    rules={{ required: true }}
    name="receivedDate"
    label="F. NACIMIENTO"
    // value={watch('receivedDate')}
    // defaultValue={watch('receivedDate')}
    onChange={date => {
        setValue('receivedDate', date);
        // handleBlur(getValues().id, 'receivedDate'); //Managing patch save at server
        return {value: date} //important to update the controller value after change else state is updated and the controller will not render
    }}
    // disabled={state.disabled}
    format="dd/MM/yyyy" //This will cause the value of received date to have an ISO date and a formatted date in an array, so it's recommended you use watch(name)[0] to extract the ISO date and [1] for the formatted date.
    autoOk
    margin="normal"
  />
</MuiPickersUtilsProvider>
*/

/*
<MuiPickersUtilsProvider utils={DateFnsUtils}>
  <Controller
    as={
      <KeyboardDatePicker
        fullWidth
        autoOk
        error={!!error}
        inputVariant="outlined"
        variant="inline"
        format="dd/MM/yyyy"
        label="Year of registration"
        helperText={error}
      />
    }
    control={control}
    name="yearOfRegistration"
    placeholder="Year of registration"
  />
</MuiPickersUtilsProvider>
*/

/*
  <Controller
    as={
        <DatePicker />
    }
    control={control}
    rules={{ required: true }}
    name="receivedDate"
    label="Received Date"
    value={watch('receivedDate')}
    defaultValue={watch('receivedDate')}
    onChange={date => {
        setValue('receivedDate', date);
        handleBlur(getValues().id, 'receivedDate'); //Managing patch save at server
        return {value: date} //important to update the controller value after change else state is updated and the controller will not render
    }}
    disabled={state.disabled}
    format="dd/MM/yyyy" //This will cause the value of received date to have an ISO date and a formatted date in an array, so it's recommended you use watch(name)[0] to extract the ISO date and [1] for the formatted date.
    autoOk
    margin="normal"
/>
*/

/*
 <MuiPickersUtilsProvider utils={DateFnsUtils}>      
  <KeyboardDatePicker
    value={selectedDate} 
    onChange={handleDateChange}
    inputRef={register}
    size='small'
    margin='normal'
    inputVariant='outlined'
    id="date-picker-dialog"
    label="F. NACIMIEMTO"
    format="dd/MM/yyyy"
    
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />

</MuiPickersUtilsProvider>
*/

/*
 <KeyboardDatePicker
  margin="normal"
  id="date-picker-dialog"
  label="Date picker dialog"
  format="MM/dd/yyyy"
  value={selectedDate}
  onChange={handleDateChange}
  KeyboardButtonProps={{
    'aria-label': 'change date',
  }}
/>
*/

/*
<FormControl
  className={classes.formControl}
>
  <InputLabel shrink>F. NACIMIENTO</InputLabel>
  <MuiTextField
    className={classes.textfield}
    id="birthDay"
    variant='outlined'
    size='small'
    type="date"
    defaultValue=''
    name='currPatient.birthDay'
    inputRef={register({
      
      
    })}
  />
      <ErrorMessage errors={errors} name='currPatient.birthDay'>
    {({ message }) => <p>{message}</p>}
  </ErrorMessage>
</FormControl>
*/

/*
<InputLabel shrink>Count</InputLabel>

*/

/*
  <button className="button" type="submit">
        Submit
      </button>

*/
/*
async function makeAndHandleRequest(query, page = 1) {
  //console.log("makeAndHandleReques: ", query);
  try {
    const res = await axios.get(`/api/v1/PatientData/?lastName=${query}`);
    // eslint-disable-next-line camelcase
    const total_count = res.data.count;
    const options = res.data.data.map((i) => ({
      _id: i._id,
      dni: i.dni,
      firstName: i.firstName,
      lastName: i.lastName,
    }));
    return { options, total_count };
  } catch (err) {}
}
*/

/*
 <ErrorMessage
    errors={errors}
    name='multipleErrorInput'
    render={({ messages }) => {
      console.log('messages', messages)
      return messages
        ? Object.entries(messages).map(([type, message]) => (
          <p key={type}>{message}</p>
        ))
        : null
    }}
  />
*/
