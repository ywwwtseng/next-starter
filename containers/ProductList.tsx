import React from 'react';

interface Props {
  products: Product[]
}

function ProductList(props: Props) {
 

  return <div>{JSON.stringify(props.products)}</div>;
};

export default ProductList;