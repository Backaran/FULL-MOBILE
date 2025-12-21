import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { Action, AppState, appInitialState, appReducer } from '../store/store';

export interface StoreContextValue {
  state: AppState;
  dispatch: Dispatch<Action>;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

/**
 * Provider used to initiate data store of app
 */
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, appInitialState);
  const value: StoreContextValue = { state, dispatch };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
