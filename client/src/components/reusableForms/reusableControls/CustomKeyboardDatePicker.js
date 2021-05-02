import React, {useState} from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import esLocale from 'date-fns/locale/es'

export default function CustomKeyboardDatePicker(props) {

	//const { name, label, value, onChange } = props
	const { name, label, onChange } = props
	//const [selectedDate, handleDateChange] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null)

	const convertToDefEventPara = (name, value) => ({
			target: {name, value}
			
	}
	)
	const handleLocalChange=(name,value)=>{
		//console.log('test',name,value)
		setSelectedDate(value)
		onChange(convertToDefEventPara(name,value))
	}

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils} 
			locale={esLocale}
			> 
				<KeyboardDatePicker 
					placeholder='dd/MM/yyyy'
					disableFuture='true'
					//disableToolbar
					variant='dialog'
					//variant='inline'
					autoOk
					// emptyLabel=''
					// initialFocusedDate={null} 
					//minDate={Date(1900/01/01)}
					maxDateMessage='No indicar fecha en el futuro'
					minDateMessage='No indicar fecha anterior a 1900'
					invalidDateMessage='Campo en BLANCO o Formato de FECHA inválido'
					inputVariant='standard'
					size='small'
					
					format="dd/MM/yyyy" //This will cause the value of received date to have an ISO date and a formatted date in an array, so it's recommended you use watch(name)[0] to extract the ISO date and [1] for the formatted date.
					margin="normal"
					//defaultValue={null}
					name={name}
					label={label}
					//value={value}
					//onChange={date =>onChange(convertToDefEventPara(name,date))}
					//onChange={date=>setSelectedDate(date)}
					value={selectedDate}
					onChange={date=>handleLocalChange(name,date)}

				/>
		</MuiPickersUtilsProvider>
	)
}