import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

//import { makeStyles } from "@mui/styles";
import format from "date-fns/format";
// import FormControl from '@material-ui/core/FormControl'
// import { useForm } from 'react-hook-form'
//import { GlobalContext } from "../../context/GlobalState";
import Box from "@mui/material/Box";
import { currentPatientState } from "../../context/RecoilStore";
//import { useRecoilState } from "recoil";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     //marginTop: theme.spacing(0),
//     display: "flex",
//     flexDirection: "column",
//   },
//   // spanMobile:{
//   //   //whiteSpace:'pre-wrap',
//   //   lineHeight: '14px',
//   // }
// }));

//const nbsp = '\u00A0';
//const breakline = '\u000A';

function NewlineText(props) {
  const newText = props.text
    .split("\n")
    .map((item, key) => <span key={key}>{item}</span>);
  return newText;
}

export default function PatientSummary(props) {
  //const classes = useStyles();
  //const { currentPatient } = useContext(GlobalContext);
  const currPatient = useRecoilValue(currentPatientState);
  const [textMobile, setTextMobile] = useState("");
  const [textPC, setTextPC] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const handleWindowSizeChange = () => {
    //console.log('handleWindowSizeChange-width: ',window.innerWidth)
    setIsMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    //console.log('PatientSummary-useEffect-width: ',window.innerWidth)
    window.addEventListener("resize", handleWindowSizeChange);
    setIsMobile(window.innerWidth <= 500);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    console.log("PatientSummary-currentPatient: ", currPatient);
    let line1 = "";
    let line2 = "";
    let dob = "";
    let age = "";
    let sex = "";
    if (
      currPatient !== null &&
      currPatient !== undefined &&
      currPatient.length !== 0
    ) {
      console.log("PatientSummary - useEffect: currentPatient: ", currPatient);
      if (currPatient.birthDay !== null) {
        // dob = format(new Date(parseInt(currentPatient.birthDay)), [
        //   "dd/MM/yyyy",
        // ]);
        //due to Date (custom scalar introduction in Apollo Server graphql typeDefs)
        dob = format(new Date(currPatient.birthDay), ["dd/MM/yyyy"]);
        age = currPatient.age_years;
      }
      if (currPatient.sex === "MASCULINO") {
        sex = "M";
      }
      if (currPatient.sex === "FEMENINO") {
        sex = "F";
      }

      line1 = `${currPatient.historyId} - ${currPatient.lastName} ${currPatient.lastName2},
      ${currPatient.firstName} - F.N.: ${dob} (${age}a) - Sexo: ${sex}`;
      setTextMobile(line1);

      //lines divided by feedLine (enter)
      line2 = `Historia: ${currPatient.historyId} - ${currPatient.lastName} ${currPatient.lastName2}, ${currPatient.firstName}
      ${currPatient.idType}: ${currPatient.idTypeNo}  -  F. Nacimiento: ${dob} (${age} años)  -  Sexo: ${currPatient.sex}
      Teléfono: ${currPatient.phone1}  -  Email: ${currPatient.email}`;
      setTextPC(line2);
    } else {
      setTextMobile("");
      setTextPC("");
    }
  }, [currPatient]);

  if (isMobile) {
    return (
      <div //className={classes.paper}
      >
        <span style={{ lineHeight: "14px" }}>{textMobile}</span>
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //fontWeight: "bold",
          //mx: 0.5,
          //fontSize: 14,
        }}
      >
        <NewlineText text={textPC}></NewlineText>
      </Box>
    );
  }
}

/*
 <div //className={classes.paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          //fontWeight: "bold",
          //mx: 0.5,
          //fontSize: 14,
        }}
      >
        <NewlineText text={textPC}></NewlineText>
      </div>

*/

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
