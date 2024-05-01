import { TreeNodeModel } from "./category-tree-node";
import { CategoryNewModel } from "./category-new-model";

export const mapSourceToTarget = (
  source: CategoryNewModel[]
): TreeNodeModel[] => {
  const targetArray: TreeNodeModel[] = source.map((item) => ({
    key: item.id + " - Category",
    label: item.name,
    data: "",
    icon: "",
    imagePath: item.imagePath,
    children: item.subCategories.map((i) => ({
      key: i.id + " - SubCategory",
      label: i.name,
      data: "",
      icon: "",
      imagePath: item.imagePath
    })),
  }));
  return targetArray;
};
