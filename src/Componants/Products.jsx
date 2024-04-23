import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Button } from "../styles/Button";
import { useCart } from "../Context/CartContext";
import Ratings from "./Ratings";
import Loading from "./Loading";
import { useValid } from "../Context/ValidContext";

const Wrapper = styled.section`
  .container1 {
    display: flex;
  }

  .img-container {
    padding: 10px;
    margin: 35px 120px 10px;
    width: 450px;
    height: 500px;
  }
  div img {
    width: 450px;
    height: 450px;
    border-radius: 10px;
  }

  .dis-container {
    // background-color : pink;
    width: 100%;
    padding: 100px;
    margin: 20px 70px 10px 0px;
    gap: 15px;
  }
`;
export default function Products() {
  const { status } = useValid();
  const { addToCart } = useCart();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const nevigate = useNavigate();
  useEffect(() => {
    try {
      axios.get(`http://127.0.0.1:8000/api/product/${id}`).then((res) => {
        setProduct(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  {
    if (product.length <= 0) return <Loading />;
  }

  const clickEvent = () => {
    if (status === "Logout") {
      addToCart(product);
      nevigate("/cart");
    } else {
      let res = window.confirm(
        "You want to Add item in Cart so u have to Login?"
      );
      if (res) {
        nevigate("/login");
      } else {
        alert("Sorry You can't Add item in Cart without Login");
      }
    }
  };

  const clickEvent1 = () => {
    if (status === "Logout") {
      nevigate(`/review/${id}`);
    } else {
      let res = window.confirm(
        "You want to Reiviewed Product so u have to Login?"
      );
      if (res) {
        nevigate("/login");
      } else {
        alert("Sorry You can't Reiviewed Product without Login");
      }
    }
  };
  return (
    <Wrapper>
      <div className="container1">
        <div className="img-container d-flex justify-content-center align-items-center">
          <img src={product.image} alt="img here" />
        </div>
        <div className="dis-container d-flex justify-content-center align-items-start flex-column">
          <h1>{product.name}</h1>
          <h3>₹{product.price}</h3>
          <p>
            <Ratings rate={product.ratings} />
          </p>
          <p>
            {product.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Non sapiente rem, porro aspernatur quos fugit,
            maxime accusantium voluptates laborum facilis voluptate amet. Error
            repudiandae, eaque totam earum accusamus odio nihil?
          </p>
          <Button onClick={clickEvent}>Add to Cart</Button>
          <Button onClick={clickEvent1}>Review</Button>
        </div>
      </div>
    </Wrapper>
  );
}
