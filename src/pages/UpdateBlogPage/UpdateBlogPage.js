import React, { useState, useEffect, useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/ui/Navbar/Navbar";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import Footer from "../../components/ui/Footer/Footer";
import Button from "../../components/ui/Button/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";
import ShowMessageContext from "../../context/ShowMessageContext/show-message-context";

import styles from "./UpdateBlogPage.module.css";

import updateBlogImage from "../../assets/images/add-blog-img.jpg";

const UpdateBlogPage = () => {
  const loadingCtx = useContext(LoadingContext);
  const showMessageCtx = useContext(ShowMessageContext);

  const navigate = useNavigate();

  const { isLoading, setIsLoading } = loadingCtx;

  const [uploadedImage, setUploadedImage] = useState();

  const [enteredTitle, setEnteredTitle] = useState();
  const [enteredSubtitle, setEnteredSubtitle] = useState();
  const [enteredDescription, setEnteredDescription] = useState();

  const imageUploadHandler = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const blogTitleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const blogSubtitleChangeHandler = (e) => {
    setEnteredSubtitle(e.target.value);
  };

  const blogDescriptionChangeHandler = (e) => {
    setEnteredDescription(e.target.value);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const id = pathname.split("/")[3];

    const getAllData = async () => {
      setIsLoading(true);

      const res = await axios.get(`http://localhost:90/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIsLoading(false);

      const blogData = res.data.blogData;

      setEnteredTitle(blogData.title);
      setEnteredSubtitle(blogData.subtitle);
      setEnteredDescription(blogData.description);
    };

    getAllData();
  }, [pathname, setIsLoading]);

  const updateLocationFormSubmitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", enteredTitle);
    data.append("subtitle", enteredSubtitle);
    data.append("description", enteredDescription);
    data.append("img", uploadedImage);

    const id = pathname.split("/")[3];

    try {
      setIsLoading(true);

      await axios.put(`http://localhost:90/blogs/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIsLoading(false);
      showMessageCtx.setShowMessage(true, "Blog update successful!");
      navigate(`/blog/${id}`);
    } catch (err) {
      if (err.response.data.message) {
        setIsLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <Navbar />
      <Form
        onSubmit={updateLocationFormSubmitHandler}
        img={updateBlogImage}
        heading={"Update blog details"}
        className={styles["update-blog-container"]}
      >
        <Input
          value={enteredTitle}
          id="spotName"
          type="text"
          placeholder="Enter title for blog"
          label="Blog title"
          onChanged={blogTitleChangeHandler}
        />

        <Input
          value={enteredSubtitle}
          id="spotAddress"
          type="text"
          placeholder="Enter subtitle for blog"
          label="Blog subtitle"
          onChanged={blogSubtitleChangeHandler}
        />

        <div className={styles["description-container"]}>
          <label htmlFor="description">Spot description</label>
          <textarea
            value={enteredDescription}
            id="description"
            placeholder="Write your blog here..."
            onChange={blogDescriptionChangeHandler}
          ></textarea>
        </div>

        <Input
          id="spotImg"
          type="file"
          label="Add spot image"
          onChanged={imageUploadHandler}
        />
        <Button className={`${styles["btn--update-blog"]}`} type="submit">
          Update blog
        </Button>
      </Form>
      <Footer />
    </React.Fragment>
  );
};

export default UpdateBlogPage;
