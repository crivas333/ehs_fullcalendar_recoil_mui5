import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReusableControls from "../../reusableForms/reusableControls/ReusableControls";
//import {getMaritalCollection} from '../../../services/employeeService'
//import * as employeeService from "../../../services/employeeService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    //alignItems: 'center'
  },
}));

// export default function App() {
export const NewPatientTab2 = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <ReusableControls.CustomInput
        name="phone1"
        label="Teléfono 1"
        value={props.values.phone1}
        onChange={props.handleInputChange}
        error={props.errors.phone1}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="phone2"
        label="Teléfono 2"
        value={props.values.phone2}
        onChange={props.handleInputChange}
        error={props.errors.phone2}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="email"
        label="Email"
        value={props.values.email}
        onChange={props.handleInputChange}
        error={props.errors.email}
        variant="outlined"
      />
      <ReusableControls.CustomInputMulti
        name="address"
        label="Dirección"
        value={props.values.address}
        onChange={props.handleInputChange}
        error={props.errors.address}
        maxLines={3}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="gName"
        label="Acompañante - Nombre"
        value={props.values.gName}
        onChange={props.handleInputChange}
        error={props.errors.gName}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="gPhone1"
        label="Acompañante - Teléfono 1"
        value={props.values.gPhone1}
        onChange={props.handleInputChange}
        error={props.errors.gPhone1}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="gPhone2"
        label="Acompañante - Teléfono 2"
        value={props.values.gPhone2}
        onChange={props.handleInputChange}
        error={props.errors.gPhone2}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="gRelation"
        label="Acompañante - Relación"
        value={props.values.gRelation}
        onChange={props.handleInputChange}
        error={props.errors.gRelation}
        variant="outlined"
      />
    </div>
  );
};

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
