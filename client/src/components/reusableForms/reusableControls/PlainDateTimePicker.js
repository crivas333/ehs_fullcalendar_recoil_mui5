import React from "react";
import { DateTimePicker } from "@material-ui/pickers";
//import DateFnsUtils from "@date-io/date-fns";
//import FormControl from "@material-ui/core/FormControl";

export default function PlainDateTimePicker(props) {
  //const [selectedDate, handleDateChange] = useState(null);
  //const [selectedDate, setSelectedDate] = useState(null);
  const {
    name,
    label,
    value,
    onChange,
    inputVariant,
    readOnly = false,
    disablePast = false,
    disableFuture = false,
  } = props;

  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  // const handleLocalChange = (name, value) => {
  //   //console.log('test',name,value)

  //   onChange(convertToDefEventPara(name, value));
  //   setSelectedDate(value);
  // };
  return (
    <DateTimePicker
      //disableToolbar variant="inline"
      //variant="inline"
      variant="dialog"
      inputVariant={inputVariant}
      label={label}
      //format="dd/MM/yyyy"
      format="dd/MM/yyyy hh:mm a"
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
      disablePast={disablePast}
      disableFuture={disableFuture}
      readOnly={readOnly}
      //showTabs={true}
      //mask='__/__/____ __:__ _M'
      onError={console.log}
    />
  );
}

/*
 <FormControl margin="dense">
      <DateTimePicker
        //disableToolbar variant="inline"
        //variant="inline"
        variant="dialog"
        inputVariant={inputVariant}
        label={label}
        //format="dd/MM/yyyy"
        format="dd/MM/yyyy hh:mm a"
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
        disablePast={disablePast}
        disableFuture={disableFuture}
        readOnly={readOnly}
        //showTabs={true}
        //mask='__/__/____ __:__ _M'
        onError={console.log}
      />
    </FormControl>
*/
