import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import orderServices from '../../services/orders/orderservice';
import {OrderModel} from '../../models/orders/order-list-model';
import InvoicesSearch from './invoices-search';
import InvoicesDataTable from './invoices-datatable';

const GenerateInvoice = () => {

    const { t } = useTranslation();
    const [orderList, setOrderList] = useState<OrderModel[]>([]);
    var queryText: string = "";
    var openOrderFlag: boolean = true;

    function handleSearch(query: string, openOrder: boolean): void {
        queryText = query;
        openOrderFlag = openOrder;
        orderServices.getOrders(query).then((response: OrderModel[]) => {
            const sortedData = [...response].sort((a, b) => b.orderID - a.orderID);
            if(openOrder) {
                const filteredData = sortedData.filter((order) => order.orderDetail.some((item) => item.pendingQuantity > 0));
                setOrderList(filteredData);
            }
            else   
                setOrderList(sortedData);
        });
    }

    return (
        <div className="layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col-12">                
                <div className="flex align-items-center justify-content-between flex-wrap gap-2 w-full card-container mb-0">
                    <h5 className="ml-1 mb-0">{t("generateInv_header")}</h5>
                </div>
            </div>
            <InvoicesSearch onSearch={handleSearch} />
            <InvoicesDataTable query={queryText} openOrder={openOrderFlag} onSearch={handleSearch} data={orderList} />
        </div>
    );
};
export default GenerateInvoice;