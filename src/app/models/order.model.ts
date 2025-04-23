export interface OrderItem {
  productID: number;
  productName: string;
  quantity: number;
  priceProduct: number;
}

export interface Order {
  id: number;
  userName: string;
  phoneNumber: string;
  address: string;
  speicalLocation: string;
  status: string;
  date: string;
  items: OrderItem[];
}
