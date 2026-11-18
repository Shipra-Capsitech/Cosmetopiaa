import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

// REGISTER FUNCTION
const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    const response = await API.post("/auth/register", {
      Name: name.trim(),                   
      Email: email.trim().toLowerCase(),     
      Password: password,                    
      Role:null                   
    });

    alert(response.data?.message || "Registration successful!");

    // REGISTER SUCCESS -> LOGIN PAGE
    navigate("/login");

  } catch (err) {
    if (axios.isAxiosError(err)) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } else {
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#fff5f8] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* LOGO */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold italic text-[#f84ea0]">
            Cosmetopia
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account!
          </p>
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Register your account
        </h3>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister} className="space-y-5">

          {/* USERNAME */}
          <input
            type="text"
            placeholder="UserName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#f84ea0]"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#f84ea0]"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#f84ea0]"
          />

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#f84ea0] text-black font-semibold rounded-lg hover:bg-[#e83d91] transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#f84ea0] font-semibold"
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;