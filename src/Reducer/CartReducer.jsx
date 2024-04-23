import axios from "axios";

export default function CartReducer(state, action) {
  switch (action.type) {
    case "addToCart":
      // console.log(state.cart);
      var { id, name, image, price } = { ...action.payload.product };
      var { data } = { ...action.payload };
      var exi = state.cart.find((val) => {
        return val.id === id && val.user === data.id;
      });
      if (exi) {
        var data1;
        var cart_id;
        var tmp = state.cart.map((val) => {
          if (val.id === id && val.user === data.id) {
            cart_id = val.cid;
            var newqty1 = val.quantity + 1;
            data1 = {
              quantity: newqty1,
              product: val.id,
              user: val.user,
            };
            return { ...val, quantity: newqty1 };
          } else {
            return val;
          }
        });
        axios.put(`http://127.0.0.1:8000/api/cart/${cart_id}/`, data1);
        console.log("first");
        return { ...state, cart: tmp };
      } else {
        var tempCart = {
          id,
          name,
          image,
          price,
          quantity: 1,
          user: data.id,
          cid: 0,
        };
        console.log(tempCart);
        console.log(data.id);
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/api/cart/",
          data: {
            quantity: tempCart.quantity,
            product: tempCart.id,
            user: data.id,
          },
        }).then((res) => {
          tempCart.cid = res.data.id;
        });
        console.log(tempCart);
        return {
          ...state,
          cart: [...state.cart, tempCart],
        };
      }

    case "addCartItem1":
      var { quantity1, user1, cid } = { ...action.payload };
      var {
        id: id3,
        name: name1,
        image: image1,
        price: price1,
      } = { ...action.payload.res1 };

      let cdata = {
        id: id3,
        name: name1,
        image: image1,
        price: price1,
        quantity: quantity1,
        user: user1,
        cid,
      };

      return { ...state, cart: [...state.cart, cdata] };

    case "removeToCart":
      var c1 = action.payload;
      var tempCart1 = state.cart.filter((val) => {
        return val.id !== c1.id;
      });
      axios.delete(`http://127.0.0.1:8000/api/cart/${c1.cid}/`);
      return {
        ...state,
        cart: tempCart1,
      };

    case "Decrement":
      var c2 = action.payload;
      var data2;
      var tempProduct = state.cart.map((v) => {
        if (v.id === c2.id) {
          var newqty = v.quantity - 1;
          if (newqty <= 1) newqty = 1;
          data2 = {
            quantity: newqty,
            product: c2.id,
            user: c2.user,
          };

          return { ...v, quantity: newqty };
        } else {
          return v;
        }
      });
      axios.put(`http://127.0.0.1:8000/api/cart/${c2.cid}/`, data2);
      return {
        ...state,
        cart: tempProduct,
      };
    case "Increment":
      var c3 = action.payload;
      var data3;
      var tempProduct1 = state.cart.map((v) => {
        if (v.id === c3.id) {
          var newqty = v.quantity + 1;
          data3 = {
            quantity: newqty,
            product: c3.id,
            user: c3.user,
          };
          return { ...v, quantity: newqty };
        } else {
          return v;
        }
      });
      axios.put(`http://127.0.0.1:8000/api/cart/${c3.cid}/`, data3);
      return {
        ...state,
        cart: tempProduct1,
      };
    case "subtotal":
      var tmp1 = state.cart.reduce((initial, val) => {
        if (val.user === action.payload.id) initial += val.price * val.quantity;
        return initial;
      }, 0);
      return { ...state, subtotal: tmp1 };

    case "removeSubtotal":
      return { ...state, subtotal: 0, cart: [] };

    default:
      return state;
  }
}
