import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AxiosUserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const PasswordErrorMessage = () => (
    <p className="text-red-500 text-xs italic mt-2">
      Password should have at least 4 characters
    </p>
  );

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
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: password.value }),
        }
      );
      const data = await response.json();
      const user = data.user;
      if (response.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: user.name,
            _id: user._id,
            email: user.email,
          })
        );
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
    <div className="w-full max-w-xs">
      <form className="bg-amber-950 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4">
        <div className="bg-orange-900 shadow-md scale-110 rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h1 className="font-sans flex text-2xl justify-center">USER LOGIN</h1>
        </div>
        <label className="block font-sans text-gray-300 text-sm font-bold mb-2">
          Nama/Email User
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nama/Email address"
          className="bg-amber-900 font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label className="block font-sans text-gray-300 text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          value={password.value}
          onChange={(e) => setPassword({ ...password, value: e.target.value })}
          onBlur={() => setPassword({ ...password, isTouched: true })}
          placeholder="Password"
          className="bg-amber-900 font-sans mb-3 shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        />
        {password.isTouched && password.value.length < 4 && (
          <PasswordErrorMessage />
        )}
        {loginError && (
          <p className="text-red-500 text-center text-sm">{loginError}</p>
        )}
        <a
          className="text-orange-500 font-sans text-xs"
          href="http://localhost:5173/register"
        >
          Belum memiliki akun? Silakan register!
        </a>
      </form>
      <div className="mt-3" />
      <button
        className="bg-orange-900"
        disabled={!getIsFormValid()}
        onClick={() => {
          console.log("Hilang");
        }}
      >
        Login
      </button>
      <div className="mt-3" />
    </div>
  );
}

export default AxiosUserLoginPage;
