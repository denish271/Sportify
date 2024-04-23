import React from "react";
import { Button } from "../styles/Button";
import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div
    className="w-100 d-flex justify-content-center align-items-center flex-column gap-3"
    style={{ height: "415px" }}
  >
    <h1 style={{ fontSize: "100px", color: "#d35400" }}>4😮4</h1>
    <h5>OPPS!PAGE NOT FOUND</h5>
    <Link to="/">
      <Button>Home</Button>
    </Link>
  </div>
);

export default ErrorPage;
