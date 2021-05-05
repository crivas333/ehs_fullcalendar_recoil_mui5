import React, { useEffect, useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import Notifier from './components/notification/Notifier'; //!!!!!!!!!this works
import {Notifier} from './components/notification/Notifier';
//import './App.css'

import { currSessionVar } from './apolloConfig/apolloClient'

import LandingPage from './pages/Landing'
// import NotFoundPage from './pages/NotFound'
import Pages from './pages'

import { GlobalContext } from './context/GlobalState'
import ScrollToTop from './layouts/ScrollToTop'

function App () {
  // console.log('APP')
  const { isAuth, updateCurrentUser } = useContext(GlobalContext)
 
  //const session = currSessionVar()
  //const session = JSON.parse(sessionStorage.getItem('currSession')); // An object :
  //console.log(session)
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem('currSession')); // An object :
    console.log(session)
   
    async function fetchData() {
      await updateCurrentUser(session)
      
    }
    fetchData();
    return () => {
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // Or [] if effect doesn't need props or state
 //}, [session]); // Or [] if effect doesn't need props or state
  // useEffect(() => {
  //   updateCurrentUser(session)
  //   // console.log(session);
  //   // return () => {
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[session])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {!isAuth && (<Route path='/*' element={<LandingPage />} />)}
        {isAuth && (<Route path='/*' element={<Pages />} />)}
      </Routes>
      <Notifier />
    </BrowserRouter>
  )
}

export default App
