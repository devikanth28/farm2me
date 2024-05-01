import ProductStorageHelpers from "../../utils/product-local-storage-wrapper";

export const CourierTinCriteria = () => {
  const orderedData = ProductStorageHelpers.GetProcessedProductStorage();
  let result = false;
  orderedData.items.map((item: any) => {
    if (item.name.endsWith("- Tin")) {
      result = true;
    }
  });
  return result;
};
