import React from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function userGetEvent(namaUser) {
  const querystring = require("node:querystring");

  axios
    .get(
      "http://localhost:1466/user/get",
      querystring.stringify({
        namaUser: namaUser,
      })
    )
    .then((res) => {
      toast(res.data.message);
      console.log(res);
    })
    .catch((err) => {
      toast(err.message);
      console.log(err);
    });
}

function UserInfoPage() {
  return (
    <>
      <button
        onClick={() => {
          userGetEvent(userGetEvent("Chamber"));
        }}
      >
        Test
      </button>
    </>
  );
}

export default UserInfoPage;
