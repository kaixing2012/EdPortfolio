import { ProductColorAndImage } from './product-color-and-image.model';
import { Size } from './size.model';

export interface ProductDesign {
  colorsAndImages: ProductColorAndImage[];
  sizes: Size[];
}
