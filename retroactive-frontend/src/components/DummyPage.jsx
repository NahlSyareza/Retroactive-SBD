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

  const handleSpin = () => {
    audio.current.play();
    if (getSpinState) {
      const index = randomNumberInRange(0, 4);
      spin = chance(index, getRotation);
      setRotation(spin);
      setSpinState(false);
      // const tourdeforce = Math.ceil((getRotation % 360) / 180 + 2);
      // console.log(`Test ${tourdeforce}`);
      console.log(spin);
    }
    setTimeout(() => {
      final = spin % 360;
      console.log(`Done on rotation ${final}`);
      if (0 < final && final < 90) {
        toast.success("Menang x3");
      } else if (90 < final && final < 135) {
        toast.success("MENANG X10");
      } else {
        toast.error("Silakan coba lagi!");
      }
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
            // className={getSpinState ? "animate-spin" : "animate-none"}
            style={{
              transform: `rotate(${-getRotation}deg)`,
              transition: `transform ${chamber}s linear`,
            }}
            onClick={handleSpin}
          />
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
