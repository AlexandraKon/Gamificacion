import React from "react";
import { Route } from "react-router-dom";
import Home from "../components/Home";

const HomeRoute = () => {
  return <Route path="/" element={<Home />} />;
};

export default HomeRoute;