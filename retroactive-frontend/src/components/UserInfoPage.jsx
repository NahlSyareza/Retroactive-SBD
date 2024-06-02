import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";
import edit from "../assets/edit.svg";
import topup from "../assets/topup.svg";
import spin from "../assets/spin.svg";

function UserInfoPage() {
  const [getNamaUser, setNamaUser] = useState("");
  const [getEmailUser, setEmailUser] = useState("");
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const navigate = useNavigate();

  useEffect(() => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");
    const getUser = async () => {
      axios
        .get("http://localhost:1466/user/get", {
          params: {
            namaUser: namaUser,
          },
        })
        .then((res) => {
          const response = res.data;
          let isValid = response.message;
          if (isValid) {
            toast.success(response.message);
          } else {
            toast.error(response.message);
          }
          setNamaUser(response.payload.nama_user);
          setEmailUser(response.payload.email_user);
          setSaldoUser(response.payload.saldo_user);
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err.message);
        });
    };
    getUser();
  }, []);

  const handleOnEditClick = () => {
    toast.success("Mengedit edit ya ges ya");
    setTimeout(() => {
      navigate("/edit");
    }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
  };

  const handleOnTopUpClick = () => {
    toast.success("VOM");
    // navigate("/topup");
  };

  const handleOnSpinClick = () => {
    toast.success("ZOBBOP");
    // navigate("/spin");
  };

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
      <div className="bg-amber-950 shadow-md rounded-3xl px-10 pb-8 mb-4 ml-3">
        <div className="grid">
          <img src={edit} className="ml-1 mt-3" onClick={handleOnEditClick} />
          <p className="text-sm mt-2 text-white font-bold font-sans text-nowrap justify-center">
            Edit
          </p>
          <img src={topup} className="ml-1 mt-3" onClick={handleOnTopUpClick} />
          <p className="text-sm mt-2 text-white font-bold font-sans text-nowrap justify-center">
            Top Up
          </p>
          <img src={spin} className="ml-1 mt-3" onClick={handleOnSpinClick} />
          <p className="text-sm mt-2 text-white font-bold font-sans text-nowrap justify-center">
            Spin
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
