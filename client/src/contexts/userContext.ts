import { createContext } from "react";

export const UserContext: React.Context<any> = createContext({
  id: "",
  email: "",
  username: "",
});
export const UserDispatchContext: React.Context<any> = createContext(null);
