import React from 'react'
//import { FormControl, FormLabel, RadioGroup as MuiRadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl' 
import FormLabel from '@material-ui/core/FormLabel'
//import {RadioGroup as MuiRadioGroup} from '@material-ui/core' 
import RadioGroup from '@material-ui/core/RadioGroup' 
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

export default function CustomRadioGroup(props) {

    const { name, label, value, onChange, items } = props;
    //MuiRadioGroup 
    return (
			<FormControl>
				<FormLabel>{label}</FormLabel>
					<RadioGroup row
						name={name}
						value={value}
						onChange={onChange}>
						{
							items.map(
									item => (
										<FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} />
									)
							)
						}
					</RadioGroup>
			</FormControl>
    )
}
