export interface ProductCheckoutModel {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  tax: number;
  weight: string;
  minOrderQty: number;
  orderMultiples: number;
  media: Media[];
  categoryID: number;
  categoryName: string;
  subCategoryID: number;
  subCategoryName: string;
  quantity: number;
  courierAvailable: boolean;
  inStock: number;
  minQuantity: number;
}

interface Media {
  url: string;
}
