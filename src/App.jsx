import React from "react";
import Header from "./Componants/Header";
import Footer from "./Componants/Footer";
import Contact from "./Componants/Contact";
import Home from "./Componants/Home";
import About from "./Componants/About";
import Products from "./Componants/Products";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Componants/Cart";
import ProductList from "./Componants/ProductList";
import Address from "./Componants/Address";
import Payment from "./Componants/Payment";
import Placeorder from "./Componants/Placeorder";
import ErrorPage from "./Componants/ErrorPage";
import Login from "./Componants/Login";
import Register from "./Componants/Register";
import { useValid } from "./Context/ValidContext";
import OrderComplete from "./Componants/OrderComplete";
import ForgetPass from "./Componants/ForgetPass";
import ChangePass from "./Componants/ChangePass";
import ForgetChangePass from "./Componants/ForgetChangePass";
import Profile from "./Componants/Profile";
import YourOrders from "./Componants/YourOrders";
import Review from "./Componants/Review";
import CancellationForm from "./Componants/CancellationForm";
import { Return } from "./Componants/Return";
import { T_C } from "./Componants/T_C";

export default function App() {
  let { showNav } = useValid();
  {
    if (showNav) {
      return (
        <>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productList/products/:id" element={<Products />} />
              <Route path="/productList" element={<ProductList />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/address" element={<Address />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/placeorder" element={<Placeorder />} />
              <Route path="/ordercomplete/:id" element={<OrderComplete />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forgetpass" element={<ForgetPass />} />
              <Route path="/changepass" element={<ChangePass />} />
              <Route path="/yourorder" element={<YourOrders />} />
              <Route path="/review/:id" element={<Review />} />
              <Route path="/cancle/:id" element={<CancellationForm />} />
              <Route path="/return/:id" element={<Return />} />
              <Route path="/term" element={<T_C />} />
              <Route path="*" element={<ErrorPage />} />
              <Route
                path="/forgetchangepass/:id"
                element={<ForgetChangePass />}
              />
            </Routes>
            <Footer />
          </BrowserRouter>
        </>
      );
    } else {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgetpass" element={<ForgetPass />} />
            <Route path="/changepass" element={<ChangePass />} />
            <Route path="/yourorder" element={<YourOrders />} />
            <Route
              path="/forgetchangepass/:id"
              element={<ForgetChangePass />}
            />
          </Routes>
        </BrowserRouter>
      );
    }
  }
}
