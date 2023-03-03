import React, { useState, useEffect, useCallback, useContext } from "react";

import axios from "axios";

import Footer from "../../components/ui/Footer/Footer";
import Navbar from "../../components/ui/Navbar/Navbar";
import BlogSection from "../HomePage/BlogSection/BlogSection";
import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

import styles from "./AllBlogPage.module.css";

const AllBlogPage = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [blogData, setBlogData] = useState([]);

  const getBlogData = useCallback(async () => {
    const res = await axios.get("http://localhost:90/blogs/all");
    return res.data.data;
  }, []);

  useEffect(() => {
    const setData = async () => {
      setIsLoading(true);
      const data = await getBlogData();
      setBlogData(data);
      setIsLoading(false);
    };

    setData();
  }, [setIsLoading, getBlogData]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Navbar />
      {blogData.length === 0 ? (
        ""
      ) : (
        <BlogSection
          headingStyle={styles["heading-style"]}
          heading={"All Blogs"}
          blogData={blogData}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};

export default AllBlogPage;
