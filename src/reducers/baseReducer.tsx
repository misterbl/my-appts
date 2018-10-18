const baseReducer = (state = 0, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
};

export default baseReducer;
