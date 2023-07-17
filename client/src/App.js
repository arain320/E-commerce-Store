import React from "react";
import "./App.scss";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Verify from "./pages/Verify/Verify";
import Forget from "./pages/Forget/Forget";
import Reset from "./pages/Reset/Reset";


axios.defaults.withCredentials = true;
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyEmail/:id" element={<Verify />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset/:id" element={<Reset />} />
        </Routes>
      </BrowserRouter>
     
    </>
  );
};

export default App;
