import { Product } from '../product/product.model';

export interface CartItem {
  productId: Product['id'];
  quantity: number;
  total: number;
}
