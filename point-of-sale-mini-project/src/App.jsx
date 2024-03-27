import React from "react";
import OrderProduct from "./pages/OrderProduct";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OrderProduct />} />
      </Routes>
    </div>
  );
}
