export interface ProductNewModel {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  tax: number;
  totalUnitPrice: number;
  weight: string;
  minOrderQty: number;
  orderMultiples: number;
  media: Media[];
  categoryID: number;
  categoryName: string;
  subCategoryID: number;
  subCategoryName: string;
  courierAvailable: boolean;
  inStock: number;
}

interface Media {
  url: string;
}
