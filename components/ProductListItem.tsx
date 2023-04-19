import React from 'react';

interface Props {
  product: Product
}

function ProductListItem({ product }: Props) {
  return (
    <div>
      <div>ID: {product.id}</div>
      <div>Title: {product.title}</div>
      <div>Description: {product.description}</div>
      <div>CreationAt: {product.creationAt}</div>
      <div>UpdatedAt: {product.updatedAt}</div>
    </div>
  );
};

export default ProductListItem;