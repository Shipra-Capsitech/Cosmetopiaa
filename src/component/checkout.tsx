import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API from "../api/axios";

import {
  getCart,
  type CartItem,
} from "../utils/cart";

// ==========================================
// ADDRESS INTERFACE
// ==========================================

interface Address {
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
}

// ==========================================
// CHECKOUT COMPONENT
// ==========================================

function Checkout() {
  const navigate = useNavigate();

  // ==========================================
  // STATES
  // ==========================================

  const [cart, setCart] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ==========================================
  // LOAD CART
  // ==========================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    // User must be logged in
    if (!token) {
      navigate("/Login");
      return;
    }

    // Function to update cart
    const updateCart = () => {
      const currentCart = getCart();

      setCart(currentCart);
    };

    // Load cart when page opens
    updateCart();

    // Listen for cart changes
    window.addEventListener("cartUpdated", updateCart);

    window.addEventListener("storage", updateCart);

    // Cleanup
    return () => {
      window.removeEventListener("cartUpdated", updateCart);

      window.removeEventListener("storage", updateCart);
    };
  }, [navigate]);

  // ==========================================
  // ADDRESS INPUT CHANGE
  // ==========================================

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddress((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  // ==========================================
  // CALCULATE TOTAL
  // ==========================================

  const totalAmount = cart.reduce(
    (total, item) => {
      return total + item.price * item.quantity;
    },
    0
  );

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handleCheckout = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Clear old messages
    setError("");

    setSuccess("");

    // ========================================
    // CHECK LOGIN
    // ========================================

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first");

      navigate("/Login");

      return;
    }

    // ========================================
    // CHECK CART
    // ========================================

    if (cart.length === 0) {
      setError("Your cart is empty");

      return;
    }

    // ========================================
    // VALIDATE PHONE
    // ========================================

    if (!/^[0-9]{10}$/.test(address.phone.trim())) {
      setError("Enter a valid 10-digit phone number");

      return;
    }

    // ========================================
    // VALIDATE PINCODE
    // ========================================

    if (!/^[0-9]{6}$/.test(address.pincode.trim())) {
      setError("Enter a valid 6-digit pincode");

      return;
    }

    // ========================================
    // CHECK REQUIRED ADDRESS FIELDS
    // ========================================

    if (!address.fullName.trim()) {
      setError("Please enter your full name");

      return;
    }

    if (!address.addressLine.trim()) {
      setError("Please enter your address");

      return;
    }

    if (!address.city.trim()) {
      setError("Please enter your city");

      return;
    }

    if (!address.state.trim()) {
      setError("Please enter your state");

      return;
    }

    // ========================================
    // START LOADING
    // ========================================

    setLoading(true);

    try {
      // ======================================
      // CHECKOUT API
      // ======================================

      const response = await API.post("/Checkout", {
        address: {
          fullName: address.fullName.trim(),

          phone: address.phone.trim(),

          addressLine: address.addressLine.trim(),

          city: address.city.trim(),

          state: address.state.trim(),

          pincode: address.pincode.trim(),
        },

        // IMPORTANT:
        // This was missing in your previous code
        paymentMethod: paymentMethod,
      });

      // ======================================
      // SUCCESS
      // ======================================

      console.log("Order created:", response.data);

      setSuccess("Order placed successfully!");

      // ======================================
      // CLEAR LOCAL CART
      // ======================================

      localStorage.removeItem("cart");

      // Tell Navbar/Cart that cart changed
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      setCart([]);

      // ======================================
      // GO TO USER PAGE
      // ======================================

      setTimeout(() => {
        navigate("/User");
      }, 1500);
    } catch (err: unknown) {
      console.error("Checkout failed:", err);

      // ======================================
      // AXIOS ERROR
      // ======================================

      if (axios.isAxiosError(err)) {
        console.log(
          "Status:",
          err.response?.status
        );

        console.log(
          "Backend Error:",
          err.response?.data
        );

        const backendMessage =
          err.response?.data?.message ||
          err.response?.data?.title ||
          err.response?.data?.error;

        if (backendMessage) {
          setError(backendMessage);
        } else if (err.response?.status === 400) {
          setError(
            "Checkout request is invalid. Please check your address, payment method and cart."
          );
        } else if (err.response?.status === 401) {
          setError(
            "Your login session has expired. Please login again."
          );

          localStorage.removeItem("token");

          navigate("/Login");
        } else {
          setError(
            "Failed to place order. Please try again."
          );
        }
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-8">

      {/* ======================================
          PAGE TITLE
      ====================================== */}

      <h1 className="text-3xl font-bold text-pink-600 text-center mb-8">
        Checkout
      </h1>

      {/* ======================================
          ERROR MESSAGE
      ====================================== */}

      {error && (
        <div className="max-w-6xl mx-auto mb-5">
          <p className="text-red-600 text-center bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </p>
        </div>
      )}

      {/* ======================================
          SUCCESS MESSAGE
      ====================================== */}

      {success && (
        <div className="max-w-6xl mx-auto mb-5">
          <p className="text-green-600 text-center bg-green-50 border border-green-200 rounded-lg p-3">
            {success}
          </p>
        </div>
      )}

      {/* ======================================
          MAIN GRID
      ====================================== */}

      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8">

        {/* ====================================
            DELIVERY ADDRESS
        ==================================== */}

        <form
          id="checkout-form"
          onSubmit={handleCheckout}
          className="bg-white p-8 rounded-xl shadow-md"
        >

          <h2 className="text-xl font-bold text-pink-600 mb-6">
            Delivery Address
          </h2>

          {/* FULL NAME */}

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block mb-2 font-medium"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-pink-500"
              placeholder="Enter Full Name"
            />
          </div>

          {/* PHONE */}

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block mb-2 font-medium"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-pink-500"
              placeholder="Enter 10-digit phone number"
            />
          </div>

          {/* ADDRESS */}

          <div className="mb-4">
            <label
              htmlFor="addressLine"
              className="block mb-2 font-medium"
            >
              Address
            </label>

            <input
              id="addressLine"
              type="text"
              name="addressLine"
              value={address.addressLine}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-pink-500"
              placeholder="Enter Address"
            />
          </div>

          {/* CITY */}

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block mb-2 font-medium"
            >
              City
            </label>

            <input
              id="city"
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-pink-500"
              placeholder="Enter City"
            />
          </div>

          {/* STATE */}

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block mb-2 font-medium"
            >
              State
            </label>

            <input
              id="state"
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-pink-500"
              placeholder="Enter State"
            />
          </div>

          {/* PINCODE */}

          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="block mb-2 font-medium"
            >
              Pincode
            </label>

            <input
              id="pincode"
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              required
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-pink-500"
              placeholder="Enter 6-digit pincode"
            />
          </div>

          {/* ==================================
              PAYMENT METHOD
          ================================== */}

          <h2 className="text-xl font-bold text-pink-600 mt-6 mb-4">
            Payment Method
          </h2>

          <label className="flex items-center gap-3 border border-gray-300 p-4 rounded-lg cursor-pointer">

            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />

            <span>Cash on Delivery</span>

          </label>

        </form>

        {/* ====================================
            ORDER SUMMARY
        ==================================== */}

        <div className="bg-white p-8 rounded-xl shadow-md h-fit">

          <h2 className="text-xl font-bold text-pink-600 mb-6">
            Order Summary
          </h2>

          {/* EMPTY CART */}

          {cart.length === 0 ? (
            <div className="text-center py-8">

              <p className="text-gray-500 mb-4">
                Your cart is empty.
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600"
              >
                Continue Shopping
              </button>

            </div>
          ) : (

            /* CART ITEMS */

            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-sm text-gray-500">
                    Price: ₹{item.price.toFixed(2)}
                  </p>

                </div>

                <p className="font-semibold">
                  ₹
                  {(item.price * item.quantity).toFixed(2)}
                </p>

              </div>
            ))
          )}

          {/* ==================================
              TOTAL
          ================================== */}

          <div className="flex justify-between mt-6 text-lg font-bold">

            <span>
              Total Amount
            </span>

            <span className="text-pink-600">
              ₹{totalAmount.toFixed(2)}
            </span>

          </div>

          {/* ==================================
              PLACE ORDER BUTTON
          ================================== */}

          <button
            type="submit"
            form="checkout-form"
            disabled={
              loading ||
              cart.length === 0 ||
              !!success
            }
            className="w-full bg-pink-500 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;