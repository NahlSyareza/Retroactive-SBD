import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UserRegisterPage from "./components/UserRegisterPage";
import UserLoginPage from "./components/UserLoginPage";

function App() {
  return (
    <>
      <meta content="0; URL=http://http://localhost:5173/register" />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/login" element={<UserLoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
