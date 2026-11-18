
import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

// ==========================
// USER TYPE
// ==========================
interface UserData {
  userId: string;
  username: string;
  email: string;
}

// ==========================
// ORDER ITEM TYPE
// ==========================
interface OrderItem {
  id?: string;
  productId?: string;
  productName: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

// ==========================
// ORDER TYPE
// ==========================
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  paymentMethod: string;
  orderStatus: string;
  totalAmount: number;
  createdAt: string;
}

function User() {
  // ==========================
  // STATES
  // ==========================
  const [user, setUser] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // GET USER + ORDERS
  // ==========================
  useEffect(() => {
    const getData = async () => {
      try {
        // Token and UserId from localStorage
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        // Check login
        if (!token || !userId) {
          setError("Please login again.");
          setLoading(false);
          return;
        }

        // ==================================
        // 1. GET LOGGED-IN USER
        // ==================================
         const userResponse = await API.get(
          `/auth/GetMe?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User:", userResponse.data);

        setUser(userResponse.data);

        // ==================================
        // 2. GET ALL ORDERS
        // ==================================
        const orderResponse = await API.get(
          "/Order",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("All Orders:", orderResponse.data);

        // ==================================
        // 3. FILTER USER ORDERS
        // ==================================
        const myOrders = orderResponse.data.filter(
          (order: Order) => order.userId === userId
        );

        console.log("My Orders:", myOrders);

        setOrders(myOrders);

      } catch (error: any) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Data load nahi ho raha."
        );
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    window.location.href = "/login";
  };

  // ==========================
  // LOADING
  // ==========================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <h2 className="text-xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  // ==========================
  // PAGE
  // ==========================
  return (
    <div className="min-h-screen bg-pink-50 flex">

      {/* ==========================
          SIDEBAR
      ========================== */}
      <div className="w-64 bg-white min-h-screen p-6 shadow-md">

        {/* LOGO */}
        <Link to="/">
          <h1 className="text-3xl font-bold italic text-pink-500">
            Cosmetopia
          </h1>
        </Link>

        {/* MENU */}
        <div className="mt-10 space-y-3">

          <Link
            to="/user"
            className="block bg-pink-500 text-white px-4 py-3 rounded-lg"
          >
            My Orders
          </Link>

          <Link
            to="/UserProfile"
            className="block text-gray-600 px-4 py-3 rounded-lg hover:bg-pink-50"
          >
            Profile
          </Link>

          <Link to ="/" className="block text-gray-600 px-4 py-3 rounded-lg hover:bg-pink-50">Products</Link>

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="mt-[500px] w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* ==========================
          MAIN CONTENT
      ========================== */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          User Dashboard
        </h1>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* ==========================
            USER INFORMATION
        ========================== */}
        {user && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">

            <h2 className="text-2xl font-bold mb-5">
              My Profile
            </h2>

            <p className="mb-3">
              <b>Username:</b> {user.username}
            </p>

            <p className="mb-3">
              <b>Email:</b> {user.email}
            </p>

            <p>
              <b>Customer ID:</b> {user.userId}
            </p>

          </div>
        )}

        {/* ==========================
            ORDERS TITLE
        ========================== */}
        <div className="flex justify-between mb-5">

          <h2 className="text-2xl font-bold">
            My Orders
          </h2>

          <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full">
            {orders.length} Orders
          </span>

        </div>

        {/* ==========================
            NO ORDERS
        ========================== */}
        {orders.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">

            <h3 className="text-xl font-bold">
              No Orders Found
            </h3>

            <p className="text-gray-500 mt-2">
              You have not placed any orders yet.
            </p>

          </div>
        )}

        {/* ==========================
            ORDERS
        ========================== */}
        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-md"
            >

              {/* ORDER HEADER */}
              <div className="flex justify-between border-b pb-4 mb-5">

                <div>

                  <h3 className="font-bold">
                    Order ID: #{order.id}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Date:{" "}
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}
                  </p>

                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                  {order.orderStatus}
                </span>

              </div>

              {/* ==========================
                  PRODUCTS
              ========================== */}
              {order.items.map((item, index) => (

                <div
                  key={item.id || item.productId || index}
                  className="flex justify-between items-center mb-4"
                >

                  {/* PRODUCT INFO */}
                  <div className="flex items-center gap-4">

                    <img
                      src={
                        item.imageUrl ||
                        "https://placehold.co/100x100"
                      }
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />

                    <div>

                      <p className="font-semibold">
                        {item.productName}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        Price: ₹{item.unitPrice}
                      </p>

                    </div>

                  </div>

                  {/* ITEM TOTAL */}
                  <p className="font-bold">
                    ₹{item.totalPrice}
                  </p>

                </div>

              ))}

              {/* ==========================
                  TOTAL
              ========================== */}
              <div className="border-t pt-4 mt-4 flex justify-between">

                <span className="font-semibold">
                  Total Amount
                </span>

                <span className="font-bold text-xl text-pink-600">
                  ₹{order.totalAmount}
                </span>

              </div>

              {/* PAYMENT */}
              <div className="mt-3 flex justify-between">

                <span className="text-gray-500">
                  Payment Method
                </span>

                <span className="font-semibold">
                  {order.paymentMethod}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default User