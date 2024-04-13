import React, { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import {
  Laptop,
  LayoutDashboard,
  NotepadText,
  Search,
  Store,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { orderProduct } from "../../store/reducers/orderSlice";
import ProductCard from "../../components/ProductCard";

export default function ProductList() {
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetcher = (url) => {
    const config = {
      params: {
        sort_by: sortBy,
        sort_order: sortOrder,
        title: searchTerm,
      },
    };
    return axios.get(url, config).then((res) => res.data);
  };

  const { data, isLoading, error, mutate } = useSWR(
    `http://localhost:8080/pos/api/listproduct`,
    fetcher
  );

  const { data: categories } = useSWR(
    `http://localhost:8080/pos/api/listcategory`,
    fetcher
  );

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    mutate();
  }, [sortBy, sortOrder, searchTerm]);

  const filteredProducts = data?.filter((product) => {
    if (selectedCategory) {
      if (selectedCategory.id === 1) return true;
      return product.categoryId === selectedCategory.id;
    }
    return true;
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const dispatch = useDispatch();
  const dataOrder = useSelector((state) => state.order.dataOrder);

  const handleSelectProduct = (id) => {
    const foundItem = dataOrder.find((item) => item.id === id);
    let payload;
    if (foundItem) {
      const newItems = dataOrder.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      );
      payload = newItems;
    } else {
      const selectedProduct = data.find((product) => product.id === id);
      payload = [...dataOrder, { ...selectedProduct, qty: 1 }];
    }
    dispatch(orderProduct(payload));
  };

  const handleSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortBy(selectedSortBy);
    setSortOrder("asc");
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="border max-h-screen">
      <header className="bg-yellow-300 py-3 pl-[70px]">
        <div className="max-w-4xl mx-auto h-9 flex justify-between mr-5">
          <h1 className="text-3xl font-extrabold font-serif text-gray-900">
            Products
          </h1>
          <div className="flex gap-5">
            <div className="flex justify-between p-2 w-60 bg-white rounded-md border-white">
              <input
                type="text"
                placeholder="Cari Produk.."
                className="w-full h-full bg-transparent outline-none"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button className="flex items-center px-2 bg-transparent border-none focus:outline-none">
                <Search className="w-4 h-4" />
              </button>
            </div>

            <div>
              <select
                className="p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-yellow-400 text-sm"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Sort By</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
              </select>
              <select
                className="p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-yellow-400 text-sm"
                value={sortOrder}
                onChange={handleSortOrder}
              >
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      <div className="m-2 flex gap-2">
        <div className="bg-yellow-300 max-h-full">
          <div className="p-4">
            <div className="h-5"></div>
            <div className="flex flex-col gap-5">
              <Link to="/">
                <Store className="text-base text-gray-700 hover:scale-90 cursor-pointer hover:bg-white hover:rounded-xl"></Store>
              </Link>
              <Link to="/riwayat-transaksi">
                <NotepadText className="text-base text-gray-700 hover:scale-90 cursor-pointer hover:bg-white hover:rounded-2xl"></NotepadText>
              </Link>
              <Link to="/daftar-produk">
                <Laptop className="text-base text-gray-700 hover:scale-90 cursor-pointer hover:bg-white hover:rounded-2xl"></Laptop>
              </Link>
              <Link to="/daftar-kategori">
                <LayoutDashboard className="text-base text-gray-700 hover:scale-90 cursor-pointer hover:bg-white hover:rounded-2xl"></LayoutDashboard>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="my-2">
            {isLoading ? (
              <BeatLoader color="grey" />
            ) : (
              <div className="flex flex-wrap h-[470px] overflow-y-auto ">
                {filteredProducts?.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.id)}
                  >
                    <ProductCard
                      key={product.id}
                      image={product.image}
                      title={product.title}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {categories ? (
              <div className="flex flex-wrap justify-around bg-yellow-300 w-[820px] ">
                {categories.map((category) => (
                  <div key={category.id} className="m-2">
                    <p
                      className={`py-2 px-10 font-semibold text-sm hover:scale-105 cursor-pointer hover:bg-white ${
                        selectedCategory && selectedCategory.id === category.id
                          ? "bg-white rounded-xl"
                          : "rounded-2xl"
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <BeatLoader color="grey" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
