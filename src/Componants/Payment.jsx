import React, { useEffect, useState } from "react";
import { IoMdCash } from "react-icons/io";
import { FaGooglePay } from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { CiCreditCard1 } from "react-icons/ci";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import axios from "axios";
import displayRazorpay from "../services/payment";
import { useValid } from "../Context/ValidContext";

export default function () {
  const nevigate = useNavigate();
  const [method, setMethod] = useState();
  const { data } = useValid();
  const { subtotal } = useCart();
  const searchParams = new URLSearchParams(window.location.search);
  const address = searchParams.get("address");
  const selectRadio = (e) => {
    setMethod(e.target.value);
  };

  const onPaymentHandle = async () => {
    try {
      let grand_total = (
        subtotal + parseFloat(((subtotal * 5) / 100).toFixed(2))
      ).toFixed(2);
      await displayRazorpay(grand_total);
    } catch (error) {
      console.log(error);
    }
  };

  const postPaymentData = async (e) => {
    let payment;
    e.preventDefault();
    let grand_total = (
      subtotal + parseFloat(((subtotal * 5) / 100).toFixed(2))
    ).toFixed(2);
    await axios({
      method: "post",
      url: "http://localhost:8000/api/payment/",
      data: {
        amount: grand_total,
        payment_mode: method,
      },
    }).then((res) => (payment = res.data.id));
    method === "online" && (await onPaymentHandle());
    nevigate(`/placeorder?address=${address}&payment=${payment}`);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <h2 className="text-center my-2">Payment</h2>
        <form onSubmit={postPaymentData}>
          <div>
            <h5>RECOMMENDED</h5>
            <div className="d-flex border border-3 border-dark rounded my-3 py-3 pt-4">
              <div className="mx-4">
                <IoMdCash />
              </div>
              <div className="w-100">
                <p className="my-0 fw-bold h5">
                  Cash On Delivery/Pay on Delivery
                </p>
                <p>Cash,UPI and Cards Accepted.</p>
              </div>
              <div className="p-2 pe-4 form-check">
                <input
                  className="form-check-input border border-dark"
                  type="radio"
                  name="payment"
                  value="Cash"
                  onChange={selectRadio}
                />
              </div>
            </div>
          </div>

          <div className="d-flex border border-3 border-dark rounded my-3 py-3 pt-4">
            <div className="mx-4">
              <CiCreditCard1 />
            </div>
            <div className="w-100">
              <p className="my-0 fw-bold h5">Online Payment</p>
              <p>UPI and Credit/Debit Card</p>
            </div>
            <div className="p-2 pe-4 form-check">
              <input
                className="form-check-input border border-dark"
                type="radio"
                name="payment"
                value="online"
                onChange={selectRadio}
                required
              />
            </div>
          </div>
          {/* <div className="d-flex border border-3 border-dark rounded my-3 py-3 pt-4">
              <div className="mx-4">
                <FaGooglePay />
                <SiPaytm />
              </div>
              <div className="w-100">
                <p className="my-0 fw-bold h5">UPI</p>
              </div>
              <div className="p-2 pe-4 form-check">
                <input
                  className="form-check-input border border-dark"
                  type="radio"
                  name="payment"
                  value="UPI"
                  onChange={selectRadio}
                />
              </div>
          </div> */}
          <Button className="w-100 my-2" type="submit">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
