import create from "zustand";

export const useStore = create((set) => ({
  appointment: "",
  //eventTemp: { title: "test" },
  evetTemp: {},
  setEventTemp: (eventTemp) =>
    set((state) => ({
      ...state,
      eventTemp,
    })),
  //setEventTemp: (item)=set()
}));
