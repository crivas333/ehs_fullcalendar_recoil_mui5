import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
 
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

const ExamTable = props => {
  const classes= useStyles();
   // const [data, setData]=useState([]);
   
  
    // const [examSelected, setExamSelected]=useState({
    //   nombre: '',
    //   empresa:'',
    //   lanzamiento: '',
    //   unidades_vendidas: ''
    // })

    // //const selectExam=(row,caso)=>{
    // const selectExam=(row)=>{
    //   setExamSelected(row);
    //   //(caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    // }  
    
      
     return(   
       
         <Table size='small'>
           <TableHead>
             <TableRow>
               <TableCell>Nombre</TableCell>
               <TableCell>Empresa</TableCell>
               <TableCell>Año de Lanzamiento</TableCell>
              
               <TableCell>Acciones</TableCell>
             </TableRow>
           </TableHead>
  
           <TableBody>
             {props.DataSource ?(
               props.DataSource.map (data =>(
               <TableRow key={data.id}>
                 <TableCell>{data.examType}</TableCell>
                 <TableCell>{data.examStatus}</TableCell>
                 <TableCell>
                   <Edit className={classes.iconos} onClick={()=>{props.editRow(data)}}/>
                   &nbsp;&nbsp;&nbsp;
                   <Delete  className={classes.iconos} onClick={()=>props.editRow(data.id)}/>
                   </TableCell>
               </TableRow>
             ))
             ) : (
               <TableRow>
                 <TableCell> No data</TableCell>
               </TableRow>)}
           </TableBody>
         </Table>
       
     )
      
    
  }
  export default ExamTable