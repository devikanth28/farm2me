import { Button } from "primereact/button";
import CreateInvoiceItems from "./create-inv-items";
import CreateInvoiceTop from "./create-inv-top";
import { useState } from "react";
import { InvoiceCheckoutModel } from "../../models/invoice/invoice-checkout-model";

const CreateInvoice = (props: any) => {

  const [invoiceCheckoutItem, setInvoiceCheckoutItem] = useState<InvoiceCheckoutModel | any>();
  
  const handleCreateInvoice = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try
    {
      await props.runCreateInvoice(event, invoiceCheckoutItem);
      props.runHideDialog();
    }
    catch
    {
      props.runShowMessage(event, 'Invoice not generated', 'error');
    }    
  };

  const updateItem = (newItems: any, taxableAmt: number, taxAmt: number) => {    
    setInvoiceCheckoutItem({...props.OrderData, orderDetail: newItems, taxableAmount: Math.round(taxableAmt*100)/100, taxAmount: Math.round(taxAmt*100)/100 });
  };
  
  return (
    <>
      <div className="flex flex-column border-1 surface-border box-shadow-none m-0">
        <CreateInvoiceTop orderData={props.OrderData} />
        <CreateInvoiceItems orderedItems={props.OrderData} updateItems={updateItem}/>   
      </div>      
      <Button label="Generate Invoice" className="border-round mt-2 ml-2" onClick={(e) => {handleCreateInvoice(e)} } style={{ float:'right', width: "20%", textAlign:'center' }} severity="success"/>
      <Button label="Close" className="border-round mt-2" onClick={props.runHideDialog} style={{ float:'right', width: "20%", textAlign:'center' }} severity="warning"/>
    </>
  );
};

export default CreateInvoice;