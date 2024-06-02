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

  useEffect(() => {
    const getUser = async () => {
      axios
        .get("http://localhost:1466/user/get", {
          params: {
            namaUser: localStorage.getItem("UserLogin_namaUser"),
          },
        })
        .then((res) => {
          let isValid = res.data.state;
          if (isValid) {
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          setNamaUser(res.data.data[0].nama_user);
          setEmailUser(res.data.data[0].email_user);
          setNamaUser(res.data.data[0].nama_user);
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
      <div className="bg-amber-950 shadow-md rounded-3xl pl-5 pt-3 mb-4 ml-3">
        <div className="flex justify-start">
          <p className="text-sm mt-3 ml-2">Top</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfoPage;
