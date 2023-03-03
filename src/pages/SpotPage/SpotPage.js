import React, { useState, useEffect, useContext, useCallback } from "react";
import ReactDOM from "react-dom";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import Card from "../../components/ui/Card/Card";
import Footer from "../../components/ui/Footer/Footer";
import Navbar from "../../components/ui/Navbar/Navbar";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import Message from "../../components/ui/Message/Message";

import LocationIcon from "../../components/icons/LocationIcon";
import MobileIcon from "../../components/icons/MobileIcon";
import UserIcon from "../../components/icons/UserIcon";
import EmailIcon from "../../components/icons/EmailIcon";
import CheckIcon from "../../components/icons/CheckIcon";

import LoadingContext from "../../context/LoadingSpinnerContext/loading-context";
import ShowMessageContext from "../../context/ShowMessageContext/show-message-context";

import styles from "./SpotPage.module.css";
import WarningCard from "../../components/ui/WarningCard/WarningCard";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo("en-US");

const SpotPage = (props) => {
  const navigate = useNavigate();

  const [selectedBookingDate, setSelectedBookingDate] = useState("");
  const [dateSelectError, setDateSelectError] = useState(false);

  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const showMessageCtx = useContext(ShowMessageContext);

  const [showWarning, setShowWarning] = useState(false);

  const [individualSpotData, setIndividualSpotData] = useState();
  const [reviewData, setReviewData] = useState([]);

  const [enteredReviewText, setEnteredReviewText] = useState("");

  const { pathname } = useLocation();

  const getAllData = useCallback(async () => {
    const id = pathname.split("/")[2];
    setIsLoading(true);

    const data = await Promise.all([
      axios.get(`http://localhost:90/spots/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`http://localhost:90/reviews/get/all/${id}`),
    ]);

    setIndividualSpotData(data[0].data.spotData);
    setReviewData(data[1].data.reviewData);

    setIsLoading(false);
  }, [setIsLoading, pathname]);

  useEffect(() => {
    getAllData();

    if (localStorage.getItem("messageState")) {
      showMessageCtx.setShowMessage(true, "Spot booked successfully!");
    }
  }, [getAllData, showMessageCtx]);

  const reviewChangeHandler = (e) => {
    setEnteredReviewText(e.target.value);
  };

  const reviewSubmitHandler = async (e) => {
    const res = await axios.post(
      "http://localhost:90/reviews/add",
      {
        text: enteredReviewText,
        spotId: pathname.split("/")[2],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(res);
  };

  const removeMessageHandler = () => {
    showMessageCtx.setShowMessage(false, "");
    localStorage.removeItem("messageState");
    window.location.reload();
  };

  const showWarningMessage = () => {
    setShowWarning(true);
  };

  const closeWarningMessage = () => {
    setShowWarning(false);
  };

  const deleteSpotHandler = async () => {
    const id = pathname.split("/")[2];

    try {
      await axios.delete(`http://localhost:90/spots/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      showMessageCtx.setShowMessage(true, "Spot delete successful!");

      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const bookSpotHandler = async () => {
    const id = pathname.split("/")[2];

    setDateSelectError(false);

    if (selectedBookingDate.trim().length === 0) {
      setDateSelectError(true);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:90/bookings",
        {
          spotId: id,
          date: new Date(selectedBookingDate).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res);

      setSelectedBookingDate("");
      localStorage.setItem("messageState", "1");
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  };

  const bookingDateChangeHandler = (e) => {
    setSelectedBookingDate(e.target.value);
  };

  return individualSpotData !== undefined ? (
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
              onClick={deleteSpotHandler}
            />,
            document.getElementById("message-root")
          )
        : ""}

      <Navbar />

      <section className={`container row mx-auto ${styles["spot-section"]}`}>
        <div className="col-lg-6">
          <Card>
            <img
              src={individualSpotData.imageURL}
              alt="Switzerland Lake"
              className={styles["spot-img"]}
            />
            <div className={styles["card-content"]}>
              <div>
                <h3 className={styles["spot-heading"]}>
                  {individualSpotData.name}
                </h3>
                <p className={styles["spot-price"]}>
                  Rs.{individualSpotData.price}/visit
                </p>
              </div>
              <div className={styles["book-container"]}>
                <Input
                  value={selectedBookingDate}
                  onChanged={bookingDateChangeHandler}
                  type="date"
                />
                {dateSelectError ? (
                  <p className={styles["error-message"]}>*Required Field.</p>
                ) : (
                  ""
                )}
                <Button
                  onClick={bookSpotHandler}
                  disabled={
                    localStorage.getItem("userId") === individualSpotData.userId
                  }
                  className={styles["button-book"]}
                >
                  Book Spot
                </Button>
              </div>
            </div>
            <ul className={styles["spot-info-list"]}>
              <li className={styles["spot-info"]}>
                <LocationIcon className={styles["spot-icon"]} />{" "}
                {individualSpotData.address}
              </li>
              <li className={styles["spot-info"]}>
                <MobileIcon className={styles["spot-icon"]} />{" "}
                {individualSpotData.phoneNo}
              </li>
              <li className={styles["spot-info"]}>
                <EmailIcon className={styles["spot-icon"]} />{" "}
                {individualSpotData.email}
              </li>
              <li className={styles["spot-info"]}>
                <CheckIcon className={styles["spot-icon"]} />{" "}
                {individualSpotData.availableSpotNo} Spots
              </li>
              <li className={styles["spot-info"]}>
                <p className={styles["spot-description"]}>
                  {individualSpotData.description}
                </p>
              </li>
              <li className={styles["spot-info"]}>
                <UserIcon className={styles["spot-icon"]} />{" "}
                {`Posted by: ${individualSpotData.authorName}`}
              </li>
            </ul>
            {localStorage.getItem("userId") === individualSpotData.userId ? (
              <ul className={styles["user-control-list"]}>
                <NavLink
                  to={`/location/update/${pathname.split("/")[2]}`}
                  className={styles["button-update"]}
                >
                  Update Spot
                </NavLink>
                <Button
                  onClick={showWarningMessage}
                  className={styles["button-delete"]}
                >
                  Delete Spot
                </Button>
              </ul>
            ) : (
              ""
            )}
          </Card>
        </div>
        <div className="col-lg-6">
          <Card>
            <MapContainer
              id="map"
              center={[
                +individualSpotData.latitude,
                +individualSpotData.longitude,
              ]}
              zoom={15}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  +individualSpotData.latitude,
                  +individualSpotData.longitude,
                ]}
              >
                <Popup>
                  <p className={styles["popup-para"]}>
                    {individualSpotData.name}.
                  </p>
                </Popup>
              </Marker>
            </MapContainer>

            <div className={styles["review-control"]}>
              <form
                onSubmit={reviewSubmitHandler}
                className={styles["review-form"]}
              >
                <label htmlFor="reviewText">Leave a review</label>
                <textarea
                  id="reviewText"
                  placeholder={
                    individualSpotData.userId === localStorage.getItem("userId")
                      ? "You are not allowed to review on your own spot."
                      : "Enter your review here..."
                  }
                  disabled={
                    individualSpotData.userId === localStorage.getItem("userId")
                  }
                  onChange={reviewChangeHandler}
                ></textarea>
                <Button
                  disabled={
                    individualSpotData.userId === localStorage.getItem("userId")
                  }
                  className={styles["button-review"]}
                  type="submit"
                >
                  Submit Review
                </Button>
              </form>
            </div>
            <div className={styles["review-container"]}>
              <h3 className="tertiary-heading">Reviews</h3>
              {reviewData.length !== 0 ? (
                reviewData.map((review) => {
                  return (
                    <div key={review._id} className={styles["review"]}>
                      <p className={styles["review-text"]}>{review.text}</p>
                      <p className={styles["review-info"]}>
                        <span className={styles["review-author"]}>
                          &mdash; {review.userFullName}
                        </span>{" "}
                        |{" "}
                        <span className={styles["review-date"]}>
                          {timeAgo.format(+new Date(review.reviewedDate))}
                        </span>
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className={styles["empty-review-message"]}>
                  No any reviews yet.
                </p>
              )}
            </div>
          </Card>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  ) : isLoading ? (
    <LoadingSpinner />
  ) : (
    ""
  );
};

export default SpotPage;
