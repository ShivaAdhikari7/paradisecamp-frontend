import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";

import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../components/ui/Navbar/Navbar";
import Button from "../../components/ui/Button/Button";
import Footer from "../../components/ui/Footer/Footer";
import Message from "../../components/ui/Message/Message";
import WarningCard from "../../components/ui/WarningCard/WarningCard";

import ShowMessageContext from "../../context/ShowMessageContext/show-message-context";
import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";

import styles from "./BlogPage.module.css";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

const BlogPage = (props) => {
  const navigate = useNavigate();

  const showMessageCtx = useContext(ShowMessageContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const [individualBlogData, setIndividualBlogData] = useState();
  const [showWarning, setShowWarning] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    const id = pathname.split("/")[2];

    const getBlogData = async () => {
      setIsLoading(true);

      const res = await axios.get(`http://localhost:90/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIndividualBlogData(res.data.blogData);
      setIsLoading(false);
    };

    getBlogData();
  }, [pathname, setIsLoading]);

  const removeMessageHandler = () => {
    showMessageCtx.setShowMessage(false);
  };

  const showWarningMessage = () => {
    setShowWarning(true);
  };

  const closeWarningMessage = () => {
    setShowWarning(false);
  };

  const deleteBlogHandler = async () => {
    const id = pathname.split("/")[2];
    console.log(id);
    try {
      await axios.delete(`http://localhost:90/blogs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      showMessageCtx.setShowMessage(true, "Blog delete successful!");

      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return individualBlogData !== undefined ? (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Message
          containerName={"success-message-container"}
          state="success"
          className={showMessageCtx.showMessage ? "reveal" : ""}
          message={showMessageCtx.message}
          onClick={removeMessageHandler}
        />,
        document.getElementById("message-root")
      )}
      {showWarning
        ? ReactDOM.createPortal(
            <WarningCard
              onClose={closeWarningMessage}
              onClick={deleteBlogHandler}
            />,
            document.getElementById("message-root")
          )
        : ""}
      <Navbar />
      <section className={`container ${styles["blog-container"]}`}>
        <header>
          <h2 className={`secondary-heading ${styles["blog-heading"]}`}>
            {individualBlogData.title}
          </h2>
          <h4 className={styles["blog-subtitle"]}>
            {individualBlogData.subtitle}
          </h4>
          <p className={styles["blog-meta-info"]}>
            Posted by <b>{individualBlogData.authorName}</b> on{" "}
            {new Date(individualBlogData.writtenDate).toLocaleDateString(
              "en-US",
              { dateStyle: "full" }
            )}
          </p>
        </header>

        <main>
          <img
            src={individualBlogData.imageURL}
            alt="Bitcoin"
            className={styles["blog-img"]}
          />
          {/* <div className={styles['blog-description-container']}>
            {individualBlogData.description
              .split('\n\n')
              .map((paragraph, i) => {
                return <p key={i}>{paragraph}</p>;
              })}
          </div> */}
          <p className={styles["blog-description"]}>
            {individualBlogData.description}
          </p>
        </main>
        <footer>
          {localStorage.getItem("userId") === individualBlogData.userId ? (
            <ul className={styles["user-control-list"]}>
              <NavLink
                to={`/blog/update/${pathname.split("/")[2]}`}
                className={styles["button-update"]}
              >
                Update Blog
              </NavLink>
              <Button
                onClick={showWarningMessage}
                className={styles["button-delete"]}
              >
                Delete Blog
              </Button>
            </ul>
          ) : (
            ""
          )}
        </footer>
      </section>
      <Footer />
    </React.Fragment>
  ) : (
    isLoading && <LoadingSpinner />
  );
};

export default BlogPage;
