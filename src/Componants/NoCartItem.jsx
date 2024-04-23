import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Button } from "../styles/Button";

const NoCartItem = () => {
  const nevigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center flex-column my-4">
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "300px" }}
      >
        <MdOutlineAddShoppingCart
          className="display-1"
          style={{ scale: "3" }}
        />
      </div>
      <Button
        className="text-center mb-4 w-25 h3"
        onClick={() => nevigate("/productList")}
      >
        Add Cart Item
      </Button>
    </div>
  );
};

export default NoCartItem;
