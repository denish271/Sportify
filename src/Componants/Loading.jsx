import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 10px solid skyblue;
  border-bottom: 10px solid #33adff;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  animation: loading 1s ease-in-out 0s infinite;
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "415px" }}
    >
      <Wrapper>
        <div></div>
      </Wrapper>
    </div>
  );
};

export default Loading;
