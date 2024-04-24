import React, { useEffect } from "react";
import { useValid } from "../Context/ValidContext";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useNavigate } from "react-router-dom";

const Wrepper = styled.section`
  .main {
    height: 100vh;
    // background-color: #59d5e0;
    background: linear-gradient(60deg, red, #59d5e0, pink);
  }
  .profile {
    scale: 5;
    position: relative;
    top: -30px;
  }
  .p-btn {
    background: linear-gradient(60deg, #eb4034, #34a1eb, #34eb40);
    &:hover {
      color: white;
      border: 1px solid white;
    }
  }
`;

const Profile = () => {
  const { data} = useValid();
  const nevigate = useNavigate();
  // useEffect(() => {
  //   if (window.location.pathname === "/profile") {
  //     updateShowNav("login");
  //   }
  // }, []);

  return (
    <Wrepper>
      <div
        className="container-fluid d-flex justify-content-center align-items-center main"
        style={{ height: "100vh" }}
      >
        <div className="w-25 border rounded p-4 shadow d-flex justify-content-center align-items-center flex-column p-3 bg-light inner-div">
          <CgProfile className="profile" />
          <h3 className="text-decoration-underline m-2">{data.name}</h3>
          <h5>Email : {data.email}</h5>
          <div>
            <Button
              className="p-btn mx-2"
              onClick={() => nevigate("/changepass")}
            >
              Change Password
            </Button>
            <Button
              className="p-btn mx-2"
              onClick={() => nevigate("/yourorder")}
            >
              Your Orders
            </Button>
            {/* <Button className="p-btn mx-2" onClick={goHomeClick}>
              Go Back Home
            </Button> */}
          </div>
        </div>
      </div>
    </Wrepper>
  );
};

export default Profile;
