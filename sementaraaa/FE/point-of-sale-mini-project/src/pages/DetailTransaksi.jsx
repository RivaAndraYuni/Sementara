import axios from "axios";
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Table from "../components/Table";

export default function DetailTransaksi() {
  const { id } = useParams();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data } = useSWR(`http://localhost:8080/pos/api/listproduct`, fetcher);

  const {
    data: transactions,
    isLoading,
    error,
    mutate,
  } = useSWR(`http://localhost:8080/pos/api/transaction/${id}`, fetcher);

  if (error) {
    console.error("Error fetching transactions:", error);
    return <p>Error fetching transactions</p>;
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID Produk",
        accessor: "product_id",
      },
      {
        Header: "Nama Produk",
        accessor: (row) => {
          const product =
            data && data.find((item) => item.id === row.product_id);
          return product ? product.title : "";
        },
      },
      {
        Header: "Harga Satuan",
        accessor: (row) => {
          const product =
            data && data.find((item) => item.id === row.product_id);
          return product ? product.price : "";
        },
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Sub Total",
        accessor: "subtotal",
      },
    ],
    [data]
  );

  return (
    <div className="bg-yellow-300 h-screen">
      <div className="flex justify-between p-2">
        <div className="font-serif font-bold text-3xl py-5 px-10">
          Detail Transaksi
        </div>
        <div className="py-5 px-10">
          <Link to="/riwayat-transaksi">
            <button className="bg-yellow-100 hover:bg-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
              Kembali
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        {isLoading ? (
          <BeatLoader color="grey" />
        ) : (
          <div className="w-[1000px] bg-gray-50 shadow-md rounded-xl flex flex-col">
            <div
              key={transactions.id}
              className="grid grid-cols-[2.2fr,7.8fr] px-16 pt-10"
            >
              <div>ID Transaksi</div>
              <div>: {transactions.id}</div>
              <div>Tanggal Transaksi</div>
              <div>: {transactions.transactionDate}</div>
              <div>Total Harga</div>
              <div>: {transactions.totalAmount}</div>
              <div>Total Bayar</div>
              <div>: {transactions.totalPay}</div>
            </div>
            <div className="mt-10">
              <p className="text-center font-bold font-serif text-xl">
                Tabel Detail
              </p>
              <Table columns={columns} data={transactions.transactionDetails} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
