import React, { useState, useReducer, useContext } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/ui/Navbar/Navbar";
import Footer from "../../components/ui/Footer/Footer";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";

import styles from "./SignupPage.module.css";

import loginImg from "../../assets/images/signup-img.jpg";
import Message from "../../components/ui/Message/Message";

const initialEmailState = {
  value: "",
  isValid: false,
};

const initialPasswordState = {
  value: "",
  isValid: false,
};

// will delete later
const simulateLoading = function (sec) {
  return new Promise((resolve, _) => {
    setTimeout(resolve, sec * 1000);
  });
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().includes("@") };
  }

  return initialEmailState;
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 6 };
  }

  return initialPasswordState;
};

const SignupPage = () => {
  const loadingCtx = useContext(LoadingContext);
  const navigate = useNavigate();

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );

  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [enteredDob, setEnteredDob] = useState("");
  const [enteredPhone, setEnteredPhone] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userExistsError, setUserExistsError] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [phoneLengthError, setPhoneLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const firstNameChangeHandler = (e) => {
    setEnteredFirstName(e.target.value);
  };

  const lastNameChangeHandler = (e) => {
    setEnteredLastName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };

  const dobChangeHandler = (e) => {
    setEnteredDob(e.target.value);
  };

  const phoneChangeHandler = (e) => {
    setEnteredPhone(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };

  const confirmPasswordChangeHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };

  const resetError = () => {
    setFirstNameError(false);
    setLastNameError(false);
    setDobError(false);
    setPhoneLengthError(false);
    setConfirmPasswordError(false);
    setUserExistsError(false);
    setEmailError(false);
  };

  const resetValue = () => {
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredDob("");
    setEnteredPhone("");
  };

  const registerFormSubmitHandler = async (e) => {
    e.preventDefault();

    resetError();

    if (enteredFirstName.length === 0) {
      setFirstNameError(true);
      return;
    }

    if (enteredLastName.length === 0) {
      setLastNameError(true);
      return;
    }

    if (emailState.value.length === 0) {
      setEmailError(true);
      return;
    }

    if (enteredDob.length === 0) {
      setDobError(true);
      return;
    }

    if (enteredPhone.length !== 10) {
      setPhoneLengthError(true);
      return;
    }

    if (enteredConfirmPassword !== passwordState.value) {
      setConfirmPasswordError(true);
      return;
    }

    const data = {
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: emailState.value,
      dob: new Date(enteredDob).toISOString(),
      password: passwordState.value,
      phoneNo: enteredPhone,
    };

    try {
      loadingCtx.setIsLoading(true);

      // will delete later
      await simulateLoading(2);

      await axios.post("http://localhost:90/users/register", data);

      loadingCtx.setIsLoading(false);
      navigate("/login");

      resetValue();
    } catch (err) {
      console.log(err);
      if (err.response.data.message) {
        setUserExistsError(true);
        loadingCtx.setIsLoading(false);
      }
    }
  };

  const removeErrorMessageHandler = () => {
    setUserExistsError(false);
  };

  return (
    <React.Fragment>
      {loadingCtx.isLoading && <LoadingSpinner />}
      {ReactDOM.createPortal(
        <Message
          containerName={"success-message-container"}
          state="error"
          className={userExistsError ? "reveal" : ""}
          message="User already exists"
          onClick={removeErrorMessageHandler}
        />,
        document.getElementById("message-root")
      )}
      <Navbar />
      <Form
        onSubmit={registerFormSubmitHandler}
        img={loginImg}
        heading={"Create your account"}
      >
        <Input
          id="firstName"
          type="text"
          placeholder=""
          label="First name"
          onChanged={firstNameChangeHandler}
        />
        {firstNameError ? (
          <p className="error-message">*First name can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          id="lastName"
          type="text"
          placeholder=""
          label="Last name"
          onChanged={lastNameChangeHandler}
        />
        {lastNameError ? (
          <p className="error-message">*Last name can not be empty.</p>
        ) : (
          ""
        )}
        <Input
          isValid={emailState.isValid}
          id="email"
          type="email"
          placeholder="you@example.com"
          label="Email"
          onChanged={emailChangeHandler}
        />
        {emailError ? (
          <p className="error-message">*Please enter email address.</p>
        ) : (
          ""
        )}
        <Input
          id="dob"
          type="date"
          placeholder="2000-01-01"
          label="Date of birth"
          onChanged={dobChangeHandler}
        />
        {dobError ? (
          <p className="error-message">*Please enter date of birth.</p>
        ) : (
          ""
        )}
        <Input
          id="phone"
          type="text"
          placeholder="9812345678"
          label="Phone no"
          onChanged={phoneChangeHandler}
        />
        {phoneLengthError ? (
          <p className="error-message">*Length of phone number must be ten.</p>
        ) : (
          ""
        )}

        <Input
          isValid={passwordState.isValid}
          id="password"
          type="password"
          placeholder="••••••••"
          label="Password"
          onChanged={passwordChangeHandler}
        />
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          label="Confirm password"
          onChanged={confirmPasswordChangeHandler}
        />
        {confirmPasswordError ? (
          <p className="error-message">
            *Password and confirm password must match.
          </p>
        ) : (
          ""
        )}
        <Button className={`${styles["btn--signup"]}`} type="submit">
          sign up
        </Button>
      </Form>
      <Footer />
    </React.Fragment>
  );
};

export default SignupPage;
