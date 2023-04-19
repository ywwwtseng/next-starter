import React from 'react';
import Link from 'next/link';
import { getProductService } from '@/stores/ClientStore/helpers';
import UserProfile from '@/containers/UserProfile';
import AuthActions from '@/containers/AuthActions';
import ProductList from '@/containers/ProductList';

interface Props {
}

export default async function Page(props: Props) {  
  const productService = getProductService();
  const products = (await productService?.fetchProducts() || []);

  return (
    <>
      {/* <Link href="/landing">To</Link>
      <AuthActions />
      <UserProfile /> */}
      <ProductList fallback={products} />
    </>
  );
}
