import { Product, Category, ProductLinkType } from "../models";

export function determineLinkType(product: Product, categories: Category[], currentProductCategory: string | undefined): ProductLinkType {

  const isAnalog = product.category?.id === currentProductCategory;

  const isRelated = (category: Category, categoryId: string | undefined): boolean => {
    if (category.id === categoryId) {
      return true;
    }

    if (category.children) {
      for (const childCategory of category.children) {
        if (isRelated(childCategory, categoryId)) {
          return true;
        }
      }
    }

    return false;
  };

  
  if (isAnalog) {
    return 'analog'
  }

  for (const category of categories) {
    if (isRelated(category, currentProductCategory) && isRelated(category, product.category?.id)) {
      return 'related';
    }
  }

  return undefined;
}