import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function CartPage(props) {
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const [getTotal, setTotal] = useState(0.0);
  const [getItems, setItems] = useState([]);
  const [getCartDetail, setCartDetail] = useState([]);
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const buttonText =
    getTotal > getSaldoUser ? "Saldo Anda Tidak Cukup!" : "Confirm";

  const [itemShop, setItemShop] = useState([]);

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
    // fetchData();

    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");

    axios
      .get("http://localhost:1466/shop/getFromCart", {
        params: {
          namaUser: namaUser,
        },
      })
      .then((res) => {
        const response = res.data;
        console.log("Perhitungan total di sini");
        console.log(response);
        setItems(response.payload);
        let a = 0;
        for (let i = 0; i < response.payload.length; i++) {
          const aa =
            response.payload[i].harga_media * response.payload[i].cart_jumlah;
          a += aa;
          setTotal(a);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   try {
  //   //     const response = await fetch(`http://localhost:1466/shop`); // Fetching data from API
  //   //     const result = await response.json(); // Parsing JSON response
  //   //     setItemShop(result); // Updating state with fetched data
  //   //   } catch (err) {
  //   //     toast.error("Error fetching data"); // Showing error notification
  //   //   }
  //   // };

  //   axios
  //     .get("http://localhost:1466/shop", {
  //       params: {
  //         namaUser: namaUser,
  //       },
  //     })
  //     .then((res) => {
  //       const response = res.data;
  //       console.log(response);
  //       setCartDetail(response.payload);
  //       let a = 0;
  //       for (let i = 0; i < response.payload.length; i++) {
  //         a += response.payload[i].harga_media;
  //         setTotal(a);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
          toast.success(response.message);
        } else {
          toast.error(response.message);
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
    <div className="flex-col justify-center items-center min-h-screen mt-3 mb-3 ml-64 mr-64">
      <div className="m-3">
        <h1 className="text-white font-bold">Cart List</h1>
      </div>
      {getItems.length === 0 && (
        <p className="text-red-600 text-2xl bg-white">
          Anda Belum Memasukkan Barang Apapun!
        </p>
      )}
      <div className="flex-col justify-center">
        <ul className="list-group justify-center shadow-md rounded-xl mb-4">
          {getItems.map((item, id) => (
            <li
              className={
                selectedIndex === id
                  ? "list-group-item active"
                  : "list-group-item"
              }
              key={item.nama_album}
              onClick={() => {
                setSelectedIndex(id);
              }}
            >
              <div className="flex">
                <div className="w-20 justify-center text-wrap flex left-0 ">
                  <img src={item.gambar_media} className="h-20" />
                </div>
                <div className="ml-5 w-24 text-left flex">
                  <p className="font-semibold">{item.nama_album}</p>
                </div>
                <div className="ml-5  w-24 flex text-left">
                  <p>{item.nama_artis}</p>
                </div>
                <div className="ml-5  w-12 flex text-left">
                  <p className="text-nowrap font-bold">{item.jenis_media}</p>
                </div>
                <div className="ml-5  w-36 flex text-left">
                  <p className="text-red-500 font-bold">
                    {item.harga_media} ({item.toko_jumlah})
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="flex justify-center rounded bg-green-500 text-white text-opacity-5 items-center font-bold h-7 w-7"
                  title="Add"
                  onClick={() => {
                    axios
                      .post("http://localhost:1466/shop/addToCart", {
                        namaUser: item.nama_user,
                        namaAlbum: item.nama_album,
                      })
                      .then((res) => {
                        const response = res.data;
                        if (response.state) {
                          const changedItems = getItems.map((it, i) => {
                            if (i == id) {
                              it.cart_jumlah = it.cart_jumlah + 1;
                            }
                            return it;
                          });
                          let a = 0;
                          for (let i = 0; i < changedItems.length; i++) {
                            const aa =
                              changedItems[i].harga_media *
                              changedItems[i].cart_jumlah;
                            a += aa;
                            setTotal(a);
                          }
                          console.log(a);
                          setItems(changedItems);
                        }
                        console.log(item.nama_album);
                        console.log(response.message);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  +
                </button>
                <p className="font-bold">{item.cart_jumlah}</p>{" "}
                {/* Progres123*/}
                <button
                  className="flex justify-center rounded bg-red-600 text-white text-opacity-5 items-center font-bold  h-7 w-7 "
                  title="Delete"
                  onClick={() => {
                    axios
                      .post("http://localhost:1466/shop/deleteFromCart", {
                        namaUser: item.nama_user,
                        namaAlbum: item.nama_album,
                      })
                      .then((res) => {
                        const response = res.data;
                        if (response.state) {
                          const changedItems = getItems.map((it, i) => {
                            if (i == id) {
                              it.cart_jumlah = it.cart_jumlah - 1;
                            }
                            return it;
                          });
                          let a = 0;
                          for (let i = 0; i < changedItems.length; i++) {
                            const aa =
                              changedItems[i].harga_media *
                              changedItems[i].cart_jumlah;
                            a += aa;
                            setTotal(a);
                          }
                          console.log(a);
                          setItems(changedItems);
                        }
                        console.log(response.message);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="list-group list-group-horizontal shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-75 p-3 justify-between bg-white font-sans">
        <div>
          <div className="mb-3 text-2xl flex font-bold text-center">
            Payment Information
          </div>

          <div className="text-xl flex font-semibold text-green-500">
            Saldo Anda : {getSaldoUser}{" "}
          </div>

          <div
            className={
              getSaldoUser < getTotal
                ? "text-xl font-semibold flex text-red-700"
                : "text-xl font-semibold flex"
            }
          >
            Total belanja : {getTotal}{" "}
          </div>
        </div>

        <div className="flex-col">
          <Popup
            trigger={
              <button
                className="mb-3 flex justify-end rounded bg-green-500 text-white text-opacity-5 items-center font-bold max-h-12 "
                title="Confirm"
                name="confirm"
              >
                Confirm
              </button>
            }
            modal
            nested
          >
            <ul className="mt-2 mb-2 max-h-48 overflow-x-auto overflow-y-auto">
              <div className="text-xl font-bold">Payment Detail</div>
              {getItems.map((item, index) => (
                <li className="mb-1 flex bg-gray-200 rounded-lg">
                  <p className="ml-1 text-nowrap">
                    {index + 1}. {item.nama_album} - {item.nama_artis} -{" "}
                    {item.jenis_media} - {item.harga_media} -
                    {item.harga_media * item.cart_jumlah}{" "}
                  </p>
                </li>
              ))}
              <button
                className={
                  getTotal > getSaldoUser
                    ? "mb-3 flex justify-end rounded bg-red-500 text-white text-opacity-5 items-center font-bold max-h-12 "
                    : "mb-3 flex justify-end rounded bg-green-500 text-white text-opacity-5 items-center font-bold max-h-12 "
                }
                title="Confirm"
                name="confirm"
                disabled={getTotal > getSaldoUser}
                onClick={handlePay}
              >
                {buttonText}
              </button>
            </ul>{" "}
          </Popup>
          <button
            className="flex justify-end rounded bg-red-600 text-white text-opacity-5 items-center font-bold  max-h-12 "
            title="Cancel"
            name="cancel"
            onClick={() => {
              toast.error("Pembayaran dibatalkan, kembali ke home");
              setTimeout(() => {
                navigate("/home");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
            }}
          >
            Cancel
          </button>
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
    </div>
  );
}

export default CartPage;
