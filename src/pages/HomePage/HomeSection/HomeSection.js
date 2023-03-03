import React from 'react';

import { NavLink } from 'react-router-dom';

import Card from '../../../components/ui/Card/Card';

import styles from './HomeSection.module.css';
import homeStyles from '../HomePage.module.css';

const HomeSection = props => {
  return (
    <section className="container overflow-hidden">
      <h3
        className={`${homeStyles['home-heading']} ${
          props.headingStyle && props.headingStyle
        }`}
      >
        {props.sectionHeading}
      </h3>
      <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 gx-2 gy-5">
        {props.spotData.map(data => {
          return (
            <div
              className="col p-4 justify-self-stretch align-self-stretch"
              key={data._id}
            >
              <Card
                className={`${homeStyles['home-container']} grid grid--2-cols`}
              >
                <img
                  src={data.imageURL}
                  alt="Night Sky"
                  className={`${homeStyles['home-img']} ${styles['spot-img']}`}
                />
                <div className={styles['spot-contents']}>
                  <h4 className={styles['spot-name']}>
                    <NavLink to={`/location/${data._id}`}>{data.name}</NavLink>
                  </h4>
                  <p className={`${styles['spot-description']}`}>
                    {data.description}
                  </p>
                  <p className={styles['spot-address']}>{data.address}</p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(HomeSection);
