import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { AppState, initialState, reducer } from "../store/store";

export interface StoreContextValue {
  state: AppState;
  dispatch: Dispatch<{ type: string }>;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value: StoreContextValue = { state, dispatch }

  return (
    <StoreContext.Provider value={value} >
      {children}
    </StoreContext.Provider>
  )
}
