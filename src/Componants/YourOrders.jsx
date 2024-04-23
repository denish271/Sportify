import React, { useEffect, useState } from "react";
import { useValid } from "../Context/ValidContext";
import axios from "axios";
import Loading from "./Loading";

const YourOrders = () => {
  const [orderData, setOrderData] = useState([]);
  const { data, status } = useValid();
  useEffect(() => {
    if (status === "Login") {
      setOrderData([]);
    }
  }, [status]);

  const FetchOrderData = async () => {
    await axios.get("http://localhost:8000/api/order/").then((res) => {
      res.data.forEach((val) => {
        if (val.user === data.id) {
          let obj = val.product.map(async (prod) => {
            await axios
              .get(`http://127.0.0.1:8000/api/product/${prod}`)
              .then((res) => {
                const { name, image, price } = res.data;
                setOrderData((old_data) => {
                  return [
                    ...old_data,
                    { name, image, price, status: val.is_completed },
                  ];
                });
              });
          });
        }
      });
    });
  };
  useEffect(() => {
    if (setOrderData.length <= 0) <Loading />;
    setOrderData([]);
    FetchOrderData();
  }, []);

  //   const clickEvent = () => {
  //     setOrderData([]);
  //     updateShowNav("logout");
  //     nevigate("/");
  //   };

  //   useEffect(() => {
  //     console.log(orderData);
  //   }, [orderData]);
  return (
    <div className="container-fluid">
      <div className="container p-3">
        <h1 className="text-center">Your Orders</h1>
        <div className="row text-center my-3">
          <div className="col-3">
            <h3>Product Image</h3>
          </div>
          <div className="col-5">
            <h3>Product Name</h3>
          </div>
          <div className="col-2">
            <h3>Price</h3>
          </div>
          <div className="col-2">
            <h3>Status</h3>
          </div>
        </div>
        <div>
          {orderData.map((val, i) => {
            return (
              <div className="row text-center ">
                <div className="col-3">
                  <img
                    src={val.image}
                    alt="Product image here"
                    style={{ height: "200px", width: "200px" }}
                  />
                </div>
                <div className="col-5 d-flex justify-content-center align-items-center">
                  {val.name}
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                  {val.price}
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                  {val.status === false ? "Pending" : "Completed"}
                </div>
                <hr className="my-1" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YourOrders;
