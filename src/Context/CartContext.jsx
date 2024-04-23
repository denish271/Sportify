import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import reducer from "../Reducer/CartReducer";
import { useValid } from "./ValidContext";
import axios from "axios";

const CartContext = createContext();

let initialState = {
  cart: [],
  subtotal: 0,
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, status } = useValid();

  useEffect(() => {
    FetchCartData();
  }, [status]);

  // useEffect(() => {
  //   console.log(state.cart);
  // }, [state.cart]);

  const FetchCartData = async () => {
    if (status === "Logout") {
      await axios.get("http://127.0.0.1:8000/api/cart/").then((res) => {
        console.log(res.data);
        res.data.forEach(async (val) => {
          if (val.user === data.id) {
            await axios
              .get(`http://127.0.0.1:8000/api/product/${val.product}`)
              .then((res) => {
                let res1 = res.data;
                dispatch({
                  type: "addCartItem1",
                  payload: {
                    res1,
                    quantity1: val.quantity,
                    user1: val.user,
                    cid: val.id,
                  },
                });
              });
          }
        });
      });
    } else {
      dispatch({
        type: "removeSubtotal",
      });
    }
  };

  const addToCart = (product) => {
    dispatch({ type: "addToCart", payload: { product, data } });
  };
  const removeToCart = (cart) => {
    dispatch({ type: "removeToCart", payload: cart });
  };
  const Decr = (cart) => {
    dispatch({ type: "Decrement", payload: cart });
  };
  const Incr = (cart) => {
    dispatch({ type: "Increment", payload: cart });
  };
  useEffect(() => {
    dispatch({ type: "subtotal", payload: data });
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeToCart, Decr, Incr }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartContext, CartContextProvider, useCart };
