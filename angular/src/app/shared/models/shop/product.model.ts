import { ProductItem } from './product-item.model';
import { ProductImage } from './product-image.model';
import { Size } from './size.model';
import { Color } from './color.model';
import { Gender } from './gender.model';
import { Category } from './category.model';

export class Product {
  id?: number;
  productItem: ProductItem;
  productImage?: ProductImage;
  size: Size;
  color: Color;
  gender: Gender;
  category: Category;
  stock?: number;
}
