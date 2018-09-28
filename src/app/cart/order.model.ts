import { Product } from '../product/product.model';
import { CartItem } from './cart.model';

export interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  total: number;
  productId: number;
}

export function createOrder(items: Array<CartItem & Product>) {
  let grandTotal = 0;
  const orderItems = items.map((item, index) => {
    grandTotal += item.total;
    return {
      id: index + 1,
      title: item.title,
      quantity: item.quantity,
      total: item.total,
      productId: item.productId
    } as OrderItem;
  });
  return {
    id: 0,
    orderItems,
    grandTotal
  } as Order;
}

export interface Order {
  id: number;
  grandTotal: number;
  orderItems: Array<OrderItem>;
}
