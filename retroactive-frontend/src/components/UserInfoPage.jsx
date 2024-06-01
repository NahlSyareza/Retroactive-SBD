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
    axios
      .get("http://localhost:1466/user/get", {
        params: {
          namaUser: "Chamber",
        },
      })
      .then((res) => {
        let isValid = res.data.state;
        if (isValid) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
        console.log(res.data.data[0].nama_user);
        setNamaUser(res.data.data[0].nama_user);

        console.log(res.data.data[0].email_user);
        setEmailUser(res.data.data[0].email_user);

        console.log(res.data.data[0].nama_user);
        setNamaUser(res.data.data[0].nama_user);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  });

  return (
    <div className="w-full max-w-sm mx-auto mt-10">
      <div className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
        <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h1 className="font-sans flex text-4xl justify-center">
            RETROACTIVE
          </h1>
          <h1 className="font-sans flex text-2xl font-bold justify-center mt-2">
            Login Information
          </h1>
        </div>
        <h1 className="flex block font-sans text-gray-300 text-sm font-bold mb-2 mr-5 ml-5">
          Nama : {getNamaUser}
        </h1>
        <h1 className="flex block font-sans text-gray-300 text-sm font-bold mb-2 mr-5 ml-5">
          Email : {getEmailUser}
        </h1>
        <h1 className="flex block font-sans text-gray-300 text-sm font-bold mb-2 mr-5 ml-5">
          Saldo : {getSaldoUser}
        </h1>
        <button
          title="Back"
          onClick={() => {
            toast.success("Kembali ke homepage");
            setTimeout(() => {
              navigate("/home");
            }, 1000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
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
    </div>
  );
}

export default UserInfoPage;
