'use client';

import React from 'react';
import { ClientStore, IClientStoreState } from './ClientStore';

interface Props {
  children: (stores: any) => React.ReactNode
  initialState: {
    client: IClientStoreState
  }
}

interface Stores {
  client?: ClientStore
}

export const StoreContext = React.createContext<Stores>({});
StoreContext.displayName = 'StoreContext';

export const StoreProvider = ({ children, initialState }: Props) => {
  const stores = {
    client: new ClientStore(initialState.client)
  };


  return (
    <StoreContext.Provider value={stores}>{children(stores)}</StoreContext.Provider>
  )
};
