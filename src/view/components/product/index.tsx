import { FC } from 'react'
import { Product } from '../../../models';

interface ProductItemProps {
  style?: Record<string, string>;
  product: Product;
}

const defaultStyles = {
  padding: '0',
  margin: '10px 0 0 0',
}

export const ProductItem: FC<ProductItemProps> = ({product, style}) => {
  
  return (
    <div style={style}>
      <h3 style={defaultStyles}>{product.name}</h3>
      <p style={defaultStyles}>Price: {product.price}</p>
    </div>
  );
};
