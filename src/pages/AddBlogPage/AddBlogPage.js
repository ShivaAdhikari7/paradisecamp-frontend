import React, { useReducer, useState, useContext } from "react";
import ReactDOM from "react-dom";

import axios from "axios";

import Navbar from "../../components/ui/Navbar/Navbar";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import Footer from "../../components/ui/Footer/Footer";
import Message from "../../components/ui/Message/Message";

import addBlogImage from "../../assets/images/add-blog-img.jpg";
import styles from "./AddBlogPage.module.css";

import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

const initialBlogState = {
  value: "",
  isValid: false,
};

const blogReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length !== 0 };
  }
  return initialBlogState;
};

const AddBlogPage = () => {
  const loadingCtx = useContext(LoadingContext);

  const [blogTitleState, dispatchBlogTitle] = useReducer(
    blogReducer,
    initialBlogState
  );

  const [blogSubtitleState, dispatchBlogSubtitle] = useReducer(
    blogReducer,
    initialBlogState
  );

  const [blogDescriptionState, dispatchBlogDescription] = useReducer(
    blogReducer,
    initialBlogState
  );

  const [blogTitleError, setBlogTitleError] = useState(false);

  const [blogSubtitleError, setBlogSubtitleError] = useState(false);

  const [blogDescriptionError, setBlogDescriptionError] = useState(false);

  const [uploadedImage, setUploadedImage] = useState();

  const [isBlogCreated, setIsBlogCreated] = useState(false);
  const [blogCreateError, setBlogCreateError] = useState(false);

  const blogTitleChangeHandler = (e) => {
    dispatchBlogTitle({ type: "USER_INPUT", value: e.target.value });
  };
  const blogSubtitleChangeHandler = (e) => {
    dispatchBlogSubtitle({ type: "USER_INPUT", value: e.target.value });
  };
  const blogDescriptionChangeHandler = (e) => {
    dispatchBlogDescription({ type: "USER_INPUT", value: e.target.value });
  };
  const imageUploadHandler = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const resetError = () => {
    setBlogTitleError(false);
    setBlogSubtitleError(false);
    setBlogDescriptionError(false);
  };

  const addBlogFormSubmitHandler = async (e) => {
    e.preventDefault();

    resetError();

    if (!blogTitleState.isValid) {
      setBlogTitleError(true);
      return;
    }

    if (!blogSubtitleState.isValid) {
      setBlogSubtitleError(true);
      return;
    }

    if (!blogDescriptionState.isValid) {
      setBlogDescriptionError(true);
      return;
    }

    const data = new FormData();

    data.append("title", blogTitleState.value);
    data.append("subtitle", blogSubtitleState.value);

    data.append("description", blogDescriptionState.value);
    data.append("img", uploadedImage);

    try {
      loadingCtx.setIsLoading(true);

      const res = await axios.post("http://localhost:90/blogs/add", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIsBlogCreated(true);
      loadingCtx.setIsLoading(false);
      setBlogCreateError(false);
      console.log(res);
    } catch (err) {
      if (err.response.data.message) {
        loadingCtx.setIsLoading(false);
        setBlogCreateError(true);
      }
    }
  };

  const removeMessageHandler = () => {
    setIsBlogCreated(false);
    setBlogCreateError(false);
  };

  return (
    <React.Fragment>
      {loadingCtx.isLoading && <LoadingSpinner />}
      {ReactDOM.createPortal(
        <Message
          state={`${
            blogCreateError ? "error" : isBlogCreated ? "success" : ""
          }`}
          className={isBlogCreated || blogCreateError ? "reveal" : ""}
          message={
            blogCreateError
              ? "Error while adding blog!"
              : isBlogCreated
              ? "Blog created successfully!"
              : ""
          }
          onClick={removeMessageHandler}
          containerName={
            blogCreateError
              ? "error-message-container"
              : isBlogCreated
              ? "success-message-container"
              : ""
          }
        />,
        document.getElementById("message-root")
      )}
      <Navbar />
      <Form
        onSubmit={addBlogFormSubmitHandler}
        img={addBlogImage}
        heading={"Add blog"}
        className={styles["add-blog-container"]}
      >
        <Input
          id="blogTitle"
          type="text"
          placeholder="Enter blog title"
          label="Blog title"
          onChanged={blogTitleChangeHandler}
        />
        {blogTitleError ? (
          <p className="error-message">*Blog title can not be empty.</p>
        ) : (
          ""
        )}

        <Input
          id="blogSubtitle"
          type="text"
          placeholder="Enter blog subtitle"
          label="Blog subtitle"
          onChanged={blogSubtitleChangeHandler}
        />

        {blogSubtitleError ? (
          <p className="error-message">*Blog subtitle can not be empty.</p>
        ) : (
          ""
        )}
        <div className={styles["description-container"]}>
          <label htmlFor="blogDescription">Spot description</label>
          <textarea
            id="blogDescription"
            placeholder="Enter your blog here..."
            onChange={blogDescriptionChangeHandler}
          ></textarea>
        </div>
        {blogDescriptionError ? (
          <p className="error-message">*Blog description can not be empty.</p>
        ) : (
          ""
        )}

        <Input
          id="blogImg"
          type="file"
          label="Add blog image"
          onChanged={imageUploadHandler}
        />
        <Button className={`${styles["btn--add-blog"]}`} type="submit">
          Add Blog
        </Button>
      </Form>
      <Footer />
    </React.Fragment>
  );
};

export default AddBlogPage;
