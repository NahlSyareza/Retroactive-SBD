import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Shop } from "./pages/Shop";
import Admin from "./pages/Admin";
import UserRegisterPage from "./components/UserRegisterPage";
import UserInfoPage from "./components/UserInfoPage";
import UserLoginPage from "./components/UserLoginPage";
import CartPage from "./components/CartPage";

function App() {
  //Dummy Data
  const discs = [
    {
      id: 1,
      image: "../src/assets/batch_1/IMG_0001.jpg",
      name: "Here Comes The Sun",
      album: "Abbey Road",
      band: "The Beatles",
      year: "1970",
    },
    {
      id: 2,
      image: "../src/assets/batch_1/IMG_0002.jpg",
      name: "Rocket Man",
      album: "Honky Chateau",
      band: "Elton John",
      year: "1972",
    },
    {
      id: 3,
      image: "../src/assets/batch_1/IMG_0003.jpg",
      name: "Dancing Queen",
      album: "Arrival",
      band: "The Beatles",
      year: "1976",
    },
    {
      id: 4,
      image: "../src/assets/batch_1/IMG_0004.jpg",
      name: "Bohemmian Rapsody",
      album: "A Night at the Opera",
      band: "Queen",
      year: "1975",
    },
    {
      id: 5,
      image: "../src/assets/batch_1/IMG_0005.jpg",
      name: "How Deep Is Your Love",
      album: "Saturday Night Fever",
      band: "Bee Gees",
      year: "1977",
    },
    {
      id: 6,
      image: "../src/assets/batch_1/IMG_0006.jpg",
      name: "Here Comes The Sun",
      album: "Abbey Road",
      band: "The Beatles",
      year: "1970",
    },
    {
      id: 7,
      image: "../src/assets/batch_1/IMG_0007.jpg",
      name: "Rocket Man",
      album: "Honky Chateau",
      band: "Elton John",
      year: "1972",
    },
    {
      id: 8,
      image: "../src/assets/batch_1/IMG_0008.jpg",
      name: "Dancing Queen",
      album: "Arrival",
      band: "The Beatles",
      year: "1976",
    },
    {
      id: 9,
      image: "../src/assets/batch_1/IMG_0009.jpg",
      name: "Bohemmian Rapsody",
      album: "A Night at the Opera",
      band: "Queen",
      year: "1975",
    },
    {
      id: 10,
      image: "../src/assets/batch_1/IMG_0010.jpg",
      name: "How Deep Is Your Love",
      album: "Saturday Night Fever",
      band: "Bee Gees",
      year: "1977",
    },
  ];

  return (
    <>
      {/* Import Dummy Data */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/home"} />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/info" element={<UserInfoPage />} />
          <Route
            path="/cart"
            element={<CartPage items={discs} category="Discs" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
