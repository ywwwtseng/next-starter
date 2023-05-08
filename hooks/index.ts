import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { StoreContext } from '@/stores';
import { ProductService } from '@/services';

export function useProductService() {
  const { client: { productService } } = React.useContext(StoreContext) as { client: { productService: ProductService } };
  return productService;
}

export function useInfinite<T>(
  key: string, 
  fetcher: (page: number, pageSize: number) => Promise<T[]>,
  options : { fallback?: T[], pageSize?: number }
): {
  data: T[],
  next: () => void,
  isLoading: boolean,
  isLoadingMore: boolean,
  isReachingEnd: boolean,
  isRefreshing: boolean
} {
  const pageSize = options?.pageSize || 25;
  const fallback = options?.fallback || [];

  const {
    data,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite(
    (index) => [key, index + 1],
    ([,page]) => fetcher(page, pageSize),
    { fallbackData: [fallback] }
  );

  const isLoadingMore = isLoading || !!(size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || !!(data && data[data.length - 1]?.length < pageSize);
  const isRefreshing = isValidating && !!data && data.length === size;
  const next = () => {
    if (isValidating) {
      return
    }

    setSize(size + 1)
  };

  return {
    data: data ? data.flat() : [],
    next,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isRefreshing,
  }
}