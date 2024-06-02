import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";

function UserInfoPage() {
  const [getUserArray, setUserArray] = useState([]);
  const [isValid, setValid] = useState(false);
  const [getNamaUser, setNamaUser] = useState("");
  const [getEmailUser, setEmailUser] = useState("");
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const navigate = useNavigate();
  const [getTestArr, setTestArr] = useState([]);
  const [getTestValule, setTestValue] = useState(0);

  useEffect(() => {
    // Parse digunakan untuk mengubah JSON.stringify menjadi JSON beneran
    // dan di-assign ke variabel bernama chamber
    const chamber = JSON.parse(localStorage.getItem("UserLogin_namaUser"));
    const headhunter = chamber.data;
    const getUser = async () => {
      axios
        .get("http://localhost:1466/user/get", {
          params: {
            // Mengakses data dengan menggunakan titik, seperti contoh chamber.nama_user
            namaUser: headhunter.nama_user,
          },
        })
        .then((res) => {
          let isValid = res.data.message;
          if (isValid) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          console.log(chamber);
          // Mengakses data-data lain dari JSON yang sudah diberikan
          setNamaUser(headhunter.nama_user);
          setEmailUser(headhunter.email_user);
          setNamaUser(headhunter.nama_user);
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err.message);
        });
    };
    getUser();
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto mt-10 inline-flex">
      <div className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
        <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h1 className="font-sans text-white flex text-4xl justify-center">
            RETROACTIVE
          </h1>
          <h1 className="font-sans text-white flex text-2xl font-bold justify-center mt-2">
            Login Information
          </h1>
        </div>
        <div className="bg-amber-900 p-1 rounded-3xl mb-3">
          <p className="flex font-sans text-gray-300 text-sm font-bold mb-2 mt-2 mr-5 ml-5">
            Nama : {getNamaUser}
          </p>
        </div>
        <div className="bg-amber-900 p-1 rounded-3xl mb-3">
          <p className="flex font-sans text-gray-300 text-sm font-bold mb-2 mt-2 mr-5 ml-5">
            Email : {getEmailUser}
          </p>
        </div>
        <div className="bg-amber-900 p-1 rounded-3xl mb-3">
          <p className="flex font-sans text-gray-300 text-sm font-bold mb-2 mt-2 mr-5 ml-5">
            Saldo : {getSaldoUser}
          </p>
        </div>
        <button
          className="flex justify-start rounded bg-orange-900 text-white"
          title="Back"
          onClick={() => {
            toast.success("Kembali ke homepage");
            setTimeout(() => {
              navigate("/home");
            }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
          }}
        >
          Back
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
      <div className="bg-amber-950 shadow-md rounded-3xl px-10 pt-3 pb-8 mb-4 ml-3">
        <div className="grid">
          <img src={logo} className="ml-1 scale-125" />
          <p className="text-sm mt-2 text-white font-bold font-sans text-nowrap justify-center">
            Top Up
          </p>
          <img src={logo} className="ml-1 scale-125" />
          <p className="text-sm mt-2 text-white font-bold font-sans text-nowrap justify-center">
            Top Up
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
