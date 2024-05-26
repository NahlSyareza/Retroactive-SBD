import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import UserInfoPage from './components/UserInfoPage'; 
import TopUpPage from './components/TopUpPage'; 

//disini make data sementara dulu karena login &register belum jadi
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St",
  phone: "555-555-5555",
};

function App() {
  const handleTopUp = (amount: number, paymentMethod: string) => {
    console.log(`Top up with amount: ${amount}, payment method: ${paymentMethod}`);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-content">
            <div className="logo">RETROACTIVE</div>
            <div className="menu-icon">&#9776; menu</div>
            <div className="search-icon">🔍 Search</div>
            <Link to="/user-info" className="profile-icon">👤</Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/user-info" element={<UserInfoPage userData={userData} />} />
            <Route path="/top-up" element={<TopUpPage onTopUp={handleTopUp} />} />
            <Route path="/" element={<div>Welcome to the homepage!</div>} />
          </Routes> 
        </main>
      </div>
    </Router>
  );
}

export default App;
