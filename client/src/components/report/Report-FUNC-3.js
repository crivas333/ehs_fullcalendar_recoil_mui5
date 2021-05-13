import React, { useState, useEffect } from "react";
import request from "graphql-request";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
//import Modal from "@material-ui/core/Modal";
//import Button from "@material-ui/core/Button";
import AddEventDialog from "./AddEventDialog";
import { GET_APPOINTMENTS } from "../../graphqlClient/gqlQueries";

const formatEvents111 = async () => {
  try {
    const res = await request("/graphql", GET_APPOINTMENTS);
    //console.log("loadOptions-res:", res.appointments);
    // console.log(
    //   res.appointments.map((a) => ({
    //     id: a.appointmentId,
    //     title: a.appointmentType,
    //     start: a.StartTime,
    //     end: a.EndTime,
    //   }))
    // );

    if (res && res.appointments) {
      return res.appointments.map((a) => ({
        id: a.appointmentId,
        title: a.appointmentType,
        start: new Date(parseInt(a.StartTime)).toISOString(),
        end: new Date(parseInt(a.EndTime)).toISOString(),
      }));
    }
    return [];
  } catch (err) {
    //console.log('AsyncSelectAC - error: ',err)
    console.log(err);
  }
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function requestEvents(startStr, endStr) {
  return requestEventsInRange(startStr, endStr);
}
function requestEventsInRange(startStr, endStr) {
  console.log(`[STUB] requesting events from ${startStr} to ${endStr}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_EVENTS); // won't use the start/end, always return whole DB
    }, 2000);
  });
}

const Report = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  //const [currentEvents, setCurrentEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState(INITIAL_EVENTS);
  const [openEventDialog, setOpenEventDialog] = useState(false);

  // useEffect(() => {
  //   const myfetch = async () => {
  //     // let res = await formatEvents111();
  //     // setCurrentEvents(res);
  //     const res = await formatEvents111();
  //     //console.log("useEffect: ", res);
  //     setCurrentEvents(res);
  //     console.log("useEffect-currentEvents: ", currentEvents);
  //   };

  //   myfetch();
  // }, []);
  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  const handleDates = (rangeInfo) => {
    console.log("handleDates");
    //requestEvents(rangeInfo.startStr, rangeInfo.endStr);
    //.catch(reportNetworkError);
    //.catch();
    //const res = formatEvents111();
    //setCurrentEvents(res);
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
    setOpenEventDialog(true);
    //let title = prompt("Please enter a new title for your event");
    let title = "hello";
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  };
  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    //setCurrentEvents(events);
  };

  const fetchEvents = (fetchInfo, successCallback, failureCallback) => {
    formatEvents111(fetchInfo)
      .then((events) => {
        successCallback(events);
      })
      .catch((error) => {
        failureCallback(error);
      });
  };
  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          //ref={(el) => (this.fc = el)}
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
          initialView="dayGridMonth"
          //selectHelper={true}
          //eventlimit={true}
          editable={true}
          selectable={true}
          //selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
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
          //dateClick={this.handleDateClick}
          //events={"{'graphql/events'}"}
          //events={this.formatEvents()}

          //eventDrop={this.handleEventDrop}  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          // events={(fetchInfo, successCallback, failureCallback) => {
          //   //console.log("fetchInfo: ", fetchInfo);
          //   formatEvents111()
          //     .then((res) => console.log(res))
          //     .then((res) => successCallback(res));

          //   //console.log("res::", res.PromiseResult);
          //   // if (res) {
          //   //   successCallback(res);
          //   // } else {
          //   //   failureCallback("error");
          //   // }
          // }}
          //events={"/api/v1/fullCalendar/getDataFull"}
          //events={this.state.currentEvents}
          //events={this.fetchEvents}
          eventSources={fetchEvents}
        />
        <AddEventDialog
          show={openEventDialog}
          //show={false}
          closeDialog={handleCloseDialog}
        />
      </div>
    </div>
  );

  // handleDateClick = (arg) => {
  //   // bind with an arrow function
  //   alert(arg.dateStr);
  // };
};
export default Report;

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

/*
<Dialog
            open={this.state.openEventDialog}
            //onClose={handleCloseCreatePatient}
            scroll="paper"
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Crear Paciente</DialogTitle>
            <DialogContent>
              <DialogContentText>Ingrese Datos del Paciente</DialogContentText>
             
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseDialog} color="primary">
                  CERRAR
                </Button>
              </DialogActions>
            </Dialog>
*/

// formatEvents() {
//   return this.props.appointments.map((appointment) => {
//     const { title, end, start } = appointment;

//     let startTime = new Date(start);
//     let endTime = new Date(end);

//     return {
//       title,
//       start: startTime,
//       end: endTime,
//       extendedProps: { ...appointment },
//     };
//   });
// }

// renderSidebar() {
//   return (
//     <div className="demo-app-sidebar">
//       <div className="demo-app-sidebar-section">
//         <h2>Instructions</h2>
//         <ul>
//           <li>Select dates and you will be prompted to create a new event</li>
//           <li>Drag, drop, and resize events</li>
//           <li>Click an event to delete it</li>
//         </ul>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <label>
//           <input
//             type="checkbox"
//             checked={this.state.weekendsVisible}
//             onChange={this.handleWeekendsToggle}
//           ></input>
//           toggle weekends
//         </label>
//       </div>
//       <div className="demo-app-sidebar-section">
//         <h2>All Events ({this.state.currentEvents.length})</h2>
//         <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//       </div>
//     </div>
//   );
// }
