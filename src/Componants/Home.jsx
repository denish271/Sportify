import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useFilter } from "../Context/FilterContext";
import { IoIosFootball } from "react-icons/io";
import { MdSportsCricket } from "react-icons/md";
import { FaTableTennis } from "react-icons/fa";
import { MdOutlineSportsTennis } from "react-icons/md";
import { FaBaseballBatBall } from "react-icons/fa6";
import { GiHockey } from "react-icons/gi";
import { useValid } from "../Context/ValidContext";

const Wrapper = styled.div`
  .main {
    background-image: url("home.png");
    height: 90vh;
    width: 100%;
    background-size: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .content {
    position: relative;
    top: 50px;
    left: 250px;
  }
  p {
    margin: 0;
  }
  .shop {
    background-color: transparent;
    color: white;
    border: 2px solid white;
    padding: 2px 10px;
    margin-top: 10px;
  }
  .shop:active {
    background-color: white;
    color: black;
  }
`;

export default function Home() {
  const { allProducts, featureProducts, iconUpdateFilter } = useFilter();
  const getItems = (data, property) => {
    let newval = data.map((value) => value[property]);
    newval = ["All", ...new Set(newval)];
    return newval;
  };
  const getCategory = getItems(allProducts, "category");

  const { updateShowNav } = useValid();
  useEffect(() => {
    if (window.location.pathname === "/") {
      updateShowNav("logout");
    }
  }, []);

  return (
    <>
      <Wrapper>
        <div className="main text-white">
          <div className="content w-75">
            <h1>S P O R T I F Y</h1>
            <p>Ecommerce Website For Sports</p>
            <p>Products</p>
            <Link to="/productList">
              <button className="shop">SHOP NOW</button>
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-around m-4 p-3 border border-dark rounded border-2 shadow">
          {getCategory.map((val, i) => {
            switch (val) {
              case "Football":
                return (
                  <div className="text-center">
                    <h1 key={i}>
                      <Link
                        to="/productList"
                        className="text-dark"
                        onClick={() => iconUpdateFilter(val)}
                      >
                        <IoIosFootball />
                      </Link>
                    </h1>
                    <h4>{val}</h4>
                  </div>
                );
              case "Table Tennis":
                return (
                  <div className="text-center">
                    <h1 key={i}>
                      <Link
                        to="/productList"
                        className="text-dark"
                        onClick={() => iconUpdateFilter(val)}
                      >
                        <FaTableTennis />
                      </Link>
                    </h1>
                    <h4>{val}</h4>
                  </div>
                );
              case "Cricket":
                return (
                  <div className="text-center">
                    <h1 key={i}>
                      <Link
                        to="/productList"
                        className="text-dark"
                        onClick={() => iconUpdateFilter(val)}
                      >
                        <MdSportsCricket />
                      </Link>
                    </h1>
                    <h4>{val}</h4>
                  </div>
                );
              case "Tennis":
                return (
                  <div className="text-center">
                    <h1 key={i}>
                      <Link
                        to="/productList"
                        className="text-dark"
                        onClick={() => iconUpdateFilter(val)}
                      >
                        <MdOutlineSportsTennis />
                      </Link>
                    </h1>
                    <h4>{val}</h4>
                  </div>
                );
              case "Baseball":
                return (
                  <div className="text-center">
                    <h1 key={i}>
                      <Link
                        to="/productList"
                        className="text-dark"
                        onClick={() => iconUpdateFilter(val)}
                      >
                        <FaBaseballBatBall />
                      </Link>
                    </h1>
                    <h4>{val}</h4>
                  </div>
                );
              case "Hockey":
                return (
                  <div className="text-center">
                    <h1 key={i}>
                      <Link
                        to="/productList"
                        className="text-dark"
                        onClick={() => iconUpdateFilter(val)}
                      >
                        <GiHockey />
                      </Link>
                    </h1>
                    <h4>{val}</h4>
                  </div>
                );
            }
          })}
        </div>
        <div className="mx-5 my-2 border shadow d-flex flex-column gap-2 ">
          <div className="p-3 shadow w-100 h3">Our Featured Service</div>
          <div className="mx-5 mt-4 d-flex flex-wrap justify-content-between">
            {featureProducts.map((value) => {
              return (
                <Link
                  to={`/productList/products/${value.id}`}
                  key={value.id}
                  className="text-decoration-none"
                >
                  <div className="card mb-5 shadow" style={{ width: "18rem" }}>
                    <img
                      src={value.image}
                      className="card-img-top"
                      alt="..."
                      style={{ width: "100%", height: "200px" }}
                    />
                    <div className="card-body d-flex justify-content-between">
                      <p className="card-title">{value.name}</p>
                      <p>₹{value.price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Wrapper>
    </>
  );
}
