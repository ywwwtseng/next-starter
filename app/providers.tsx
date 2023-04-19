'use client';

import React from 'react';
import { SWRConfig } from 'swr';
import { StoreProvider } from '@/stores';
import { IClientStoreState } from '@/stores/ClientStore';
import { serializeSwrFallback } from '@/utils/swr';

interface Props {
  children: React.ReactNode
  initialState: {
    client: IClientStoreState
    swrFallback: any[]
  }
}



export function Providers({ children, initialState }: Props) {
  return (
    <StoreProvider initialState={initialState}>
      {({ client }) => (
        <SWRConfig
          value={{
            fallback: serializeSwrFallback(initialState.swrFallback),
            fetcher: client.request,
            // errorRetryInterval: 1000,
          }}
        >
          {children}
        </SWRConfig>
      )}
    </StoreProvider>
  );
}