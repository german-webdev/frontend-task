import { createReducer } from '@reduxjs/toolkit';
import { LinkedProduct, Product } from '../../models';
import { addProductToCompareList, removeProductFromCompareList, setLinkedProducts, setProduct, setProductsCategory } from '../actions/product-page';
import { Category } from '../../gateways/models/category';
import { determineLinkType } from '../../use-cases/determine-link-type';

type CatalogPageState = {
  product: Product | undefined;
  categories: Category[];
  linkedProducts: LinkedProduct[] | undefined;
  comparingProducts: Product[] | undefined;
};

const defaultState: CatalogPageState = {
  product: undefined,
  categories: [],
  linkedProducts: undefined,
  comparingProducts: undefined,
};

export const productPageReducer = createReducer<CatalogPageState>(defaultState, (builder) => {
  builder
    // set product
    .addCase(setProduct, (state, { payload }) => {
      state.product = payload;
    })
    // set linkType for category, for example 'analog', 'related', 'undefined'
    .addCase(setProductsCategory, (state, { payload }) => {
      state.categories = payload;
    })
    // set linked products
    .addCase(setLinkedProducts, (state, { payload }) => {
      const currentProductCategory = state.product?.category?.id;
      const allCategories = state.categories;
      state.linkedProducts = payload.map((product) => ({
        ...product,
        linkType: determineLinkType(product, allCategories, currentProductCategory),
      }));
    })
    // Add product to compare list
    .addCase(addProductToCompareList, (state, { payload }) => {
      if (!state.comparingProducts?.some((product) => product.id === payload.id)) {
        state.comparingProducts = [...(state.comparingProducts || []), payload];
      }
    })
    // delete product from a comparison list
    .addCase(removeProductFromCompareList, (state, { payload }) => {
      state.comparingProducts = state.comparingProducts?.filter((product) => product.id !== payload);
    })
});