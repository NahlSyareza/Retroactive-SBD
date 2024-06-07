import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TokoLoginPage() {
  const [getDataToko, setDataToko] = useState("");
  const [passwordToko, setPasswordToko] = useState("");
  const [passwordField, setPasswordField] = useState("password");
  const navigate = useNavigate();

  const handleDataTokoChange = (event) => {
    setDataToko(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordToko(event.target.value);
  };

  const handleShowPassword = (e) => {
    if (e.target.checked) {
      setPasswordField("text");
    } else {
      setPasswordField("password");
    }
  };

  const handleLogin = () => {
    axios
      .get("http://localhost:1466/shop/login", {
        params: {
          dataToko: getDataToko,
          passwordToko: passwordToko,
        },
      })
      .then((res) => {
        const response = res.data;
        if (response.state) {
          localStorage.setItem(
            "StaticUtils_loggedNamaToko",
            response.payload.nama_Toko
          );
          toast.success(response.message);
          setTimeout(() => {
            navigate("/toko-home");
          }, 2000); // Tambahkan delay agar Toko bisa melihat toast sebelum dialihkan
        } else {
          toast.error(response.message);
        }
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  return (
    <div>
      <div className="w-full max-w-sm mx-auto mt-10">
        <div className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
          <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
            <h1 className="font-sans text-white flex text-4xl justify-center">
              RETROACTIVE
            </h1>
            <h1 className="font-sans text-white flex text-2xl font-bold mt-2 justify-center">
              Toko Login
            </h1>
          </div>
          <label
            className="block font-sans text-gray-300 text-sm font-bold mb-2"
            htmlFor="getDataToko"
          >
            Email or name
          </label>
          <input
            className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="getDataToko"
            onChange={handleDataTokoChange}
            placeholder="Email or Tokoname"
          />
          <label
            className="block font-sans text-gray-300 text-sm font-bold mb-2 mr-5"
            htmlFor="passwordToko"
          >
            Password
          </label>
          <input
            className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            type={passwordField}
            name="passwordToko"
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <div className="flex ml-2">
            <input
              type="checkbox"
              className="mr-3"
              onChange={handleShowPassword}
            />
            <span className="text-white text-sm">Show password</span>
          </div>
          <div>
            <a
              href="http://localhost:5173/toko-register"
              className="text-orange-700 text-sm mt-3"
            >
              Belum memiliki akun? Silakan register!
            </a>
          </div>
          <div className="mt-3" />
          <button
            className="bg-orange-900 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Login
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
    </div>
  );
}

export default TokoLoginPage;
