import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";

const CategoryLeftView = ({
  categoriesDataLeft,
  selectedCategories,
  setSelectedCategories,
  rowClick,
}: any) => {
  const { t } = useTranslation();

  return (
    <>
      {categoriesDataLeft ? (
        <div className="left-filter">
          <DataTable
            value={categoriesDataLeft}
            size="small"
            // selectionMode= { rowClick ? null : 'checkbox' }
            selection={selectedCategories}
            onSelectionChange={(e: any) => setSelectedCategories(e.value)}
            dataKey="id"
            tableStyle={{ minWidth: "3rem" }}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="name"
              header="Category"
              sortable
              filter
              filterPlaceholder={t("common_search_placeholder")}
            />
          </DataTable>
        </div>
      ) : null}
    </>
  );
};

export default CategoryLeftView;
