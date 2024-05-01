import { useState } from 'react';
import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';
import {OrderModel} from '../../models/orders/order-list-model';
import myOrderServices from '../../services/orders/myorder.service';
import MyOrderDataTable from './my-order-datatable';

const MyOrderList = () => {

    const { t } = useTranslation();
    const [orderList, setOrderList] = useState<OrderModel[]>([]);
    
    function handleSearch(query: string): void {
        myOrderServices.getMyOrders(query).then((response: any) => {
            if(response?.length > 0){
                const sortedData = [...response].sort((a, b) => b.orderID - a.orderID);
                setOrderList(sortedData);
            }
            else
                setOrderList([]);
        });
    }

    return (
        <div className="layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col-12">                
                <div className="flex align-items-center justify-content-between flex-wrap gap-2 w-full card-container mb-0">
                    <h5 className="ml-1 mb-0">{t('myOrders_myOrders')}</h5>                    
                </div>
            </div>
            <MyOrderDataTable onSearch={handleSearch} data={orderList} />
        </div>
    );
};
export default MyOrderList;