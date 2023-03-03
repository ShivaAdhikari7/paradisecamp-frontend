import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <div className={`${styles['cta']} container`}>
      <h2 className={`secondary-heading text-uppercase`}>
        Let's start our journey together
      </h2>
      <p className="para-md">
        ParadiseCamp helps users to find and add various picnic and camping
        spots.
      </p>
      <div className={`${styles['cta-action-container']}`}>
        <NavLink to="/signup" className={`btn-custom ${styles['cta-signup']}`}>
          Sign Up
        </NavLink>

        <div className={styles['cta-login-container']}>
          <span className={styles['cta-login-text']}>
            Already have an account?
          </span>
          <NavLink to="/login" className={`btn-custom ${styles['cta-login']}`}>
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
