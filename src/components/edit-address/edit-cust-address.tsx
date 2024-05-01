import React, { useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import EditAddressSearch from './edit-address-search';
import EditAddressDataTable from './edit-address-datatable';
import customerAddressService from '../../services/edit-address/cust-address.service';
import { CustomerAddressModel } from '../../models/cust-address/cust-address-model';

const CustomerAddress: React.FC = () => {
    
    const { t } = useTranslation();
    const [userList, setUserList] = useState<CustomerAddressModel[]>([]);
    const [localFilter, setLocalFilter] = useState<string>(" ");

    useEffect(() => {              
        handleSearch("");
    }, []);

    function handleSearch(query: string): void {
        customerAddressService.getAddress(query).then((response: any) => {
            const sortedData = [...response].sort((a, b) => b.userID - a.userID);
            setUserList(sortedData);
        });
    }

    function handleLocalFilter(keyword: string): void {
        setLocalFilter(keyword);
    }
    
    return (
        <>
        <div className="layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col-12">                
                <h5 className="ml-1 mb-0">{t('edit_address_head')}</h5>
            </div>
            <EditAddressSearch onSearch={handleSearch} onLocalFilter={handleLocalFilter} />            
            <EditAddressDataTable data={userList} filter={localFilter} />
        </div>
        </>
    );
}

export default CustomerAddress;