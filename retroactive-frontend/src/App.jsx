import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRegisterPage from "./components/UserRegisterPage";

function App() {
  return (
    <>
      <meta content="0; URL=http://http://localhost:5173/register" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/register" element={<UserRegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
