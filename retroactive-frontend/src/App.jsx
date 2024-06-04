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
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/home" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/info" element={<UserInfoPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/edit" element={<UserEditpage />} />
          <Route path="/dummy" element={<DummyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
