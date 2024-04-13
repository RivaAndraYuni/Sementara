import React, { useMemo, useState } from "react";
import Table from "../components/Table";
import useSWR from "swr";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "lucide-react";

export default function DaftarProduct() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, isLoading, mutate } = useSWR(
    `http://localhost:8080/pos/api/listproduct`,
    fetcher
  );

  const { data: categories } = useSWR(
    `http://localhost:8080/pos/api/listcategory`,
    fetcher
  );

  const getCategoryName = (categoryId) => {
    if (!categories) return "Kategori tidak ada...";

    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Tidak Diketahui";
  };

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/form-produk");
  };

  const handleEdit = (id) => {
    navigate(`/form-produk/edit/${id}`);
  };

  const handleDetail = (id) => {
    navigate(`/detail-produk/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pos/api/deleteproduct/${id}`);
      mutate();
    } catch (error) {
      console.error("Error deleting Product:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID Produk",
        accessor: "id",
      },
      {
        Header: "Nama Produk",
        accessor: "title",
      },
      {
        Header: "Harga Satuan",
        accessor: "price",
      },
      {
        Header: "Kategori",
        accessor: "categoryId",
        Cell: ({ row }) => getCategoryName(row.original.categoryId),
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }) => (
          <div className="flex gap-3 font-semibold justify-center">
            <button
              onClick={() => handleDetail(row.original.id)}
              className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              Detail
            </button>
            <button
              onClick={() => handleEdit(row.original.id)}
              className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              Hapus
            </button>
          </div>
        ),
      },
    ],
    [categories]
  );

  return (
    <div className=" w-full bg-yellow-300 h-screen">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center px-5">
            <Link to="/">
              <Store className="text-base text-gray-700 hover:scale-90 cursor-pointer hover:bg-white hover:rounded-xl"></Store>
            </Link>

            <div className="font-serif font-bold text-3xl py-5 px-5">
              Daftar Produk
            </div>
          </div>

          <div className="py-5 px-10">
            <button
              onClick={() => handleAdd()}
              className="bg-yellow-100 hover:bg-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              + Tambah Produk
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center pb-2">
          {isLoading ? (
            <BeatLoader color="grey" />
          ) : (
            <Table columns={columns} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
