import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";

export const CourierVasselBottolsCriteria = () => {
  const orderedData = ProductStorageHelpers.GetProcessedProductStorage();
  let result = false;
  orderedData.items.map((item: any) => {
    if (item.name.endsWith("- Bottle") || item.name.endsWith("- Vessel")) {
      result = true;
    }
  });
  return result;
};
