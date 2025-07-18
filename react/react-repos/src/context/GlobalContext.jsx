import { createContext, useReducer } from "react";
import { repoReducer } from "@/reducers/repoReducer";

export const GlobalContext = createContext();

const initalState = {
  repos: [],
  loading: false,
  error: null,
};
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(repoReducer, initalState);
  return (
    // state 应用状态
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
