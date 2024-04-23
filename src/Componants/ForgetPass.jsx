import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useValid } from "../Context/ValidContext";

const Wrepper = styled.section`
  .main {
    height: 100vh;
    // background-color: #59d5e0;
    background: linear-gradient(60deg, red, #59d5e0, pink);
  }
  .submit-btn {
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

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const nevigate = useNavigate();
  const { updateShowNav } = useValid();

  useEffect(() => {
    if (window.location.pathname === "/forgetpass") {
      updateShowNav("login");
    }
  }, []);

  const inputEvent = (e) => {
    setEmail(e.target.value);
  };

  const postForgetPassData = async (e) => {
    e.preventDefault();
    let msg, id;
    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/forgetpass",
      data: {
        email,
      },
    })
      .then((res) => {
        msg = res.data.msg;
        id = res.data.id;
      })
      .catch((err) => {
        alert(err.response.data.detail);
      });
    if (msg === "success") {
      nevigate(`/forgetchangepass/${id}`);
    }
  };

  return (
    <Wrepper>
      <div className="container-fluid d-flex justify-content-center align-items-center flex-column main">
        <div className="border shadow rounded p-3 px-5 bg-light inner-div">
          <h3 className="text-center">Forget Password</h3>
          <form action="" className="form-group" onSubmit={postForgetPassData}>
            <label className="form-label" htmlFor="email">
              Email :
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              value={email}
              onChange={inputEvent}
              required
            />
            <Button className="submit-btn my-3 float-end" type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </Wrepper>
  );
};

export default ForgetPass;
