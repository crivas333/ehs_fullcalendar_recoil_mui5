import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { appoEvtState } from "../../context/recoilStore";
import FullCalendar from "@fullcalendar/react";
//import { formatDate } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import request from "graphql-request";
//import { INITIAL_EVENTS, createEventId } from "./event-utils";
//import { createEventId } from "./event-utils";
//import Modal from "@material-ui/core/Modal";
//import Button from "@material-ui/core/Button";
import AddEventDialog from "./AddEventDialog";
//import { useStore } from "../../context/GlobalStore";

//import axios from "axios";
import {
  ADD_APPOINTMENT,
  GET_APPOINTMENTS_BY_TIMEFRAME,
} from "../../graphqlClient/gqlQueries";

const initialEvt = {
  appointmentType: "CONSULTA",
  appointmentStatus: "PROGRAMADA",
  start: "",
  end: "",
  fullName: "",
  notRegistered: "",
};
//let eventGuid = 0;
//let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
function renderEventContent(eventInfo) {
  console.log("renderEventContent");
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
const formatEvents111 = async (info) => {
  try {
    const res = await request("/graphql", GET_APPOINTMENTS_BY_TIMEFRAME, {
      start: info.start,
      end: info.end,
    });
    //console.log("loadOptions-res:", res.getAppointmentsByTimeframe);
    console.log(
      res.getAppointmentsByTimeframe.map((a) => ({
        id: a.appointmentId,
        title: a.appointmentType,
        start: new Date(parseInt(a.start)).toISOString(),
        end: new Date(parseInt(a.start)).toISOString(),
      }))
    );

    if (res && res.getAppointmentsByTimeframe) {
      return res.getAppointmentsByTimeframe.map((a) => ({
        id: a.appointmentId,
        title: a.appointmentType,
        start: new Date(parseInt(a.start)).toISOString(),
        end: new Date(parseInt(a.end)).toISOString(),
      }));
    }
    return [];
  } catch (err) {
    //console.log('AsyncSelectAC - error: ',err)
    console.log(err);
  }
};

export default function DemoApp() {
  //calendarRef = React.createRef();
  const [openEventDialog, setOpenEventDialog] = useState(false);
  //const eventTemp = useStore((state) => state.eventTemp);
  //const eventTemp = useStore.getState().eventTemp;
  //const setEventTemp = useStore((store) => store.setEventTemp);
  //const [appoEvt, setAppoEvt] = useRecoilState(appoEvtState);
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

  const fetchEvents = (fetchInfo, successCallback, failureCallback) => {
    console.log("fetchEvents: ", fetchInfo);
    formatEvents111(fetchInfo)
      .then((events) => {
        successCallback(events);
      })
      .catch((error) => {
        failureCallback(error);
      });
  };

  const handleCloseDialog = () => {
    setOpenEventDialog(false);
  };

  const eventAdding = async (addInfo) => {
    try {
      const res = await request("/graphql", ADD_APPOINTMENT, {
        appointmentInput: {
          appointmentType: addInfo.event.title,
          appointmentStatus: addInfo.event._def.extendedProps.status,
          start: addInfo.event.start,
          end: addInfo.event.end,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleEvt = (val) => {
    console.log("Report-handleEvt-evt", val);
  };
  const handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    setEvt({
      ...evt,
      start: new Date(selectInfo.start).toISOString(),
      end: selectInfo.endStr,
      //start: selectInfo.start,
      //end: selectInfo.end,
    });

    setOpenEventDialog(true);
  };
  const handleEventClick = (clickInfo) => {};

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
          //ref={(el) => (this.fc = el)}
          //ref={this.calendarRef}
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
          //dateClick={this.handleDateClick}
          events={"/api/v1/fullCalendar/getDataFull"} //!!!!!!!!!!!!!!!!!!! ok
          //datesSet={formatEvents111}
          locale={"es-PE"}
        />

        <AddEventDialog
          show={openEventDialog}
          evt={evt}
          closeDialog={handleCloseDialog}
          handleEvt={handleEvt}
        />
      </div>
    </div>
  );
}
