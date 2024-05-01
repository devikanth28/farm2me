import { SubCategoryModel } from "./category/sub-category-model";

export interface HomeCategoryModel {
    id: number;
    name: string;
    imagePath: string;
    subCategories: SubCategoryModel[];
}