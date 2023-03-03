import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import LoginContext from "./login-context";

const LoginContextProvider = (props) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:90/users/login", {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        console.log(response);
        setIsLoggedIn(true);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userFullName", response.data.userName);

        navigate("/home");
      }
    } catch (err) {
      setInvalidCredentials(true);
      console.log(err);
    }
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/");
    window.location.reload();
  };

  const loginContext = {
    logoutHandler,
    isLoggedIn,
    setIsLoggedIn: loginHandler,
    setInvalidCredentials,
    invalidCredentials,
  };

  return (
    <LoginContext.Provider value={loginContext}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
