import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFilter } from "../Context/FilterContext";
import Loading from "./Loading";

export default function ProductList() {
  const {
    filterProducts,
    allProducts,
    filters: { text, category },
    updateFilter,
  } = useFilter();

  // console.log(filterProducts)
  const getItems = (data, property) => {
    let newval = data.map((value) => value[property]);
    newval = ["All", ...new Set(newval)];
    return newval;
  };
  const getCategory = getItems(allProducts, "category");

  useEffect(() => {
    if (filterProducts.length <= 0) return <Loading />;
  }, []);

  return (
    <div className="container-fluid">
      <div className="row mb-0">
        <div
          className="col-2 text-center text-white"
          style={{ backgroundColor: "#1f618d" }}
        >
          <div className="d-flex flex-column">
            <input
              className="rounded p-1 m-3"
              type="search"
              placeholder="Search"
              name="text"
              value={text}
              onChange={updateFilter}
            />
          </div>
          <h3 className="my-3">Category</h3>
          <div className="list-unstyled d-flex flex-column">
            {getCategory.map((v, i) => (
              <button
                className="mt-2 text-white border border-none btn-b"
                key={i}
                name="category"
                value={v}
                onClick={updateFilter}
                style={{ backgroundColor: "transparent" }}
                type="button"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="col-10 me-0 p-5 pt-4 d-flex justify-content-between flex-wrap gap-2">
          <div className="text-center w-100 mb-3">
            <h3 className="shadow p-2 border-bottom rounded">{category}</h3>
          </div>
          {filterProducts.map((value) => {
            return (
              <Link
                to={`/productList/products/${value.id}`}
                key={value.id}
                className="text-decoration-none"
              >
                <div className="card mb-5 shadow" style={{ width: "18rem" }}>
                  <img
                    src={value.image}
                    className="card-img-top"
                    alt="..."
                    style={{ width: "100%", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{value.name}</h5>
                    <p>₹{value.price}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
