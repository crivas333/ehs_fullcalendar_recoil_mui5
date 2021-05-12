import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import request from "graphql-request";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
//import Modal from "@material-ui/core/Modal";
//import Button from "@material-ui/core/Button";
import AddEventDialog from "./AddEventDialog";
import axios from "axios";
import { GET_APPOINTMENTS } from "../../graphqlClient/gqlQueries";

let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const formatEvents111 = async () => {
  //return INITIAL_EVENTS;
  // const res = await request("/graphql", GET_APPOINTMENTS);
  // return res.appointments;
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

export default class DemoApp extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    openEventDialog: false,
  };
  // componentDidMount() {
  //   axios
  //     .get("/api/v1/fullCalendar/getDataFull")
  //     .then((response) => {
  //       this.setState({ event: response.data });
  //       console.log({ calendarEvents: response.data });
  //       //console.log(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  render() {
    return (
      <div className="demo-app">
        {/*{this.renderSidebar()}*/}
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
            weekends={this.state.weekendsVisible}
            //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
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
            eventSources={this.fetchEvents}
          />

          <AddEventDialog
            show={this.state.openEventDialog}
            //show={false}
            closeDialog={this.handleCloseDialog}
          />
        </div>
      </div>
    );
  }

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
  fetchEvents(fetchInfo, successCallback, failureCallback) {
    formatEvents111(fetchInfo)
      .then((events) => {
        successCallback(events);
      })
      .catch((error) => {
        failureCallback(error);
      });
  }
  // handleDateClick = (arg) => {
  //   // bind with an arrow function
  //   alert(arg.dateStr);
  // };

  handleCloseDialog = () => {
    this.setState({
      openEventDialog: false,
    });
  };
  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    this.setState({ openEventDialog: true });
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

  handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

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
