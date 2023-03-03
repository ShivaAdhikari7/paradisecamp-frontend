import React, { useReducer, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../../components/ui/Navbar/Navbar';
import Footer from '../../components/ui/Footer/Footer';
import Form from '../../components/ui/Form/Form';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import Message from '../../components/ui/Message/Message';

import LoginContext from '../../context/LoginContext/login-context';

import styles from './LoginPage.module.css';

import loginImg from '../../assets/images/login-img.jpg';

const initialEmailState = {
  value: '',
  isValid: false,
};

const initialPasswordState = {
  value: '',
  isValid: false,
};

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().includes('@') };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().includes('@') };
  }

  return initialEmailState;
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.length > 6 };
  }

  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.length > 6 };
  }

  return initialPasswordState;
};

const LoginPage = () => {
  const loginCtx = useContext(LoginContext);

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const emailChangeHandler = e => {
    dispatchEmail({ type: 'USER_INPUT', val: e.target.value });
  };

  const passwordChangeHandler = e => {
    dispatchPassword({ type: 'USER_INPUT', val: e.target.value });
  };

  const resetError = () => {
    setEmailError(false);
    setPasswordError(false);
  };

  const loginFormSubmitHandler = e => {
    e.preventDefault();
    resetError();

    if (emailState.value.length === 0) {
      setEmailError(true);
      return;
    }

    if (passwordState.value.length === 0) {
      setPasswordError(true);
      return;
    }

    loginCtx.setIsLoggedIn(emailState.value, passwordState.value);
  };

  const removeErrorMessageHandler = () => {
    loginCtx.setInvalidCredentials(false);
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Message
          state="error"
          containerName={'error-message-container'}
          className={loginCtx.invalidCredentials ? 'reveal' : ''}
          message="Invalid credentials"
          onClick={removeErrorMessageHandler}
        />,
        document.getElementById('message-root')
      )}
      <Navbar />
      <Form
        onSubmit={loginFormSubmitHandler}
        img={loginImg}
        heading={'Login to your account'}
      >
        <Input
          isValid={emailState.isValid}
          id="email"
          type="email"
          placeholder="you@example.com"
          label="Email address"
          onChanged={emailChangeHandler}
        />
        {emailError ? (
          <p className="error-message">*Please fill the email field.</p>
        ) : (
          ''
        )}
        <Input
          isValid={passwordState.isValid}
          id="password"
          type="password"
          placeholder="••••••••"
          label="Password"
          onChanged={passwordChangeHandler}
        />
        {passwordError ? (
          <p className="error-message">*Please fill the password field.</p>
        ) : (
          ''
        )}
        <Button className={`${styles['btn--login']}`} type="submit">
          Login
        </Button>
      </Form>
      <Footer />
    </React.Fragment>
  );
};

export default LoginPage;
