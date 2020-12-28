import { ShoppingCart } from './shopping-cart.model';

export interface Payment {
  paymentSerialNo: string;
  dateCheckedOut: string;
  datePaid: string;
  totalAmount: number;
  isPaid: boolean;
  sessionKey: string;
  customerName: string;
  contactNo: string;
  contactEmail: string;
  cardholderName: string;
  cardNumber: string;
  cardExpiration: string;
  cardCvv: string;
  shippingPostalCode: number;
  shippingStreet: string;
  shippingDistrict: string;
  shippingCity: string;
  cart: ShoppingCart;
}
