import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

  const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleDelay = async () => {
    await delay(2000);
    navigate("/home");
  };

  return (
    <div className="w-full max-w-xs">
      <form className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
        <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h1 className="font-sans flex text-2xl justify-center">
            USER REGISTER
          </h1>
        </div>
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
          axios
            .post("http://localhost:1466/user/register", {
              namaUser: getNamaUser,
              emailUser: getEmailUser,
              passwordUser: getPasswordUser,
            })
            .then((res) => {
              toast(res.data.message);
              console.log(res.data);
              let state = res.data.state;
              if (state) {
                navigate("/login");
              }
            })
            .catch((err) => {
              toast(err.message);
              console.log(err);
            });
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
