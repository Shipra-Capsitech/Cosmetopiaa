import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useNavigate } from "react-router-dom";

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
  // CART
  // ==========================================

  const [cart, setCart] = useState<CartItem[]>([]);

  // ==========================================
  // ADDRESS
  // ==========================================

  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ==========================================
  // PAYMENT
  // ==========================================

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ==========================================
  // UI STATES
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOAD CART
  // ==========================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
      return;
    }

    const localCart = getCart();

    console.log("Checkout Cart:", localCart);

    if (localCart.length === 0) {
      navigate("/Cart");
      return;
    }

    setCart(localCart);
  }, [navigate]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // TOTAL
  // ==========================================

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  // ==========================================
  // CHECKOUT
  // ==========================================

  const handleCheckout = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ==========================================
    // CHECK TOKEN
    // ==========================================

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/Login");
      return;
    }

    // ==========================================
    // CHECK CART
    // ==========================================

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // ==========================================
    // VALIDATE NAME
    // ==========================================

    if (!address.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // ==========================================
    // VALIDATE PHONE
    // ==========================================

    if (!/^[0-9]{10}$/.test(address.phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // ==========================================
    // VALIDATE ADDRESS
    // ==========================================

    if (!address.addressLine.trim()) {
      setError("Please enter your address.");
      return;
    }

    // ==========================================
    // VALIDATE CITY
    // ==========================================

    if (!address.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    // ==========================================
    // VALIDATE STATE
    // ==========================================

    if (!address.state.trim()) {
      setError("Please enter your state.");
      return;
    }

    // ==========================================
    // VALIDATE PINCODE
    // ==========================================

    if (!/^[0-9]{6}$/.test(address.pincode.trim())) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // EXACT BACKEND PAYLOAD
      // ==========================================

      const checkoutData = {
        address: {
          fullName: address.fullName.trim(),
          phone: address.phone.trim(),
          addressLine: address.addressLine.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
          pincode: address.pincode.trim(),
        },
        paymentMethod: paymentMethod,
      };

      // ==========================================
      // DEBUG
      // ==========================================

      console.log(
        "Checkout Request:",
        JSON.stringify(checkoutData, null, 2)
      );

      // ==========================================
      // SEND REQUEST
      // ==========================================

      const response = await API.post(
        "/Checkout",
        checkoutData
      );

      // ==========================================
      // SUCCESS
      // ==========================================

      console.log(
        "Checkout Response:",
        response.data
      );

      setSuccess("Order placed successfully!");

      // Clear local cart after successful order
      localStorage.removeItem("cart");

      window.dispatchEvent(
        new Event("cartUpdated")
      );

      // Go to orders after 1 second
      setTimeout(() => {
        navigate("/Order");
      }, 1000);

    } catch (err: any) {
      console.error(
        "Checkout Error:",
        err
      );

      // ==========================================
      // SHOW BACKEND ERROR
      // ==========================================

      console.error(
        "Backend Response:",
        err?.response?.data
      );

      if (err?.response?.data?.errors) {
        console.error(
          "Validation Errors:",
          err.response.data.errors
        );
      }

      setError(
        err?.response?.data?.message ||
        "Checkout failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-pink-50 p-10">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Checkout
        </h1>

        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* ======================================
            SUCCESS
        ====================================== */}

        {success && (
          <div className="bg-green-100 text-green-600 p-4 rounded-lg mb-5">
            {success}
          </div>
        )}

        <form
          onSubmit={handleCheckout}
          className="bg-white p-8 rounded-xl shadow"
        >

          {/* ======================================
              ADDRESS
          ====================================== */}

          <h2 className="text-xl font-bold mb-5">
            Delivery Address
          </h2>

          {/* FULL NAME */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* PHONE */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="Enter 10 digit phone number"
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* ADDRESS */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Address
            </label>

            <input
              type="text"
              name="addressLine"
              value={address.addressLine}
              onChange={handleChange}
              placeholder="House No, Street, Area"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* CITY */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              City
            </label>

            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* STATE */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">
              State
            </label>

            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* PINCODE */}

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Enter 6 digit pincode"
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />
          </div>

          {/* ======================================
              PAYMENT
          ====================================== */}

          <h2 className="text-xl font-bold mb-4">
            Payment Method
          </h2>

          <div className="mb-6">

            <label className="flex items-center gap-3 border p-4 rounded-lg cursor-pointer">

              <input
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <span>
                Cash on Delivery
              </span>

            </label>

          </div>

          {/* ======================================
              ORDER SUMMARY
          ====================================== */}

          <div className="border-t pt-5 mb-6">

            <h2 className="text-xl font-bold mb-4">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-3"
              >

                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </span>

              </div>
            ))}

            <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">

              <span>
                Total
              </span>

              <span className="text-pink-600">
                ₹{total.toFixed(2)}
              </span>

            </div>

          </div>

          {/* ======================================
              BUTTON
          ====================================== */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Checkout;