import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE;
  const url =
    type === "login" ? `${baseURL}/user/login` : `${baseURL}/user/register`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      type === "login"
        ? { email: formData.email, password: formData.password }
        : formData;

    try {
      const res = await Axios.post(url, payload);
      if (type === "register") {
        setSuccess("Register berhasil! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/store");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900 text-white px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center capitalize">
          {type === "login" ? "Login to your account" : "Create a new account"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm mb-4 text-center">{success}</p>
        )}

        {/* Name only for register */}
        {type === "register" && (
          <div className="mb-3">
            <label htmlFor="name" className="block mb-1 font-medium text-left">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 font-medium text-left">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-left"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition-all"
        >
          {type === "login" ? "Login" : "Register"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-300">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-red-400 hover:text-red-500 font-semibold"
              >
                Register here
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-red-400 hover:text-red-500 font-semibold"
              >
                Login here
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
