
import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API from "../api/axios";

interface LoginResponse {
  token: string;
  role: string;
  id: string;
  name: string;
  email: string;
  
}

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ============================
  // LOGIN FUNCTION
  // ============================
  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post<LoginResponse>(
        "/auth/login",
        {
          email: email.trim().toLowerCase(),
          password: password,
        }
      );

      const data = response.data;

      console.log("Login successful");

      // VALIDATE RESPONSE
      if (!data.token || !data.role || !data.id) {
        setError("Invalid login response");
        return;
      }

      const role = data.role.toLowerCase();

      if (role !== "admin" && role !== "user") {
        setError("Invalid user role");
        return;
      }

      // ============================
      // SAVE LOGIN DATA
      // ============================
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);

      // ============================
      // ROLE BASED NAVIGATION
      // ============================
      if (role === "admin") {
        navigate("/Dashboard", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Login Status:", err.response?.status);
        console.error("Login Error:", err.response?.data);

        const status = err.response?.status;

        if (status === 401) {
          setError("Invalid email or password");
        } else if (status === 400) {
          setError("Please enter valid login details");
        } else if (!err.response) {
          setError("Cannot connect to backend server");
        } else {
          setError(
            err.response?.data?.message ||
            "Unable to login"
          );
        }
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f9] flex items-center justify-center">
      <div className="w-[405px] bg-white rounded-2xl shadow-xl px-8 py-9">

        {/* LOGO */}
        <h1 className="text-3xl font-bold italic text-[#f84ea0] text-center">
          Cosmetopia
        </h1>

        <p className="text-gray-500 text-sm text-center mt-2">
          Welcome back!
        </p>

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center mt-9 mb-6 text-gray-900">
          Login to your account
        </h2>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">
            {error}
          </p>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-[#f84ea0]"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-[#f84ea0]"
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f84ea0] text-black font-semibold py-3 rounded-lg hover:bg-pink-500 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* REGISTER LINK */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/Register"
            className="text-[#f84ea0] font-semibold"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
