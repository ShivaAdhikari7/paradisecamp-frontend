import React, { useEffect, useState, useCallback, useContext } from "react";

import axios from "axios";

import Footer from "../../components/ui/Footer/Footer";
import Navbar from "../../components/ui/Navbar/Navbar";
import HomeSection from "../HomePage/HomeSection/HomeSection";
import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

import styles from "./MySpotsPage.module.css";

const MySpotsPage = () => {
  const [spotData, setSpotData] = useState([]);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const getSpots = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:90/spots/get/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res);
      return res.data.data;
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    const setSpot = async () => {
      setIsLoading(true);
      const data = await getSpots();
      setSpotData(data);
      setIsLoading(false);
    };

    setSpot();
  }, [getSpots, setIsLoading]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Navbar />
      {spotData.length === 0 ? (
        <p className="warning-msg">No any spot available.</p>
      ) : (
        <HomeSection
          headingStyle={styles["heading-style"]}
          spotData={spotData}
          sectionHeading={`${localStorage.getItem("userFullName")}'s Spots`}
        />
      )}
      <Footer />
    </React.Fragment>
  );
};

export default MySpotsPage;
