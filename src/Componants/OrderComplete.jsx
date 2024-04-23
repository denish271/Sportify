import React from "react";
import { Button } from "../styles/Button";
import { Link, useParams } from "react-router-dom";

const OrderComplete = () => {
  const { id } = useParams();
  return (
    <>
      <div className="container-fluid">
        <div
          className="container d-flex justify-content-center align-items-center flex-column"
          style={{ height: "450px" }}
        >
          <h1>Thank You For Your Order</h1>
          <h5>Order Id : {id}</h5>
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderComplete;
