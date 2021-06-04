import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import request from "graphql-request";
import { useQuery } from "react-query";
//import SiteLayout from "../layouts/SiteLayout";
import PatientView from "./PacientView";
import CalendarView from "./Calendar";
import AppoitmentsView from "./Appointments";
import EncounterView from "./Encounter";
import ExamsView from "./ExamView";
import ReportsView from "./ReportsView";
import SystemConfigView from "./SystemConfig";
import { GET_APPLICATIONSFIELDS } from "../graphqlClient/gqlQueries";

import { GlobalContext } from "../context/GlobalState";
const SiteLayout = React.lazy(() => import("../layouts/SiteLayout"));
// const PatientView = React.lazy(() => "./PacientView");
// const CalendarView = React.lazy(() => "./Calendar");
// const AppoitmentsView = React.lazy(() => "./Appointments");
// const EncounterView = React.lazy(() => "./Encounter");
// const ExamsView = React.lazy(() => "./ExamView");
// const ReportsView = React.lazy(() => "./ReportsView");
// const SystemConfigView = React.lazy(() => "./SystemConfig");

export default function Pages() {
  // const { getApplicationFieldsAPOLLO } = React.useContext(GlobalContext);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     await getApplicationFieldsAPOLLO();
  //   }
  //   fetchData();
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const { isLoading, isError, data, error } = useQuery(
    ["applicationFields"],
    async () => {
      const res = await request("/graphql", GET_APPLICATIONSFIELDS);
      console.log(res.getApplicationFields);
      if (res && res.getApplicationFields) {
        return res.getApplicationFields;
      } else {
        throw new Error("Network response was not ok");
      }
    }
  );

  return (
    <>
      <Suspense fallback={<div>Suspense: Loading...</div>}>
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
      </Suspense>
    </>
  );
}

/*
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

*/

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
