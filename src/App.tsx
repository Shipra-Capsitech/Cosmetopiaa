import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./component/Home";
import About from "./component/About";
import Service from "./component/Service";
import Contact from "./component/Contact";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import Index from "./component/Index";
import Order from "./component/Order";
import Customer from "./component/Customer";
import Settings from "./component/Settings";
import Lips from "./component/Lips";
import Eyes from "./component/Eyes";
import Face from "./component/Face";
import Hair from "./component/Hair";
import Fragrance from "./component/Fragrance";
import Everyday from "./component/Everyday";

import User from "./Users/User";
import UserProfile from "./Users/UserProfile";
import Products from "./Users/Productss";
import Checkout from "./component/checkout";

import { AuthProvider } from "./context/AuthContext";
import   ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Index" element={<Index />} />
          <Route path="/About" element={<About />} />
          <Route path="/Service" element={<Service />} />
          <Route path="/Contact" element={<Contact />} />

          {/* PUBLIC PRODUCT CATEGORIES */}
          <Route path="/Lips" element={<Lips />} />
          <Route path="/Eyes" element={<Eyes />} />
          <Route path="/Face" element={<Face />} />
          <Route path="/Hair" element={<Hair />} />
          <Route path="/Fragrance" element={<Fragrance />} />
          <Route path="/Everyday" element={<Everyday />} />

          {/* ADMIN PROTECTED ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Customer" element={<Customer />} />
            <Route path="/Settings" element={<Settings />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/User" element={<User />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Productss" element={<Products />} />
            <Route path="/Checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
