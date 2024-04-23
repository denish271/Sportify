import React from "react";
import CancellationForm from "./CancellationForm";
import { Return } from "./Return";
import { useNavigate } from "react-router-dom";

const About = () => {
  const nevigate = useNavigate();
  return (
    <>
      <div className="container">
        <h1 className="text-center my-3">About Us</h1>
        <div className="fs-5">
          <p>
            Welcome to Your E-commerce Store, where we strive to provide a
            seamless and enjoyable online shopping experience. Our passion for
            quality products and excellent customer service sets us apart.
          </p>

          <p>
            At Your E-commerce Store, we believe in offering a diverse range of
            products to cater to your unique needs. Whether you're looking for
            the latest fashion trends, electronics, or home essentials, we've
            got you covered.
          </p>

          <p>
            Our dedicated team works tirelessly to ensure that your orders are
            processed efficiently and delivered to your doorstep with care. We
            value your trust and are committed to maintaining the highest
            standards in every aspect of our business.
          </p>

          <p>
            Thank you for choosing Your E-commerce Store. We look forward to
            serving you and making your online shopping experience memorable.
          </p>

          <p>
            Feel free to contact us at{" "}
            <a href="#" onClick={() => nevigate("/contact")}>
              info@sportify.com
            </a>{" "}
            for any inquiries or assistance.
          </p>

          <p>Happy shopping!</p>
        </div>
      </div>
    </>
  );
};

export default About;
