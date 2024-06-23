import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
// Lazy Loading
const Homepage = lazy(() => import("./pages/Homepage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
};

export default App;
