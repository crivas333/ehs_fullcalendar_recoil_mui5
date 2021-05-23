import React, { useState } from "react";
// import { CustomPatient } from "../components/CustomPatient";
// import { PatientForm } from "../components/PatientForm";
// import { BuilderForm } from "../components/BuilderForm";
//import { useMutation } from "@apollo/client";
import { useMutation } from "react-query";
import request from "graphql-request";
import { SIGNIN, SIGNUP } from "../graphqlClient/gqlQueries";
// import { IS_USER_LOGGED_IN, ME } from "../apolloConfig/gqlQueries";
// import {client} from '../apolloConfig/apolloClient';
//import { currSessionVar } from "../graphqlClient/apolloClient";
import { SignInForm } from "../components/landing/SignInForm";
import { SignUpForm } from "../components/landing/SignUpForm";
import { useNavigate } from "react-router-dom";
//import { GlobalContext } from "../context/GlobalState";
import { isAuthState, currentUserState } from "../context/RecoilStore";
import {
  //RecoilRoot,
  //atom,
  //selector,
  useRecoilState,
  //useRecoilValue,
  useSetRecoilState,
} from "recoil";
import Notify from "../components/notification/Notify";

async function signInHelper(data) {
  //console.log("addData: ", data);
  //const res = await request("/graphql", UPDATE_PATIENT, data);
  const res = await request("/graphql", SIGNIN, data.variables);
  //console.log("addData-res:", res);
  return res.signIn;
}
async function signUpHelper(data) {
  //console.log("addData: ", data);
  //const res = await request("/graphql", UPDATE_PATIENT, data);
  const res = await request("/graphql", SIGNUP, data.variables);
  //console.log("addData-res:", res);
  return res.signUp;
}

export default function Landing() {
  const [gotoSignUp, setGotoSignUp] = useState(false);
  const navigate = useNavigate();
  //const { isAuth, updateCurrentUser } = useContext(GlobalContext);
  const [isAuth, setIsAuth] = useRecoilState(isAuthState);
  //const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const setCurrentUser = useSetRecoilState(currentUserState);

  // const [signIn, { data: dataSignIn, error: errorSignIn }] = useMutation(SIGNIN,
  //const [signIn, { error: errorSignIn }] = useMutation(SIGNIN,
  // const [signIn] = useMutation(SIGNIN, {
  //   onCompleted({ signIn }) {
  //     // currSessionVar({session: signIn, loggedIn: true});
  //     currSessionVar(signIn);
  //     console.log("SignIn: ", currSessionVar());
  //     // console.log('Data - SignIn: ', dataSignIn)
  //     updateCurrentUser(signIn); // set isAuth: true
  //     navigate("/paciente");
  //   },
  //   // onError (...errorSignIn) {
  //   onError(errorSignIn) {
  //     console.log("SignIn - onError: ", errorSignIn);
  //   },
  // });

  const signIn = useMutation(signInHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      setCurrentUser(signIn);
      setIsAuth(true);
      Notify({ message: "Login exitoso", status: "success" });
      //updateCurrentUser(signIn); // set isAuth: true

      navigate("/paciente");
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      // I will fire first
      console.log("onError");
      Notify({
        message: "Error: Login fallado",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });

  // const [signUp, { data: dataSignUp, error: errorSignUp }] = useMutation(SIGNUP,
  // const [signUp] = useMutation(SIGNUP, {
  //   onCompleted({ signUp }) {
  //     // currSessionVar({session: signIn, loggedIn: true});
  //     // currSessionVar(signUp)
  //     setGotoSignUp(false);
  //     console.log("Data - SignUp: ", signUp);
  //   },
  //   onError(...errorSignUp) {
  //     console.log("SignUp - onError: ", { errorSignUp });
  //   },
  // });

  const signUp = useMutation(signUpHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);

      Notify({ message: "Registración exitosa", status: "success" });
      setGotoSignUp(false);
      console.log("Data - SignUp: ", data);
      //navigate("/");
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      // I will fire first
      console.log("onError");
      Notify({
        message: "Error: Registración fallada",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
      //console.log("onSettled");
    },
  });

  const goToSignUpHandling = () => {
    console.log("go to signup");
    setGotoSignUp(true);
  };
  return (
    <div>
      {!isAuth && !gotoSignUp && (
        <SignInForm click={goToSignUpHandling} signIn={signIn} />
      )}
      {gotoSignUp && <SignUpForm click={goToSignUpHandling} signUp={signUp} />}
    </div>
  );
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
