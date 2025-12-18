import { useContext } from "react";
import { StoreContext, StoreContextValue } from "../store/store";

export function useStore(): StoreContextValue {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("StoreProvider missing");
  }

  return context;
}
