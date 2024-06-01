import React, { useEffect } from "react";
import axios from "axios";
import { MouseEvent, Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function UserInfoPage() {
  const [getUserArray, setUserArray] = useState([]);
  const [isValid, setValid] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <button
        type="submit"
        onClick={() => {
          axios
            .get("http://localhost:1466/user/get", {
              params: {
                namaUser: "Chamber",
              },
            })
            .then((res) => {
              let isValid = res.data.state;
              if (isValid) {
                toast(res.data.message);
              } else {
                toast("Tour de Force");
              }
              console.log(res.data);
            })
            .catch((err) => {
              toast(err.message);
              console.log(err.message);
            });
        }}
      >
        Test
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
    </>
  );
}

export default UserInfoPage;
