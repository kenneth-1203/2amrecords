import { createContext } from "react";

export const UserContext = createContext({
  user: {},
  loading: false,
  setLoading: (state: boolean) => {},
});
