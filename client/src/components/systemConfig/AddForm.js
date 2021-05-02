
import React, { useState } from 'react'
import {makeStyles} from '@material-ui/core/styles'
//import CssBaseline from '@material-ui/core/CssBaseline'
//import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
//import InputLabel from '@material-ui/core/InputLabel'

// const useStyles = makeStyles((theme) => ({
// form: {
// 	width: '100%', // Fix IE 11 issue.
// 	marginTop: theme.spacing(1)
// 	}
// }))
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
			//width: '25ch',
			width: '100%', // Fix IE 11 issue.
		}
	},
	input: {
    textTransform: 'uppercase',
    // autoComplete: 'off'
  }
}));

const AddUserForm = props => {
	const classes = useStyles()
	const [data, setData]=useState('')
	const handleInputChange = event => {
		//const { name, value } = event.target
		//setData({ ...data, [name]: value.toUpperCase() })
		setData(event.target.value)
	}

	return (
		<form
			className={classes.root}
			onSubmit={event => {
				event.preventDefault()
				if (!data) return
				props.addField(data)
				setData('')
			}}
		>
			<div>
			<FormControl
				className={classes.formControl}
			>
				<TextField
					inputProps={{ className: classes.input }}
					label='Campo'
					variant='outlined' 
					type="text" 
					size='small'
					autoComplete='off'
					name='fieldData' 
					value={data}
					onChange={handleInputChange} />
					
			</FormControl>
			</div>
			<Button
				type='submit'
				variant='contained'
				color='primary'
				className={classes.submit}
			>
				AÑADIR
			</Button>
		</form>
		
	)
}

export default AddUserForm