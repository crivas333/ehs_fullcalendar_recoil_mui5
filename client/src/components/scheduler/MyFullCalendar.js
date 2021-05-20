import React, { useState } from "react";
//import { useRecoilState } from "recoil";
//import { appoEvtState } from "../../context/recoilStore";
import FullCalendar from "@fullcalendar/react";
//import { formatDate } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import request from "graphql-request";

import EventDialog from "./EventDialog";
import "./styling.css";
//import { useStore } from "../../context/GlobalStore";

import {
  ADD_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  //GET_APPOINTMENTS_BY_TIMEFRAME,
} from "../../graphqlClient/gqlQueries";
//import { id } from "date-fns/locale";

// id: id,
// appointmentId: appointmentId,
// title: a.type,
// start: a.start,
// end: a.end,
// status: a.status,
// patient: a.patient,
// fullName: a.fullName,
// notRegistered: a.notRegistered,
// description: a.description,
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

function renderEventContent(eventInfo) {
  //console.log("renderEventContent", eventInfo);
  //<b>{eventInfo.timeText}</b>
  //<i>{eventInfo.event.extendedProps.type}</i>
  //<b>{eventInfo.event.id}</b>

  return (
    <>
      <b>{eventInfo.timeText}</b>&nbsp;
      <i>{eventInfo.event.extendedProps.type}</i>&nbsp;
      <i>{eventInfo.event.extendedProps.fullName}</i>
      <i>{eventInfo.event.extendedProps.notRegistered}</i>
    </>
  );
}
// const formatEvents111 = async (info) => {
//   try {
//     const res = await request("/graphql", GET_APPOINTMENTS_BY_TIMEFRAME, {
//       start: info.start,
//       end: info.end,
//     });
//     //console.log("loadOptions-res:", res.getAppointmentsByTimeframe);
//     console.log(
//       res.getAppointmentsByTimeframe.map((a) => ({
//         id: a.appointmentId,
//         title: a.appointmentType,
//         start: new Date(parseInt(a.start)).toISOString(),
//         end: new Date(parseInt(a.start)).toISOString(),
//       }))
//     );

//     if (res && res.getAppointmentsByTimeframe) {
//       return res.getAppointmentsByTimeframe.map((a) => ({
//         id: a.appointmentId,
//         title: a.appointmentType,
//         start: new Date(parseInt(a.start)).toISOString(),
//         end: new Date(parseInt(a.end)).toISOString(),
//       }));
//     }
//     return [];
//   } catch (err) {
//console.log('AsyncSelectAC - error: ',err)
//     console.log(err);
//   }
// };

