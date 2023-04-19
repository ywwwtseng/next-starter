'use client';

import React from 'react';
import { isServer } from '@/utils/common';
import { ClientStore, IClientStore, IClientStoreState } from './ClientStore';

export type { IClientStore };

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
  const client = new ClientStore(initialState.client);
  client.errorRetryCount = isServer() ? 0 : 3;
  
  const stores = {
    client,
  };


  return (
    <StoreContext.Provider value={stores}>{children(stores)}</StoreContext.Provider>
  )
};
