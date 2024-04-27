import React, { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import axios from "axios";
import { useValid } from "../Context/ValidContext";
import Alert from "react-bootstrap/Alert";
import Button1 from "react-bootstrap/Button";

const Wrapper = styled.section`
  .main {
    height: 100vh;
    // background-color: #59d5e0;
    background: linear-gradient(60deg, red, #59d5e0, pink);
  }
  .login-btn {
    // background-color: #59d5e0;
    background: linear-gradient(60deg, #eb4034, #34a1eb, #34eb40);

    &:hover {
      color: white;
      border: 1px solid white;
    }
  }
  .inner-div {
    width: 400px;
  }
`;

let initialState = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  if (action.type === "inputEvent") {
    var { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
    };
  }
  return state;
};

const Login = () => {
  const { updateStatus, updateShowNav, updateData } = useValid();

  const [state, dispatch] = useReducer(reducer, initialState);

  const nevigate = useNavigate();

  const location = useLocation();

  const [show, setShow] = useState();

  const [msg, setMsg] = useState();

  useEffect(() => {
    if (location.pathname === "/login") {
      updateShowNav("login");
    }
  }, []);

  const inputEvent = (e) => {
    var { name, value } = e.target;
    dispatch({ type: "inputEvent", payload: { name, value } });
  };

  const postLoginData = (event) => {
    event.preventDefault();
    let fromField = new FormData();
    fromField.append("email", state.email);
    fromField.append("password", state.password);
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/login",
      data: fromField,
    })
      .then((res) => {
        updateData(res.data);
        if (res.data.msg) {
          setShow(true);
          setMsg("Login Successfully");
        }
      })
      .catch((err) => {
        // alert(err.response.data.detail);
        setShow(true);
        setMsg(err.response.data.detail);
        // if (err.response.status === 400) {
        //   alert("User Already Exist...");
        // }
      });
  };

  return (
    <>
      <Wrapper>
        <div className="container-fluid d-flex justify-content-center align-items-center flex-column main">
          <div className="border shadow rounded p-3 px-5 bg-light inner-div">
            <h3 className="text-center">Login</h3>
            <form
              onSubmit={postLoginData}
              className="form-group d-flex flex-column row-gap-2"
            >
              <label htmlFor="email">Email :</label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={state.email}
                onChange={inputEvent}
                required
              />
              <label htmlFor="password">Password :</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                value={state.password}
                onChange={inputEvent}
                required
              />
              <Button className="w-100 login-btn" type="submit">
                Log In
              </Button>
              <p className="form-text m-0">
                Forget Password?
                <Link to="/forgetpass">Click</Link>
              </p>
              <p className="form-text mb-1">
                Don't have an Account?
                <Link to="/register">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </Wrapper>
      {show && (
        <Alert
          variant="primary"
          className="position-absolute top-50 start-50 translate-middle-x px-5"
        >
          {msg === "Login Successfully" && (
            <Alert.Heading>A Success Message!</Alert.Heading>
          )}
          <div className="text-center">{msg}</div>
          <div className="d-flex justify-content-center">
            <Button1
              variant="outline-primary"
              className="mt-2"
              onClick={() => {
                setShow(false);
                updateShowNav("register");
                updateStatus("login");
                msg === "Login Successfully" && nevigate("/");
              }}
            >
              Close
            </Button1>
          </div>
        </Alert>
      )}
    </>
  );
};
export default Login;
