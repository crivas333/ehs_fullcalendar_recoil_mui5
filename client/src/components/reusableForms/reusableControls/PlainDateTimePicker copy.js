import React, { useState } from "react";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function PlainDateTimePicker(props) {
  //const [selectedDate, handleDateChange] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { name, label, value, onChange } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  const handleLocalChange = (name, value) => {
    //console.log('test',name,value)
    setSelectedDate(value);
    onChange(convertToDefEventPara(name, value));
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        //disableToolbar variant="inline" inputVariant="outlined"
        label={label}
        //format="dd/MM/yyyy"
        //format="dd/MM/yyyy hh:mm a"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))} //11!1!OK
        //onChange={(date) => convertToDefEventPara(name, date)} //!!!!!!!!!!! OK
        //onChange={handleLocalChange}
        //onChange={(date) => handleLocalChange(name, date)}
        //onChange={handleDateChange}
        //disableFuture='true'
        //variant="dialog"
        //autoOk
        //ampm={false}
        //disableFuture
        //mask='__/__/____ __:__ _M'
        onError={console.log}
      />
    </MuiPickersUtilsProvider>
  );
}
