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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Index" element={<Index />} />

        <Route path="/" element={<Home />} />

        <Route path="/About" element={<About />} />

        <Route path="/Service" element={<Service />} />

        <Route path="/Contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/Register" element={<Register />} />

        <Route path="/Order" element={<Order />} />

        <Route path="/Customer" element={<Customer />} />

        <Route path="/Settings" element={<Settings />} />

        <Route path="/Lips" element={<Lips />} />

        <Route path="/Eyes" element={<Eyes />} />

        <Route path="/Face" element={<Face />} />

        <Route path="/Hair" element={<Hair />} />

        <Route path="/Fragrance" element={<Fragrance />} />

        <Route path="/Everyday" element={<Everyday />} />

        <Route path="/Dashboard" element={<Dashboard />} />

        {/* USER */}

        < Route path="/User" element={<User />} />

        {/* OTHER USER PAGES */}

        <Route path="/UserProfile" element={<UserProfile />} />

        <Route path="/Productss" element={<Products />} />

        <Route path="/Checkout" element={<Checkout/>}/>

      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
