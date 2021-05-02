import React from 'react'
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DisplayDatePicker(props) {

    //const { name, label, value, onChange } = props
    const { name, label, value } = props

    // const convertToDefEventPara = (name, value) => ({
    //     target: {
    //         name, value
    //     }
    // })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker 
                disableToolbar 
                readOnly={true}
                variant="inline" 
                inputVariant='standard'
                label={label}
                format="dd/MM/yyyy"
                name={name}
                value={value||null}
                mask='__/__/____'
                //onChange={date =>onChange(convertToDefEventPara(name,date))}

            />
        </MuiPickersUtilsProvider>
    )
}

/*
 <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
                disableToolbar 
                variant="inline" 
                //inputVariant='standard'
                label={label}
                format="dd/MMM/yyyy"
                name={name}
                value={value}
                onChange={date =>onChange(convertToDefEventPara(name,date))}

            />
        </MuiPickersUtilsProvider>
*/