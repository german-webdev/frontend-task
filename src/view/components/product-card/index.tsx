import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { compareListSelector, linkedProductsSelector, productSelector } from '../../../store/selectors/product-page';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLinkedProducts, fetchProduct, fetchProductToCompareList, fetchProductsCategory } from '../../../store/actions/product-page';
import { AppDispatch } from '../../../store';
import { Modal } from '../common/modal';
import { ProductItem } from '../product';
import { Product } from '../../../models';
import { sortLinkedProducts } from '../../../use-cases/sort-linked-products';
import { LinkedProducts } from '../linked-products';
import { CompareList } from '../compare-list';

export const ProductCard: FC = () => {
  const { productId } = useParams();
  const product = useSelector(productSelector);
  const linkedProduct = useSelector(linkedProductsSelector);
  const toCompareProducts = useSelector(compareListSelector);
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | undefined>();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
      console.log(`Открыта карточка: Товар ${productId}`);
      dispatch(fetchLinkedProducts(productId));
      dispatch(fetchProductsCategory());
    }
  }, [dispatch, productId]);

  const setProductToCompare = (id: string) => {
    dispatch(fetchProductToCompareList(id))
    console.log(`В список сравнения добавлен: Товар ${id}`);
  }
  
  const sortedLinkedProducts = sortLinkedProducts(linkedProduct)

  const openModal = (id: string) => {
    setIsModalOpen(true);
    const currentProduct = sortedLinkedProducts.find((curr) => curr.id === id)
    setModalProduct(currentProduct);
    console.log(`Товар ${id} открыт в модальном окне`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log(`модальное окно было закрыто`);
  };

  return (
    <>
      <div>
        {product && 
        (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '10px',
          }}>
            <ProductItem 
              style={{
                      flex: '0 1 50%',
                      border: '1px dotted #000000',
                      cursor: 'pointer', 
                    }}
              product={product}
            /> 

            {!!toCompareProducts.length && 
            (
              <CompareList 
              products={toCompareProducts} 
              style={{ 
                flex: '0 1 50%',
              }} /> 
            )} 
          </div>
        )}

        <LinkedProducts onAddProductToCompareList={setProductToCompare} linkedProducts={sortedLinkedProducts} openModal={openModal}/>  
      </div>
      {isModalOpen && modalProduct && (
        <Modal onClose={closeModal}>
          <ProductItem product={modalProduct}/>
        </Modal>
      )}
    </>
  )
};

