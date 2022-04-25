const initialState = {
  data: [],
  authToken: "",
  user: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        authToken: action.authToken,
        user: action.user,
      };
    case "LOGOUT_USER":
      console.log("_niklogout redux test" + state);
      return {
        ...state,
        authToken: "",
        user: "",
      };
    default:
      return state;
  }
};

export default reducer;
