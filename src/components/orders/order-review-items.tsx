import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Helpers from "../../utils/helpers";

const OrderReviewItems = (props: any) => {
  const imageBodyTemplate = (item: any) => {
    return (
      <img
        src={
          item.url === undefined
            ? process.env.PUBLIC_URL +
              "/assests/images/Desiri-Groundnut-Oils.png"
            : item.url
        }
        alt=""
        width="30%"
      />
    );
  };

  const unitPriceBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(product.unitPrice);
  };

  const taxableAmountBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(product.taxableAmount);
  };

  const taxAmountBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(product.taxAmount);
  };

  const grossAmountBodyTemplate = (product: any) => {
    return Helpers.formatAmountInINR(product.grossAmount);
  };

  return (
    <>
      <DataTable
        value={props.orderedItems.orderDetail}
        tableStyle={{ minWidth: "50rem" }}
        size="small"
      >
        <Column
          field="productName"
          style={{ width: "30%" }}
          header="Name"
        ></Column>
        <Column style={{ width: "15%" }} body={imageBodyTemplate}></Column>
        <Column
          field="unitPrice"
          header="Price"
          body={unitPriceBodyTemplate}
          bodyStyle={{ textAlign: "right" }}
        ></Column>
        <Column
          field="quantity"
          header="Quantity"
          bodyStyle={{ textAlign: "right" }}
        ></Column>
        <Column
          field="taxableAmount"
          header="Amount"
          body={taxableAmountBodyTemplate}
          bodyStyle={{ textAlign: "right" }}
        ></Column>
        <Column
          field="taxAmount"
          header="Tax"
          body={taxAmountBodyTemplate}
          bodyStyle={{ textAlign: "right" }}
        ></Column>
        <Column
          field="grossAmount"
          header="Total Amount"
          body={grossAmountBodyTemplate}
          bodyStyle={{ textAlign: "right" }}
        ></Column>
      </DataTable>
    </>
  );
};

export default OrderReviewItems;
