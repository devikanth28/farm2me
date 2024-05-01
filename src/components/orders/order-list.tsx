import { useState } from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import OrderListDataTable from './order-list-datatable';
import OrderListSearch from './order-list-search';
import orderServices from '../../services/orders/orderservice';
import {OrderModel} from '../../models/orders/order-list-model';
import * as XLSX from 'xlsx';

const OrderList = () => {

    const { t } = useTranslation();
    const [orderList, setOrderList] = useState<OrderModel[]>([]);

    const itemWiseData = () => {
        var flatData: any = [];
        orderList?.forEach((order) => {
            order.orderDetail.forEach((product)=> {
                flatData.push({ 
                    'Order#': order.orderID, 
                    'Order Date': new Date(order.createdDate).toLocaleDateString('en-gb'),
                    'Order Status': product.orderStatusName,
                    'Invoice#': (order.orderInvoice.length>0) ? order.orderInvoice[0].invoiceNo : "",
                    'Invoice Date': (order.orderInvoice.length>0 ) ? new Date(order.orderInvoice[0].createdDate).toLocaleDateString('en-gb'):"",
                    'User Name': order.userName,
                    'Mobile#': order.primaryContactNbr,
                    'Address': order.address1 + " " + order.address2 + " " + order.landmark + " Pin-" + order.zipcode,
                    'City': order.cityName,
                    'State': order.stateName,
                    'Route Code': order.routeCodeName,
                    'GPS Location': order.gpsLocation,
                    'GST #': order.gsT_Number,
                    'Main Category': product.categoryName,
                    'Sub Category': product.subCategoryName,
                    'HSN Code': product.hsN_Code,
                    'Product Name': product.productName,
                    'Unit_Price': product.unitPrice,              
                    'Order Qty': product.quantity,
                    'Invoice Qty': product.quantity - product.pendingQuantity,
                    'Pending Qty': product.pendingQuantity,
                    'UOM': product.measurementTypeName,
                    'Total_Amount': product.taxableAmount,
                    'GST': product.gst,
                    'Tax_Amount': product.taxAmount,
                    'Gross_Amount': product.grossAmount,
                    'Courier Provider': order.courierProviderName,
                    'Tracking #': product.trackingID,
                    'Payment Type': order.paymentModeName,
                    'Payment Status': order.paymentStatus                  
                })
            })
        });
        return flatData;
    }    

    const handleExport = () => {
        const itemsData = itemWiseData();           
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(itemsData);

        ws['R'] = { t: 's', v: 'Price', s: { font: { bold: true } } };
        ws['W'] = { t: 's', v: 'Amount', s: { font: { bold: true } } };
        ws['X'] = { t: 's', v: 'Tax %', s: { font: { bold: true } } };
        ws['Y'] = { t: 's', v: 'Tax Amount', s: { font: { bold: true } } };
        ws['Z'] = { t: 's', v: 'Gross Amount', s: { font: { bold: true } } };
        
        for (let r = 2; r <= itemsData.length + 1; r++) {
        const cellPrice = `R${r}`;
        const cellAmount = `W${r}`;
        const cellTaxPr = `X${r}`;
        const cellTaxAmt = `Y${r}`;
        const cellGross = `Z${r}`;
        const formattedPrice = `${itemsData[r - 2].Unit_Price.toFixed(2)}`;
        const formattedAmount = `${itemsData[r - 2].Total_Amount.toFixed(2)}`;
        const formattedTaxPr = `${itemsData[r - 2].GST.toFixed(2)}`;
        const formattedTaxAmt = `${itemsData[r - 2].Tax_Amount.toFixed(2)}`;
        const formattedGross = `${itemsData[r - 2].Gross_Amount.toFixed(2)}`;
        ws[cellPrice] = { t: 'n', v: formattedPrice, z: '#,##0.00' };
        ws[cellAmount] = { t: 'n', v: formattedAmount, z: '#,##0.00' };
        ws[cellTaxPr] = { t: 'n', v: formattedTaxPr, z: '#,##0.00' };
        ws[cellTaxAmt] = { t: 'n', v: formattedTaxAmt, z: '#,##0.00' };
        ws[cellGross] = { t: 'n', v: formattedGross, z: '#,##0.00' };
        }
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'OrderList.xlsx');
    }

    function handleSearch(query: string): void {
                orderServices.getOrders(query).then((response: any) => {
            const sortedData = [...response].sort((a, b) => b.orderID - a.orderID);
            setOrderList(sortedData);
        });
    }

    return (
        <div className="layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col-12">                
                <div className="flex align-items-center justify-content-between flex-wrap gap-2 w-full card-container mb-0">
                    <h5 className="ml-1 mb-0">{t("orderlist_header")}</h5>
                    <div className="flex align-items-center flex-wrap gap-2">
                        <div className="mr-1">
                            <Button className="text-black border-round mr-2" icon="pi pi-print" severity="secondary" text raised> Print</Button>
                            <Button className="text-black border-round" onClick={handleExport} icon="pi pi-file-export" severity="secondary" text raised> Export</Button>
                        </div>
                    </div>
                </div>
            </div>
            <OrderListSearch onSearch={handleSearch} />            
            <OrderListDataTable data={orderList} />
        </div>
    );
};
export default OrderList;