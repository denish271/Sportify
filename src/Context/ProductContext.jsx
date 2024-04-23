import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import ErrorPage from "../Componants/ErrorPage";

const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  try {
    useEffect(() => {
      try {
        axios.get("http://127.0.0.1:8000/api/product/").then((res) => {
          setProducts(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    }, []);
  } catch (error) {
    <ErrorPage />;
  }

  // useEffect(() => {
  //   console.log(products);
  // }, [products]);

  return (
    <ProductContext.Provider value={[...products]}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductContextProvider, useProduct };
