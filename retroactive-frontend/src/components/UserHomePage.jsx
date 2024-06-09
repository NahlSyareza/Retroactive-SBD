import React, { useEffect, useState } from "react"; // Importing the React library
import { Hero } from "./hero/Hero"; // Importing the Hero component from the specified path
import Popular from "./popular/PopularPage"; // Importing the Popular component from the specified path
import AboutUs from "./AboutUsPage"; // Importing the AboutUs component from the specified path
import logoretroactive from "../assets/logo.png";
import logocart from "../assets/cart.svg";
import logoprofile from "../assets/person.svg";
import logotopup from "../assets/topup.svg";
import logobusiness from "../assets/business.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

// Defining the Shop functional component
export const Shop = () => {
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0)

  useEffect(() => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");

    axios
      .get("http://localhost:1466/shop/getFromCart", {
        params: {
          namaUser: namaUser,
        },
      })
      .then((res) => {
        const response = res.data;
        let a = 0;
        for (let i = 0; i < response.payload.length; i++) {
          const aa = response.payload[i].cart_jumlah;
          a += aa;
        }
        setCartItemCount(a)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="relative bg-amber-800 flex justify-between items-center p-4">
        <img
          src={logoretroactive}
          className="flex justify-center items-center"
        ></img>
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
          <div className="relative">
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
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {cartItemCount}
            </span>
          </div>
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
      {/* <Hero /> */}
      <div className="mt-4 p-4 mr-4 ml-4 mb-4 bg-white bg-opacity-50 rounded-lg">
        <Popular /> {/*Rendering the Popular component*/}
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
    </div>
  );
};
