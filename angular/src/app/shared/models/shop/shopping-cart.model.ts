import { ShoppingItem } from './shopping-item.model';

export class ShoppingCart {
  id: number;
  cartSerialNo: string;
  dateCreated: string;
  sessionKey: string;
  cartItems: ShoppingItem[];
}
