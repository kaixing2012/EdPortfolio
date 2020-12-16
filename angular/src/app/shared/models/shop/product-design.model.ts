import { ProductImage } from './product-image.model';
import { Size } from './size.model';
import { Color } from './color.model';

export class ProductDesign {
  colorsAndImages: {
    color: Color;
    image: ProductImage;
  }[];
  sizes: Size[];
}
