import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import useSWR from "swr";

export default function DetailProduct() {
  const { id } = useParams();
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/pos/api/detailproduct/${id}`,
    fetcher
  );

  if (error) {
    console.error("Error fetching product:", error);
    return <p>Error fetching product</p>;
  }

  return (
    <div className=" bg-yellow-300 h-screen">
      <div className="flex justify-between p-2">
        <div className="font-serif font-bold text-3xl py-5 px-10">
          Detail Produk
        </div>
        <div className="py-5 px-10">
          <Link to="/daftar-produk">
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
          <div className="w-[1000px] bg-gray-50 shadow-md p-16 rounded-xl grid grid-cols-[7fr,3fr] gap-10">
            <div key={data.id} className="grid grid-cols-[2.2fr,7.8fr] ">
              <div>ID Produk</div>
              <div>: {data.id}</div>
              <div>Nama Produk</div>
              <div>: {data.title}</div>
              <div>Harga Satuan</div>
              <div>: {data.price}</div>
              <div>URL Gambar</div>
              <div className="break-all overflow-y-auto">: {data.image}</div>
              <div>ID Kategori</div>
              <div>: {data.categoryId}</div>
              <div>Nama Kategori</div>
              <div>: {data.categoryName}</div>
            </div>
            <div className=" shadow-lg rounded-lg h-72 w-[300px] ">
              <img
                src={data.image}
                className="object-cover object-center h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
