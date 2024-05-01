import { SubTreeNodeModel } from "./sub-category-new-model";

export interface TreeNodeModel {
  key: string;
  label: string;
  data: string;
  icon: string;
  imagePath?: string;
  children?: SubTreeNodeModel[];
}
