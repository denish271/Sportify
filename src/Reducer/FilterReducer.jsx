export default function FilterReducer(state, action) {
  switch (action.type) {
    case "filterProdutcs":
      return {
        ...state,
        filterProducts: [...action.payload],
        allProducts: [...action.payload],
      };

    case "updateFilter":
      let { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "updateFilterProducts":
      const { allProducts } = state;
      let tempProducts = [...allProducts];
      let { text, category } = state.filters;
      if (text) {
        tempProducts = tempProducts.filter((value) => {
          return value.name.toLowerCase().includes(text);
        });
      }
      if (category !== "All") {
        tempProducts = tempProducts.filter((value) => {
          return value.category === category;
        });
      }
      return {
        ...state,
        filterProducts: tempProducts,
      };

    case "iconUpdateFilter":
      let val = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          category: val,
        },
      };

    default:
      return state;
  }
}
