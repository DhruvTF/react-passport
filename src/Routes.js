import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import Header from "./components/layouts/Header";
import Home from "./components/pages/HomeComponent";
import Login from "./components/pages/LoginComponent";
import Register from "./components/pages/RegisterComponent";
import Profile from "./components/pages/ProfileComponent";
import AddProductComponent from "./components/pages/AddProductComponent";
import AllProductsComponent from "./components/pages/AllProductsComponent";
import SingleProductComponent from "./components/pages/SingleProductComponent";
import UpdateProductComponent from "./components/pages/UpdateProductComponent";
import { useSelector } from "react-redux";

export default function AllRoutes() {
  const authResponse = useSelector((state) => state?.userAuth?.authResponse);

  useEffect(() => {}, [authResponse]);
  const token = localStorage.getItem("user-token");
  return (
    <>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/"
          element={token ? <AllProductsComponent /> : <Navigate to="/home" />}
        />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        {/* <Guard path="/user" token="user-token" navigate="/user/login" /> */}

        <Route
          path="/user"
          element={token ? <Profile /> : <Navigate to="/user/login" />}
        />

        <Route path="/user/view-profile" element={<Navigate to="/user" />} />
        <Route path="*" element={<Navigate to="/home" />} />

        {/* for adding product */}
        <Route
          path="/user/add-product"
          element={
            token ? <AddProductComponent /> : <Navigate to="/user/login" />
          }
        />
        {/* for all Products */}
        <Route
          path="/user/products"
          element={
            token ? <AllProductsComponent /> : <Navigate to="/home" />
          }
        />
        {/* for single product */}
        <Route
          path="user/products/:pid"
          element={
            token ? <SingleProductComponent /> : <Navigate to="/user/login" />
          }
        />
        {/* updating product detail */}
        <Route
          path="user/products/:pid/update"
          element={
            token ? <UpdateProductComponent /> : <Navigate to="/user/login" />
          }
        />
      </Routes>
    </>
  );
}
