import { ShoppingItem } from './shopping-item.model';

export interface ShoppingCart {
  id: number;
  cartSerialNo: string;
  dateCreated: string;
  sessionKey: string;
  cartItems: ShoppingItem[];
}
