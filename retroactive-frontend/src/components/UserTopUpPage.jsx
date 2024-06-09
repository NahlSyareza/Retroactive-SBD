import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function UserTopUpPage() {
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const navigate = useNavigate();

  const handleTopUp = () => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");
    axios
      .put("http://localhost:1466/user/topup", {
        namaUser: namaUser,
        saldoUser: getSaldoUser,
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
        toast.success(`Berhasil top up ${getSaldoUser}`);
        setTimeout(() => {
          navigate("/user-info");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e, v) => {
    v(e.target.value);
  };

  return (
    <>
      <div>
        <div className="w-full max-w-sm mx-auto mt-10">
          <div className="bg-amber-950 shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
            <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
              <h1 className="font-sans text-white flex text-4xl justify-center">
                RETROACTIVE
              </h1>
              <h1 className="font-sans text-white flex text-2xl font-bold mt-2 justify-center">
                Top Up
              </h1>
            </div>
            <label
              className="block font-sans text-gray-300 text-sm font-bold mb-2"
              htmlFor="namaUser"
            >
              Saldo
            </label>
            <input
              className="bg-white font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              onChange={(e) => {
                handleChange(e, setSaldoUser);
              }}
              placeholder="Saldo"
            />
            <button
              className="bg-orange-900 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                handleTopUp();
              }}
            >
              Top Up
            </button>
          </div>
        </div>
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
    </>
  );
}

export default UserTopUpPage;
