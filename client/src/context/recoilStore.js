import { atom } from "recoil";
export const appoEvtState = atom({
  key: "appEvtState", // unique ID (with respect to other atoms/selectors)
  default: {
    appointmentType: "CONSULTA",
    appointmentStatus: "PROGRAMADA",
    start: "",
    end: "",
    fullname: "",
  }, // default value (aka initial value)
});