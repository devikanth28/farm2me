import { DataTable, DataTableRowEditCompleteEvent} from "primereact/datatable";
import { useEffect, useState } from "react";
import { RouteCodeModel } from "../../models/orders/order-list-model";
import { useTranslation } from "react-i18next";
import { Column} from "primereact/column";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import routeCodeServices from "../../services/route-codes/routecode.service";
import { AssignCode, RouteCodeUser } from "../../models/route-code/routecode-model";

interface DataTableProps {
  data: RouteCodeUser[];
}

const RouteCodeDataTable: React.FC<DataTableProps> = (props) => {

    const { t } = useTranslation();
    const [routeCodes, setRouteCodes] = useState<RouteCodeModel[]>([]);
    const [userData, setUserData] = useState<RouteCodeUser[]>([]);
    
    const FetchRouteCodes = () => {
        routeCodeServices.getRouteCodes().then(r =>  setRouteCodes(r));        
    }
    useEffect(() => {
        setUserData(props.data);
        FetchRouteCodes();
    }, [props.data]);
    
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _data = [...userData];
        let newData = e.newData as RouteCodeUser;
        let index = e.index;
        if(_data[index] !== newData) {
            newData.routeCodeID = parseInt(newData.routeCodeName);
            let routeCode = routeCodes.find(x=> x.routeCodeID === newData.routeCodeID) as RouteCodeModel;
            newData.routeCodeName = routeCode.name;
            let putData = {userAddressID: newData.userAddressID, routeCodeID: newData.routeCodeID} as AssignCode
            routeCodeServices.assignRouteCode(putData);
            _data[index] = newData;
            setUserData(_data);
        }
    };    

    const routeCodeEditor = (options: any) => {
        return (
            <Dropdown className='border-1 border-primary'
            value={options.value} 
            options={routeCodes} 
            optionLabel="name" 
            optionValue="routeCodeID"
            onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
            style={{ textAlign: 'right', width: '8em'}}  />
        );
    };

    return (
        <>
        <div className="col-12">
            <div className="card border-noround p-2">                
                <DataTable value={userData.length>0?userData:props.data} editMode="row" onRowEditComplete={onRowEditComplete} > 
                    <Column field="primaryContactNbr" header={t('assignRouteCode_mobileno')} />
                    <Column field="userName" header={t('assignRouteCode_userName')} />
                    <Column field="address1" header={t('assignRouteCode_address')} />
                    <Column field="cityName" header={t('assignRouteCode_city')} />
                    <Column field="stateName" header={t('assignRouteCode_state')} />
                    <Column field="routeCodeName" header={t('assignRouteCode_routecode')} editor={(options) => routeCodeEditor(options)} style={{ textAlign: 'right', width: '8em'}} />
                    <Column header={t('assignRouteCode_action')} rowEditor headerStyle={{ minWidth: '6rem', textAlign: 'right' }} bodyStyle={{ textAlign: 'left' }}></Column>                
                </DataTable>
            </div>
        </div>
        </>
    )
};
export default RouteCodeDataTable;