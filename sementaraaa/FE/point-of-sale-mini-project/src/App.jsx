import React from "react";
import OrderProduct from "./pages/OrderProduct";
import { Route, Routes } from "react-router-dom";
import Pembayaran from "./pages/Pembayaran";
import DaftarProduct from "./pages/DaftarProduct";
import FormProduct from "./pages/FormProduct";
import DetailProduct from "./pages/DetailProduct";
import DaftarKategori from "./pages/DaftarKategori";
import DetailKategori from "./pages/DetailKategori";
import FormKategori from "./pages/FormKategori";
import RiwayatTransaksi from "./pages/RiwayatTransaksi";
import DetailTransaksi from "./pages/DetailTransaksi";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OrderProduct />} />
        <Route path="/pembayaran" element={<Pembayaran />} />
        <Route path="/riwayat-transaksi" element={<RiwayatTransaksi />} />
        <Route path="/detail-transaksi/:id" element={<DetailTransaksi />} />
        <Route path="/daftar-produk" element={<DaftarProduct />} />
        <Route path="/detail-produk/:id" element={<DetailProduct />} />
        <Route path="/form-produk" element={<FormProduct />} />
        <Route path="/form-produk/edit/:id" element={<FormProduct />} />
        <Route path="/daftar-kategori" element={<DaftarKategori />} />
        <Route path="/detail-kategori/:id" element={<DetailKategori />} />
        <Route path="/form-kategori" element={<FormKategori />} />
        <Route path="/form-kategori/edit/:id" element={<FormKategori />} />
      </Routes>
    </div>
  );
}
