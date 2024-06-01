import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function userRegisterEvent(namaUser, emailUser, passwordUser, navigate) {
  axios
    .post("http://localhost:1466/user/register", {
      namaUser: namaUser,
      emailUser: emailUser,
      passwordUser: passwordUser,
    })
    .then((res) => {
      toast(res.data.message);
      console.log(res);
      navigate("/login"); 
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
  const navigate = useNavigate();

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
      <form className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
        <form className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h1 className="font-sans flex text-4xl justify-center">
            RETROACTIVE
          </h1>
        </form>
        <label
          className="block font-sans text-gray-300 text-sm font-bold mb-2"
          form="namaUser"
        >
          Username
        </label>
        <input
          className="bg-amber-900 font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="namaUser"
          onChange={handleNamaChange}
          placeholder="Nama User"
        />
        <label
          className="block font-sans text-gray-300 text-sm font-bold mb-2 mr-5"
          form="emailUser"
        >
          Email User
        </label>
        <input
          className="bg-amber-900 font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline "
          type="text"
          name="emailUser"
          onChange={handleEmailChange}
          placeholder="Email User"
        />
        <label
          className="block font-sans text-gray-300 text-sm font-bold mb-2 mr-5"
          form="passwordUser"
        >
          Password User
        </label>
        <input
          className="bg-amber-900 font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="passwordUser"
          onChange={handlePasswordChange}
          placeholder="Password User"
        />
        <div className="mt-3" />
      </form>
      <button
        className="bg-orange-900"
        type="submit"
        onClick={() => {
          userRegisterEvent(getNamaUser, getEmailUser, getPasswordUser, navigate);
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
