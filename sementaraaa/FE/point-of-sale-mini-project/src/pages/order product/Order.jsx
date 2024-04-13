import { Minus, Plus, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  orderProduct,
  removeAllOrders,
  removeSelectedOrder,
} from "../../store/reducers/orderSlice";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const dataOrder = useSelector((state) => state.order.dataOrder);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncreaseQty = (itemId) => {
    dispatch(increaseQty({ itemId }));
  };

  const handleDecreaseQty = (itemId) => {
    dispatch(decreaseQty({ itemId }));
  };

  const handleRemoveAllOrders = () => {
    dispatch(removeAllOrders());
  };

  const handleRemoveSelectedOrder = (itemId) => {
    dispatch(removeSelectedOrder({ itemId }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    dataOrder.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [dataOrder]);

  const navigate = useNavigate();
  const handlePay = () => {
    dispatch(orderProduct(dataOrder));
    navigate("/pembayaran");
  };

  const isItemsSelected = dataOrder.length > 0;

  return (
    <div className="border border-l-2">
      <div>
        <header className="bg-yellow-500 p-4 font-serif">
          <div className="max-w-4xl h-7">
            <h1 className="text-2xl font-extrabold text-center text-gray-900">
              Daftar Pesanan
            </h1>
          </div>
          <div></div>
        </header>

        <div className="mx-2 ">
          <button className="mt-5 font-serif" onClick={handleRemoveAllOrders}>
            Hapus Semua Order
          </button>
          <div className="overflow-y-auto max-h-96">
            {dataOrder.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[7fr,3fr] gap-2 my-4 border-b border-gray-400 pr-5"
              >
                <div className="flex items-center gap-5">
                  <button onClick={() => handleRemoveSelectedOrder(item.id)}>
                    <Trash2 size={16} />
                  </button>
                  <h3 className="">{item.title}</h3>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div>
                    <p>{item.price * item.qty}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl pl-5 text-xs pb-3">
                    <button onClick={() => handleDecreaseQty(item.id)}>
                      <Minus
                        size={16}
                        className="rounded-md cursor-pointer p-[2px] bg-red-400 hover:bg-red-500"
                      />
                    </button>
                    <p>{item.qty}</p>
                    <button onClick={() => handleIncreaseQty(item.id)}>
                      <Plus
                        size={16}
                        className="rounded-md cursor-pointer p-[2px] bg-red-400 hover:bg-red-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right text-xl font-bold pr-5 mt-3">
            <p>Total : {totalPrice}</p>
          </div>
          <div className="text-center">
            <button
              disabled={!isItemsSelected}
              onClick={handlePay}
              className={`bg-orange-500 hover:bg-red-600 text-white font-bold p-3 rounded w-2/3 mt-5 shadow-lg ${
                !isItemsSelected ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
