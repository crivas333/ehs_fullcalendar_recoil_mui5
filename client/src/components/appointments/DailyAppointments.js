import React, { useContext, useEffect, Fragment } from "react";
//import clsx from 'clsx';
import { useQuery } from "react-query";
import request from "graphql-request";
import { GET_APPOINTMENTS_BY_TIMEFRAME } from "../../graphqlClient/gqlQueries";
//import { makeStyles } from '@material-ui/core/styles'

import Grid from "@material-ui/core/Grid";
import { GlobalContext } from "../../context/GlobalState";
//import ExamTable from './ExamTableMUI'
import AddExamForm from "./AddExamForm";
import EditExamForm from "./EditExamForm";
import ExamTable from "./ReactTable";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function DailyAppointments(props) {
  //const classes = useStyles()
  const {
    currentPatient,
    applicationFields,
    dataExam,
    rowExam,
    actionExam,
    updateRowExam_APOLLO,
    updateEditingRowExam,
    updateActionExam,
    getExamByPatientID_APOLLO,
    addExamDataAPOLLO,
    deleteApplicationFieldsAPOLLO,
  } = useContext(GlobalContext);

  const editRow = (data) => {
    updateActionExam(1);
    //console.log("Exam - editRow: ", data);
    updateEditingRowExam(data);
  };
  const columns = React.useMemo(
    () => [
      // {
      //   Header: "id",
      //   accessor: "id",
      // },

      {
        Header: "Nro. Historia",
        accessor: "historyId",
      },
      {
        Header: "Paciente",
        accessor: "fullName",
      },
      {
        Header: "No Registrado",
        accessor: "notRegistered",
      },
      {
        Header: "TIPO",
        accessor: "type",
      },
      {
        Header: "ESTADO",
        accessor: "status",
      },
      {
        Header: "FECHA",
        accessor: "start",
      },
      {
        Header: "ACCIONES",
        accessor: "actions",
        Cell: (props) => {
          //const rowIdx = props.row.id;
          const rowIdx = props.row.original;
          return (
            <div>
              <EditIcon
                cursor="pointer"
                onClick={() => editRow(rowIdx)}
              ></EditIcon>
              <DeleteIcon
                cursor="pointer"
                onClick={() => console.log(rowIdx)}
              ></DeleteIcon>
            </div>
          );
        },
      },
      //eslint-disable-next-line react-hooks/exhaustive-deps
    ], // eslint-disable-next-line
    []
  );
  const { isLoading, isError, data, error } = useQuery(
    "appointments",
    async () => {
      const res = await request("/graphql", GET_APPOINTMENTS_BY_TIMEFRAME, {
        start: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
        end: new Date(new Date().setHours(24, 0, 0, 0)).toISOString(),
      });
      //return data.getAppointmentsByTimeframe;
      //console.log(data.getAppointmentsByTimeframe);
      if (res && res.getAppointmentsByTimeframe) {
        return res.getAppointmentsByTimeframe.map((a) => ({
          id: a.id,
          historyId: a.patientId !== null ? a.patientId.historyId : "",
          fullName: a.patientId !== null ? a.patientId.fullName : "",
          notRegistered: a.notRegistered,
          start: new Date(parseInt(a.start)).toISOString(),
          //end: new Date(parseInt(a.end)).toISOString(),
          status: a.status,
          type: a.type,
        }));
      }
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  //const [selectedRow, setSelectedRow]=useState([])

  // const { data, loading, error } = useQuery(GET_EXAM_BY_PATIENT_ID);
  // if (loading) return <p>Loading ...</p>;
  // if (error) return <p>ERROR: {error.message}</p>;
  // if (data && data.exams) {
  //   console.log('useQuery:',data)}

  // //Load Data
  // useEffect(() => {
  //   async function fetchData() {
  //     await getExamByPatientID_APOLLO(currentPatient.id);
  //   }
  //   if (currentPatient.id && actionExam === 0) {
  //     //console.log('Exam - PatientId',currentPatient.id)
  //     fetchData();
  //   }
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // CRUD operations
  const addExamData = (dataArray) => {
    //createField.fieldType=fieldType
    //console.log('AddExamData - currPatient:',currentPatient)
    console.log("AddExamData - addExamData:", dataArray);
    const newData = {
      examType: dataArray.examType,
      examStatus: dataArray.examStatus,
      examDateTime: dataArray.examDateTime,
      patient: currentPatient.id,
      //historyId: parseInt(currentPatient.historyId,10)
      historyId: currentPatient.historyId,
    };
    addExamDataAPOLLO(newData);
  };
  const deleteFieldData = (id) => {
    //setAction(0)
    //console.log(id)
    //setUsers(users.filter(user => user.id !== id))
    deleteApplicationFieldsAPOLLO(id);
  };
  const updateRowExam = (row) => {
    updateActionExam(0);
    console.log("Exam - updateRowExam: ", row);
    updateRowExam_APOLLO(row);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {actionExam === 1 && (
          <Fragment>
            <EditExamForm
              fieldsSource={applicationFields}
              editingRow={rowExam}
              //editingRow={selecteRow}
              updateRow={updateRowExam}
              //editing={action}
              //setAction={setAction}
            />
          </Fragment>
        )}
        {actionExam === 2 && (
          <Fragment>
            <AddExamForm
              fieldsSource={applicationFields}
              patientInfo={currentPatient}
              addRow={addExamData}
            />
          </Fragment>
        )}
      </Grid>
      <Grid item xs={12}>
        <ExamTable
          columns={columns}
          //data={dataExam}
          data={data}
          //getRowProps={row => ({onClick: () => editRow(row.values)})}
          //updateMyData={updateMyData}
          //skipPageReset={skipPageReset}
          //editRow={editRow}
          deleteUser={deleteFieldData}
        />
      </Grid>
    </Grid>
  );
}
//<AddExamForm addRow={addExamData} />
//{(data.length&&<AddExamForm addRow={addExamData} />)}

/*
	{
        Header: 'ACCIONES',
        accessor: "actions",
        Cell: (props) => {
          //const rowIdx = props.row.id;
					const rowIdx = props.row.original;
          return (
            <div>
              <EditIcon cursor='pointer' onClick={() => editRow(rowIdx)} >
              </EditIcon>

              <DeleteIcon cursor='pointer' onClick={() => console.log(rowIdx)}>
              </DeleteIcon>
            </div>
          );
        },
      },

*/

/*
	getRowProps={row => ({
							onClick: () => console.log(JSON.stringify(row.values)),
							style: {
								cursor: "pointer"
							}
						})}

*/
