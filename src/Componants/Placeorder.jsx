import React, { useEffect, useState } from "react";
import { Button } from "../styles/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useValid } from "../Context/ValidContext";
import { useCart } from "../Context/CartContext";
import Alert from "react-bootstrap/Alert";
import Button1 from "react-bootstrap/Button";

export default function Placeorder() {
  const [addressData, setAddressData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  const [product, setProduct] = useState([]);
  const nevigate = useNavigate();
  const { data } = useValid();
  const { cart, subtotal } = useCart();

  const searchParams = new URLSearchParams(window.location.search);
  const [show, setShow] = useState();

  const address_id = searchParams.get("address");
  const payment_id = searchParams.get("payment");

  const FetchAddressData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/address/${address_id}`)
      .then((res) => setAddressData(res.data));
  };

  const FetchPaymentData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/payment/${payment_id}`)
      .then((res) => setPaymentData(res.data));
  };

  const getProductId = () => {
    cart.forEach((val) => {
      setProduct((old_value) => [...old_value, val.id]);
    });
  };

  useEffect(() => {
    console.log("product", product);
  }, [product]);
  useEffect(() => {
    console.log(addressData);
  }, [addressData]);

  useEffect(() => {
    console.log(paymentData);
  }, [paymentData]);

  useEffect(() => {
    FetchAddressData();
    FetchPaymentData();
    getProductId();
    console.log(cart);
  }, []);

  const postOrderData = async () => {
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/order/",
      data: {
        user: data.id,
        address: address_id,
        payment: payment_id,
        product,
      },
    });
    cart.forEach(async (val) => {
      let price;
      await axios
        .get(`http://127.0.0.1:8000/api/product/${val.id}`)
        .then((res) => {
          price = res.data.price;
        });
      console.log(price, "price");
      await axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/sales/",
        data: {
          user: data.id,
          product: val.id,
          sales_price: price,
          quantity: 1,
        },
      });
    });

    setShow(true);
  };

  return (
    <>
      <div className="container-fluid p-5">
        <div className="d-flex gap-2">
          <div className="border border-3 border-dark rounded p-4 w-50">
            <h4>Shipping Adress</h4>
            <hr />
            <p>House No, Area : {addressData.area}</p>
            <p>
              City-Pincode : {addressData.city}-{addressData.pincode}
            </p>
            <p>State : {addressData.state}</p>
            <p>Contry : {addressData.country}</p>
            <p>Mobile No : {addressData.mobile}</p>
          </div>
          <div className="border border-3 border-dark rounded p-4 w-50">
            <h4>Payment Method</h4>
            <hr />
            <p>Selected Method : {paymentData.payment_mode}</p>
            <p>Amount : {paymentData.amount}</p>
          </div>
        </div>
        <Button className="w-100 mt-3" onClick={postOrderData}>
          Place Order
        </Button>
      </div>
      {show && (
        <Alert
          variant="primary"
          className="position-absolute top-50 start-50 translate-middle-x p-5"
        >
          <h3 className="text-center">
            Thank You For <br /> 😊Your Order😊
          </h3>
          <div className="d-flex justify-content-center">
            <Button1
              variant="outline-primary"
              className="mt-2"
              onClick={() => {
                setShow(false);
                nevigate("/");
              }}
            >
              Close
            </Button1>
          </div>
        </Alert>
      )}
    </>
  );
}
