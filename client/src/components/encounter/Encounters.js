import React, { useState } from "react";
//import clsx from 'clsx';
import { useQueryClient, useQuery, useMutation } from "react-query";
import request from "graphql-request";
import addDays from "date-fns/addDays";

import {
  //selector,
  useRecoilValue,
  //useRecoilValue,
  //useSetRecoilState,
} from "recoil";
//import DateTimePicker from "@material-ui/lab/DateTimePicker";
//import Box from "@material-ui/core/Box";
//import Notify from "../notification/Notify";
//import Table from "./TableFiltered";

import { GET_ENCOUNTERS_BY_PATIENT_ID } from "../../graphqlClient/gqlQueries_encounters";
import { searchDateState } from "../../context/RecoilStore";

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
const data = [];
export default function Encounter(props) {
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const searchDate = useRecoilValue(searchDateState);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [openDeleteEventDialog, setOpenDeleteEventDialog] = useState(false);
  const [evt, setEvt] = useState(initialEvt);

  const queryClient = useQueryClient();
  //const classes = useStyles()

  React.useEffect(() => {
    console.log(searchDate);
  }, [searchDate]);

  const { isLoading, isError, data, error } = useQuery(
    ["encountersById", searchDate],
    async () => {
      const res = await request("/graphql", GET_ENCOUNTERS_BY_PATIENT_ID, {
        start: searchDate.toDateString(),
        end: addDays(searchDate, 1),
      });
      //return data.getAppointmentsByTimeframe;
      console.log(res.getAppointmentsByTimeframe);
      if (res && res.getAppointmentsByTimeframe) {
        return res.getAppointmentsByTimeframe.map((a) => ({
          id: a.id,
          historyId: a.patientId !== null ? a.patientId.historyId : "",
          fullName: a.patientId !== null ? a.patientId.fullName : "",
          notRegistered: a.notRegistered,
          //start: new Date(parseInt(a.start)).toISOString(),
          //end: new Date(parseInt(a.end)).toISOString(),
          start: new Date(a.start).toISOString(),
          end: new Date(a.end).toISOString(),
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

  return (
    <div>
      {/* <Table
        //columns={columns}
        data={data}
        //handleAddEvt={handleAddingEvt}
      /> */}
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
