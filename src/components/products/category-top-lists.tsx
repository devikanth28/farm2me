import { Avatar } from "primereact/avatar";
import { Carousel } from "primereact/carousel";
import { responsiveOptions } from "./category-top-responsive";
import { TreeNodeModel } from "../../models/category-new/category-tree-node";

const CategoryTopList = ({ categoriesLists, topCategorySelect }: any) => {
  const categoryTemplate = (category: TreeNodeModel) => {
    return (
      <div
        className="surface-border border-round text-center"
        style={{ paddingTop: 20 }}
        onClick={() => topCategorySelect(category)}
      >
        <Avatar
          image={
            category.imagePath ??
            process.env.PUBLIC_URL + "/assests/images/Ellipse 2.png"
          }
          className="imgs border-1"
          size="xlarge"
          shape="circle"
        />
        <span
          className="caption justify-content-center p-0"
          style={{ fontSize: 13 }}
        >
          {category.label}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="top-carousel">
        {categoriesLists.length > 0 ? (
          <Carousel
            value={categoriesLists}
            numScroll={1}
            numVisible={8}
            responsiveOptions={responsiveOptions}
            itemTemplate={categoryTemplate}
          />
        ) : null}
      </div>
    </>
  );
};

export default CategoryTopList;
