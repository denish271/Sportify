import React, { useEffect } from "react";
import CartItems from "./CartItems";
import { useCart } from "../Context/CartContext";
import NoCartItem from "./NoCartItem";

export default function Cart() {
  const { cart } = useCart();
  // const []
  useEffect(() => {}, [cart]);
  return <>{cart.length > 0 ? <CartItems /> : <NoCartItem />}</>;
}
