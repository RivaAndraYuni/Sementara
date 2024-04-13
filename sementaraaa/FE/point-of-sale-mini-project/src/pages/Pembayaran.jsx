import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Pembayaran() {
  const dataOrder = useSelector((state) => state.order.dataOrder);
  const [dibayar, setDibayar] = useState(0);
  const navigate = useNavigate();

  const totalHarga = dataOrder.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const kembalian = dibayar - totalHarga;
  const isEnoughMoney = kembalian >= 0;

  const handleDibayarChange = (e) => {
    const inputValue = parseInt(e.target.value);
    setDibayar(isNaN(inputValue) ? "" : inputValue);
  };

  const handleFinish = async () => {
    try {
      const transactionData = {
        transactionDate: new Date().toISOString().split("T")[0],
        totalAmount: totalHarga,
        totalPay: dibayar,
        transaction_details: dataOrder.map((item) => ({
          product_id: item.id,
          quantity: item.qty,
          subtotal: item.price * item.qty,
        })),
      };

      const response = await axios.post(
        "http://localhost:8080/pos/api/addtransaction",
        transactionData
      );
      console.log("Response:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isItemsSelected = dataOrder.length > 0;

  return (
    <div className="m-2 max-w-screen-2xl grid grid-cols-[6.7fr,3.3fr] text-lg">
      <div className="border">
        <div className="bg-yellow-200 p-5  max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold font-serif text-gray-900">
            Rincian Produk
          </h1>
        </div>

        <div className="flex flex-col h-[470px] overflow-y-auto">
          {dataOrder.map((item) => (
            <div
              key={item.id}
              className="grid m-2 grid-cols-[2.5fr,4fr,1.5fr,2fr] my-2 border-b border-gray-400 pr-5"
            >
              <div className="pb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="shadow-lg rounded-lg w-40 h-24 object-cover object-center"
                />
              </div>

              <div className="flex flex-col">
                <h3>{item.title}</h3>
                <p>{item.price}</p>
              </div>
              <p>{item.qty}</p>
              <p>{item.price * item.qty}</p>
            </div>
          ))}
        </div>
        <div className="my-5">
          <Link to="/">
            <button className="bg-orange-300 hover:bg-red-600 font-bold shadow-lg py-1 px-5 rounded-xl">
              Kembali
            </button>
          </Link>
        </div>
      </div>

      <div className="border border-l-2">
        <div className="bg-yellow-500 p-5 font-serif text-2xl font-extrabold text-center text-gray-900">
          <h1>Pembayaran</h1>
        </div>
        <div className="m-5">
          <div>Total: {totalHarga}</div>
          <div>
            Dibayar:{" "}
            <input
              type="number"
              value={dibayar}
              onChange={handleDibayarChange}
            />
          </div>
          <div>
            Kembalian: {kembalian >= 0 ? kembalian : "Tidak cukup uang"}
          </div>
          <div className="text-center">
            <button
              onClick={handleFinish}
              disabled={!isEnoughMoney || !isItemsSelected}
              className={`bg-orange-500 hover:bg-red-600 text-white font-bold p-3 rounded w-2/3 mt-5 shadow-lg ${
                !isEnoughMoney || !isItemsSelected
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Selesaikan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
