import React from "react";
import { Button } from "../styles/Button";
import { useValid } from "../Context/ValidContext";

export default function Contact() {
  const { data } = useValid();

  return (
    <>
      <div className="d-flex justify-content-center mt-4">
        <div className="d-flex justify-content-center w-50">
          <form action="https://formspree.io/f/xbjnkyzr" method="post">
            <div className="p-4 pt-3 form-group">
              <h2 className="text-center">Contact Us</h2>
              <label className="m-2" htmlFor="username">
                Name :
              </label>
              <input
                className="form-control mb-2 mt-1"
                type="text"
                name="username"
                value={data.name}
                readOnly
              />
              <label className="m-2" htmlFor="Email">
                Email :
              </label>
              <input
                className="form-control  mb-2 mt-1"
                type="email"
                name="Email"
                value={data.email}
                readOnly
              />
              <label className="m-2" htmlFor="message">
                Massage :
              </label>
              <textarea
                className="form-control"
                cols="70"
                rows="5"
                name="message"
                required
              ></textarea>
              <br />
              <Button className="px-4">SEND</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
