let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "All-day event",
//     start: todayStr,
//     //end: todayStr + "T01:00:00",
//   },
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: todayStr + "T12:00:00",
//     //end: todayStr + "T13:00:00",
//   },
// ];
export const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: new Date(),
    end: new Date().toISOString() + 1,
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T24:00:00",
    //end: todayStr + "T13:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
