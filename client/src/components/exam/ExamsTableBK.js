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

export default function ExamsTable() {
  const classes= useStyles();
    const [data, setData]=useState([]);
   
  
    const [examSelected, setExamSelected]=useState({
      nombre: '',
      empresa:'',
      lanzamiento: '',
      unidades_vendidas: ''
    })

    //const selectExam=(row,caso)=>{
    const selectExam=(row)=>{
      setExamSelected(row);
      //(caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    }  
    return (
      <div >
        
       <TableContainer>
         <Table>
           <TableHead>
             <TableRow>
               <TableCell>Nombre</TableCell>
               <TableCell>Empresa</TableCell>
               <TableCell>Año de Lanzamiento</TableCell>
               <TableCell>Unidades Vendidas (millones)</TableCell>
               <TableCell>Acciones</TableCell>
             </TableRow>
           </TableHead>
  
           <TableBody>
             {data.map(rowExam=>(
               <TableRow key={rowExam.id}>
                 <TableCell>{rowExam.nombre}</TableCell>
                 <TableCell>{rowExam.empresa}</TableCell>
                 <TableCell>{rowExam.lanzamiento}</TableCell>
                 <TableCell>{rowExam.unidades_vendidas}</TableCell>
                 <TableCell>
                   <Edit className={classes.iconos} onClick={()=>selectExam(rowExam, 'Editar')}/>
                   &nbsp;&nbsp;&nbsp;
                   <Delete  className={classes.iconos} onClick={()=>selectExam(rowExam, 'Eliminar')}/>
                   </TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
      
      </div>
    );
  }