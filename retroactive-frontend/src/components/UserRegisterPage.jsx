import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

function userRegisterEvent(namaUser, emailUser, passwordUser) {
  axios
    .post("http://localhost:1466/user/register", {
      namaUser: namaUser,
      emailUser: emailUser,
      passwordUser: passwordUser,
    })
    .then((res) => {
      toast(res.data.message);
      console.log(res);
    })
    .catch((err) => {
      toast(err.message);
      console.log(err);
    });
}

function UserRegisterPage() {
  const [getNamaUser, setNamaUser] = useState("");
  const [getEmailUser, setEmailUser] = useState("");
  const [getPasswordUser, setPasswordUser] = useState("");

  const handleNamaChange = (event) => {
    setNamaUser(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmailUser(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordUser(event.target.value);
  };

  return (
    <div className="w-full max-w-xs">
      <h1 className="font-sans my-10 flex justify-center">RETROACTIVE</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label
          className="block font-sans text-gray-700 text-sm font-bold mb-2"
          form="namaUser"
        >
          Username
        </label>
        <input
          className="bg-gray-100 font-sans mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="namaUser"
          onChange={handleNamaChange}
          placeholder="Nama User"
        />
        <label
          className="block font-sans text-gray-700 text-sm font-bold mb-2 mr-5"
          form="emailUser"
        >
          Email User
        </label>
        <input
          className="bg-gray-100 font-sans mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          type="text"
          name="emailUser"
          onChange={handleEmailChange}
          placeholder="Email User"
        />
        <label
          className="block font-sans text-gray-700 text-sm font-bold mb-2 mr-5"
          form="passwordUser"
        >
          Password User
        </label>
        <input
          className="bg-gray-100 font-sans mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="passwordUser"
          onChange={handlePasswordChange}
          placeholder="Password User"
        />
      </form>
      <button
        onClick={() => {
          userRegisterEvent(getNamaUser, getEmailUser, getPasswordUser);
        }}
      >
        Register
      </button>
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
