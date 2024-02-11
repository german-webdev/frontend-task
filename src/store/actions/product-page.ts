import { Dispatch, createAction } from '@reduxjs/toolkit';
import { Category, LinkedProduct, Product } from '../../models';
import { MockProductPageGateway } from '../../gateways/product-page';

const mockGateway = new MockProductPageGateway();

// fetchProduct
export const fetchProduct = (productId: string) => async (dispatch: Dispatch) => {
  try {
    const productData = await mockGateway.getProduct(productId);
    dispatch(setProduct(productData));
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export const setProduct = createAction<Product>('product-page/set-product');

// fetchLinkedProducts
export const fetchLinkedProducts = (productId: string) => async (dispatch: Dispatch) => {
  try {
    const productData = await mockGateway.getLinkedProducts(productId);
    const linkedProducts: LinkedProduct[] = productData.map((product: Product) => ({
      ...product,
      linkType: undefined,
    }));
    dispatch(setLinkedProducts(linkedProducts));
  } catch (error) {
    console.error('Error fetching linked products:', error);
  }
};

export const setLinkedProducts = createAction<LinkedProduct[]>('product-page/set-linked-product');

// fetchProductToCompareList
export const fetchProductToCompareList = (productId: string) => async (dispatch: Dispatch) => {
  try {
    const productData = await mockGateway.getProduct(productId);
    dispatch(addProductToCompareList(productData));
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export const addProductToCompareList = createAction<Product>(
  'product-page/add-product-to-compare-list',
);

// removeProductFromCompareList
export const removeProductFromCompareList = createAction<string | undefined>('product-page/remove-product');

// fetchProductsCategory
export const fetchProductsCategory = () => async (dispatch: Dispatch) => {
  const categories = await mockGateway.getCategories();
  dispatch(setProductsCategory(categories))
}

export const setProductsCategory = createAction<Category[]>(
  'product-page/add-product-category',
);


