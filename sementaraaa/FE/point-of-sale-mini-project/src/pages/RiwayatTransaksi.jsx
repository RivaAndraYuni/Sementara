import axios from "axios";
import { Store } from "lucide-react";
import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Table from "../components/Table";

export default function RiwayatTransaksi() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const {
    data: transactions,
    isLoading,
    error,
    mutate,
  } = useSWR(`http://localhost:8080/pos/api/listtransactions`, fetcher);

  const navigate = useNavigate();
  const handleDetail = (id) => {
    navigate(`/detail-transaksi/${id}`);
  };

  const columns = useMemo(() => [
    {
      Header: "Tanggal Transaksi",
      accessor: "transactionDate",
    },
    {
      Header: "ID Transaksi",
      accessor: "id",
    },
    {
      Header: "Total Harga",
      accessor: "totalAmount",
    },
    {
      Header: "Total Bayar",
      accessor: "totalPay",
    },
    {
      Header: "Action",
      accessor: "",
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => handleDetail(row.original.id)}
            className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            Detail
          </button>
        </div>
      ),
    },
  ]);

  return (
    <div className=" w-full bg-yellow-300 h-screen">
      <div>
        <div className="flex items-center px-5">
          <Link to="/">
            <Store className="text-base text-gray-700 hover:scale-90 cursor-pointer hover:bg-white hover:rounded-xl"></Store>
          </Link>

          <div className="font-serif font-bold text-3xl py-5 px-5">
            Riwayat Transaksi
          </div>
        </div>

        <div className="flex justify-center items-center pb-2">
          {isLoading ? (
            <BeatLoader color="grey" />
          ) : (
            <Table columns={columns} data={transactions} />
          )}
        </div>
      </div>
    </div>
  );
}