export default function MayFullCalendar() {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [evt, setEvt] = useState(initialEvt);
  const calendarRef = React.useRef(null);

  // React.useEffect(() => {
  //   //console.log("evenTemp1: ", eventTemp);
  //   //eventTemp = { title: "newTitle" };
  //   // useStore.setState((state) => ({
  //   //   ...state,
  //   //   eventTemp,
  //   // }));
  //   //setEventTemp({ title: "newTitle", title2: "newTitle2" });
  //   //console.log("evenTemp2: ", eventTemp);
  //   //setAppoEvt({ title: "newTitle", title2: "newTitle2" });
  // }, []);

  // const fetchEvents = (fetchInfo, successCallback, failureCallback) => {
  //   console.log("fetchEvents: ", fetchInfo);
  //   formatEvents111(fetchInfo)
  //     .then((events) => {
  //       successCallback(events);
  //     })
  //     .catch((error) => {
  //       failureCallback(error);
  //     });
  // };

  const handleCloseDialog = () => {
    setOpenEventDialog(false);
  };

  //const eventAdding = async (data) => {};
  const eventChanging = async (changeInfo) => {
    console.log("eventChanging: ", changeInfo);
    try {
      const res = await request("/graphql", UPDATE_APPOINTMENT, {
        id: changeInfo.event.id,
        appointmentInput: {
          start: changeInfo.event.startStr,
          end: changeInfo.event.endStr,
          type: changeInfo.event.extendedProps.type,
          status: changeInfo.event.extendedProps.status,
          patientId: changeInfo.event.extendedProps.patientId || null,
          fullName: changeInfo.event.extendedProps.fullName || "",
          notRegistered: changeInfo.event.extendedProps.notRegistered || "",
          description: changeInfo.event.extendedProps.description || "",
          appointmentId: changeInfo.event.extendedProps.appointmentId,
          backgroundColor: changeInfo.event.backgroundColor,
        },
      });
      if (res && res.updateAppointment) {
        //console.log("updateAppointment", res.updateAppointment);
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents();
      }
    } catch (err) {
      console.log(err);
    }
  };
  //const eventRemoving = async () => {};

  const handleAddingEvt = async (data) => {
    console.log("FC-handleAddingEvt", data);
    //console.log("eventAdding: ", addInfo);
    switch (data.status) {
      case "PROGRAMADA":
        data.backgroundColor = "#F57F17";
        break;
      case "CONFIRMADA":
        data.backgroundColor = "#7fa900";
        break;
      case "POSTERGADA":
        data.backgroundColor = "#8e24aa";
        break;
      case "CANCELADA":
        data.backgroundColor = "#92a8d1";
        break;
      case "ATENDIDA":
        data.backgroundColor = "#808080";
        break;
      default:
    }
    try {
      const res = await request("/graphql", ADD_APPOINTMENT, {
        appointmentInput: {
          start: data.start,
          end: data.end,
          type: data.type,
          status: data.status,
          patientId: data.patientId,
          fullName: data.fullName,
          notRegistered: data.notRegistered,
          description: data.description,
          backgroundColor: data.backgroundColor,
        },
      });
      if (res && res.addAppointment) {
        console.log(res.addAppointment);
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents();
      }
    } catch (err) {
      console.log(err);
    }
    setEvt(initialEvt);
  };
  const handleChangingEvt = async (data) => {
    console.log("handleChangingEvt", data);
    switch (data.status) {
      case "PROGRAMADA":
        data.backgroundColor = "#F57F17";
        break;
      case "CONFIRMADA":
        data.backgroundColor = "#7fa900";
        break;
      case "POSTERGADA":
        data.backgroundColor = "#8e24aa";
        break;
      case "CANCELADA":
        data.backgroundColor = "#92a8d1";
        break;
      case "ATENDIDA":
        data.backgroundColor = "#808080";
        break;
      default:
    }
    try {
      const res = await request("/graphql", UPDATE_APPOINTMENT, {
        id: data.id,
        appointmentInput: {
          start: data.start,
          end: data.end,
          appointmentId: data.appointmentId, //it is not defined in appointmentInput
          type: data.type,
          status: data.status,
          patientId: data.patientId,
          fullName: data.fullName,
          notRegistered: data.notRegistered,
          description: data.description,
          backgroundColor: data.backgroundColor,
        },
      });
      if (res && res.updateAppointment) {
        //console.log("updateAppointment", res.updateAppointment);
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents();
      }
    } catch (err) {
      console.log(err);
    }
    setEvt(initialEvt);
  };
  const handleRemovingEvt = async (data) => {
    console.log("handleRemovingEvt", data);

    try {
      const res = await request("/graphql", DELETE_APPOINTMENT, {
        id: data.id,
      });
      if (res && res.deleteAppointment) {
        console.log("deleteAppointment", res.deleteAppointment);
        const calendarApi = calendarRef.current.getApi();
        calendarApi.refetchEvents();
      }
    } catch (err) {
      console.log(err);
    }
    setEvt(initialEvt);
  };

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setIsEditing(false);
    setEvt({
      id: null,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      appointmentId: "",
      type: "CONSULTA",
      status: "PROGRAMADA",
      patientId: null,
      fullName: "",
      notRegistered: "",
      description: "",
      backgroundColor: "",
    });
    setOpenEventDialog(true);
  };
  const handleEventClick = (clickInfo) => {
    console.log("MyFC-handleEventClick: ", clickInfo.event);
    setIsEditing(true);
    setEvt({
      id: clickInfo.event.id,
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      type: clickInfo.event.extendedProps.type,
      status: clickInfo.event.extendedProps.status,
      patientId: clickInfo.event.extendedProps.patientId || null,
      fullName: clickInfo.event.extendedProps.fullName || "",
      notRegistered: clickInfo.event.extendedProps.notRegistered || "",
      description: clickInfo.event.extendedProps.description || "",
      appointmentId: clickInfo.event.extendedProps.appointmentId,
    });
    setOpenEventDialog(true);
  };

  const handleEvents = (events) => {
    //console.log("handleEvents called after evenSet: do nothing by now");
    // this.setState({
    //   currentEvents: events,
    // });
  };
  return (
    <div className="demo-app">
      {/*{this.renderSidebar()}*/}
      <div className="demo-app-main">
        <FullCalendar
          //slotMinHeight={50}
          //eventMinHeight={50}
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          contentHeight="auto"
          views={{
            dayGridMonth: {
              titleFormat: {
                year: "numeric",
                //month: "2-digit",
                month: "short",
                //day: "2-digit",
              },
            },
            timeGridWeek: {
              titleFormat: {
                //year: "numeric",
                //month: "2-digit",
                month: "short",
                day: "2-digit",
              },
            },
            timeGridWeekDays: {
              type: "timeGrid",
              //duration: { days: 7 },
              //hiddenDays: [0, 6],
              duration: { days: 5 },
              buttonText: "5 day",
            },
            timeGridDay: {
              titleFormat: {
                year: "numeric",
                month: "short",
                day: "2-digit",
              },
            },
            // timeGridDay: {
            //   titleFormat: {
            //     year: "numeric",
            //     month: "2-digit",
            //     day: "2-digit",
            //   },
            // },
          }}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,timeGridWeekDays",
          }}
          initialView="timeGridDay"
          //selectHelper={true}
          allDaySlot={false}
          slotDuration={"00:20:00"}
          slotMinTime={"07:00:00"}
          firstDay={1} //Monday
          //eventMaxStack={3}
          nowIndicator={true}
          //eventLimit={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          eventColor="Tile"
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          //eventAdd={eventAdding}
          eventChange={eventChanging}
          //eventRemove={eventRemoving}
          //eventChange={(txt) => console.log("eventChanged: ", txt)}
          //dateClick={this.handleDateClick}
          events={"/api/v1/fullCalendar/getDataFull"} //!!!!!!!!!!!!!!!!!!! ok
          //datesSet={formatEvents111}
          locale={"es-PE"}
        />

        <EventDialog
          show={openEventDialog}
          isEditing={isEditing}
          evt={evt}
          closeDialog={handleCloseDialog}
          handleAddingEvt={handleAddingEvt}
          handleChangingEvt={handleChangingEvt}
          handleRemovingEvt={handleRemovingEvt}
        />
      </div>
    </div>
  );
}
