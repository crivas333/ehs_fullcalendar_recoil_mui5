import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReusableControls from "../../reusableForms/reusableControls/ReusableControls";
import {
  getSexCollection,
  getIdTypeCollection,
} from "../../../services/configService";
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
export const UpdatePatientTab1 = (props) => {
  const classes = useStyles();
  const { values, errors, onChange } = props;

  // React.useEffect(() => {
  //  console.log('UpdatePatientTab1-values: ',{values})

  // }, [])

  return (
    <div className={classes.paper}>
      <ReusableControls.CustomInput
        name="id"
        label="id"
        value={values.id}
        variant="outlined"
        readOnly={true}
      />
      <ReusableControls.CustomInput
        name="historyId"
        label="Nro de Historia"
        value={values.historyId}
        variant="outlined"
        readOnly={true}
      />
      <ReusableControls.CustomSelect
        name="idType"
        label="Tipo de Documento"
        value={values.idType}
        onChange={onChange}
        options={getIdTypeCollection()}
        error={errors.idType}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="idTypeNo"
        label="Nro. Documento"
        value={values.idTypeNo}
        onChange={onChange}
        error={errors.idTypeNo}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="firstName"
        label="Nombres"
        value={values.firstName}
        onChange={onChange}
        error={errors.firstName}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="lastName"
        label="A. Paterno"
        value={values.lastName}
        onChange={onChange}
        error={errors.lastName}
        variant="outlined"
      />
      <ReusableControls.CustomInput
        name="lastName2"
        label="A. Materno"
        value={values.lastName2}
        onChange={onChange}
        error={errors.lastName2}
        variant="outlined"
      />
      <ReusableControls.PlainDatePicker
        name="birthDay"
        label="F. Nacimiento"
        value={values.birthDay}
        onChange={onChange}
        error={errors.birthDay}
        inputVariant="outlined"
        disableFuture={true}
      />
      <ReusableControls.CustomSelect
        name="sex"
        label="Sexo"
        value={values.sex}
        onChange={onChange}
        options={getSexCollection()}
        error={errors.sex}
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
