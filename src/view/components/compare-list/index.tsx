import { FC } from 'react'
import { Product } from '../../../models';
import { ProductItem } from '../product';
import { removeProductFromCompareList } from '../../../store/actions/product-page';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

interface CompareListProps {
  style?: Record<string, string>;
  products: Product[];
}

export const CompareList: FC<CompareListProps> = ({ style, products }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={style}>
      <span style={{
        position: 'absolute',
        top: '20px',
      }}>
        Сравнение
      </span>
      <ul style={{
        listStyle: 'none',
        margin: '0',
        padding: '0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        {products.map((product: Product) => {
          return (
            <li 
              key={product.id}
              style={{                      
                flex: '1 0 80px',
                border: '1px dotted #000000', 
              }}
              onClick={() => {
                dispatch(removeProductFromCompareList(product.id))
                console.log(`Из списка сравнения удален: Товар ${product.id}`);
              }}
              >
              <ProductItem product={product} style={{cursor: 'pointer'}}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
};
