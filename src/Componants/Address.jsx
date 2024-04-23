import React, { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/CartContext";

const Wrapper = styled.section`
.head{
    border-radius:5px;
  }

  form{
//    border:1px solid black;
   border-radius:5px;
   padding:30px;
//    background-color:#e5e5e5;
  }

  lable{
    display:block;
    margin:10px;
    margin:bottom:5px;
    font-size:20px;
  }
  input{
    display:block;
    width:100%;
    height:35px;
    border:2px solid black;
    margin-bottom:20px;
    border-radius:5px;
  }
  select{
    width:100%;
    height:35px;
    border-radius:5px;
    background-color:white;
    margin-bottom:20px;
    display:block;
  }
  button{
    margin-top:20px;
    width:200px;
    height:50px;
    border:none;
    border-radius:5px;
    font-size: 20px;
    color:white;
    background-color: #D04608;
  }
  
  .order{
    border:1px solid black;
    border-radius:5px;
    height:300px;
    margin-top:17px;
    background-color:#ebe8d1;
  }
`;

let initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case "inputEvent":
      let { name, value } = action.payload;
      return { ...state, [name]: value };
    default:
      return { ...state };
  }
};

export default function Address() {
  const [state, setState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [country, setCountry] = useState([]);
  const [state1, dispatch] = useReducer(reducer, initialState);
  const { subtotal } = useCart();

  const nevigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/states")
      .then((res) => setCountry(res.data.data));
  }, []);

  useEffect(() => {
    country.forEach((val) => {
      if (val.name === selectedCountry) {
        setState(val.states);
      }
    });
  }, [selectedCountry]);

  const selectEvent = (e) => {
    let { name, value } = e.target;
    dispatch({ type: "inputEvent", payload: { name, value } });
    setSelectedCountry(e.target.value);
  };

  const inputEvent = (e) => {
    let { name, value } = e.target;
    dispatch({ type: "inputEvent", payload: { name, value } });
  };

  let FormField = new FormData();

  FormField.append("name", state1.name);
  FormField.append("mobile", state1.mobile);
  FormField.append("country", state1.country);
  FormField.append("state", state1.state);
  FormField.append("city", state1.city);
  FormField.append("pincode", state1.pincode);
  FormField.append("flat", state1.flat);
  FormField.append("area", state1.area);

  const postAddressData = async (e) => {
    e.preventDefault();
    let address;
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/address/",
      data: FormField,
    }).then((res) => {
      address = res.data.id;
      console.log(res.data);
    });
    nevigate("/payment?address=" + address);
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="row m-5">
          <div className="h3 fw-bold text-center mt-3 mx-5">
            <h2>Check Out</h2>
          </div>
          <div className="col-7 section">
            <div className="bg-dark text-white text-start mt-3 head w-100 text-center my-4 text-sm-3">
              <h3 className="mx-5 p-2">Shipping Address</h3>
            </div>
            <form className="w-100 form-group" onSubmit={postAddressData}>
              <label htmlFor="name">Fullname(First Name And Last Name)</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={state1.name}
                onChange={inputEvent}
                required
              />
              <label htmlFor="mobile">Mobile Number</label>
              <input
                className="form-control"
                type="text"
                name="mobile"
                id="mobile"
                value={state1.mobile}
                onChange={inputEvent}
                maxLength="12"
                required
              />
              <label htmlFor="country">Contry / Region</label>
              <select
                onChange={selectEvent}
                id="country"
                name="country"
                value={state.country}
                className="form-select"
                required
              >
                {country.map((value, index) => {
                  return (
                    <option key={index} value={value.name}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="state">State</label>
              <select
                className="form-select"
                id="state"
                name="state"
                onChange={inputEvent}
                value={state.state}
                required
              >
                {state.map((value, index) => {
                  return (
                    <option key={index} value={value.name}>
                      {value.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="city">City / Town</label>
              <input
                className="form-control"
                type="text"
                name="city"
                id="city"
                value={state1.city}
                onChange={inputEvent}
                required
              />
              <label htmlFor="pincode">Pincode</label>
              <input
                className="form-control"
                type="text"
                name="pincode"
                id="pincode"
                value={state1.pincode}
                onChange={inputEvent}
                placeholder="6 digit [0-9] pincode"
                required
              />
              <label htmlFor="area">Area, Street, Village</label>
              <input
                className="form-control"
                type="text"
                name="area"
                id="area"
                value={state1.area}
                onChange={inputEvent}
                required
              />
              <label htmlFor="flat">Flat, House Number, Building</label>
              <input
                className="form-control"
                type="text"
                name="flat"
                id="flat"
                value={state1.flat}
                onChange={inputEvent}
                required
              />
              <Button className="w-100" type="submit">
                Continue
              </Button>
            </form>
          </div>
          <div className="col-5 order">
            <h4 className="m-3 mt-4 mb-5 h3 fs-sm-2">Order Summery</h4>
            <div className="d-flex flex-column align-items-between gap-4 p-2">
              <div className="w-100 d-flex justify-content-between">
                <div className="h5">Sub Total :</div>
                <div>₹{subtotal.toFixed(2)}</div>
              </div>
              <div className="w-100 d-flex justify-content-between border-bottom border-1 border-dark">
                <div className="h5">Sales Tax :</div>
                <div>₹{((subtotal * 5) / 100).toFixed(2)}</div>
              </div>
              <div className="w-100 d-flex justify-content-between">
                <div className="h2">Grand Total :</div>
                <div className="h2 fw-bold">
                  ₹
                  {(
                    subtotal + parseFloat(((subtotal * 5) / 100).toFixed(2))
                  ).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
