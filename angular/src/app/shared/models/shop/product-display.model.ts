import { ProductItem } from './product-item.model';
import { Category } from './category.model';

export interface ProductDisplay {
  productItem: ProductItem;
  category: Category;
  attribute: string;
}
