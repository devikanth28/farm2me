import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { ProductsModel } from "../../models/products-model";
import { ProductSeverity } from "./product-severity";

export const ListItems = (product: ProductsModel) => {
  return (
    <div className="col-12">
      <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
        <img
          className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
          src={
            product.media.length > 0
              ? product.media[0]
              : "../assests/images/Desiri-Groundnut-Oils.png"
          }
          alt={product.name}
        />
        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
          <div className="flex flex-column align-items-center sm:align-items-start gap-3">
            <div className="text-1xl font-bold text-900">{product.name}</div>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
            <div className="flex align-items-center gap-3">
              <span className="flex align-items-center gap-2">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">{product.categoryName}</span>
              </span>
              <Tag value="INSTOCK" severity="info"></Tag>
            </div>
          </div>
          <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
            <span className="text-1xl font-semibold">${product.unitPrice}</span>
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              disabled={product.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
