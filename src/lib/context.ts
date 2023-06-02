import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  isAuthenticated: false,
  loading: false,
  setLoading: (state: boolean) => {},
});