import React, { useState, useEffect, useContext } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/ui/Navbar/Navbar";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Footer from "../../components/ui/Footer/Footer";
import Button from "../../components/ui/Button/Button";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";

import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";
import ShowMessageContext from "../../context/ShowMessageContext/show-message-context";

import styles from "./UpdateLocationPage.module.css";

import "./UpdateLocationPage.module.css";
import updateLocationImage from "../../assets/images/update-location-img.jpg";

const UpdateLocationPage = () => {
  const loadingCtx = useContext(LoadingContext);
  const showMessageCtx = useContext(ShowMessageContext);

  const navigate = useNavigate();

  const { isLoading, setIsLoading } = loadingCtx;

  const [spotData, setSpotData] = useState();

  const [uploadedImage, setUploadedImage] = useState();

  const [enteredName, setEnteredName] = useState();
  const [enteredAddress, setEnteredAddress] = useState();
  const [enteredAvailableSpotNo, setEnteredAvailableSpotNo] = useState();
  const [selectedSpotType, setSelectedSpotType] = useState();
  const [enteredLatitude, setEnteredLatitude] = useState();
  const [enteredLongitude, setEnteredLongitude] = useState();
  const [enteredPhone, setEnteredPhone] = useState();
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPrice, setEnteredPrice] = useState();
  const [enteredDescription, setEnteredDescription] = useState();

  const imageUploadHandler = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const spotNameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const spotAddressChangeHandler = (e) => {
    setEnteredAddress(e.target.value);
  };

  const spotNoChangeHandler = (e) => {
    setEnteredAvailableSpotNo(e.target.value);
  };

  const spotTypeChangeHandler = (e) => {
    setSelectedSpotType(e.target.value);
  };

  const latitudeChangeHandler = (e) => {
    setEnteredLatitude(e.target.value);
  };

  const longitudeChangeHandler = (e) => {
    setEnteredLongitude(e.target.value);
  };

  const spotPhoneChangeHandler = (e) => {
    setEnteredPhone(e.target.value);
  };

  const spotEmailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const spotDescriptionChangeHandler = (e) => {
    setEnteredDescription(e.target.value);
  };

  const spotPriceChangeHandler = (e) => {
    setEnteredPrice(e.target.value);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const id = pathname.split("/")[3];

    const getAllData = async () => {
      setIsLoading(true);

      const res = await axios.get(`http://localhost:90/spots/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsLoading(false);

      setSpotData(res.data.spotData);

      const spotData = res.data.spotData;

      setEnteredName(spotData.name);
      setEnteredAddress(spotData.address);
      setEnteredAvailableSpotNo(spotData.availableSpotNo);
      setEnteredLatitude(spotData.latitude);
      setEnteredLongitude(spotData.longitude);
      setEnteredEmail(spotData.email);
      setEnteredPhone(spotData.phoneNo);
      setEnteredDescription(spotData.description);
      setEnteredPrice(spotData.price);
      setSelectedSpotType(spotData.type);
    };

    getAllData();
  }, [pathname, setIsLoading]);

  const updateLocationFormSubmitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", enteredName);
    data.append("address", enteredAddress);
    data.append(
      "availableSpotNo",
      enteredAvailableSpotNo ? +enteredAvailableSpotNo : undefined
    );
    data.append("type", selectedSpotType);
    data.append("latitude", enteredLatitude);
    data.append("longitude", enteredLongitude);
    data.append("phoneNo", enteredPhone);
    data.append("email", enteredEmail);
    data.append("price", enteredPrice ? +enteredPrice : undefined);
    data.append("description", enteredDescription);
    data.append("img", uploadedImage);

    const id = pathname.split("/")[3];

    try {
      loadingCtx.setIsLoading(true);

      await axios.put(`http://localhost:90/spots/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      loadingCtx.setIsLoading(false);
      showMessageCtx.setShowMessage(true, "Spot update successful!");
      navigate(`/location/${id}`);
    } catch (err) {
      if (err.response.data.message) {
        loadingCtx.setIsLoading(false);
      }
    }
  };

  return spotData ? (
    <React.Fragment>
      <Navbar />
      <Form
        onSubmit={updateLocationFormSubmitHandler}
        img={updateLocationImage}
        heading={"Update spot details"}
        className={styles["update-location-container"]}
      >
        <Input
          value={enteredName}
          id="spotName"
          type="text"
          placeholder="Enter full name of the spot"
          label="Spot name"
          onChanged={spotNameChangeHandler}
        />

        <Input
          value={enteredAddress}
          id="spotAddress"
          type="text"
          placeholder="Enter full address of the spot"
          label="Spot address"
          onChanged={spotAddressChangeHandler}
        />

        <Input
          value={enteredAvailableSpotNo}
          id="spotNoAvailable"
          type="number"
          placeholder="Enter no of spot available"
          label="Available spot no"
          onChanged={spotNoChangeHandler}
        />

        <Select
          value={selectedSpotType}
          onChanged={spotTypeChangeHandler}
          id="spotType"
          label="Select spot type"
        />

        <div className={styles["coords-container"]}>
          <label htmlFor="latitude">Spot coordinates</label>
          <div className={styles["inputs-container"]}>
            <input
              value={enteredLatitude}
              type="number"
              id="latitude"
              placeholder="Lat value"
              onChange={latitudeChangeHandler}
            />

            <input
              value={enteredLongitude}
              type="number"
              id="longitude"
              placeholder="Lng value"
              onChange={longitudeChangeHandler}
            />

            {/* <Button
              //   onClick={getCurrentPosition}
              className={styles['btn-coords']}
            >
              Get current location
            </Button> */}
          </div>
        </div>

        <Input
          value={enteredPhone}
          id="spotPhone"
          type="text"
          placeholder="Enter spot phone number"
          label="Spot phone"
          onChanged={spotPhoneChangeHandler}
        />

        <Input
          value={enteredEmail}
          id="spotEmail"
          type="email"
          placeholder="Enter spot email address"
          label="Spot email"
          onChanged={spotEmailChangeHandler}
        />

        <Input
          value={enteredPrice}
          id="spotPrice"
          type="number"
          placeholder="Enter spot price"
          label="Spot price"
          min="1"
          step="1"
          onChanged={spotPriceChangeHandler}
        />

        <div className={styles["description-container"]}>
          <label htmlFor="description">Spot description</label>
          <textarea
            value={enteredDescription}
            id="description"
            placeholder="Enter brief description of the spot"
            onChange={spotDescriptionChangeHandler}
          ></textarea>
        </div>

        <Input
          id="spotImg"
          type="file"
          label="Add spot image"
          onChanged={imageUploadHandler}
        />
        <Button className={`${styles["btn--update-spot"]}`} type="submit">
          Update spot
        </Button>
      </Form>
      <Footer />
    </React.Fragment>
  ) : isLoading ? (
    <LoadingSpinner />
  ) : (
    ""
  );
};

export default UpdateLocationPage;
