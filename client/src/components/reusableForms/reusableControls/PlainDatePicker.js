import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
//import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from "date-fns/locale/es";

export default function PlainDatePicker(props) {
  const { name, label, value, onChange, inputVariant, readOnly } = props;
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
  );
}
