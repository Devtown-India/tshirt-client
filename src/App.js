import { useEffect } from "react";
import Home from "./components/Home";
import Products from "./components/Products";
import Navbar from "./layout/Navbar";
import { Routes, Route, useNavigate } from "react-router-dom";

import Product from "./components/Product/Product";
import Footer from "./layout/Footer";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Admin from "./components/admin/Admin";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import Cart from "./components/cart/Cart";
import { getProducts } from "./actions/product";
import { loadCart } from "./actions/cart";
import ImageUpload from "./components/utility/ImageUpload";
import Loader from "./layout/Loader";
import axios from "axios";
import AdminRoute from "./routing/AdminRoute";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyToken = async (token) => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: { state: true },
      });
      const res = await axios.get(
        `http://localhost:8080/api/v1/auth/verify/${token}`
      );
      axios.defaults.headers.common['authorization'] = `bearer ${token}`;
      const { success, message, data } = res.data;
      if (success) {
        dispatch({
          type: "LOAD_USER",
          payload: data,
        });
      } else {
        navigate("/login");
        dispatch({
          type: "SET_AUTH_LOADED",
          payload: {},
        });
        localStorage.removeItem("token");
        console.log("token expired");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { state: false },
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      verifyToken(localStorage.getItem("token"));
    }else{
       dispatch({
          type: "SET_AUTH_LOADED",
          payload: {},
        });
    }
  }, []);

  return (
    <div className="App">
      <Loader />
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/shop/:productId" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
