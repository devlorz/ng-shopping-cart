import { Product } from '../product/product.model';
import { CartItem } from '../cart/cart.model';

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
    orderNumber: Math.random()
      .toString(36)
      .substring(5),
    date: new Date().toLocaleDateString('en-US'),
    orderItems,
    grandTotal
  } as Order;
}

export interface Order {
  orderNumber: string;
  grandTotal: number;
  date: string;
  orderItems: Array<OrderItem>;
}
