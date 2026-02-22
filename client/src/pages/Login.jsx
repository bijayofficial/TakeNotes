import React, { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    userEmail: "",
    userPassword: "",
  });

  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        setUserData(result.data); // store user data
        setMessage(result.message);
      } else {
        setMessage(result.message);
        setUserData(null);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        {!userData ? (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={form.userEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="password"
              name="userPassword"
              placeholder="Password"
              value={form.userPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Login
            </button>

          </form>
        ) : (
          <div className="text-center space-y-3">
            <h3 className="text-green-600 font-semibold">
              {message}
            </h3>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p><strong>ID:</strong> {userData.id}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Username:</strong> {userData.username}</p>
            </div>
          </div>
        )}

        {message && !userData && (
          <p className="text-red-600 mt-4 text-center">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default Login;