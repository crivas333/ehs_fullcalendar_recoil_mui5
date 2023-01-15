import React, { useState } from "react";
//import { useMutation } from "react-query";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

import { SignInForm } from "../components/landing/SignInForm";
import { SignUpForm } from "../components/landing/SignUpForm";
import { useNavigate } from "react-router-dom";
//import { GlobalContext } from "../context/GlobalState";
import { isAuthState, currentUserState } from "../context/RecoilStore";
import { SIGNIN, SIGNUP } from "../graphqlClient/gqlQueries_sessions";
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
  const res = await request("/graphql", SIGNIN, data.variables);
  //console.log("addData-res:", res);
  return res.signIn;
}
async function signUpHelper(data) {
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

  const signIn = useMutation(signInHelper, {
    onSuccess: (data, variables) => {
      //console.log("onSuccess:", data);
      setCurrentUser(signIn);
      setIsAuth(true);
      Notify({ message: "Login exitoso", status: "success" });
      //updateCurrentUser(signIn); // set isAuth: true

      navigate("/Paciente");
    },
    onMutate: (data) => {
      //console.log("onMutate:", data);
    },
    onError: (error, variables, context) => {
      console.log("onError");
      Notify({
        message: "Error: Login fallado",
        status: "fail",
      });
    },
    onSettled: (data, error, variables, context) => {
      //console.log("onSettled");
    },
  });

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
