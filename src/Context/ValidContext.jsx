import { createContext, useContext, useReducer } from "react";
import reducer from "../Reducer/ValidReducer";

let ValidContext = createContext();

let initialState = {
  status: "Login",
  showNav: true,
  data: {},
};

const ValidContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateStatus = (status) => {
    dispatch({ type: "updateStatus", payload: status });
  };

  const updateShowNav = (status) => {
    dispatch({ type: "updateShowNav", payload: status });
  };

  const updateData = (obj) => {
    dispatch({ type: "updateData", payload: obj });
  };
  return (
    <ValidContext.Provider
      value={{ ...state, updateStatus, updateShowNav, updateData }}
    >
      {children}
    </ValidContext.Provider>
  );
};

const useValid = () => {
  return useContext(ValidContext);
};

export { ValidContextProvider, useValid };
