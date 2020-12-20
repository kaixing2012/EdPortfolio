import { Product } from './product.model';
import { ShoppingCart } from './shopping-cart.model';

export class ShoppingItem {
  id: number;
  itemNo: number;
  dateAdded: string;
  cart: ShoppingCart;
  product: Product;
  amount: number;
}
