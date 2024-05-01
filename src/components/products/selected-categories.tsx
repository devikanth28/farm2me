import { Chip } from "primereact/chip";
import { TreeNodeModel } from "../../models/category-new/category-tree-node";

const SelectedCategories = ({ categoriesData, topCategorySelect }: any) => {
  return (
    <>
      {categoriesData.length > 0
        ? categoriesData.map((cat: TreeNodeModel, index: number) => {
            return (
              <>
                <div className="flex-wrap gap-8" key={index}>
                  <Chip
                    label={cat.label}
                    onClick={() => topCategorySelect(cat)}
                  ></Chip>
                </div>
              </>
            );
          })
        : null}
    </>
  );
};

export default SelectedCategories;
