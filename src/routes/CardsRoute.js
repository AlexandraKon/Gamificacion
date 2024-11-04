import React from "react";
import { Route } from "react-router-dom";
import Cards from "../components/Cards";

const CardsRoute = () => {
  return <Route path="/cards" element={<Cards />} />;
};

export default CardsRoute;