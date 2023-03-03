import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import LoadingContextProvider from "./context/LoadingSpinnerContext/LoadingContextProvider";

import LoginContextProvider from "./context/LoginContext/LoginContextProvider";
import ShowMessageContextProvider from "./context/ShowMessageContext/ShowMessageContextProvider";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import AddLocationPage from "./pages/AddLocationPage/AddLocationPage";
import SpotPage from "./pages/SpotPage/SpotPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import AddBlogPage from "./pages/AddBlogPage/AddBlogPage";
import UpdateLocationPage from "./pages/UpdateLocationPage/UpdateLocationPage";
import UpdateBlogPage from "./pages/UpdateBlogPage/UpdateBlogPage";
import AllSpotPage from "./pages/AllSpotPage/AllSpotPage";
import AllBlogPage from "./pages/AllBlogPage/AllBlogPage";
import MySpotsPage from "./pages/MySpotsPage/MySpotsPage";
import MyBlogsPage from "./pages/MyBlogsPage/MyBlogsPage";
import MyBookingsPage from "./pages/MyBookingsPage/MyBookingsPage";
import MyLocationBookingsPage from "./pages/MyLocationBookingsPage/MyLocationBookingsPage";

const App = () => {
  const ProtectedRoute = props => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/" replace />;
    }

    return props.children;
  };
  return (
    <LoginContextProvider>
      <LoadingContextProvider>
        <ShowMessageContextProvider>
          <Routes>
            <Route
              path="/"
              element={
                localStorage.getItem("token") ? <HomePage /> : <LandingPage />
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/location/add"
              element={
                <ProtectedRoute>
                  <AddLocationPage />
                </ProtectedRoute>
              }
            />
            <Route path="/location/:id" element={<SpotPage />} />
            <Route
              path="/location/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateLocationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mylocations"
              element={
                <ProtectedRoute>
                  <MySpotsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/location/all"
              element={
                <ProtectedRoute>
                  <AllSpotPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/add"
              element={
                <ProtectedRoute>
                  <AddBlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/update/:id"
              element={
                <ProtectedRoute>
                  <UpdateBlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/all"
              element={
                <ProtectedRoute>
                  <AllBlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myblogs"
              element={
                <ProtectedRoute>
                  <MyBlogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mybookings"
              element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mylocation/bookings"
              element={
                <ProtectedRoute>
                  <MyLocationBookingsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <p className="no-page-warning">
                  <span>Error 404</span> No Page Found!
                </p>
              }
            />
          </Routes>
        </ShowMessageContextProvider>
      </LoadingContextProvider>
    </LoginContextProvider>
  );
};

export default App;
