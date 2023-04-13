'use client';

import React from 'react';
import { AuthStore, IAuthStoreState } from './AuthStore';

interface Props {
  children: (stores: any) => React.ReactNode
  initialState: {
    auth: IAuthStoreState
  }
}

interface Stores {
  auth?: AuthStore
}

export const StoreContext = React.createContext<Stores>({});
StoreContext.displayName = 'StoreContext';

export const StoreProvider = ({ children, initialState }: Props) => {
  const stores = {
    auth: new AuthStore(initialState.auth)
  };


  return (
    <StoreContext.Provider value={stores}>{children(stores)}</StoreContext.Provider>
  )
};
