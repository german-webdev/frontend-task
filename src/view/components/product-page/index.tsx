import { FC } from 'react';
import { useParams } from 'react-router-dom';

export const ProductPage: FC = () => {
  const { productId } = useParams();
  return <div>{`Товар ${productId}`}</div>;
};
