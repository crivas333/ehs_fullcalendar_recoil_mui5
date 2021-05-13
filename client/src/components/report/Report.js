import React from "react";
import FullCalendar from "@fullcalendar/react";
//import { formatDate } from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import request from "graphql-request";
//import { INITIAL_EVENTS, createEventId } from "./event-utils";
import { createEventId } from "./event-utils";
//import Modal from "@material-ui/core/Modal";
//import Button from "@material-ui/core/Button";
import AddEventDialog from "./AddEventDialog";
//import axios from "axios";
import {
  ADD_APPOINTMENT,
  GET_APPOINTMENTS_BY_TIMEFRAME,
} from "../../graphqlClient/gqlQueries";

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
  const [openEventDialog, setOpenEventDialog] = React.useState(false);

  const calendarRef = React.useRef(null);
  const fetchEvents = (fetchInfo, successCallback, failureCallback) => {
    //console.log(fetchInfo);
    formatEvents111(fetchInfo)
      .then((events) => {
        successCallback(events);
      })
      .catch((error) => {
        failureCallback(error);
      });
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

  const handleCloseDialog = () => {
    setOpenEventDialog(false);
  };

  // const handleWeekendsToggle = () => {
  //   // this.setState({
  //   //   weekendsVisible: !this.state.weekendsVisible,
  //   // });
  //   setWeekendsVisible((prev) => !prev);
  // };

  const handleDateSelect = (selectInfo) => {
    //this.setState({ openEventDialog: true });
    //let title = prompt("Please enter a new title for your event");
    let title = "hello";
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent(
        {
          //id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,

          extendedProps: {
            status: "Programada",
            //description: "mydesc",
          },
          //allDay: selectInfo.allDay,
        },
        true
      );
    }
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
          // views={{
          //   rollingSevenDay: {
          //     type: "dayGrid",
          //     duration: { days: 7 },
          //     dateIncrement: { days: 1 }
          //   }
          // }}
          //initialView="dayGridWeek"
          //initialView="dayGridMonth"
          initialView="timeGridWeek"
          //selectHelper={true}
          eventlimit={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          //weekends={this.state.weekendsVisible}
          //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          //eventAdd={(ev) => console.log(ev.event.title)
          // eventAdd={(addInfo) =>
          //   console.log(addInfo.event._def.extendedProps)
          // }
          eventAdd={eventAdding}
          //dateClick={this.handleDateClick}

          //eventDrop={this.handleEventDrop}  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          //events={"http://localhost:3000/api/v1/fullCalendar/getDataFull"} //!!!!!!!!!!!!!!!!!!! ok
          events={"/api/v1/fullCalendar/getDataFull"} //!!!!!!!!!!!!!!!!!!! ok
          //events={this.state.currentEvents} //!!!!!!!!!!!!!!!!!!!!!!!!!!!! NOK
          //events={fetchEvents} //!!!!!!!!!!!!!!!!!!!!11111111!!!!!!!!1  OK
          // eventSources={(
          //   { url: "/api/v1/fullCalendar/getDataFull" },
          //   { events: this.fetchEvents },
          // )}
          // eventSources={
          //   ({ url: "/api/v1/fullCalendar/getDataFull" }, this.fetchEvents)
          // }
          //eventSources={fetchEvents}
          //locale={"es-PE"}
          //calendar.setOption('locale', 'fr');
        />

        <AddEventDialog
          show={openEventDialog}
          //show={false}
          closeDialog={handleCloseDialog}
        />
      </div>
    </div>
  );
}
