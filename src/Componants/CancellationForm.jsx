import React, { useState } from "react";
import { Button } from "../styles/Button";

const CancellationForm = () => {
  return (
    <div className="container d-flex align-items-center flex-column ">
      <h1 className="my-3">Cancel Order</h1>
      <form action="" className="form-group w-50">
        <label htmlFor="dis">Cancellation Reason</label>
        <textarea
          className="form-control m-2"
          cols="30"
          rows="10"
          id="dis"
          name=""
          //   value={dis}
          //   onChange={inputEvent}
        ></textarea>
        <Button className="m-2">Cancel Order</Button>
      </form>
    </div>
  );
};

export default CancellationForm;
