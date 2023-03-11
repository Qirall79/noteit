const userReducer = (user: any, action: any) => {
  switch (action.type) {
    case "login":
      return action.user;
    case "logout":
      return {};
  }
};

export default userReducer;
