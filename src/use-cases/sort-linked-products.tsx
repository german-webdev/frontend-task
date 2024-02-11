import { LinkedProduct } from "../models";

// Аналог (linkType === 'analog') в начале списка
export const sortLinkedProducts = (array: LinkedProduct[]) => [...array].sort((a, b) => {
  if (a.linkType === 'analog' && b.linkType !== 'analog') {
    return -1;
  } else if (a.linkType !== 'analog' && b.linkType === 'analog') {
    return 1;
  } else if (a.linkType === 'related' && b.linkType !== 'related') {
    return -1;
  } else if (a.linkType !== 'related' && b.linkType === 'related') {
    return 1;
  } else {
    return 0;
  }
});
