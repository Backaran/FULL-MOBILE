import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import * as githubReducer from "./Github/reducer";
import * as githubConstants from "./Github/constants";

/* ------------------ STATE ------------------ */

export interface AppState {
  github: githubReducer.State;
}

const initialState: AppState = {
  github: githubReducer.initialState,
};

/* ------------------ REDUCER ------------------ */

const reducer = (state: AppState, action: { type: string }): AppState => {
  if (action.type.startsWith(githubConstants.prefix)) {
    return { ...state, github: githubReducer.reducer(state.github, action) };
  }
  throw new Error(`Unknown action: ${action.type}`);
}

/* ------------------ CONTEXT ------------------ */

export interface StoreContextValue {
  state: AppState;
  dispatch: Dispatch<{ type: string }>;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

/* ------------------ PROVIDER ------------------ */

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: StoreContextValue = { state, dispatch };

  return (
    <StoreContext.Provider value={value} >
      {children}
    </StoreContext.Provider>
  );
}
