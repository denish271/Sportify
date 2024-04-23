export default function ValidReducer(state, action) {
  switch (action.type) {
    case "updateStatus":
      if (action.payload === "login") {
        return {
          ...state,
          status: "Logout",
        };
      } else {
        return {
          ...state,
          status: "Login",
        };
      }
    case "updateShowNav":
      if (action.payload === "login")
        return {
          ...state,
          showNav: false,
        };
      else return { ...state, showNav: true };

    case "updateData":
      let { name, email, id } = action.payload;
      if (name) {
        var fullname = `Welcome, ${name}`;
      }
      return { ...state, data: { name, email, fullname, id } };
    default:
      return state;
  }
}
