import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CartPage(props) {
  const [getItemCount, setItemCount] = useState(0);
  const itemList = props.items;

  let items = ["The Beatles", "Elton John", "ABBA", "Bee Gees", "Bon Jovi"];

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1 className="text-white">Cart List</h1>
      {itemList.length === 0 && (
        <p className="text-red-600 text-2xl bg-white">
          Anda Belum Memasukkan Barang Apapun!
        </p>
      )}
      <ul className="list-group bg-white shadow-md rounded-3xl px-8 pt-6 pb-8 mb-4">
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
            {item.name} : &nbsp;
          </li>
        ))}
      </ul>
    </>
  );
}

export default CartPage;
