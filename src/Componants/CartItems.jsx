import React from "react";
import { Button } from "../styles/Button";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { useValid } from "../Context/ValidContext";

const Wrep = styled.div`
  .del {
    scale: 2;
  }
  .del:hover {
    color: red;
  }
  .del:active {
    color: red;
    scale: 2.4;
  }
`;

export default function CartItems() {
  const { cart, Decr, removeToCart, Incr, subtotal } = useCart();
  const { data } = useValid();
  return (
    <>
      <Wrep>
        <div className="text-center align-itmes-center m-5">
          <h1 className="mb-5"> YOUR CART ITEMS </h1>
          <div className="row text-center bg-dark text-white rounded">
            <h3 className="col-5">Title</h3>
            <h3 className="col">price</h3>
            <h3 className="col">Quantity</h3>
            <h3 className="col">Total</h3>
            <h3 className="col">Remove</h3>
          </div>
          <hr />
          {cart.map((cart) => {
            if (cart.user === data.id) {
              return (
                <div key={cart.id}>
                  {" "}
                  <div className="row d-flex align-items-center">
                    <div className="col-5 d-flex align-items-center">
                      <img
                        src={cart.image}
                        // className="shadow"
                        style={{ width: "100px", height: "100px" }}
                        alt=""
                      />
                      <h1 className="m-4">{cart.name}</h1>
                    </div>
                    <p className="col">{cart.price}</p>
                    <p className="col d-flex justify-content-around">
                      <span
                        onClick={() => Decr(cart)}
                        style={{ cursor: "pointer" }}
                      >
                        ➖
                      </span>
                      {cart.quantity}
                      <span
                        onClick={() => Incr(cart)}
                        style={{ cursor: "pointer" }}
                      >
                        ➕
                      </span>
                    </p>
                    <h4 className="col">
                      {(cart.price * cart.quantity).toFixed(2)}
                    </h4>
                    <MdDelete
                      onClick={() => removeToCart(cart)}
                      className="col del"
                    />
                  </div>
                  <hr />
                </div>
              );
            } else {
              return "";
            }
          })}
          <div className="d-flex justify-content-end">
            <div style={{ width: "500px" }}>
              <div className="d-flex justify-content-between">
                <div className=" h5">Sub Total :</div>
                <div className="">₹{subtotal.toFixed(2)}</div>
              </div>
              <div className=" d-flex justify-content-between">
                <div className=" h5">GST :</div>
                <div className="">₹{((subtotal * 5) / 100).toFixed(2)}</div>
              </div>
              <hr />
              <div className=" d-flex justify-content-between">
                <div className="  h5">Grand Total :</div>
                <div className="h1 fw-bold">
                  ₹
                  {(
                    subtotal + parseFloat(((subtotal * 5) / 100).toFixed(2))
                  ).toFixed(2)}
                </div>
              </div>
              <div className="d-flex justify-content-end my-3">
                <Link to="/address">
                  <Button className="btn btn-dark">Check Out</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Wrep>
    </>
  );
}
