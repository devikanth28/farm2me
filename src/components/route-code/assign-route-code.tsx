import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import routeCodeServices from '../../services/route-codes/routecode.service';
import RouteCodeSearch from './route-code-search';
import RouteCodeDataTable from './route-code-datatable';
import { useTranslation } from 'react-i18next';
import { RouteCodeUser } from '../../models/route-code/routecode-model';

const AssignRouteCode: React.FC = () => {
    
    const { t } = useTranslation();
    const [userList, setUserList] = useState<RouteCodeUser[]>([]);

    function handleExport(): void {
        throw new Error('Function not implemented.');
    }

    useEffect(() => {              
        handleSearch('?$filter=routeCodeID eq 0');
    }, []);

    function handleSearch(query: string): void {
        routeCodeServices.getUsers(query).then((response: any) => {
            const sortedData = [...response].sort((a, b) => b.userAddressID - a.userAddressID);
            setUserList(sortedData);
        });
    }
    
    return (
        <>
        <div className="layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col-12">                
                <div className="flex align-items-center justify-content-between flex-wrap gap-2 w-full card-container mb-0">
                    <h5 className="ml-1 mb-0">{t('assignRouteCode_head')}</h5>
                    <div className="flex align-items-center flex-wrap gap-2">
                        <div className="mr-1">
                            <Button className="text-black border-round mr-2" icon="pi pi-print" severity="secondary" text raised> Print</Button>
                            <Button className="text-black border-round" onClick={handleExport} icon="pi pi-file-export" severity="secondary" text raised> Export</Button>
                        </div>
                    </div>
                </div>
            </div>
            <RouteCodeSearch onSearch={handleSearch} />            
            <RouteCodeDataTable data={userList} />
        </div>
        </>
    );
}

export default AssignRouteCode;