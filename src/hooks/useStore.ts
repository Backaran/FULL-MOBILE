import { useContext } from 'react';
import { StoreContext, StoreContextValue } from '../providers/storeProvider';

const useStore = (): StoreContextValue => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('StoreProvider missing');
  }

  return context;
};

export default useStore;
