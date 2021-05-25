import React from "react";
import DatePicker from "@material-ui/lab/DatePicker";
import TextField from "@material-ui/core/TextField";
//import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
//import DateFnsUtils from "@date-io/date-fns";
//import esLocale from "date-fns/locale/es";

export default function PlainDatePicker(props) {
  const {
    name,
    label,
    value,
    onChange,
    //inputVariant,
    variant,
    readOnly = false,
    disableFuture = false,
    disablePast = false,
  } = props;
  //const [selectedDate, handleDateChange] = useState(new Date());
  //const [selectedDate, setSelectedDate] = useState(null)

  const convertToDefEventPara = (name, value) => ({
    target: { name, value },
  });
  // const handleLocalChange=(name,value)=>{
  // 	//console.log('test',name,value)
  // 	//setSelectedDate(value)
  // 	onChange(convertToDefEventPara(name,value))
  // }

  return (
    <DatePicker
      renderInput={(props) => (
        <TextField
          {...props}
          variant={variant}
          margin="dense"
          size="small"
          label={label}
        />
      )}
      showTodayButton
      todayText="hoy"
      //placeholder="dd/MM/yyyy"
      //disableToolbar variant="inline"
      //inputVariant={inputVariant}
      //variant="dialog"
      //disablePast={disablePast}
      //label={label}
      //format="dd/MM/yyyy"
      maxDateMessage="No indicar fecha en el futuro"
      minDateMessage="No indicar fecha anterior a 1900"
      invalidDateMessage="Campo en BLANCO o Formato de FECHA inválido"
      name={name}
      value={value || null}
      onChange={(date) => onChange(convertToDefEventPara(name, date))} //11!1!OK
      //onChange={(date) => convertToDefEventPara(name, date)} //!!!!!!!!!!! OK
      //onChange={handleLocalChange}
      //onChange={(date) => handleLocalChange(name, date)}
      //onChange={handleDateChange}
      //disableFuture='true'
      //variant="dialog"
      //autoOk
      //ampm={false}
      minDate={new Date("1900-01-01")}
      disableFuture={disableFuture}
      disablePast={disablePast}
      readOnly={readOnly}
      //showTabs={true}
      //mask='__/__/____ __:__ _M'
      onError={console.log}
    />
  );
}

/*
 <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <DatePicker
        placeholder="dd/MM/yyyy"
        disableFuture="true"
        //disableToolbar
        variant="dialog"
        inputVariant={inputVariant}
        //variant='inline'
        //autoOk
        readOnly={readOnly}
        // emptyLabel=''
        // initialFocusedDate={null}
        //minDate={Date(1900/01/01)}
        maxDateMessage="No indicar fecha en el futuro"
        minDateMessage="No indicar fecha anterior a 1900"
        invalidDateMessage="Campo en BLANCO o Formato de FECHA inválido"
        //inputVariant='standard'
        inputVariant="outlined"
        size="small"
        format="dd/MM/yyyy" //This will cause the value of received date to have an ISO date and a formatted date in an array, so it's recommended you use watch(name)[0] to extract the ISO date and [1] for the formatted date.
        margin="normal"
        //defaultValue={null}
        name={name}
        label={label}
        //value={value}
        value={value || null}
        //onChange={date =>onChange(convertToDefEventPara(name,date))}
        //onChange={date=>setSelectedDate(date)}
        //value={selectedDate}
        onChange={(date) => onChange(convertToDefEventPara(name, date))} //11!1!OK
      />
    </MuiPickersUtilsProvider>
*/
