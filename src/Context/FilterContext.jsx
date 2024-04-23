import { createContext, useContext, useEffect, useReducer } from "react";
import { useProduct } from "./ProductContext";
import reducer from "../Reducer/FilterReducer";

const FilterContext = createContext();
let initialState = {
  filterProducts: [],
  allProducts: [],
  featureProducts: [],
  filters: {
    text: "",
    category: "All",
  },
};

let FilterContextProvider = ({ children }) => {
  const products = useProduct();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "updateFilterProducts",
    });
  }, [state.filters]);

  useEffect(() => {
    state.featureProducts = products.filter((val) => {
      if (val.feature) {
        return val;
      }
    });
    dispatch({
      type: "filterProdutcs",
      payload: products,
    });
  }, [products]);

  let updateFilter = (e) => {
    // console.log(e.target);
    let { name, value } = e.target;
    dispatch({ type: "updateFilter", payload: { name, value } });
  };

  let iconUpdateFilter = (val) => {
    dispatch({ type: "iconUpdateFilter", payload: val });
  };
  return (
    <FilterContext.Provider
      value={{ ...state, updateFilter, iconUpdateFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

let useFilter = () => {
  return useContext(FilterContext);
};

export { FilterContext, FilterContextProvider, useFilter };
