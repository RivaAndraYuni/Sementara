// ProductCard.js
import React from "react";

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="mx-2 my-3 bg-white shadow-lg rounded-lg hover:scale-95 cursor-pointer w-[180px] h-52">
      <img
        className="h-36 w-48 object-cover object-center"
        src={image}
        alt={title}
      />
      <div className="p-2">
        <h2 className="text-gray-900 font-semibold text-base">{title}</h2>
        <p className="mt-1 text-gray-600 ">Rp{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
