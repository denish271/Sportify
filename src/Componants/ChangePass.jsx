import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useValid } from "../Context/ValidContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const reducer = (state, action) => {
  if (action.type === "inputEvent") {
    const { name, value } = action.payload;
    return { ...state, [name]: value };
  }
  return state;
};

const ChangePass = () => {
  const [state, dispatch] = useReducer(reducer, {});
  const { updateShowNav, data } = useValid();
  const nevigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/changepass") {
      updateShowNav("login");
    }
  }, []);

  const postPassData = async (e) => {
    e.preventDefault();
    if (state.new_pass !== state.confirm_pass) {
      alert("New Password And Confirm Password Must Have Same");
    } else if (state.old_pass === state.new_pass) {
      alert("Old Password and New Password is Same");
    } else {
      await axios({
        method: "patch",
        url: `http://127.0.0.1:8000/api/changepass/${data.id}`,
        data: {
          password: state.new_pass,
          old_pass: state.old_pass,
        },
      })
        .then((res) => {
          alert("Password has been Changed");
          nevigate("/profile");
        })
        .catch((err) => alert(err.response.data.detail));
    }
  };

  const inputEvent = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "inputEvent", payload: { name, value } });
  };

  return (
    <Wrepper>
      <div className="container-fluid d-flex justify-content-center align-items-center flex-column main">
        <div className="border shadow rounded p-3 px-5 bg-light inner-div">
          <h3 className="text-center">Change Password</h3>
          <form action="" className="form-group" onSubmit={postPassData}>
            <label className="form-label" htmlFor="old_pass">
              Old Password :
            </label>
            <input
              type="password"
              className="form-control"
              id="old_pass"
              name="old_pass"
              value={state.old_pass}
              onChange={inputEvent}
              required
            />
            <label className="form-label" htmlFor="new_pass">
              New Password :
            </label>
            <input
              type="password"
              className="form-control"
              id="new_pass"
              name="new_pass"
              value={state.new_pass}
              onChange={inputEvent}
              required
            />
            <label className="form-label" htmlFor="confirm_pass">
              Confirm Password :
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_pass"
              name="confirm_pass"
              value={state.confirm_pass}
              onChange={inputEvent}
              required
            />
            <Button className="submit-btn mt-3 float-end" type="submit">
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </Wrepper>
  );
};

export default ChangePass;
