import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function CustomDateTimePicker(props) {

    const { name, label, value, onChange } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker 
                //disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                //format="dd/MM/yyyy"
                format="dd/MM/yyyy hh:mm a"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}
                //disableFuture='true'
                variant='dialog'
                //autoOk
                //ampm={false}
                //disableFuture
                mask='__/__/____ __:__ _M'
                onError={console.log}

            />
        </MuiPickersUtilsProvider>
    )
}
