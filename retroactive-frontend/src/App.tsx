import ListGroup from "./components/ListGroup";
import FormField from "./components/FormField";
import React, { useState, useEffect } from 'react';
import UserInfoPage from './components/UserInfoPage';
import TopUpPage from './components/TopUpPage';
import './App.css'; 

interface UserData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('/');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:1466/user/getUserData'); 
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleTopUp = (amount: number, paymentMethod: string) => {
    console.log(`Top-up amount: ${amount}, Payment Method: ${paymentMethod}`);


    new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Top-up successful');
        alert(`Top-up successful: ${amount} using ${paymentMethod}`);
        resolve();
      }, 1000); 
    }).catch((error) => {
      console.error('Top-up failed:', error);
      alert('Top-up failed, please try again.');
    });
  };

  const handlePageChange = (newPage: string) => {
    window.history.pushState(null, '', newPage);
    setCurrentPage(newPage);
  };

  const renderPage = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    switch (currentPage) {
      case '/infoUserPage':
        return <UserInfoPage userData={userData} />;
      case '/topupUserPage':
        return <TopUpPage onTopUp={handleTopUp} />;
      default:
        return <div>Welcome to the App</div>;
    }
  };

  window.addEventListener('popstate', () => {
    setCurrentPage(window.location.pathname);
  });

  return (
    <div>
      <header className="navbar">
        <div className="nav-buttons">
          <button className="nav-btn" onClick={() => handlePageChange('/infoUserPage')}>User Info</button>
          <button className="nav-btn" onClick={() => handlePageChange('/topupUserPage')}>Top Up</button>
        </div>
      </header>
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
