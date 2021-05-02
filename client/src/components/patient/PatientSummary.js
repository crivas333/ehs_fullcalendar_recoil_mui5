
import React, { useContext, useEffect, useState } from 'react'
// import CssBaseline from '@material-ui/core/CssBaseline'
// import TextField from '@material-ui/core/TextField'
// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
// import Container from '@material-ui/core/Container'
// import InputLabel from '@material-ui/core/InputLabel'
import format from 'date-fns/format'
// import FormControl from '@material-ui/core/FormControl'
// import { useForm } from 'react-hook-form'
import { GlobalContext } from '../../context/GlobalState'

const useStyles = makeStyles((theme) => ({
  paper: {
    //marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection:'column'
  },
  // spanMobile:{
  //   //whiteSpace:'pre-wrap',
  //   lineHeight: '14px',
  // }
}))

//const nbsp = '\u00A0';
//const breakline = '\u000A';

function NewlineText(props) {
  const newText = props.text.split('\n').map((item,key) => <span key={key}>{item}</span>);
  return newText;
}

export default function PatientSummary (props) {
  const classes = useStyles()
  const { currentPatient } = useContext(GlobalContext)
  const [textMobile, setTextMobile] = useState('')
  const [textPC, setTextPC] = useState('')
  const [isMobile, setIsMobile]= useState(false)

  const handleWindowSizeChange = () => {
    //console.log('handleWindowSizeChange-width: ',window.innerWidth)
    setIsMobile(window.innerWidth <= 500)
    };
  
  useEffect(() => {
    //console.log('PatientSummary-useEffect-width: ',window.innerWidth)
    window.addEventListener('resize', handleWindowSizeChange);
    setIsMobile(window.innerWidth <= 500)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [])
  
  useEffect(() => {
    
    let line1 = ''
    let line2 = ''
    let dob = ''
    let age = ''
    let sex= ''
    if (currentPatient.lastName){
      // console.log('PatientSummary - useEffect: currentPatient: ', currentPatient)
      if(currentPatient.birthDay){
        dob=format(new Date(currentPatient.birthDay),['dd/MM/yyyy'])
        age=currentPatient.age_years
      }
      if(currentPatient.sex==='MASCULINO'){ sex='M'}
      if(currentPatient.sex==='FEMENINO'){ sex='F'}
    
      line1=`${currentPatient.historyId} - ${currentPatient.lastName} ${currentPatient.lastName2},
      ${currentPatient.firstName} - F.N.: ${dob} (${age}a) - Sexo: ${sex}`
      setTextMobile(line1)

      //lines divided by feedLine (enter)
      line2=`Historia: ${currentPatient.historyId} - ${currentPatient.lastName} ${currentPatient.lastName2}, ${currentPatient.firstName}
      ${currentPatient.idType}: ${currentPatient.idTypeNo}  -  F. Nacimiento: ${dob} (${age} años)  -  Sexo: ${currentPatient.sex}
      Teléfono: ${currentPatient.phone1}  -  Email: ${currentPatient.email}`
      setTextPC(line2)
    }
  }, [currentPatient])

  if(isMobile){
    return ( 
      <div className={classes.paper}>  
        <span style={{lineHeight: '14px'}}>{textMobile}</span>
      </div>
    )
  }else{
    return (
    <div className={classes.paper}>  
      <NewlineText text={textPC}></NewlineText>
    </div>
    )
  }

}

/*
 <div className={classes.paper}>  
      <span className={classes.spanPC}>
        {textPC}</span>
    </div>
*/
/*
   <div className={classes.paper}>  
            <span style={{lineHeight: '14px'}}>{`${text1}`}</span>
      </div>
*/

/*
<div className={classes.paper}>  
         <span style={{lineHeight: '14px',whiteSpace:'pre-wrap'}}>{text1}</span>
    </div>
*/
/*
     <div className={classes.paper}>  
        <span style={{lineHeight: '14px',whiteSpace:'pre-wrap'}}>{`Line 1
Line 2
Line 3
This is a cell with white-space: pre-wrap`}</span>
    </div>
*/
/*
 <div className={classes.paper}>  
          <NewlineText text={`Line one\n 
          Line two\nLine three`} />
      </div>
*/

/*
<span>{`${text1}`}</span>
<p><small>{`${text1}`}</small></p>
<p>{`${text1}`}</p>
*/