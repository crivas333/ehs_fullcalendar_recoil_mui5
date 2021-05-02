import React, { useState, useContext } from 'react'
// import { CustomPatient } from "../components/CustomPatient";
// import { PatientForm } from "../components/PatientForm";
// import { BuilderForm } from "../components/BuilderForm";
import { useMutation } from '@apollo/client'
import { SIGNIN, SIGNUP } from '../apolloConfig/gqlQueries'
// import { IS_USER_LOGGED_IN, ME } from "../apolloConfig/gqlQueries";
// import {client} from '../apolloConfig/apolloClient';
import { currSessionVar } from '../apolloConfig/apolloClient'
import { SignInForm } from '../components/landing/SignInForm'
import { SignUpForm } from '../components/landing/SignUpForm'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'

export default function Landing () {
  const [gotoSignUp, setGotoSignUp] = useState(false)
  const navigate = useNavigate()
  const { isAuth, updateCurrentUser } = useContext(GlobalContext)
  // const [signIn, { data: dataSignIn, error: errorSignIn }] = useMutation(SIGNIN,
  //const [signIn, { error: errorSignIn }] = useMutation(SIGNIN,  
  const [signIn] = useMutation(SIGNIN,
    {
      onCompleted ({ signIn }) {
      // currSessionVar({session: signIn, loggedIn: true});
        currSessionVar(signIn)
        console.log('SignIn: ', currSessionVar())
        // console.log('Data - SignIn: ', dataSignIn)
        updateCurrentUser(signIn) // set isAuth: true
        navigate('/paciente')
      },
      // onError (...errorSignIn) {
      onError (errorSignIn) {  
        console.log('SignIn - onError: ', errorSignIn )
      }
    }
  )
  // const [signUp, { data: dataSignUp, error: errorSignUp }] = useMutation(SIGNUP,
  const [signUp] = useMutation(SIGNUP,  
    {
      onCompleted ({ signUp }) {
        // currSessionVar({session: signIn, loggedIn: true});
        // currSessionVar(signUp)
        setGotoSignUp(false)
        console.log('Data - SignUp: ', signUp)
      },
      onError (...errorSignUp) {
        console.log('SignUp - onError: ', { errorSignUp })
      }
    }
  )

  const goToSignUpHandling = () => {
    console.log('go to signup')
    setGotoSignUp(true)
  }
  return (
    <div>
      {(!isAuth && !gotoSignUp) && (<SignInForm click={goToSignUpHandling} signIn={signIn} />)}
      {gotoSignUp && (<SignUpForm click={goToSignUpHandling} signUp={signUp} />)}
    </div>
  )
}

// <CustomPatient />
/*
 // client.writeQuery({
        //   query: IS_USER_LOGGED_IN,
        //   data: {
        //     isUserLoggedIn: true,
        //   },
        // });
        //history.push("/paciente");
*/
