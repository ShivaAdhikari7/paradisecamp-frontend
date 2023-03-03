import React from 'react';

import { NavLink } from 'react-router-dom';

import Card from '../../../components/ui/Card/Card';

import UserIcon from '../../../components/icons/UserIcon';
import CalendarIcon from '../../../components/icons/CalendarIcon';

import styles from './BlogSection.module.css';
import homeStyles from '../HomePage.module.css';

const BlogSection = props => {
  return (
    <section className="container overflow-hidden">
      <h3 className={`${homeStyles['home-heading']} ${props.headingStyle}`}>
        {props.heading}
      </h3>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-2 gy-5">
        {props.blogData.map((blog, i) => {
          return (
            <div
              key={blog._id}
              className="col p-4 justify-self-stretch align-self-stretch"
            >
              <Card className={`${homeStyles['home-container']}`}>
                <img
                  src={blog.imageURL}
                  alt="Some place in switzerland"
                  className={`${homeStyles['home-img']} ${styles['blog-img']}`}
                />

                <div className={styles['blog-contents']}>
                  <div className={styles['blog-info']}>
                    <div className={styles['author-info']}>
                      <UserIcon className={styles['blog-icon']} />
                      <p className={styles['author-name']}>{blog.authorName}</p>
                    </div>
                    <div className={styles['date-info']}>
                      <CalendarIcon className={styles['blog-icon']} />
                      <p className={styles['written-date']}>
                        {new Date(blog.writtenDate).toLocaleDateString(
                          'en-US',
                          { dateStyle: 'long' }
                        )}
                      </p>
                    </div>
                  </div>
                  <h4 className={styles['blog-title']}>
                    <NavLink to={`/blog/${blog._id}`}>{blog.title}</NavLink>
                  </h4>
                  <p className={styles['blog-subtitle']}>{blog.subtitle}</p>

                  {/* <div className={styles['blog-description-container']}>
                    {blog.description.split('\n\n').map((paragraph, i) => {
                      return <p key={i}>{paragraph}</p>;
                    })}
                  </div> */}
                  <p className={styles['blog-description']}>
                    {blog.description}
                  </p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(BlogSection);
