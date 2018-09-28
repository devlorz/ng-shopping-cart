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
  const orderItems = items.map((item, index) => {
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
    orderItems
  } as Order;
}

export interface Order {
  id: number;
  orderItems: Array<OrderItem>;
}
