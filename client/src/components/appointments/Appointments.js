import React, { useState } from "react";
//import clsx from 'clsx';
import { useQueryClient, useQuery, useMutation } from "react-query";
import request from "graphql-request";
//import { makeStyles } from '@material-ui/core/styles'
//import Grid from "@material-ui/core/Grid";
//import { GlobalContext } from "../../context/GlobalState";
import Notify from "../notification/Notify";
import TableOfAppointments from "./TableOfAppointments";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditEventDialog from "./EditEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import {
  ADD_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  GET_APPOINTMENTS_BY_TIMEFRAME,
} from "../../graphqlClient/gqlQueries";

const initialEvt = {
  id: null, //will store MongoDB id
  start: "",
  end: "",
  appointmentId: "",
  type: "CONSULTA",
  status: "PROGRAMADA",
  patientId: null,
  fullName: "",
  notRegistered: "",
  description: "",
  backgroundColor: "",
};

async function createHelper(data) {
  //console.log("addData: ", data);
  const res = await request("/graphql", ADD_APPOINTMENT, data.variables);
  //console.log("addData-res:", res);
  return res.addAppointment;
}
async function updateHelper(data) {
  //console.log("addData: ", data);
  const res = await request("/graphql", UPDATE_APPOINTMENT, data.variables);
  //console.log("addData-res:", res);
  return res.updateAppointment;
}
async function deleteHelper(data) {
  //console.log("addData: ", data);
  const res = await request("/graphql", DELETE_APPOINTMENT, data.variables);
  //console.log("addData-res:", res);
  return res.deleteAppointment;
}
export default function DailyAppointments(props) {
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openDeleteEventDialog, setOpenDeleteEventDialog] = useState(false);
  const [evt, setEvt] = useState(initialEvt);
  const queryClient = useQueryClient();
  //const classes = useStyles()
  // const {
  //   //currentPatient,
  //   //applicationFields,
  //   //dataExam,
  //   //rowExam,
  //   //actionExam,
  //   //updateRowExam_APOLLO,
  //   //updateEditingRowExam,
  //   //updateActionExam,
  //   //getExamByPatientID_APOLLO,
  //   //addExamDataAPOLLO,
  //   //deleteApplicationFieldsAPOLLO,
  // } = useContext(GlobalContext);

  const editRow = (data) => {
    //console.log("Exam - editRow: ", data)
    setEvt({
      id: data.id,
      start: data.start,
      end: data.end,
      type: data.type,
      status: data.status,
      patientId: data.patientId || null,
      fullName: data.fullName || "",
      notRegistered: data.notRegistered || "",
      description: data.description || "",
      appointmentId: data.appointmentId,
    });
    setOpenEventDialog(true);
  };
  const deleteRow = (data) => {
    //console.log("Exam - editRow: ", data);
    setEvt(data);
    setOpenDeleteEventDialog(true);
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
                onClick={() => deleteRow(rowIdx)}
              ></DeleteIcon>
            </div>
          );
        },
      },
      //eslint-disable-next-line react-hooks/exhaustive-deps
    ],
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
          end: new Date(parseInt(a.end)).toISOString(),
          status: a.status,
          type: a.type,
          appointmentId: a.appointmentId,
          patientId: a.patientId !== null ? a.patientId.id : null,
          description: a.description,
        }));
      } else {
        throw new Error("Network response was not ok");
      }
    }
  );

  const addAppointment = useMutation(createHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      queryClient.invalidateQueries("appointments");
      Notify({ message: "Cita añadida", status: "success" });
      //reloadCurrentPatient(data);
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Cita NO añadida",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });
  const updateAppointment = useMutation(updateHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      queryClient.invalidateQueries("appointments");
      Notify({ message: "Cita actualizada", status: "success" });
      //reloadCurrentPatient(data);
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Cita NO actualizada",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });
  const deleteAppointment = useMutation(deleteHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      queryClient.invalidateQueries("appointments");
      Notify({ message: "Cita borrada", status: "success" });
      //reloadCurrentPatient(data);
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Cita NO borrada",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleAddingEvt = (data) => {
    console.log("DailyAppointmente - handeAddingEvt:", data);

    addAppointment.mutate({
      variables: {
        appointmentInput: {
          start: data.start,
          end: data.end,
          //appointmentId: data.appointmentId, //it is not defined in appointmentInput
          type: data.type,
          status: data.status,
          patientId: data.patientId || null,
          fullName: data.fullName || "",
          notRegistered: data.notRegistered || "",
          description: data.description,
          backgroundColor: data.backgroundColor,
        },
      },
    });
  };
  const handleChangingEvt = async (data) => {
    console.log("DailyAppointment-handleChangingEvt", data);
    updateAppointment.mutate({
      variables: {
        id: data.id,
        appointmentInput: {
          start: data.start,
          end: data.end,
          appointmentId: data.appointmentId, //it is not defined in appointmentInput
          type: data.type,
          status: data.status,
          patientId: data.patientId || null,
          fullName: data.fullName || "",
          notRegistered: data.notRegistered || "",
          description: data.description,
          backgroundColor: data.backgroundColor,
        },
      },
    });
    // try {
    //   const res = await request("/graphql", UPDATE_APPOINTMENT, {
    //     id: data.id,
    //     appointmentInput: {
    //       start: data.start,
    //       end: data.end,
    //       appointmentId: data.appointmentId, //it is not defined in appointmentInput
    //       type: data.type,
    //       status: data.status,
    //       patientId: data.patientId || null,
    //       fullName: data.fullName || "",
    //       notRegistered: data.notRegistered || "",
    //       description: data.description,
    //       backgroundColor: data.backgroundColor,
    //     },
    //   });
    //   if (res && res.updateAppointment) {
    //     console.log("updateAppointment", res.updateAppointment);
    //     //const calendarApi = calendarRef.current.getApi();
    //     //calendarApi.refetchEvents();
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    setEvt(initialEvt);
  };
  const handleRemovingEvt = (data) => {
    //console.log("DailyAppointments - handleRemovingEvt: ", data);
    deleteAppointment.mutate({
      variables: { id: data.id },
    });
  };
  const handleCloseEditDialog = () => {
    setOpenEventDialog(false);
  };
  const handleClosedeleteDialog = () => {
    setOpenDeleteEventDialog(false);
  };
  return (
    <div>
      <TableOfAppointments
        columns={columns}
        data={data}
        handleAddEvt={handleAddingEvt}
      />
      <EditEventDialog
        show={openEventDialog}
        evt={evt}
        closeDialog={handleCloseEditDialog}
        //handleAddingEvt={handleAddingEvt}
        handleChangingEvt={handleChangingEvt}
        handleRemovingEvt={handleRemovingEvt}
      />
      <DeleteEventDialog
        show={openDeleteEventDialog}
        evt={evt}
        closeDialog={handleClosedeleteDialog}
        handleRemovingEvt={handleRemovingEvt}
      />
    </div>
  );
}

/*
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
*/
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
