import React, { useEffect, useState } from "react";
import { Button } from "../styles/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useValid } from "../Context/ValidContext";

const Review = () => {
  const [dis, setDis] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const { id } = useParams();
  const { data } = useValid();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/review/").then((res) => {
      setReviewData(res.data);
      console.log(res.data);
    });
  }, []);
  const inputEvent = (e) => {
    setDis(e.target.value);
  };

  const dataSend = async (e) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:8000/api/review/", {
        product: id,
        user: data.id,
        discription: dis,
      })
      .then((res) => {
        alert("Reviewed Successfully....");
        axios.get("http://127.0.0.1:8000/api/review/").then((res) => {
          setReviewData(res.data);
        });
      });
  };
  return (
    <div className="container d-flex align-items-center flex-column ">
      <h1 className="my-3">Review</h1>
      <form action="" className="form-group w-50" onSubmit={dataSend}>
        <label htmlFor="dis" className="px-2">
          Write Your Rewiew
        </label>
        <textarea
          className="form-control m-2"
          cols="30"
          rows="5"
          id="dis"
          name=""
          required
          value={dis}
          onChange={inputEvent}
        ></textarea>
        <Button className="m-2" type="submit">
          Send
        </Button>
        <h5 className="m-2">Product Reviews : </h5>
        {reviewData.map((val, i) => {
          return (
            <div className="border border-solid m-2 p-2 rounded">
              {val.discription}
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Review;
