import React, { useEffect, useState } from "react";
import CategoryTopView from "./category-top-view";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import CategoryService from "../../services/category/category.service";
import ProductService from "../../services/products/products.service";
import { Suspense, lazy } from "react";
import AppLoading from "../../components/app-loading/app-loading";
import { mapSourceToTarget } from "../../models/category-new/catergory-mapper-model";
import { TreeNodeModel } from "../../models/category-new/category-tree-node";
import { ProductNewModel } from "../../models/products/product-new-model";
import AppFooter from "../layout/AppFooter";

const ProductsCard = lazy(() => import("./products-card"));
const SelectedCategories = lazy(() => import("./selected-categories"));
const CategoryLeftViewNew = lazy(() => import("./category-left-view-new"));

interface FilterState {
  [key: string]: {
    checked: boolean;
    partialChecked: boolean;
  };
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductNewModel[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductNewModel[]>(
    []
  );
  const [categoriesNew, setCatergoriesNew] = useState<TreeNodeModel[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<FilterState>({});
  const [selectedCategoriesNew, setSelectedCategoriesNew] = useState<
    TreeNodeModel[]
  >([]);
  const [isDivVisible, setIsDivVisible] = useState(false);

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };

  useEffect(() => {
    CategoryService.getAllCategories().then((response) => {
      setCatergoriesNew(mapSourceToTarget(response));
    });

    ProductService.getAllProducts().then((response) => {
      setProducts(response);
      setFilteredProducts(response);
    });
  }, []);

  const handleSearch = (query: any) => {
    const terms = query?.toLowerCase().split(" ");

    const filteredResults = products.filter((item) => {
      return terms.some((term: any) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(term)
        )
      );
    });
    setFilteredProducts(filteredResults);
  };

  const topCategorySelect = (category: TreeNodeModel) => {
    const initFilterState: FilterState = {
      [category.key]: { checked: true, partialChecked: false },
      ...(category.children?.reduce((acc, child) => {
        acc[child.key] = { checked: true, partialChecked: false };
        return acc;
      }, {} as FilterState) || {}),
    };

    setSelectedKeys(initFilterState);
  };

  const removeChipCategory = (category: TreeNodeModel) => {
    // const updatedCategories = selectedCategoriesNew.filter(
    //   (cat) => cat.key !== category.key
    // );
    // if (updatedCategories.length > 0) {
    //   setSelectedKeys({});
    //   for (let i = 0; i < updatedCategories.length; i++) {
    //     const initFilterState: FilterState = {
    //       [category.key]: { checked: true, partialChecked: false },
    //       ...(category.children?.reduce((acc, child) => {
    //         acc[child.key] = { checked: true, partialChecked: false };
    //         return acc;
    //       }, {} as FilterState) || {}),
    //     };
    //     setSelectedKeys({ ...initFilterState });
    //   }
    // } else {
    //   setSelectedKeys({});
    // }
  };

  const template = (options: any) => {
    const className = `${options.className} justify-content-start`;

    return (
      <>
        <div className={className}>
          <div className="p-inputgroup flex-1 filter-wrap">
            {selectedCategoriesNew.length > 0 ? (
              <>
                <label>Active Filters: </label> {/* LT */}
                <SelectedCategories
                  categoriesData={selectedCategoriesNew}
                  topCategorySelect={removeChipCategory}
                />
              </>
            ) : null}
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    filterProducts();
  }, [selectedKeys]);

  const filterProducts = () => {
    const isObjectEmpty = Object.keys(selectedKeys).length === 0;
    if (isObjectEmpty) {
      setFilteredProducts(products);
      setSelectedCategoriesNew([]);
    } else {
      if (selectedKeys) {
        const filteredProductsList = products.filter((product) => {
          const categoryKey = `${product.categoryID} - Category`;
          const subCategoryKey = `${product.subCategoryID} - SubCategory`;

          return (
            (selectedKeys[categoryKey]?.checked ||
              selectedKeys[categoryKey]?.partialChecked) &&
            (selectedKeys[subCategoryKey]?.checked ||
              selectedKeys[subCategoryKey]?.partialChecked)
          );
        });
        setFilteredProducts(filteredProductsList);
        const selectedCategories = categoriesNew.filter((cat) => {
          return selectedKeys[cat.key];
        });
        setSelectedCategoriesNew(selectedCategories);
      }
    }
  };

  const clearFilters = () => {
    setSelectedCategoriesNew([]);
    setSelectedKeys({});
  };

  return (
    <>
      <Suspense fallback={<AppLoading />}>
        <div className="grid layout-content">
          <div className="col-12">
            {categoriesNew.length > 0 ? (
              <CategoryTopView
                categoriesData={categoriesNew}
                topCategorySelect={topCategorySelect}
                data={products}
                onSearch={handleSearch}
              />
            ) : null}
          </div>

          <div className="col-12 flex xs">
            {/* visible only on large view */}
            <div
              className={
                isDivVisible
                  ? "xs-hide flex-none sidebar expand"
                  : "xs-hide flex-none sidebar"
              }
            >
              <button
                type="button"
                className="toggle-btn"
                onClick={toggleDivVisibility}
              >
                <span>&#x203A;&#x203A;</span>
              </button>
              {/* <div className={isDivVisible ? 'relative col-12 sm:col-12 lg:col-3 xl:col-2' : 'relative'}> */}
              <div className={isDivVisible ? "w-full" : "w-full"}>
                {isDivVisible && (
                  <div className="categories-wrap">
                    {categoriesNew.length > 0 ? (
                      <CategoryLeftViewNew
                        categoriesDataLeft={categoriesNew}
                        selectedKeys={selectedKeys}
                        setSelectedKeys={setSelectedKeys}
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            {/* visible only on mobile view */}
            <div className="xs-view">
              <div className="w-full">
                <div className="categories-wrap">
                  {categoriesNew.length > 0 ? (
                    <CategoryLeftViewNew
                      categoriesDataLeft={categoriesNew}
                      selectedKeys={selectedKeys}
                      setSelectedKeys={setSelectedKeys}
                    />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex-grow-1 flex">
              {/* <div className={isDivVisible ? 'col-12 sm:col-12 lg:col-9 xl:col-10' : 'col-12 sm:col-12 lg:col-12 xl:col-12'}> */}
              <div className="w-full">
                <div className="grid">
                  <div className="col-9 sm-9 lg:col-9 xl:col-9">
                    <span className="info-text pb-2">
                      There are{" "}
                      {filteredProducts.length > 0
                        ? filteredProducts.length
                        : 0}{" "}
                      products.
                    </span>
                  </div>
                  <div className="col-3 sm-3 lg:col-9 xl:col-3 text-right">
                    {Object.keys(selectedKeys).length !== 0 ? (
                      <Button
                        label="Clear Filters"
                        icon="pi pi-filter-slash"
                        link
                        onClick={clearFilters}
                      />
                    ) : null}
                  </div>
                </div>

                <Panel headerTemplate={template}>
                  {filteredProducts.length > 0 ? (
                    <ProductsCard productsData={filteredProducts} />
                  ) : null}
                </Panel>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </Suspense>
    </>
  );
};

export default Products;
