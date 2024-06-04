import React from "react"; // Importing the React library
import { Hero } from "./hero/Hero"; // Importing the Hero component from the specified path
import Popular from "./popular/PopularPage"; // Importing the Popular component from the specified path
import AboutUs from "./AboutUsPage"; // Importing the AboutUs component from the specified path
import logoretroactive from "../assets/logo.png";
import logocart from "../assets/cart.svg";
import logoprofile from "../assets/person.svg";
import logotopup from "../assets/topup.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Defining the Shop functional component
export const Shop = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative bg-amber-800 flex justify-between items-center p-4">
        <img
          src={logoretroactive}
          className="flex justify-center items-center"
        ></img>
        <div className="flex space-x-4">
          <img
            src={logocart}
            className="flex justify-center items-center size-20"
            title="Open Cart"
            onClick={() => {
              toast.success("Masuk Ke Page Cart");
              setTimeout(() => {
                navigate("/cart");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
            }}
          ></img>
          <img
            src={logoprofile}
            className="flex justify-center items-center size-20"
            title="Open Profile Page"
            onClick={() => {
              toast.success("Masuk Ke Profile Page");
              setTimeout(() => {
                navigate("/info");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
            }}
          ></img>
          <img
            src={logotopup}
            className="flex justify-center items-center size-20"
            title="Open Profile Page"
            onClick={() => {
              toast.success("Masuk Ke TopUp Page");
              setTimeout(() => {
                navigate("/info");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
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
