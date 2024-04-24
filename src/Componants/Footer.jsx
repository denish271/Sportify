import React from "react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  let div1 = {
    height: "200px",
    width: "100%",
    backgroundColor: "#154360",
    color: "white",
    position: "relative",
    bottom: "0",
    marginBottom: "0px",
  };
  return (
    <div className="cotainer" style={div1}>
      <div className="row m-4 mt-0 pt-4">
        <div className="col-sm text-center">
          <h5>Sportify</h5>
          E-commerce Website For <br /> Sports Items
        </div>
        <div className="col-sm text-center">
          <h5>Follow Us</h5>
          <a className="m-1 text-white" href="/">
            <FaInstagram />
          </a>
          <a className="m-1 text-white" href="/">
            <FaFacebookF />
          </a>
          <a className="m-1 text-white" href="/">
            <FaWhatsapp />
          </a>
        </div>
        <div className="col-sm text-center">
          <h5>Call Us</h5>
          <a href="tel:6351980234" className="text-white text-decoration-none">
            +91 6351980234
          </a>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-sm text-center">
          Privacy Policy <br />
          <Link to="/term"> Terms & Conditions</Link>
        </div>
        <div className="col-sm text-center mt-2">
          ©2024 Sportify, All Right Reserved
        </div>
      </div>
    </div>
  );
}
