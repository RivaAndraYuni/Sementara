import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useSWR from "swr";

export default function FormKategori() {
  const { id } = useParams();
  const isEdit = id;
  const navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const {
    data: categories,
    error,
    isLoading,
  } = useSWR(
    isEdit ? `http://localhost:8080/pos/api/category/${id}` : null,
    fetcher
  );

  if (error) {
    console.error("Error fetching product:", error);
    return <p>Error fetching kategori</p>;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: isEdit ? categories : {},
  });

  useEffect(() => {
    if (isEdit && categories) {
      setValue("name", categories.name);
    }
  }, [isEdit, categories, setValue]);

  const onSubmit = async (categoryData) => {
    try {
      if (isEdit) {
        await updateCategory(id, categoryData);
        navigate("/daftar-kategori");
      } else {
        await addCategory(categoryData);
        navigate("/daftar-kategori");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const addCategory = async (categoryData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/pos/api/addcategory",
        categoryData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/pos/api/updatecategory/${categoryId}`,
        categoryData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  };

  return (
    <div className=" w-full bg-yellow-300 h-screen">
      <div>
        <div className="flex justify-between p-2">
          <div className="font-serif font-bold text-3xl py-5 px-10">
            Form Kategori
          </div>
          <div className="py-5 px-10">
            <Link to="/daftar-kategori">
              <button className="bg-yellow-100 hover:bg-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[1000px] bg-gray-50 shadow-md p-10 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <label htmlFor="name">Nama Produk</label>
              <input
                placeholder="name"
                className="rounded-lg border-[1px] border-gray-200 p-3 focus:outline-yellow-300"
                {...register("name")}
                id="name"
              />
              <p className="error text-red-500">{errors.name?.message}</p>
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
