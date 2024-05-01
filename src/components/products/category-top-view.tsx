import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { CategoryModel } from "../../models/category-model";
import CategoryTopList from "./category-top-lists";
import { useTranslation } from "react-i18next";
import { HomeCategoryModel } from "../../models/home-category-model";
import { TreeNodeModel } from "../../models/category-new/category-tree-node";

const CategoryTopView = ({
  categoriesData,
  topCategorySelect,
  data,
  onSearch,
}: any) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<TreeNodeModel[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e: any) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  useEffect(() => {
    setCategories(categoriesData);
  }, []);

  return (
    <>
      <div className="p-fluid formgrid top-header">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-4 sm:col-12">
            <h5 className="page-title">{t("products_header")} </h5>
          </div>
          <div className="col-12 md:col-6 lg:col-4 sm:col-12">
            <span className="p-input-icon-left">
              <InputText
                type="text"
                placeholder={t("common_search_placeholder")}
                className="text-base text-color  border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary surface-100"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <i className="pi pi-search" />
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 hide-sm">
        <div className="flex flex-wrap">
          <div className="flex-auto">
            {categories.length > 0 ? (
              <CategoryTopList
                categoriesLists={categories}
                topCategorySelect={topCategorySelect}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryTopView;
