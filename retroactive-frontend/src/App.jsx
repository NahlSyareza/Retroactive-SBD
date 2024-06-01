import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Shop } from "./pages/Shop";
import Admin from "./pages/Admin";
import UserRegisterPage from "./components/UserRegisterPage";
import UserInfoPage from "./components/UserInfoPage";
import UserLoginPage from "./components/UserLoginPage";
import CartPage from "./components/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/info" element={<UserInfoPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
