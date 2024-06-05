import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Shop } from "./components/HomePage";
import Admin from "./pages/Admin";
import UserRegisterPage from "./components/UserRegisterPage";
import UserInfoPage from "./components/UserInfoPage";
import UserLoginPage from "./components/UserLoginPage";
import CartPage from "./components/CartPage";
import UserEditpage from "./components/UserEditPage";
import DummyPage from "./components/DummyPage";

function App() {
  return (
    <>
      {/* Import Dummy Data */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/user-login"} />} />
          <Route path="/user-login" element={<UserLoginPage />} />
          <Route path="/home" element={<Shop />} />
          <Route path="/toko-admin" element={<Admin />} />
          <Route path="/user-register" element={<UserRegisterPage />} />
          <Route path="/user-info" element={<UserInfoPage />} />
          <Route path="/user-cart" element={<CartPage />} />
          <Route path="/user-edit" element={<UserEditpage />} />
          <Route path="/dummy" element={<DummyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
