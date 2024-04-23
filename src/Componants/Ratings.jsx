import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
export default function Ratings(props) {
  const ratingStar = Array.from({ length: 5 }, (ele, i) => {
    let num = i + 0.5;
    return (
      <span key={i} className="text-warning h5">
        {props.rate >= i + 1 ? (
          <FaStar />
        ) : props.rate >= num ? (
          <FaStarHalfAlt />
        ) : (
          <AiOutlineStar />
        )}
      </span>
    );
  });
  return <>{ratingStar}</>;
}
/*
T : 3.5 >= 1(i+1) Fullstar 
T : 3.5 >= 2(i+1) Fullstar 
T : 3.5 >= 3(i+1) Fullstar 
F : T(inner) :num=3.5 >= 3.5 halfstar
F : F(inner) :num=3.5 >= 4.5 Emptystar
*/
