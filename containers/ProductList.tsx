'use client';

import React from 'react';
import { useInfinite } from '@/hooks';
import ProductListItem from '@/components/ProductListItem';
import { SWR_CACHE_KEY } from '@/constants/swr';
import { useProductService } from '@/hooks';

interface Props {
  fallback: Product[]
}

function ProductList({ fallback }: Props) {
  const productService = useProductService();
  const {
    data: products,
    next
  } = useInfinite<Product>(SWR_CACHE_KEY.PRODUCTS, productService.fetchProducts, { fallback });

  return (
    <div>
      <div>{products.map(product => (<ProductListItem key={product.id} product={product} />))}</div>
      <button onClick={next}>Load more</button>
    </div>
  );
};

export default ProductList;