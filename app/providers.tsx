'use client';

import React from 'react';
import { SWRConfig } from 'swr';
import { StoreProvider } from '@/stores';
import { IAuthStoreState } from '@/stores/AuthStore';

interface Props {
  children: React.ReactNode,
  initialState: {
    auth: IAuthStoreState,
    swrFallback: any
  }
}

export function Providers({ children, initialState }: Props) {
  // user profile data cache on client side
  return (
    <StoreProvider initialState={initialState}>
      {({ auth }) => (
        <SWRConfig
          value={{
            fallback: initialState.swrFallback,
            fetcher: auth.request,
            errorRetryCount: 3,
            // errorRetryInterval: 1000,
          }}
        >
          {children}
        </SWRConfig>
      )}
    </StoreProvider>
  );
}