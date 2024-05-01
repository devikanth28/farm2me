import { Tree } from "primereact/tree";
import { Accordion, AccordionTab } from "primereact/accordion";

const CategoryLeftViewNew = ({
  categoriesDataLeft,
  selectedKeys,
  setSelectedKeys,
}: any) => {
  return (
    <>
      <Accordion>
        <AccordionTab header="Category" >
          <Tree
            style={{ fontSize: 12 }}
            value={categoriesDataLeft}
            filter
            filterMode="strict"
            selectionMode="checkbox"
            selectionKeys={selectedKeys}
            onSelectionChange={(e) => setSelectedKeys(e.value)}
          />
        </AccordionTab>
      </Accordion>
    </>
  );
};

export default CategoryLeftViewNew;
