import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import SiteLayout from "../layouts/SiteLayout";
import PatientView from "./Paciente";
//import AppointmentView from './Appointment'
import CalendarView from "./Calendar";
import AppoitmentsView from "./Appointments";
import EncounterView from "./Encounter";
import ExamsView from "./ExamView";
import ReportsView from "./ReportsView";
import SystemConfigView from "./SystemConfig";
import { GlobalContext } from "../context/GlobalState";

export default function Pages() {
  const { getApplicationFieldsAPOLLO } = useContext(GlobalContext);

  useEffect(() => {
    async function fetchData() {
      await getApplicationFieldsAPOLLO();
    }
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SiteLayout>
        <Routes>
          <Route path="/Paciente" element={<PatientView />} />
          <Route path="/Agendamiento" element={<CalendarView />} />
          <Route path="/Citas" element={<AppoitmentsView />} />
          <Route path="/Consulta" element={<EncounterView />} />
          <Route path="/Examenes" element={<ExamsView />} />
          <Route path="/Config" element={<SystemConfigView />} />
          <Route path="/Informes" element={<ReportsView />} />
        </Routes>
      </SiteLayout>
    </>
  );
}

/*
export default function Pages () {
  return (
    <>
      <SiteLayout>
        <main className='main-content'>
          <Routes>
            <Route path='/Paciente' element={<PatientPage />} />
            <Route path='/Citas' element={<AppointmentPage />} />
            <Route path='/Calendario' element={<SchedulerPage />} />
          </Routes>
        </main>
      </SiteLayout>
    </>
  )
}
*/
