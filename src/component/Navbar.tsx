
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import {
  getCart,
  saveCart,
  removeFromCart,
  type CartItem,
} from "../utils/cart"

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // CART DRAWER
  const [visible, setVisible] = useState(false);

  // CART PRODUCTS
  const [cart, setCart] = useState<CartItem[]>([]);

  // GET CART ITEMS
  useEffect(() => {
    const updateCart = () => {
      setCart(getCart());
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    setVisible(false);

    navigate("/login");
    window.location.reload();
  };

  // CHANGE QUANTITY
  const changeQuantity = (id: string, change: number) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity:  item.quantity + change,
        };
      }

      return item;
    })

    .filter((item)=>item.quantity>0);

    saveCart(updatedCart);
  };

  // REMOVE PRODUCT
  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  // TOTAL CART COUNT
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="h-[68px] w-full flex items-center px-6 bg-white shadow-md sticky top-0 z-50">

        {/* LOGO */}
        <h1
          className="text-3xl font-bold text-[#f84ea0] italic cursor-pointer"
          onClick={() => navigate("/")}
        >
          Cosmetopia
        </h1>

        <div className="ml-auto flex items-center gap-10">

          {/* NAVIGATION */}
          <nav>
            <ul className="flex items-center gap-8 list-none">
              <li><a href="/">HOME</a></li>
              <li><a href="/About">ABOUT</a></li>
              <li><a href="/Service">SERVICE</a></li>
              <li><a href="/contact">CONTACT</a></li>
            </ul>
          </nav>

          {/* LOGIN / LOGOUT */}
          {token ? (
            <div className="flex items-center gap-6">
              <button
                onClick={() =>
                  navigate(
                    role?.toLowerCase() === "admin"
                      ? "/dashboard"
                      : "/User"
                  )
                }
                className="text-pink-500 font-medium"
              >
                DASHBOARD
              </button>

              <button
                onClick={handleLogout}
                className="text-pink-500 border border-pink-500 px-3 py-1 rounded hover:bg-pink-50 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/login")}
                className="text-pink-500 border border-pink-500 px-3 py-1 rounded hover:bg-pink-50 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/Register")}
                className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
              >
                Register
              </button>
            </div>
          )}

          {/* SEARCH AND CART */}
          <div className="flex items-center gap-5 text-gray-600">

            <FaSearch
              size={19}
              className="cursor-pointer hover:text-pink-500 transition"
            />

            {/* CART ICON */}
            <button
              onClick={() => setVisible(true)}
              className="relative cursor-pointer hover:text-pink-500 transition"
              aria-label="Open shopping cart"
            >
              <FaBagShopping size={19} />

              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-pink-500 text-white text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* CART DRAWER */}
      <Sidebar
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="!w-[420px]"
        header={
          <h2 className="text-xl font-bold text-pink-500">
            My Shopping Cart ({cartCount})
          </h2>
        }
      >
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <FaBagShopping
              size={55}
              className="text-pink-300 mb-4"
            />

            <p className="text-gray-500 text-lg">
              Your cart is empty
            </p>
          </div>
        ) : (
          <div className="flex flex-col min-h-full">

            {/* CART PRODUCTS */}
            <div className="flex-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b py-5"
                >
                  {/* PRODUCT IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">

                    {/* PRODUCT NAME */}
                    <h3 className="font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    {/* PRICE */}
                    <p className="text-pink-500 font-bold mt-1">
                      ₹{item.price}
                    </p>

                    {/* QUANTITY BUTTONS */}
                    <div className="flex items-center gap-3 mt-3">

                      <button
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                        className="bg-gray-100 px-3 py-1 rounded"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                        className="bg-gray-100 px-3 py-1 rounded"
                      >
                        +
                      </button>

                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 text-sm mt-3 hover:underline"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL PRICE */}
            <div className="border-t pt-5 mt-5">

              <div className="flex justify-between text-xl font-bold mb-5">
                <span>Total:</span>

                <span className="text-pink-500">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={() => {
                  setVisible(false);
                  navigate("/Checkout");
                }}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold"
              >
                Proceed to Checkout
              </button>

            </div>
          </div>
        )}
      </Sidebar>
    </>
  );
}

export default Navbar;
