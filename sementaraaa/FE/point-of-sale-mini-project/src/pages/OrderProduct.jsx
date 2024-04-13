import React from "react";
import ProductList from "./order product/ProductList";
import Order from "./order product/Order";

export default function OrderProduct() {
  return (
    <div className="m-2 max-h-screen max-w-screen-2xl grid grid-cols-[6.7fr,3.3fr]">
      <ProductList />
      <Order />
      <div></div>
    </div>
  );
}
