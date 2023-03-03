import React from 'react';

const LoginContext = React.createContext({
  logoutHandler: () => {},
  setInvalidCredentials: invalidState => {},
  invalidCredentials: false,
  isLoggedIn: false,
  setIsLoggedIn: (email, password) => {},
});

export default LoginContext;
