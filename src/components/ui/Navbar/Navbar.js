import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';

import LoginContext from '../../../context/LoginContext/login-context';

import logo256 from '../../../assets/images/logo-256.png';

import styles from './Navbar.module.css';
import UserIcon from '../../icons/UserIcon';

const Navbar = () => {
  const loginCtx = useContext(LoginContext);

  const logoutHandler = () => {
    loginCtx.logoutHandler();
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles['bg-custom']}`}>
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand py-1 mx-3">
          <img
            src={logo256}
            alt="ParadiseCamp Logo"
            width="64"
            height="64"
            className="d-inline-block align-text-center"
          />
          <span className={styles['logo-text']}>ParadiseCamp</span>
        </NavLink>
        <button
          className="navbar-toggler mx-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto py-2 mx-3 text-center">
            {!loginCtx.isLoggedIn ? (
              <li className="nav-item mx-3">
                <NavLink
                  to={'/login'}
                  className="nav-link nav-link-login my-2 px-3 py-3"
                >
                  Login
                </NavLink>
              </li>
            ) : (
              ''
            )}
            {loginCtx.isLoggedIn ? (
              <li className="nav-item mx-3">
                <NavLink
                  to={'/location/add'}
                  className="nav-link my-2 px-3 py-3"
                >
                  Add Location
                </NavLink>
              </li>
            ) : (
              ''
            )}
            {loginCtx.isLoggedIn ? (
              <li className="nav-item mx-3">
                <NavLink to={'/blog/add'} className="nav-link my-2 px-3 py-3">
                  Add Blog
                </NavLink>
              </li>
            ) : (
              ''
            )}
            {loginCtx.isLoggedIn ? (
              <li className="nav-item mx-3">
                <NavLink to={'/blog/all'} className="nav-link my-2 px-3 py-3">
                  All Blogs
                </NavLink>
              </li>
            ) : (
              ''
            )}
            {loginCtx.isLoggedIn ? (
              <li className="nav-item mx-3">
                <NavLink
                  to={'/location/all'}
                  className="nav-link my-2 px-3 py-3"
                >
                  All Location
                </NavLink>
              </li>
            ) : (
              ''
            )}
            {loginCtx.isLoggedIn ? (
              <li className="nav-item mx-3 dropdown">
                <a
                  href="/"
                  className={`nav-link my-2 px-3 py-3 dropdown-toggle ${styles['nav-link-username']}`}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <UserIcon className={styles['nav-icon']} />{' '}
                  {localStorage.getItem('userFullName')}
                </a>
                <ul className={`dropdown-menu ${styles['dropdown-menu-bg']}`}>
                  <li>
                    <a className="dropdown-item my-2" href="/mylocations">
                      My Locations
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item my-2" href="/myblogs">
                      My Blogs
                    </a>
                  </li>
                  {/* <li>
                    <hr className="dropdown-divider" />
                  </li> */}
                  <li>
                    <a className="dropdown-item my-2" href="/mybookings">
                      My Bookings
                    </a>
                  </li>
                  {/* <li>
                    <a
                      className="dropdown-item my-2"
                      href="/mylocation/bookings"
                    >
                      My Location Bookings
                    </a>
                  </li> */}
                </ul>
              </li>
            ) : (
              ''
            )}
            {loginCtx.isLoggedIn ? (
              <li className="nav-item mx-3">
                <NavLink
                  onClick={logoutHandler}
                  to={'/'}
                  className={`nav-link my-2 px-3 py-3 ${styles['nav-link-logout']}`}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              ''
            )}
            {!loginCtx.isLoggedIn ? (
              <li className="nav-item">
                <NavLink
                  to={'/signup'}
                  className={`nav-link ${styles['custom-nav-link']} ${styles['nav-link-signup']} my-2 px-3 py-3`}
                >
                  Sign Up
                </NavLink>
              </li>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
