import { ProductItem } from './product-item.model';
import { Category } from './category.model';
import { Gender } from './gender.model';

export interface ProductDialog {
  productItem: ProductItem;
  category: Category;
  gender: Gender;
}
