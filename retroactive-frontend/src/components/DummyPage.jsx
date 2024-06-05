import axios from "axios";
import { useNavigate } from "react-router-dom";
import gacorKang from "../assets/gacor_kang.png";
import { useEffect, useRef, useState } from "react";
import React from "react";
import react from "../assets/react.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pragmatic from "../assets/pragmatic_play.mp3";

function DummyPage() {
  const navigate = useNavigate();

  const audio = useRef(null);
  const [getSpinState, setSpinState] = useState(true);
  const [getRotation, setRotation] = useState(0);
  const [getSaldoUser, setSaldoUser] = useState(0.0);
  const [getTaruhanUser, setTaruhanUser] = useState(0);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const chance = (index, value) => {
    const arr = [4550, 4000, 4350, 4445, 4950];

    return value + arr[index];
  };

  const chamber = 1;
  let spin = 0;
  let final = 0;

  useEffect(() => {
    const namaUser = localStorage.getItem("StaticUtils_loggedNamaUser");
    console.log(namaUser);
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
          setSaldoUser(response.payload.saldo_user);
          console.log(response.payload.saldo_user);
        } else {
          toast.error(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddTaruhan = () => {
    if (getTaruhanUser >= 50000 || getTaruhanUser >= getSaldoUser) {
      toast.error("Taruhan sudah maximum!");
      return;
    } else {
      setTaruhanUser(getTaruhanUser + 500);
    }
  };

  const handleSubTaruhan = () => {
    if (getTaruhanUser < 500) {
      toast.error("Taruhan sudah minimum!");
      return;
    } else {
      setTaruhanUser(getTaruhanUser - 500);
    }
  };

  const handleSpin = () => {
    if (getTaruhanUser <= 0) {
      toast.error("Tidak bisa memulai dengan taruhan 0!");
      return;
    }

    axios
      .put("http://localhost:1466/user/gacor", {
        namaUser: "Nahl",
        taruhanUser: getTaruhanUser,
      })
      .then((res) => {
        const response = res.data;
        if (response.state) {
        } else {
        }
        console.log(response);
      })
      .catch();
    audio.current.play();
    if (getSpinState) {
      const index = randomNumberInRange(0, 4);
      spin = chance(index, getRotation);
      setRotation(spin);
      setSpinState(false);
      setSaldoUser(getSaldoUser - getTaruhanUser);
      console.log(spin);
    }
    setTimeout(() => {
      final = spin % 360;
      console.log(`Done on rotation ${final}`);
      let menangUser = 0;
      if (0 < final && final < 90) {
        menangUser = getTaruhanUser * 3;
        toast.success(`Anda menang ${menangUser}`);
        setSaldoUser(getSaldoUser - getTaruhanUser + menangUser);
      } else if (90 < final && final < 135) {
        menangUser = getTaruhanUser * 10;
        toast.success(`ANDA MENANG ${menangUser}`);
        setSaldoUser(getSaldoUser - getTaruhanUser + menangUser);
      } else {
        menangUser = 0;
        toast.error(`anda menang ${menangUser}`);
      }
      axios
        .put("http://localhost:1466/user/topup", {
          namaUser: "Nahl",
          saldoUser: menangUser,
        })
        .then((res) => {
          const response = res.data;
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      setSpinState(true);
    }, chamber * 1000);
  };

  return (
    <>
      {/* <div className="bg-gray-400 flex justify-start w-full max-w-sm mx-auto mt-10 rounded-3xl">
        <div className="p-4">
          <input className="" />
        </div>
        <div className="p-4">
          <input className="" />
        </div>
      </div> */}
      <div>
        <audio ref={audio} src={pragmatic} />
        <div className="flex justify-center">
          <img src={react} />
        </div>
        <div className="flex justify-center">
          <img
            src={gacorKang}
            style={{
              transform: `rotate(${-getRotation}deg)`,
              transition: `transform ${chamber}s linear`,
            }}
            onClick={handleSpin}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mt-3 mx-auto bg-amber-950 max-w-xs rounded-3xl">
            <button className="m-3 bg-green-600" onClick={handleAddTaruhan}>
              +
            </button>
            <p className="font-bold text-white m-3">{getTaruhanUser}</p>
            <button className="m-3 bg-red-600" onClick={handleSubTaruhan}>
              -
            </button>
          </div>
          <div className="flex justify-center bg-amber-800 max-w-52 rounded-b-3xl mx-auto">
            <p className="text-white m-1">{getSaldoUser}</p>
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
    </>
  );
}

export default DummyPage;
