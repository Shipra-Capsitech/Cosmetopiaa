import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

interface UserProfileData {
  userId: string;
  username: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  joinedAt?: string;
}

interface UpdateUserPayload {
  name: string;
  email: string;
}

function UserProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [editForm, setEditForm] = useState<UpdateUserPayload>({
    name: "",
    email: "",
  });

  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // ============================================================
  // GET CURRENT USER
  // ============================================================

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const storedUserId = localStorage.getItem("userId");

        if (!token || !storedUserId) {
          setError("Session expired. Please login again.");

          setTimeout(() => {
            navigate("/login");
          }, 2000);

          return;
        }

        const response = await API.get<UserProfileData>(
          `/auth/GetMe?id=${storedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token.trim()}`,
            },
          }
        );

        setProfile(response.data);

        setEditForm({
          name: response.data.username,
          email: response.data.email,
        });
      } catch (err: any) {
        console.error("Profile Fetch Error:", err);

        const message =
          err.response?.data?.message ||
          err.response?.data ||
          "Unable to load profile.";

        setError(
          typeof message === "string"
            ? message
            : "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // ============================================================
  // EDIT FORM CHANGE
  // ============================================================

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // UPDATE PROFILE
  // ============================================================

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setUpdateLoading(true);
      setError("");
      setSuccessMessage("");

      const token = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");

      if (!token || !storedUserId) {
        setError("Session expired. Please login again.");
        return;
      }

    const response = await API.put(
  `/auth/UpdateMe/${storedUserId}`,
  editForm,
  {
    headers: {
      Authorization: `Bearer ${token.trim()}`,
      "Content-Type": "application/json",
    },
  }
);


      // Update frontend profile immediately
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              username: editForm.name,
              email: editForm.email,
            }
          : null
      );

      // Update localStorage username if you are using it
      localStorage.setItem("userName", editForm.name);

      setSuccessMessage(
        response.data?.message || "Profile updated successfully!"
      );

      setIsEditing(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (err: any) {
      console.error("Profile Update Error:", err);

      const message =
        err.response?.data?.message ||
        err.response?.data || 
        "Unable to update profile.";

      setError(
        typeof message === "string"
          ? message
          : "Unable to update profile."
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleGlobalLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50/50 via-white to-pink-50/30 font-sans antialiased">

      {/* ============================================================
          SIDEBAR
      ============================================================ */}

      <aside className="w-64 bg-white border-r border-pink-100/60 shadow-[4px_0_24px_-10px_rgba(244,63,94,0.08)] p-6 flex flex-col justify-between">

        <div>
          {/* LOGO */}

          <Link to="/" className="inline-block">
            <h1 className="text-3xl text-pink-500 font-extrabold italic tracking-tight">
              Cosmetopia
            </h1>
          </Link>

          {/* NAVIGATION */}

          <nav className="mt-10 space-y-2">

            <Link
              to="/user"
              className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 font-medium hover:bg-pink-50 hover:text-pink-600 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>

              <span>My Orders</span>
            </Link>

            {/* PROFILE ACTIVE */}

            <span className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-pink-500 text-white font-semibold shadow-md">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <span>Profile</span>
            </span>


             <Link to ="/" className="block text-gray-600 px-4 py-3 rounded-lg hover:bg-pink-50">Products</Link>
          </nav>
        </div>

        {/* LOGOUT */}

        <button
          onClick={handleGlobalLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-500 font-medium hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          <span>Logout</span>
        </button>
      </aside>

      {/* ============================================================
          MAIN
      ============================================================ */}

      <main className="flex-1 p-8 lg:p-12 max-w-5xl">

        {/* HEADER */}

        <header className="mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Account Overview
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your profile information.
          </p>
        </header>

        {/* ERROR */}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl max-w-2xl mb-6">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl max-w-2xl mb-6">
            {successMessage}
          </div>
        )}

        {/* ========================================================
            PROFILE CARD
        ======================================================== */}

        {profile && (
          <div className="bg-white rounded-2xl border border-pink-100 shadow-lg p-8 max-w-2xl">

            {/* PROFILE HEADER */}

            <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">

              <div className="flex items-center space-x-4">

                {/* AVATAR */}

                <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold uppercase">
                  {profile.username?.charAt(0) || "U"}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {profile.username}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Customer Account
                  </p>
                </div>

              </div>

              {/* EDIT BUTTON */}

              {!isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setError("");
                    setSuccessMessage("");
                  }}
                  className="px-5 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                >
                  Edit Profile
                </button>
              )}

            </div>

            {/* ====================================================
                EDIT MODE
            ==================================================== */}

            {isEditing ? (
              <form onSubmit={handleProfileUpdate} className="space-y-5">

                {/* NAME */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                  />
                </div>

                {/* EMAIL */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-pink-500"
                  />
                </div>

                {/* BUTTONS */}

                <div className="flex gap-3 pt-3">

                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
                  >
                    {updateLoading
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);

                      setEditForm({
                        name: profile.username,
                        email: profile.email,
                      });
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>

                </div>
              </form>
            ) : (

              /* ==================================================
                 VIEW MODE
              ================================================== */

              <div className="space-y-6">

                {/* USERNAME */}

                <div>
                  <p className="text-sm text-gray-500">
                    Username
                  </p>

                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {profile.username}
                  </p>
                </div>

                {/* EMAIL */}

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    {profile.email}
                  </p>
                </div>

                {/* USER ID */}

                <div>
                  <p className="text-sm text-gray-500">
                    User ID
                  </p>

                  <p className="text-sm font-mono text-gray-700 mt-1 break-all">
                    {profile.userId}
                  </p>
                </div>

              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}

export default UserProfile;