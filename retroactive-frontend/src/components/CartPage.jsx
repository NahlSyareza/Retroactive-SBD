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

  const itemList = props.items;

  // let items = ["The Beatles", "Elton John", "ABBA", "Bee Gees", "Bon Jovi"];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <>
        <div>
          <h1 className="text-white">Cart List</h1>
          {itemList.length === 0 && (
            <p className="text-red-600 text-2xl bg-white">
              Anda Belum Memasukkan Barang Apapun!
            </p>
          )}
          <div className="flex justify-center">
            <ul className="list-group list-group-horizontal justify-center shadow-md rounded-xl  mb-4 w-75  xl:grid-cols-5   ">
              {itemList.map((item, index) => (
                <li
                  className={
                    selectedIndex === index
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  key={item.id}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                >
                  <p className="text-2xl font-bold leading-none">
                    {item.name} &nbsp;
                  </p>
                  <img src={item.image} />
                  <p className="leading-none">{item.album} &nbsp;</p>
                  <p>{item.band} &nbsp;</p>
                  <p>{item.year} &nbsp;</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>

      <ul className="list-group list-group-horizontal shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 w-75 p-3 justify-between bg-white ">
        <div>
          <div className="text-2xl flex font-semibold text-center ">
            Payment Information
          </div>
          <div className="text-2xl flex font-semibold ">
            Saldo Anda : {getSaldoUser}{" "}
          </div>
          <div className="text-2xl flex font-semibold">
            Total Belanja : {getTotal}{" "}
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="flex justify-start rounded bg-green-500 text-white text-opacity-5 items-center font-bold max-h-12 "
            title="Confirm Payment"
            onClick={() => {
              toast.success("Masuk Ke Page Pembayaran");
              setTimeout(() => {
                navigate("/home");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
            }}
          >
            Confirm Payment
          </button>
          <button
            className="flex justify-start rounded bg-red-600 text-white text-opacity-5 items-center font-bold  max-h-12 "
            title="Cancel"
            onClick={() => {
              toast.success("Masuk Ke Page Pembayaran");
              setTimeout(() => {
                navigate("/home");
              }, 2000); // Tambahkan delay agar user bisa melihat toast sebelum dialihkan
            }}
          >
            X
          </button>
        </div>
      </ul>
    </div>
  );
}

export default CartPage;
