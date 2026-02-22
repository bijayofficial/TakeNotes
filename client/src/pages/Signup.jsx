import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userBio: "",
    userEmail: "",
    userMobile: "",
    userName: "",
    userPassword: "",
  });
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (profileImg) {
      data.append("profileImg", profileImg);
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        body: data,
      });

      // const result = await res.json();
      // alert("Signup Successful");

      const result = await res.json();
      console.log(result);

      // 🔥 Important Logic

      if (result.success) {
        alert("Signup Successful ✅");
        // Redirect to login page
        navigate("/login");
      } else {
        alert(result.message); // Show backend message
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 w-full max-w-3xl rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-200">
          Create Your Account
        </h2>

        {/* Profile Image Preview */}
        <div className="flex justify-center mb-8">
          <label className="cursor-pointer relative">
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden border-4 border-gray-100 shadow-md">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-200 text-sm">
                  Upload
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
          />
          <Input
            name="userEmail"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <Input
            name="userMobile"
            placeholder="Mobile Number"
            onChange={handleChange}
          />
          <Input
            name="userName"
            placeholder="Username"
            onChange={handleChange}
          />
          <Input
            name="userPassword"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        <textarea
          name="userBio"
          placeholder="Tell us about yourself..."
          onChange={handleChange}
          className="w-full mt-6 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />

        <button
          type="submit"
          className="w-full mt-8 bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

const Input = ({ name, type = "text", placeholder, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={onChange}
    required
    className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
);

export default Signup;
