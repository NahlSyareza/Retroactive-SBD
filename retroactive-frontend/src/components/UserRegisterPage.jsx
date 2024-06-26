import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/react.svg";

function UserRegisterPage() {
  const [getNamaUser, setNamaUser] = useState("");
  const [getEmailUser, setEmailUser] = useState("");
  const [getPasswordUser, setPasswordUser] = useState("");
  const [getPasswordField, setPasswordField] = useState("password");
  const navigate = useNavigate();

  const handleUserRegister = () => {
    axios
      .post("http://localhost:1466/user/register", {
        namaUser: getNamaUser,
        emailUser: getEmailUser,
        passwordUser: getPasswordUser,
      })
      .then((res) => {
        const response = res.data;
        if (response.state) {
          toast.success(response.message);
          setTimeout(() => {
            navigate("/user-login");
          }, 2000);
        } else {
          toast.error(response.message);
        }
        console.log(response);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  const handleShowPassword = (e) => {
    if (e.target.checked) {
      setPasswordField("text");
    } else {
      setPasswordField("password");
    }
  };

  const handleNamaChange = (event) => {
    setNamaUser(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmailUser(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordUser(event.target.value);
  };

  const handleRegister = () => {
    userRegisterEvent(getNamaUser, getEmailUser, getPasswordUser, navigate);
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <div className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
        <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h1 className="font-sans text-white flex text-4xl justify-center">
            RETROACTIVE
          </h1>
          <h1 className="font-sans text-white flex text-2xl font-bold mt-2 justify-center">
            User Register
          </h1>
        </div>
        <label
          className="block font-sans text-gray-300 text-sm font-bold mb-2"
          htmlFor="namaUser"
        >
          Username
        </label>
        <input
          className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="namaUser"
          onChange={handleNamaChange}
          placeholder="Nama User"
        />
        <label
          className="block font-sans text-gray-300 text-sm font-bold mb-2 mr-5"
          htmlFor="emailUser"
        >
          Email User
        </label>
        <input
          className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline "
          type="text"
          name="emailUser"
          onChange={handleEmailChange}
          placeholder="Email User"
        />
        <label
          className="block font-sans text-gray-300 text-sm font-bold mb-2 mr-5"
          htmlFor="passwordUser"
        >
          Password User
        </label>
        <input
          className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          type={getPasswordField}
          name="passwordUser"
          onChange={handlePasswordChange}
          placeholder="Password User"
        />
        <div className="flex ml-2">
          <input
            type="checkbox"
            className="mr-3"
            onChange={handleShowPassword}
          />
          <span className="text-white text-sm">Show password</span>
        </div>
        <div className="mt-3" />
        <button
          className="bg-orange-900 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleUserRegister}
        >
          Register
        </button>
      </div>
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
}

export default UserRegisterPage;
