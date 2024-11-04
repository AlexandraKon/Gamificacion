import React from "react";
import { Route } from "react-router-dom";
import Sonidos from "../components/Sonidos";

const SonidosRoute = () => {
  return <Route path="/sonidos" element={<Sonidos />} />;
};

export default SonidosRoute;