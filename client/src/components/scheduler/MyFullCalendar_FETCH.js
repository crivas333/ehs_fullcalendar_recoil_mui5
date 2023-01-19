import React, { useState } from "react";
import axios from "axios";
//import { useRecoilState } from "recoil";
//import { appoEvtState } from "../../context/recoilStore";
//import Tooltip from "@material-ui/core/Tooltip";
import Tooltip from "@mui/material/Tooltip";
//import Typography from "@material-ui/core/Typography";
import FullCalendar from "@fullcalendar/react";
//import { CalendarOptions } from '@fullcalendar/core'
//import { formatDate } from '@fullcalendar/react';
//import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import listPlugin from "@fullcalendar/list";

import request from "graphql-request";

import EventDialog from "./EventDialog";
import "./styling.css";
//import { useStore } from "../../context/GlobalStore";

import {
  ADD_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  //GET_APPOINTMENTS_BY_TIMEFRAME,
} from "../../graphqlClient/gqlQueries_appointments";
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

const getEvents = (info, successCallback) => {
  getCalendarEvents(info.startStr, info.endStr).then((events) => {
    //console.log("events: ", events);
    successCallback(events);
  });
};
async function getCalendarEvents111(start, end) {
  const res = await axios.get(
    //"http://localhost:4000/api/v1/fullCalendar/getDataFull",
    "http://192.168.8.103:4000/api/v1/fullCalendar/getDataFull",
    {
      params: { start: start, end: end },
    }
  );
  console.log("res-events: ", res.data);
  return res.data;
}
async function getCalendarEvents(start, end) {
  const res = await fetch(
    //`http://localhost:4000/api/v1/fullCalendar/getDataFull?start=${start}&end=${end}`,
    //`http://192.168.8.103:4000/api/v1/fullCalendar/getDataFull?start=${start}&end=${end}`
    `/api/v1/fullCalendar/getDataFull?start=${start}&end=${end}`
  );
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const events = await res.json();
  //console.log("async: ", events);
  return events;
}

function renderEventContent(eventInfo) {
  //console.log("renderEventContent", eventInfo);
  //const calendarApi = calendarRef.current.getApi();
  //let calendarApi = eventInfo.view.calendar;
  return (
    <>
      <Tooltip
        placement="bottom-start"
        title={
          <>
            <b>{eventInfo.timeText}</b>&nbsp;
            <i>{eventInfo.event.extendedProps.type}</i>
            <br />
            <span>{eventInfo.event.extendedProps.fullName}</span>
            <span>{eventInfo.event.extendedProps.notRegistered}</span>
            <br />
            <span>{eventInfo.event.extendedProps.status}</span>
            <br />
            <span>{eventInfo.event.extendedProps.description}</span>
          </>
        }
      >
        <div className="div.fc-event-main">
          {eventInfo.view.type === "timeGridDay" ? (
            <>
              <b>{eventInfo.timeText}</b>&nbsp;
              <i>{eventInfo.event.extendedProps.type}</i>
              <br />
              <span>{eventInfo.event.extendedProps.fullName}</span>
              <span>{eventInfo.event.extendedProps.notRegistered}</span>
            </>
          ) : (
            <>
              <b>
                {eventInfo.timeText}
                <br />
              </b>
              <i>{eventInfo.event.extendedProps.type}</i>
            </>
          )}
        </div>
      </Tooltip>
    </>
  );
}

export default function MayFullCalendar() {
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [evt, setEvt] = useState(initialEvt);
  //const [weekends, setWeekends] = useState(false);
  const [shift, setShift] = useState("13:00:00");
  const calendarRef = React.useRef(null);

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
    const calendarApi = calendarRef.current.getApi();
    //calendarApi.refetchEvents();

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
        calendarApi.addEvent(
          {
            id: res.addAppointment.id,
            start: data.start,
            end: data.end,
            backgroundColor: res.addAppointment.backgroundColor,
            extendedProps: {
              type: res.addAppointment.type,
              status: res.addAppointment.status,
              patientId: res.addAppointment.patientId,
              fullName: res.addAppointment.fullName,
              notRegistered: res.addAppointment.notRegistered,
              description: res.addAppointment.description,
              appointmentId: res.addAppointment.appointmentId,
            },
          },
          true
        );
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
    <div>
      <FullCalendar
        //slotMinHeight={50} //done in CSS
        //eventMinHeight={15} //ignored due to slotMinHeight setting in CSS
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
            hiddenDays: [0, 6],
            duration: { days: 7 },
            buttonText: "5-Day",
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
          //right: "dayGridMonth,timeGridWeek,timeGridDay,timeGridWeekDays",
          right:
            "dayGridMonth,timeGridWeek,timeGridDay timeGridWeekDays,shiftButton,",
        }}
        customButtons={{
          // weekendsButton: {
          //   text: "[5]-[7]",
          //   click: function () {
          //     setWeekends((prev) => !prev);
          //   },
          // },
          shiftButton: {
            text: "[1]-[1/2]",
            click: function () {
              if (shift === "07:00:00") setShift("13:00:00");
              if (shift === "13:00:00") setShift("07:00:00");
            },
          },
        }}
        //weekends={weekends}
        initialView="timeGridWeekDays"
        //selectHelper={true}
        allDaySlot={false}
        slotDuration={"00:20:00"}
        //slotMinTime={"07:00:00"}
        slotMinTime={shift}
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
        //events={"/api/v1/fullCalendar/getDataFull"} //!!!!!!!!!!!!!!!!!!! ok
        events={(info, successCallback) => getEvents(info, successCallback)}
        //lazyFetching={false}
        //datesSet={formatEvents111}
        //locale={"es-PE"}
        locale={"es"}
        //timezone='America/Lima'
        //eventDidMount={handleEventDidMount}
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
  );
}
/*
async function getCalendarEvents(start, end) {
  const res = await fetch(
    `http://localhost:4000/api/v1/fullCalendar/getDataFull?start=${start}&end=${end}`,
    {
      //mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin",
      //credentials: "include",
      headers: {
        //"Content-Type": "application/json",
        //"Content-Type": "application/x-www-form-urlencoded",
        //accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        //"Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const events = await res.json();
  //console.log("async: ", events);
  return events;
}
*/
/*
async function getCalendarEvents(start, end) {
  const res = await fetch(
    "http://localhost:4000/api/v1/fullCalendar/getDataFull?",
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        start: start,
        end: end,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

*/
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

/*
 var min = 1;
      var max = 100;
      var rand =  min + (Math.random() * (max-min));
*/
// customButtons: {
//   addEventButton: {
//     text: 'add event...',
//     click: function() {}
//   }
// }
