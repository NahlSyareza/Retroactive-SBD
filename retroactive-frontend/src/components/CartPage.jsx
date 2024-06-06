import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Modal from "react-modal";
import trash from "../assets/delete.svg";
import jsPDF from "jspdf";
import "jspdf-autotable";

function CartPage(props) {
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const [getTotal, setTotal] = useState(0.0);
  const [getItems, setItems] = useState([]);
  const navigate = useNavigate();

  const [getSelectedIndex, setSelectedIndex] = useState(-1);
  const buttonText =
    getTotal > getSaldoUser ? "Saldo Anda Tidak Cukup!" : "Confirm";
  const buttonPDF =
    getTotal > getSaldoUser ? "Export to PDF" : "Confirm and Export to PDF";
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModalDeny = () => {
    setModalIsOpen(false);
  };

  const closeModalAccept = () => {
    setModalIsOpen(false);
    const namaUser = getItems[getSelectedIndex].nama_user;
    const namaAlbum = getItems[getSelectedIndex].nama_album;

    axios
      .delete("http://localhost:1466/shop/removeFromCart", {
        params: {
          namaUser: namaUser,
          namaAlbum: namaAlbum,
        },
      })
      .then((res) => {
        const response = res.data;
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [open, setOpen] = React.useState(false);
  const receiptOpen = () => setOpen(true);
  const receiptClose = () => setOpen(false);
  const [showButton, setShowButton] = useState(true);

  const toggleButton = () => {
    setShowButton(!showButton);
  };

  const handleConfirm = () => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");

    if (getSaldoUser < getTotal) {
      toast.error("Saldo user tidak cukup!");
      return;
    }

    axios
      .put("http://localhost:1466/user/pay", {
        totalBelanja: getTotal,
        namaUser: namaUser,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .put("http://localhost:1466/user/addToInventory", {
        namaUser: namaUser,
      })
      .then((res) => {
        const response = res.data;
        console.log(response.message);
        axios
          .put("http://localhost:1466/shop/subFromInventory", {
            namaUser: namaUser,
          })
          .then((res) => {
            const response = res.data;
            console.log(response.message);
            toast.success("Berhasi membeli!");
            setTimeout(() => {
              navigate("/home");
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePay = () => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");
    axios
      .put("http://localhost:1466/user/pay", {
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

  const exportToPDF = () => {
    handlePay;
    const doc = new jsPDF();
    const tableColumn = [
      "No",
      "Nama Album",
      "Nama Artis",
      "Jenis Media",
      "Harga Media",
      "Jumlah Barang",
      "Total",
    ];
    const tableRows = [];

    getItems.forEach((item, index) => {
      const itemData = [
        index + 1,
        item.nama_album,
        item.nama_artis,
        item.jenis_media,
        item.harga_media,
        item.cart_jumlah,
        item.harga_media * item.cart_jumlah,
      ];
      tableRows.push(itemData);
    });

    // Menambahkan total row
    const totalItems = getItems.reduce(
      (acc, item) => acc + item.cart_jumlah,
      0
    );
    tableRows.push(["", "", "", "", "Total Belanja", totalItems, getTotal]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text("Payment Detail", 14, 15);
    doc.save("receipt.pdf");
  };

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
                "list-group-item"
                // selectedIndex === id
                //   ? "list-group-item active"
                //   : "list-group-item"
              }
              key={item.nama_album}
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
              <div className="flex justify-end space-x-4">
                <img
                  src={trash}
                  className="flex justify-center items-center h-7 w-7"
                  onClick={() => {
                    setModalIsOpen(true);
                    setSelectedIndex(id);
                  }}
                ></img>
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
                    if (item.cart_jumlah <= 0) {
                      console.log("Halo"); //Make progress if <0 should delete
                    }

                    axios
                      .post("http://localhost:1466/shop/subFromCart", {
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
          <button
            className="mb-3 flex justify-end rounded bg-green-500 text-white text-opacity-5 items-center font-bold max-h-12 "
            title="Confirm"
            name="confirm"
            onClick={
              handleConfirm
              /*    () => {
              receiptOpen(true);
            }*/
            }
          >
            Confirm
          </button>
          <Modal
            isOpen={open}
            onClose={receiptClose}
            className="bg-transparent"
          >
            <ul className="max-auto max-w-screen-xl overflow-x-auto relative mx-auto my-24  bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="mt-5 mx-3 mb-2 text-xl font-bold">
                Payment Detail
              </div>
              <div>
                <div className="overflow-x-auto overflow-y-auto max-h-96 x-96">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nama Album
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Nama Artis
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Jenis Media
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Harga Media
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Jumlah
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getItems.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.nama_album}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.nama_artis}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.jenis_media}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.harga_media}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.cart_jumlah}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.harga_media * item.cart_jumlah}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td
                          className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          colSpan="5"
                        >
                          Total Belanja
                        </td>
                        <td className="px-4 py-2 text-left text-xs font-medium text-gray-900">
                          {(() => {
                            let totalItems = 0;
                            for (let item of getItems) {
                              totalItems += item.cart_jumlah;
                            }
                            return totalItems;
                          })()}
                        </td>

                        <td className="px-4 py-2 text-left text-xs font-medium text-gray-900">
                          {getTotal}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex space-x-4 max-h-12 mx-3 mb-2">
                <button
                  className={
                    getTotal > getSaldoUser
                      ? "mb-3 flex justify-end rounded bg-red-500 text-white text-opacity-5 items-center font-bold h-12 "
                      : "mb-3 flex justify-end rounded bg-green-500 text-white text-opacity-5 items-center font-bold h-12 "
                  }
                  title="Confirm"
                  name="confirm"
                  disabled={getTotal > getSaldoUser}
                  onClick={handlePay}
                >
                  {buttonText}
                </button>
                <button
                  className={
                    getTotal > getSaldoUser
                      ? "bg-red-500 text-white rounded h-12 px-4"
                      : "bg-blue-500 text-white rounded h-12 px-4"
                  }
                  // disabled={getTotal > getSaldoUser}
                  onClick={() => {
                    if (getTotal <= getSaldoUser) {
                      handlePay(); // Jalankan handlePay jika total belanja tidak melebihi saldo
                    }
                    exportToPDF();
                  }}
                >
                  {buttonPDF}
                </button>
                <button
                  className="bg-red-500 text-white"
                  onClick={receiptClose}
                >
                  X
                </button>
              </div>
            </ul>{" "}
          </Modal>

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

      <Modal
        className="bg-transparent"
        isOpen={modalIsOpen}
        onRequestClose={closeModalDeny}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            color: "lightsteelblue",
          },
        }}
      >
        <div className="relative p-4 w-full max-w-md max-h-full mx-auto my-32">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <h3 className="mb-5 text-lg font-sans text-gray-800">
                Apakah Anda ingin menghapus barang ini dari cart?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="font-sans text-white bg-red-600 rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={closeModalAccept}
              >
                Ya
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="font-sans py-2.5 px-5 ms-3 text-sm text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200"
                onClick={closeModalDeny}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CartPage;
