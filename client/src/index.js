import React from 'react'
import ReactDOM from 'react-dom'

//import { createMuiTheme } from '@material-ui/core/styles'
//import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import unstable_createMuiStrictModeTheme from '@material-ui/core/styles/createMuiStrictModeTheme';

import {ThemeProvider} from '@material-ui/core/styles'
//import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider' //it does not work
import fetch from 'cross-fetch'
import App from './App'
import { ApolloProvider } from '@apollo/client'
import { GlobalProvider } from './context/GlobalState'
import { client, currSessionVar } from './apolloConfig/apolloClient'
// import { currSessionVar } from './apolloConfig/apolloClient'


//const theme = createMuiTheme({
const theme = unstable_createMuiStrictModeTheme({  
  // typography:{
  //   fontSize: 12
  // },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
      }, 
    }, 
  }, 
}) 

async function checkLoggedIn (currSession) {
  const requestBody = {
    query: `
        query{
          openSession{
            id
            firstName
            lastName
            userName
            email
          }
        }
      `
  }

  // currSession = await fetch('http://localhost:4000/graphql', {
  currSession = await fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      // const events = resData.data;
      // console.log("fetch: ",resData.data);
      const currentSession = resData.data.openSession
      return (currentSession)
    })
    .catch(err => {
      console.log(err)
    })
    // console.log("currSession: ",currSession);
  return (currSession)
}

const renderApp = currSession => {
  // console.log('currSession: ', currSession)
  // currSessionVar({session: signIn, loggedIn: true});
  currSessionVar(currSession)

  const ApolloApp = AppComponent => (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <GlobalProvider>
          <React.StrictMode>
            <AppComponent />
          </React.StrictMode>
        </GlobalProvider>
      </ApolloProvider>
    </ThemeProvider>
  )

  ReactDOM.render( ApolloApp(App), document.getElementById('root'))
}

(async () => renderApp(await checkLoggedIn()))()


//ReactDOM.render(ApolloApp(App), document.getElementById('root'))