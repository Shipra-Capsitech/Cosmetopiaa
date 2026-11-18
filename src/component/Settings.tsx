import { useEffect, useState } from "react";
import {
  
  User,
} from "lucide-react";
import API from "../api/axios";

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  role: string;
}

function Settings() {
  const [profile, setProfile] = useState<UserProfile>({
    userId: "",
    name: "",
    email: "",
    role: "User",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // ==========================
  // GET LOGGED-IN ADMIN
  // ==========================
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Get userId stored during login
        const storedUser = localStorage.getItem("user");

        let userId = localStorage.getItem("userId") || "";

        if (storedUser) {
          const parsed = JSON.parse(storedUser);

          userId =
            parsed.userId ||
            parsed.id ||
            userId;
        }

        if (!userId) {
          console.error("User ID not found");
          setLoading(false);
          return;
        }

        // Get current logged-in user/admin
        const response = await API.get(
          `/auth/GetMe?id=${userId}`
        );

        const data = response.data;

        const fullName = data.username || data.name || "";

        setProfile({
          userId: data.userId || userId,
          name: fullName,
          email: data.email || "",
          role:
            localStorage.getItem("user_role") ||
            "Admin",
        });

        // Split name
        const nameParts = fullName.trim().split(" ");

        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");

      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // ==========================
  // SAVE PROFILE
  // ==========================
  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      const fullName =
        `${firstName} ${lastName}`.trim();

      if (!fullName) {
        setMessage("Name cannot be empty");
        return;
      }

      if (!profile.email) {
        setMessage("Email cannot be empty");
        return;
      }

      // UpdateMe API
      await API.put(
        `/auth/UpdateMe/${profile.userId}`,
        {
          name: fullName,
          email: profile.email,
        }
      );

      // Update React state
      setProfile((prev) => ({
        ...prev,
        name: fullName,
      }));

      // Update localStorage
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        const parsed = JSON.parse(storedUser);

        const updatedUser = {
          ...parsed,
          name: fullName,
          email: profile.email,
          role: profile.role,
          userId: profile.userId,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
      }

      // Also update individual values
      localStorage.setItem(
        "user_name",
        fullName
      );

      localStorage.setItem(
        "user_email",
        profile.email
      );

      setMessage("Profile updated successfully!");

    } catch (error) {
      console.error("Failed to update profile", error);
      setMessage("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // LOADING
  // ==========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-pink-50">
        <p className="text-pink-500 font-semibold">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-pink-50">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white shadow-lg p-6">

        <h1 className="text-3xl text-pink-500 font-bold italic mb-8">
          Cosmetopia
        </h1>

        <nav className="space-y-2">

          <a
            href="/Dashboard"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Dashboard
          </a>

          <a
            href="/Index"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Products
          </a>

          <a
            href="/Order"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Orders
          </a>

          <a
            href="/Settings"
            className="block p-3 rounded-lg bg-pink-500 text-white"
          >
            Settings
          </a>

          <a
            href="/"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Logout
          </a>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">
            Settings
          </h1>
        </div>

        <div className="pb-6">
          <h3 className="text-xl">
            Manage your account and preferences
          </h3>
        </div>

        {/* ================= BODY ================= */}
        <div className="flex gap-4">

          

          {/* ================= RIGHT SIDE ================= */}
          <div className="w-[850px] flex flex-col gap-4">

            {/* ACCOUNT SETTINGS */}
            <div className="bg-white rounded-lg shadow-sm p-5">

              {/* HEADER */}
              <div className="border-b border-[#eadfd8] pb-3">

                <div className="flex items-center gap-2">

                  <User
                    size={18}
                    className="text-gray-700"
                  />

                  <h1 className="text-xl font-bold text-gray-800">
                    Account Settings
                  </h1>

                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Manage your personal information and profile details.
                </p>

              </div>

              {/* PROFILE */}
              <div className="flex items-center py-4">

                <div>

                  <h3 className="text-sm font-semibold text-gray-800">
                    {profile.name}
                  </h3>

                  <p className="text-[10px] text-gray-500">
                    {profile.role}
                  </p>

                </div>

              </div>

              {/* FORM */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">

                {/* FIRST NAME */}
                <div>

                  <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    className="w-full h-9 px-3 rounded-lg border border-[#dfc4b3] bg-pink-100 text-xs text-gray-700 outline-none focus:border-pink-500"
                  />

                </div>

                {/* LAST NAME */}
                <div>

                  <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    className="w-full h-9 px-3 rounded-lg border border-[#dfc4b3] bg-pink-100 text-xs text-gray-700 outline-none focus:border-pink-500"
                  />

                </div>

                {/* EMAIL */}
                <div>

                  <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                    Email
                  </label>

                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full h-9 px-3 rounded-lg border border-[#dfc4b3] bg-pink-100 text-xs text-gray-700 outline-none focus:border-pink-500"
                  />

                </div>

                {/* ROLE */}
                <div>

                  <label className="block text-[10px] font-semibold text-gray-500 mb-1">
                    Role
                  </label>

                  <input
                    type="text"
                    value={profile.role}
                    readOnly
                    className="w-full h-9 px-3 rounded-lg border border-[#dfc4b3] bg-gray-100 text-xs text-gray-500 outline-none"
                  />

                </div>

              </div>

              {/* SAVE BUTTON */}
              <div className="flex items-center justify-between mt-5">

                {/* MESSAGE */}
                <p
                  className={`text-xs ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-5 py-2 bg-pink-500 text-white text-xs font-semibold rounded-lg hover:bg-pink-600 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;