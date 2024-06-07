import React, { useEffect, useState } from "react"; // Importing the React library
import { Hero } from "./hero/Hero"; // Importing the Hero component from the specified path
import Popular from "./popular/PopularPage"; // Importing the Popular component from the specified path
import AboutUs from "./AboutUsPage"; // Importing the AboutUs component from the specified path
import logoretroactive from "../assets/logo.png";
import logocart from "../assets/cart.svg";
import logoprofile from "../assets/person.svg";
import logotopup from "../assets/topup.svg";
import logobusiness from "../assets/business.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios, { Axios } from "axios";

function TokoHomePage() {
  const [getItems, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:1466/shop/getAll")
      .then((res) => {
        const response = res.data;
        if (response.state) {
          toast.success(response.message);
          setItems(response.payload);
        } else {
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="relative bg-amber-800 flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <img
            src={logobusiness}
            className="flex justify-center items-center size-20"
            onClick={() => {
              toast.success("Masuk ke manajemen toko!");
              setTimeout(() => {
                navigate("/toko-login");
              }, 2000);
            }}
          />
          <img
            src={logocart}
            className="flex justify-center items-center size-20"
            title="Open Cart"
            onClick={() => {
              toast.success("Masuk Ke Page Cart");
              setTimeout(() => {
                navigate("/user-cart");
              }, 2000);
            }}
          ></img>
          <img
            src={logoprofile}
            className="flex justify-center items-center size-20"
            title="Open Profile Page"
            onClick={() => {
              toast.success("Masuk Ke Profile Page");
              setTimeout(() => {
                navigate("/user-info");
              }, 2000);
            }}
          ></img>
          <img
            src={logotopup}
            className="flex justify-center items-center size-20"
            title="Open Profile Page"
            onClick={() => {
              toast.success("Masuk Ke TopUp Page");
              setTimeout(() => {
                navigate("/user-info");
              }, 2000);
            }}
          ></img>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4 p-4 mr-4 ml-4 mb-4 bg-white bg-opacity-50 rounded-lg">
        {getItems.map((it, id) => (
          <div
            onClick={() => {
              navigate(`/media-detail/${it.id}`);
              console.log(it.id);
            }}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transition duration-300 ease-out transform hover:scale-110 hover:shadow-2xl"
          >
            {/* Image section with updated source and alt attributes */}
            <img
              src={it.gambar_media}
              alt={`${it.nama_album} cover`}
              className="w-full h-64 object-contain"
            />
            <div className="p-4">
              {/* Store name */}
              <h3 className="text-xl font-semibold text-gray-900">
                {it.nama_toko}
              </h3>
              {/* Album name */}
              <h4 className="text-lg text-gray-700">{it.nama_album}</h4>
              {/* Artist name */}
              <p className="text-md text-gray-600">{it.nama_artis}</p>
              {/* Media type */}
              <p className="text-sm text-gray-500">{it.jenis_media}</p>
              {/* Price and quantity section */}
              <div className="flex justify-between items-center mt-2">
                {/* Displaying the price in bold and red */}
                <p className="text-lg text-red-600 font-bold">
                  ${it.harga_media}
                </p>
                {/* Displaying the quantity */}
                <p className="text-sm text-gray-500">Qty: {it.jumlah}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AboutUs />

      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default TokoHomePage;
