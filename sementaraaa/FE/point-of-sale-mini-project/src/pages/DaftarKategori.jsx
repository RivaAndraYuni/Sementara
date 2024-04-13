import axios from "axios";
import { Store } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";
import Table from "../components/Table";

export default function DaftarKategori() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const {
    data: categories,
    isLoading,
    error,
    mutate,
  } = useSWR(`http://localhost:8080/pos/api/listcategory`, fetcher);

  const { data: products } = useSWR(
    `http://localhost:8080/pos/api/listproduct`,
    fetcher
  );

  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/form-kategori");
  };

  const handleEdit = (id) => {
    navigate(`/form-kategori/edit/${id}`);
  };

  const handleDetail = (id) => {
    navigate(`/detail-kategori/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pos/api/deletecategory/${id}`);
      mutate();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (products) {
      const totalCount = products.length;
      setTotalProducts(totalCount);
    }
  }, [products]);

  const categoryProductCounts = useMemo(() => {
    if (!products) return {};
    return products.reduce((acc, product) => {
      acc[product.categoryId] = (acc[product.categoryId] || 0) + 1;
      return acc;
    }, {});
  }, [products]);

  const columns = useMemo(() => [
    {
      Header: "ID Kategori",
      accessor: "id",
    },
    {
      Header: "Nama Kategori",
      accessor: "name",
    },
    {
      Header: "Jumlah Produk Terkait",
      accessor: (row) =>
        row.id === 1 ? totalProducts : categoryProductCounts[row.id] || 0,
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
  ]);

  return (
    <div className=" w-full bg-yellow-300 h-screen">
      <div>
        <div className="flex justify-between">
          <div className="flex items-center px-5">
            <Link to="/">
              <Store className="text-base text-gray-700 hover:scale-90 cursor-pointer hover:bg-white hover:rounded-xl"></Store>
            </Link>

            <div className="font-serif font-bold text-3xl py-5 px-5">
              Daftar Kategori
            </div>
          </div>
          <div className="py-5 px-10">
            <button
              onClick={() => handleAdd()}
              className="bg-yellow-100 hover:bg-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
            >
              + Tambah Kategori
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center pb-2">
          {isLoading ? (
            <BeatLoader color="grey" />
          ) : (
            <Table columns={columns} data={categories} />
          )}
        </div>
      </div>
    </div>
  );
}
