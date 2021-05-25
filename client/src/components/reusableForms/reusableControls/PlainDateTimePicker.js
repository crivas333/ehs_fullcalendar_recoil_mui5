import React from "react";
//import { DateTimePicker } from "@material-ui/pickers";
import DateTimePicker from "@material-ui/lab/DateTimePicker";
import TextField from "@material-ui/core/TextField";
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
    //inputVariant,
    variant,
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
      renderInput={(props) => (
        <TextField
          {...props}
          variant={variant}
          size="small"
          margin="dense"
          label={label}
        />
      )}
      //inputFormat="dd/MM/yyyy hh:mm a"
      inputFormat="dd/MM/yyyy hh:mm a"
      allowSameDateSelection
      //disableMaskedInput
      //okText
      ampm={true}
      //mask="__/__/____ __:__ _M"
      //disableToolbar variant="inline"
      //variant="inline"
      //variant="dialog"
      //inputVariant={inputVariant}
      //label={label}
      //format="dd/MM/yyyy"
      //format="dd/MM/yyyy hh:mm a"
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
