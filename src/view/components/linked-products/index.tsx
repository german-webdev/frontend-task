import { FC } from 'react';
import { LinkedProduct } from '../../../models';

interface LinkedProductsProps {
  linkedProducts: LinkedProduct[];
  openModal: (id: string) => void;
  onAddProductToCompareList: (id: string) => void;
}

export const LinkedProducts: FC<LinkedProductsProps> = ({ linkedProducts, onAddProductToCompareList, openModal }) => {
  return (
    <ul>
      {linkedProducts.map((item) => {
        return (
          <li key={item.id}>                 
            {item.linkType === 'analog' 
            && (
              <>
                <span>Аналог: </span>
                <button 
                  onClick={() => onAddProductToCompareList(item.id)}
                  type="button"
                >
                    {item.name}
                </button>
              </>
            )}
            {(item.linkType === 'related')
            && (
              <>
                <span>Сопутствующий товар: </span>
                <button onClick={() => openModal(item.id)} type="button">{item.name}</button>
              </>
            )}
            {(!item.linkType)
            && (
              <>
                <button onClick={() => openModal(item.id)} type="button">{item.name}</button>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
};
