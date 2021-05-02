
import React, { useContext, useState, useEffect, Fragment} from 'react'
//import clsx from 'clsx';
//import {useQuery} from '@apollo/client'
//import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { GlobalContext } from '../../context/GlobalState'
//import ExamTable from './ExamTableMUI'
import AddExamForm from './AddExamForm'
import EditExamForm from './EditExamForm'
import ExamTable from './reactTable'
//import ReusableControls from '../reusableForms/reusableControls/ReusableControls'
//import {getCustFieldCollection} from '../../services/employeeService'
//import { GET_EXAM_BY_PATIENT_ID} from '../../apolloConfig/gqlQueries'


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1
//   },
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
// 	}

// }))

//export default function Appointment () {
export default function Exam (props) { 
  //const classes = useStyles()
	const columns = React.useMemo(
    () => [
      {
        Header: 'Tipo de Examen',
        accessor: 'examType',
      },
    
      {
        Header: 'Estado de Examen',
        accessor: 'examStatus',
      },
      {
        Header: 'Nro. Historia',
        accessor: 'historyId',
      },
      {
        Header: 'Id',
        accessor: 'id',
      },
    ],
    []
  )
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { 
		currentPatient,
		applicationFields, 
		dataExam, 
		getExamByPatientID_APOLLO, 
		addExamDataAPOLLO,
		updateApplicationFieldsAPOLLO, 
		deleteApplicationFieldsAPOLLO } = useContext(GlobalContext)
  const initialFormState = { id: null, fieldType: '', fieldData: '' }
      // Setting state
  const [ currentRow, setCurrentRow ] = useState(initialFormState)
  const [ editingFlag, setEditingFlag ] = useState(false)
  
	// const { data, loading, error } = useQuery(GET_EXAM_BY_PATIENT_ID);
  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>ERROR: {error.message}</p>;
	// if (data && data.exams) {
  //   console.log('useQuery:',data)}
	
	//Load Data
	useEffect(()=>{
		async function fetchData(){
    await getExamByPatientID_APOLLO(currentPatient.id);
		}
		if(currentPatient.id){
			//console.log(currentPatient.id)
			fetchData();
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  	// CRUD operations
	const addExamData = dataArray => {
		//createField.fieldType=fieldType
		//console.log('AddExamData - currPatient:',currentPatient)
		console.log('AddExamData - addExamData:',dataArray)
		const newData={
			examType: dataArray.examType,
    	examStatus: dataArray.examStatus,
    	examDateTime: dataArray.examDateTime,
    	patient: currentPatient.id,
			//historyId: parseInt(currentPatient.historyId,10)
			historyId: currentPatient.historyId
		}
		addExamDataAPOLLO(newData)
	}
	const deleteFieldData = id => {
		setEditingFlag(false)
		//console.log(id)
		//setUsers(users.filter(user => user.id !== id))
		deleteApplicationFieldsAPOLLO(id)
	}
	const updateFieldData = (updatedField) => {
		setEditingFlag(false)
		//console.log('updatedField: ',updatedField)
		//setUsers(users.map(user => (user.id === id ? updatedField : user)))
		updateApplicationFieldsAPOLLO(updatedField)
	}
	const editRow = data => {
		setEditingFlag(true)
		console.log('Exam - editRow: ',data)
		//setCurrentRow({ id: data.id, : data.fieldType, fieldData: data.fieldData })
		setCurrentRow(data)
	}

  return (
    
			<Grid container spacing={3}>
				<Grid item xs={12}>
					{editingFlag ? (
						<Fragment>				
							<EditExamForm
								fieldsSource={applicationFields}
								editing={editingFlag}
								setEditing={setEditingFlag}
								editingRow={currentRow}
								updateField={updateFieldData}
							/>
						</Fragment>
					) : (
						<Fragment>						
							<AddExamForm 
								fieldsSource={applicationFields}
								patientInfo={currentPatient}
								addRow={addExamData} />
						</Fragment>
					)}
				</Grid>
				<Grid item xs={12}>
					<ExamTable 
						columns={columns}
						data={dataExam }
						getRowProps={row => ({
							onClick: () => console.log(JSON.stringify(row.values)),
							style: {
								cursor: "pointer"
							}
						})}
						//updateMyData={updateMyData}
        		//skipPageReset={skipPageReset}
						editRow={editRow} 
						deleteUser={deleteFieldData} />
				</Grid>
			</Grid>
   
  )
}
//<AddExamForm addRow={addExamData} />
//{(data.length&&<AddExamForm addRow={addExamData} />)}