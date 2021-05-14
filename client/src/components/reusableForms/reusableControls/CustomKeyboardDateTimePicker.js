import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function CustomDateTimePicker(props) {
  //const { name, label, value, onChange } = props;
  const { name, label, onChange } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  const handleLocalChange = (name, value) => {
    //console.log('test',name,value)
    setSelectedDate(value);
    //onChange(convertToDefEventPara(name, value));
  };
  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      //locale={esLocale}
    >
      <KeyboardDateTimePicker
        //disableToolbar variant="inline" inputVariant="outlined"
        //placeholder
        disablePast="true"
        //disableToolbar
        variant="dialog"
        label={label}
        autoOk
        //maxDateMessage="No indicar fecha en el futuro"
        minDateMessage="No indicar fecha anterior en el pasado"
        invalidDateMessage="Campo en BLANCO o FORMATO de FECHA inválido"
        inputVariant="standard"
        size="small"
        //format="dd/MM/yyyy"
        format="dd/MM/yyyy hh:mm a"
        margin="normal"
        name={name}
        label={label}
        value={selectedDate}
        //onChange={(date) => onChange(convertToDefEventPara(name, date))}
        onChange={(date) => handleLocalChange(name, date)}
        //disableFuture='true'

        //autoOk
        //ampm={false}

        mask="__/__/____ __:__ _M"
        onError={console.log}
      />
    </MuiPickersUtilsProvider>
  );
}
