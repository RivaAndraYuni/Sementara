import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

export default function FormProduct() {
  const { id } = useParams();
  const isEdit = id;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("Name is required"),
    price: yup.string().required("Price is required"),
    image: yup.string().required("Image is required"),
    categoryId: yup.string().required("Category is required"),
  });

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data } = useSWR(
    isEdit ? `http://localhost:8080/pos/api/detailproduct/${id}` : null,
    fetcher
  );

  const { data: categories, isLoading: isLoadingCategories } = useSWR(
    `http://localhost:8080/pos/api/listcategory`,
    fetcher
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEdit ? data : {},
  });

  useEffect(() => {
    if (isEdit && data) {
      setValue("title", data.title);
      setValue("price", data.price);
      setValue("image", data.image);
      setValue("categoryId", data.categoryId);
    }
  }, [isEdit, data, setValue]);

  const onSubmit = async (dataProduct) => {
    try {
      if (isEdit) {
        await updateProduct(id, dataProduct);
        navigate("/daftar-produk");
      } else {
        await addProduct(dataProduct);
        navigate("/daftar-produk");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const addProduct = async (dataProduct) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/pos/api/addproduct",
        dataProduct
      );
      return response.data;
    } catch (error) {
      console.error("Error adding Product:", error);
      throw error;
    }
  };

  const updateProduct = async (productId, dataProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/pos/api/updateproduct/${productId}`,
        dataProduct
      );
      return response.data;
    } catch (error) {
      console.error("Error updating Product:", error);
      throw error;
    }
  };

  return (
    <div className=" w-full bg-yellow-300 h-screen">
      <div>
        <div className="flex justify-between p-2">
          <div className="font-serif font-bold text-3xl py-5 px-10">
            Form Produk
          </div>
          <div className="py-5 px-10">
            <Link to="/daftar-produk">
              <button className="bg-yellow-100 hover:bg-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[1000px] bg-gray-50 shadow-md py-2 px-5 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex p-5 flex-col gap-5 text-sm">
              <div className="flex flex-col">
                <label htmlFor="title">Nama Produk</label>
                <input
                  placeholder="title"
                  className="rounded-lg border-[1px] border-gray-200 p-3 focus:outline-yellow-300"
                  {...register("title")}
                  id="title"
                />
                <p className="error text-red-500">{errors.title?.message}</p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="categoryId">Kategori Produk</label>

                <select
                  className="rounded-lg border-[1px] border-gray-200 p-3 focus:outline-yellow-300"
                  {...register("categoryId")}
                  id="categoryId"
                >
                  <option value="" disabled defaultValue>
                    Select Category
                  </option>{" "}
                  {isLoadingCategories ? (
                    <option>Loading...</option>
                  ) : (
                    categories
                      .filter((category) => category.id !== 1)
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))
                  )}
                </select>
                <p className="error text-red-500">
                  {errors.categoryId?.message}
                </p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="image">Gambar Produk</label>
                <input
                  placeholder="input URL image"
                  className="rounded-lg border-[1px] border-gray-200 p-3 focus:outline-yellow-200"
                  {...register("image")}
                  id="image"
                />
                <p className="error text-red-500">{errors.image?.message}</p>
              </div>

              <div className="flex flex-col">
                <label htmlFor="price">Harga</label>
                <input
                  type="number"
                  placeholder="price"
                  className="rounded-lg border-[1px] border-gray-200 p-3 focus:outline-yellow-200"
                  {...register("price")}
                  id="price"
                />
                <p className="error text-red-500">{errors.price?.message}</p>
              </div>
            </div>

            <div className="text-center p-2">
              <button
                className="rounded-lg bg-yellow-200 p-3 w-32 hover:scale-90 hover:bg-yellow-500 border"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
