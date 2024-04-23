import styled from "styled-components";

export const Button = styled.button`
  background-color: #d35400;

  border-width: 0;
  border-radius: 5px;
  padding: 7px 15px;
  margin-top: 5px;
  color: white;
  &:hover {
    font-weight: bold;
    background-color: white;
    color: #d35400;
    border: 2px solid #d35400;
  }
  &:active {
    font-size: 15px;
  }
`;
