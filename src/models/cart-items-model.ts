export interface CartItem {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  price?: number;
  date: string;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  unitPrice: number;
}
