import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRegisterPage from "./components/UserRegisterPage";
import UserInfoPage from "./components/UserInfoPage";
import UserLoginPage from "./components/UserLoginPage";
import CartPage from "./components/CartPage";

function App() {
  //Dummy Data
  const discs = [
    {
      id: 1,
      name: "Here Comes The Sun",
      album: "Abbey Road",
      band: "The Beatles",
      year: "1970",
    },
    {
      id: 2,
      name: "Rocket Man",
      album: "Honky Chateau",
      band: "Elton John",
      year: "1972",
    },
    {
      id: 3,
      name: "Dancing Queen",
      album: "Arrival",
      band: "The Beatles",
      year: "1976",
    },
    {
      id: 4,
      name: "Bohemmian Rapsody",
      album: "A Night at the Opera",
      band: "Queen",
      year: "1975",
    },
    {
      id: 5,
      name: "How Deep Is Your Love",
      album: "Saturday Night Fever",
      band: "Bee Gees",
      year: "1977",
    },
  ];

  return (
    <>
      {/* Import Dummy Data */}
      <List items={discs} category="Discs" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/info" element={<UserInfoPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
