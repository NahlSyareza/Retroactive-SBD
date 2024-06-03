import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Shop } from "./pages/ShopPage";
import Admin from "./pages/Admin";
import UserRegisterPage from "./components/UserRegisterPage";
import UserInfoPage from "./components/UserInfoPage";
import UserLoginPage from "./components/UserLoginPage";
import CartPage from "./components/CartPage";
import UserEditpage from "./components/UserEditPage";

function App() {
  return (
    <>
      {/* Import Dummy Data */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/home" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/info" element={<UserInfoPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/edit" element={<UserEditpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
