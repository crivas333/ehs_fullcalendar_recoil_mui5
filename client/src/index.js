import React from "react";
//import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { request } from "graphql-request";

//import { ThemeProvider, StyledEngineProvider } from "@material-ui/core/styles";
//import { createTheme } from "@material-ui/core/styles";
//////import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider' //it does not work
//import fetch from 'cross-fetch'

import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
//} from "@mui/material";

import App from "./App";
//import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import esLocale from "date-fns/locale/es";
import { GlobalProvider } from "./context/GlobalState";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./graphqlClient/reactQueryClient";
import { IS_THERE_OPEN_SESSION } from "./graphqlClient/gqlQueries";
//import {IS_THERE_OPEN_SESSION_FETCH } from './apolloConfig/gqlQueries-fetch'
//import Notify from './components/notification/Notify';
//const theme = createTheme();
const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

//const theme = createMuiTheme({
// const theme = unstable_createMuiStrictModeTheme({
//   // typography:{
//   //   fontSize: 12
//   // },
//   overrides: {
//     MuiButton: {
//       root: {
//         borderRadius: 8,
//       },
//     },
//   },
// });
// const theme = createTheme({
//   typography: {
//     fontSize: 12,
//   },
//   // palette: {
//   //   primary: {
//   //     main: "#556cd6",
//   //   },
//   //   secondary: {
//   //     main: "#19857b",
//   //   },
//   //   error: {
//   //     //main: red.A400,
//   //     main: "#19857b",
//   //   },
//   //   background: {
//   //     default: "#fff",
//   //   },
//   // },
// });

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#006400",
//     },
//     secondary: {
//       main: "#ffa500",
//     },
//   },
// });

//request(endpoint, query, variables).then((data) => console.log(data))

async function checkLoggedIn() {
  //request('/graphql', IS_THERE_OPEN_SESSION).then((res) => console.log('res:',res.openSession))
  try {
    const res = await request("/graphql", IS_THERE_OPEN_SESSION);
    //console.log('IS THERE OPEN SESSION:', res)
    // if (res.status !== 200 && res.status !== 201) {
    //   throw new Error('Failed!');}
    if (res !== null) return res.openSession;
  } catch (err) {
    console.log("is there open session 1: ", err.response.error);
    console.log("is there open session 2: ", err.response.status);
    //Notify({message:'Verifique la conección con el SERVIDOR', status: 'error'});

    //throw new Error("No hay conección con el servidor");
  }
}

const renderApp = (currSession) => {
  //console.log('currSession: ', currSession)

  sessionStorage.setItem("currSession", JSON.stringify(currSession));
  //var obj = JSON.parse(sessionStorage.getItem('currSession')); // An object :
  //console.log(obj);

  const RootApp = (AppComponent) => (
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <GlobalProvider>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                locale={esLocale}
              >
                <React.StrictMode>
                  <AppComponent />
                </React.StrictMode>
              </LocalizationProvider>
            </GlobalProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </RecoilRoot>
  );

  //ReactDOM.render(RootApp(App), document.getElementById("root"));
  const container = document.getElementById("root");
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(RootApp(App));
};

(async () => renderApp(await checkLoggedIn()))();
