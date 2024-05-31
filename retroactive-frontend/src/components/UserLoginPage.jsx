import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

const PasswordErrorMessage = () => (
  <p className="text-red-500 text-xs italic mt-2">
    Password should have at least 4 characters
  </p>
);

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const getIsFormValid = () =>
    validateEmail(email) && password.value.length >= 4;

  const validateEmail = (email) =>
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password.value }),
      });
      const data = await response.json();
      const user = data.user;
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify({
          name: user.name,
          _id: user._id,
          email: user.email
        }));
        toast.success("Successfully logged in.");
        navigate("/");
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#D5B98B] to-[#A67B5B]">
      <div className="w-full max-w-lg p-8 bg-[#835C3B] rounded-xl shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-semibold text-center text-[#dbc8a8]">
            Login
          </h2>
          <div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-[#dbc8a8] mb-1">
      Email Address <sup className="text-red-600">*</sup>
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email address"
      className="w-full px-4 py-3 rounded-lg shadow-sm bg-[#584030] border-[#906040] text-[#dbc8a8] focus:border-[#a87040] focus:ring focus:ring-[#a87040] focus:ring-opacity-50"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-[#dbc8a8] mb-1">
      Password <sup className="text-red-600">*</sup>
    </label>
    <input
      type="password"
      value={password.value}
      onChange={(e) =>
        setPassword({ ...password, value: e.target.value })
      }
      onBlur={() => setPassword({ ...password, isTouched: true })}
      placeholder="Password"
      className="w-full px-4 py-3 rounded-lg shadow-sm bg-[#584030] border-[#906040] text-[#dbc8a8] focus:border-[#a87040] focus:ring focus:ring-[#a87040] focus:ring-opacity-50"
    />
    {password.isTouched && password.value.length < 4 && (
      <PasswordErrorMessage />
    )}
  </div>
</div>
          {loginError && (
            <p className="text-red-500 text-center text-sm">{loginError}</p>
          )}
          <button
            type="submit"
            disabled={!getIsFormValid()}
            className="w-full py-3 px-4 bg-[#5C3317] hover:bg-[#7b4921] rounded-lg text-[#dbc8a8] font-bold transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
