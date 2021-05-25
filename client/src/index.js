import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { request } from "graphql-request";

import { ThemeProvider, StyledEngineProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
//import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider' //it does not work
//import fetch from 'cross-fetch'
import App from "./App";
import { GlobalProvider } from "./context/GlobalState";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./graphqlClient/reactQueryClient";
import { IS_THERE_OPEN_SESSION } from "./graphqlClient/gqlQueries";
//import {IS_THERE_OPEN_SESSION_FETCH } from './apolloConfig/gqlQueries-fetch'
//import Notify from './components/notification/Notify';

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
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      //main: red.A400,
      main: "#19857b",
    },
    background: {
      default: "#fff",
    },
  },
});
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
              <React.StrictMode>
                <AppComponent />
              </React.StrictMode>
            </GlobalProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </RecoilRoot>
  );

  ReactDOM.render(RootApp(App), document.getElementById("root"));
};

(async () => renderApp(await checkLoggedIn()))();

//ReactDOM.render(ApolloApp(App), document.getElementById('root'))

/*
  const ApolloApp = (AppComponent) => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <GlobalProvider>
            <React.StrictMode>
              <AppComponent />
            </React.StrictMode>
          </GlobalProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );

*/
// async function checkLoggedIn111 (currSession) {
//   const requestBody = {
//     query: IS_THERE_OPEN_SESSION_FETCH
//   }
//   // const requestBody = {
//   //   query: `
//   //   query{
//   //     openSession{
//   //       id
//   //       firstName
//   //       lastName
//   //       userName
//   //       email
//   //     }
//   //   }
//   // `
//   // }

//   // currSession = await fetch('http://localhost:4000/graphql', {
//   currSession = await fetch('/graphql', {
//     method: 'POST',
//     credentials: 'same-origin',
//     // credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(requestBody)
//   })
//     .then(res => {
//       if (res.status !== 200 && res.status !== 201) {
//         throw new Error('Failed!')
//       }
//       return res.json()
//     })
//     .then(resData => {
//       // const events = resData.data;
//       // console.log("fetch: ",resData.data);
//       const currentSession = resData.data.openSession
//       return (currentSession)
//     })
//     .catch(err => {
//       console.log(err)
//     })
//     // console.log("currSession: ",currSession);
//   return (currSession)
// }
