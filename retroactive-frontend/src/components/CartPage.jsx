import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CartPage(props) {
  const [getItemCount, setItemCount] = useState(0);
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const [getTotal, setTotal] = useState(0.0);
  const [getItems, setItems] = useState([]);
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [itemShop, setItemShop] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:1466/shop`); // Fetching data from API
      const result = await response.json(); // Parsing JSON response
      setItemShop(result); // Updating state with fetched data
    } catch (err) {
      toast.error("Error fetching data"); // Showing error notification
    }
  };

  const handlePay = () => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");
    axios
      .post("http://localhost:1466/user/pay", {
        totalBelanja: getTotal,
        namaUser: namaUser,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    toast.success("Pembayaran Berhasil!");
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  useEffect(() => {
    fetchData();

    axios
      .get("http://localhost:1466/shop/get")
      .then((res) => {
        console.log(res.data);
        setItems(res.data.data);
        let a = 0;
        for (let i = 0; i < res.data.data.length; i++) {
          a += res.data.data[i].harga_media;
          setTotal(a);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");
    axios
      .get("http://localhost:1466/user/get", {
        params: {
          namaUser: namaUser,
        },
      })
      .then((res) => {
        const response = res.data;
        if (response.state) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
        console.log(response);
        // Mengakses data-data lain dari JSON yang sudah diberikan
        setSaldoUser(response.payload.saldo_user);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <div className="mb-3">
          <h1 className="text-white font-bold">Cart List</h1>
        </div>
        {getItems.length === 0 && (
          <p className="text-red-600 text-2xl bg-white">
            Anda Belum Memasukkan Barang Apapun!
          </p>
        )}
        <div className="flex justify-center">
          <ul className="list-group justify-center shadow-md rounded-xl  mb-4 w-100  ">
            {getItems.map((item, index) => (
              <li
                className={
                  selectedIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                key={item.name}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                <div className="justify-center items-center">
                  <img src={item.gambar_media} className="h-56" />
                </div>
                <div className="align-bottom">
                  <p className="text-nowrap font-semibold">{item.nama_album}</p>
                  <p className="text-nowrap">{item.nama_artis}</p>
                  <p className="text-nowrap font-bold">{item.jenis_media}</p>
                  <p className="text-red-500 font-bold">
                    {item.harga_media} ({item.jumlah})
                  </p>
                </div>

                <div className="flex justify-center items-center">
                  <div className="space-x-4 flex">
                    <button
                      className="flex justify-center rounded bg-green-500 text-white text-opacity-5 items-center font-bold h-7 w-7"
                      title="Confirm Payment"
                      onClick={handlePay}
                    >
                      +
                    </button>

                    <p className="font-bold">A</p>

                    <button
                      className="flex justify-center rounded bg-red-600 text-white text-opacity-5 items-center font-bold  h-7 w-7 "
                      title="Cancel"
                      onClick={() => {
                        toast.error("Masuk Ke Page Pembayaran");
                        setTimeout(() => {
                          navigate("/home");
                        }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul className="list-group list-group-horizontal shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-75 p-3 justify-between bg-white ">
        <div>
          <div className="text-2xl flex font-bold text-center ">
            Payment Information
          </div>

          <ul>
            {getItems.map((item, index) => (
              <li>
                <div className="align-bottom flex">
                  <p className="text-nowrap font-semibold jus">
                    {index + 1}. {item.nama_album} - {item.nama_artis} -{" "}
                    {item.jenis_media} - {item.harga_media} -{" "}
                    {item.harga_media * 2}{" "}
                    {/* 2 nanti diganti sama jumlah pembelian */}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-2xl flex font-bold text-green-500">
            Saldo Anda : {getSaldoUser}{" "}
          </div>
          <div className="text-2xl flex">Total belanja : {getTotal} </div>
        </div>

        <div className="flex space-x-4">
          <button
            className="flex justify-start rounded bg-green-500 text-white text-opacity-5 items-center font-bold max-h-12 "
            title="Confirm Payment"
            onClick={handlePay}
          >
            Confirm Payment
          </button>
          <button
            className="flex justify-start rounded bg-red-600 text-white text-opacity-5 items-center font-bold  max-h-12 "
            title="Cancel"
            onClick={() => {
              toast.error("Masuk Ke Page Pembayaran");
              setTimeout(() => {
                navigate("/home");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
            }}
          >
            X
          </button>
        </div>
      </ul>
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

export default CartPage;
