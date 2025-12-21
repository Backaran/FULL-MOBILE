import { useContext } from 'react';
import { StoreContext, StoreContextValue } from '../providers/storeProvider';

/**
 * Hook for accessing store
 * @returns dispatch : used to dispatch action, state: data of the store
 */
const useStore = (): StoreContextValue => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('StoreProvider missing');
  }

  return context;
};

export default useStore;
