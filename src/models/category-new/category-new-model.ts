export interface CategoryNewModel {
  id: number;
  name: string;
  imagePath: string;
  subCategories: [
    {
      id: number;
      name: string;
      imagePath: string;
    }
  ];
}
