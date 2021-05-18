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
//import { useStore } from "../../context/GlobalStore";

import {
  ADD_APPOINTMENT,
  //GET_APPOINTMENTS_BY_TIMEFRAME,
} from "../../graphqlClient/gqlQueries";

const initialEvt = {
  type: "CONSULTA",
  status: "PROGRAMADA",
  start: "",
  end: "",
  patient: null,
  fullName: "",
  notRegistered: "",
  description: "",
};

function renderEventContent(eventInfo) {
  //console.log("renderEventContent", eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
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

  React.useEffect(() => {
    //console.log("evenTemp1: ", eventTemp);
    //eventTemp = { title: "newTitle" };
    // useStore.setState((state) => ({
    //   ...state,
    //   eventTemp,
    // }));
    //setEventTemp({ title: "newTitle", title2: "newTitle2" });
    //console.log("evenTemp2: ", eventTemp);
    //setAppoEvt({ title: "newTitle", title2: "newTitle2" });
  }, []);

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

  const eventAdding = async (addInfo) => {
    //console.log("eventAdding: ", addInfo);
    try {
      const res = await request("/graphql", ADD_APPOINTMENT, {
        appointmentInput: {
          start: addInfo.event.start,
          end: addInfo.event.end,
          type: addInfo.event.title,
          status: addInfo.event.extendedProps.status,
          patient: addInfo.event.extendedProps.patient,
          fullName: addInfo.event.extendedProps.fullName,
          notRegistered: addInfo.event.extendedProps.notRegistered,
          description: addInfo.event.extendedProps.description,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const eventChanging = async () => {};
  const eventRemoving = async () => {};

  const handleAddingEvt = (data) => {
    //console.log("Report-handleEvt-evt", evt);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent(
      {
        title: data.type,
        start: data.start,
        end: data.end,
        extendedProps: {
          patient: data.patient || null,
          fullName: data.fullName || "",
          notRegistered: data.notRegistered || "",
          status: data.status || "",
          description: data.description,
        },
        //allDay: selectInfo.allDay,
      },
      true
    );
    setEvt(initialEvt);
  };
  const handleChangingEvt = (data) => {
    console.log("handleChangingEvt", data);
  };
  const handleRemovingEvt = () => {};

  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setIsEditing(false);
    // setEvt({
    //   ...evt,
    //   start: selectInfo.startStr,
    //   end: selectInfo.endStr,
    // });
    setEvt({
      type: "CONSULTA",
      status: "PROGRAMADA",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      patient: null,
      fullName: "",
      notRegistered: "",
      description: "",
    });
    setOpenEventDialog(true);
  };
  const handleEventClick = (clickInfo) => {
    console.log("MyFC-handleEventClick: ", clickInfo.event);
    setIsEditing(true);
    setEvt({
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
      type: clickInfo.event.title,
      status: clickInfo.event.extendedProps.status,
      patient: clickInfo.event.extendedProps.patient || null,
      fullName: clickInfo.event.extendedProps.fullName || "",
      notRegistered: clickInfo.event.extendedProps.notRegistered || "",
      description: clickInfo.event.extendedProps.description || "",
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
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="timeGridWeek"
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
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          eventAdd={eventAdding}
          eventChange={eventChanging}
          eventRemove={eventRemoving}
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
