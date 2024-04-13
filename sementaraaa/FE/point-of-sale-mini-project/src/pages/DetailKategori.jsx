import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";

export default function DetailKategori() {
  const { id } = useParams();
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const urlProduct =
    id === "1"
      ? `http://localhost:8080/pos/api/listproduct`
      : `http://localhost:8080/pos/api/listproduct?category_id=${id}`;

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(`http://localhost:8080/pos/api/category/${id}`, fetcher);

  const { data, errorData, isLoadingData } = useSWR(urlProduct, fetcher);

  const [relatedProductCount, setRelatedProductCount] = useState(0);

  useEffect(() => {
    if (data) {
      setRelatedProductCount(data.length);
    }
  }, [data, id]);

  if (error || errorData) {
    console.error("Error fetching:", error || errorData);
    return <p>Error</p>;
  }

  return (
    <div className=" bg-yellow-300 h-screen">
      <div className="flex justify-between p-2">
        <div className="font-serif font-bold text-3xl py-5 px-10">
          Detail Kategori
        </div>
        <div className="py-5 px-10">
          <Link to="/daftar-kategori">
            <button className="bg-yellow-100 hover:bg-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
              Kembali
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        {isLoading || isLoadingData ? (
          <BeatLoader color="grey" />
        ) : (
          <div
            key={categories.id}
            className="grid grid-cols-[3fr,7fr] w-[1000px] bg-gray-50 shadow-md p-16 rounded-xl"
          >
            <div>ID Kategori</div>
            <div>: {categories.id}</div>
            <div>Nama Kategori</div>
            <div>: {categories.name}</div>
            <div>Jumlah Produk Terkait</div>
            <div>: {relatedProductCount}</div>
          </div>
        )}
      </div>
    </div>
  );
}
