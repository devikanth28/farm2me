import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { userOption, userResult, RouteCodeModel } from '../../models/orders/order-list-model';
import { Dropdown, DropdownChangeEvent, DropdownFilterEvent } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import orderServices from '../../services/orders/orderservice';
import routeCodeServices from '../../services/route-codes/routecode.service';

interface SearchPanelProps {
  onSearch: (query: string) => void;
}

const RouteCodeSearch: React.FC<SearchPanelProps> = ({ onSearch }) => {

    const { t } = useTranslation();
    const [selectedUser, setSelectedUser] = useState<any>();
    const blankUserDetail: userOption[] = [{ userID: 0, name: '', primaryContactNbr: ''},];
    const [orderUsers, setOrderUsers] = useState<userOption[]>(blankUserDetail);
    const [orderUser, setOrderUser] = useState<userResult[]>([]);
    const [routeCodes, setRouteCodes] = useState<RouteCodeModel[]>([]);
    const [searchRouteCode, setSearchRouteCode] = useState("");
    
    const FetchRouteCodes = () => {
        routeCodeServices.getRouteCodes().then(response =>  {            
            const result = [{routeCodeID:0, name:'Not Assigned'}, ...response];
            setRouteCodes(result);
        });      
    }

    useEffect(() => {
        FetchRouteCodes();
    }, []);

    useEffect(() => {              
        setOrderUser(orderUsers.map((user) => ({
            userID: user.userID,
            detail: `${user.name}, ${user.primaryContactNbr}`,
        })));
    }, [orderUsers]);    

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        setSelectedUser(e.value);
    }    

    const handleDropdownFilter = (e: DropdownFilterEvent) => {
        if(e.filter.length>2){
            orderServices.getOrderUsers(e.filter).then((response: userOption[]) => {
                if(response.length>0){
                    setOrderUsers(response)
                }        
            })
        }
    }

    const handleSearch = () => {
        let searchFilter: string = "?$filter=true";
        if(selectedUser) {
            searchFilter = searchFilter + " and userID eq " + selectedUser;
        }
        if(searchRouteCode && searchRouteCode.length > 0) {
            searchFilter = searchFilter + " and routeCodeID in (" + searchRouteCode + ")";
        }        
        onSearch(searchFilter);      
    }    

    const resetSearchFields = () => {
        setOrderUsers(blankUserDetail);
        setSelectedUser(null);
        setSearchRouteCode("");
    }

    return (
        <div className="col-12">
            <div className="card border-noround p-2" style={{ minHeight: '3.5rem'}}>
                <div className="font-bold text-white border-round" style={{ float: "left", width: "18%" }}>
                    <div className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type='search' onChange={(e) => {}} placeholder="Keyword Search" style={{ width: "100%" }} />
                    </div>
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "20%" }}>
                    <Dropdown
                        id="SearchUser"
                        name="SearchUser"                                                      
                        options={orderUser} 
                        optionLabel="detail"
                        optionValue="userID"
                        value={selectedUser}
                        onChange={handleDropdownChange}
                        onFilter={handleDropdownFilter} filter
                        placeholder="Search for User/Mobile" style={{ width: "100%" }}
                    />
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "20%" }}>
                    <MultiSelect
                        id="RouteCode"
                        name="RouteCode"
                        options={routeCodes}
                        optionLabel="name"
                        optionValue="routeCodeID"
                        value={searchRouteCode}
                        display="chip"
                        onChange={(e) => setSearchRouteCode(e.target.value)}
                        placeholder="Choose Route Code" style={{ width: "100%" }}
                    />
                </div>
                <div className="font-bold text-white border-round ml-8" style={{ float: "left", textAlign:'right', width: "10%" }}>
                    <Button className=" text-black border-round" style={{ width: "100%", textAlign:'center' }} onClick={handleSearch} severity="success">Filter</Button>
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", textAlign:'right', width: "10%" }}>
                    <Button className="text-black border-round" style={{ width: "100%", textAlign:'center' }} onClick={resetSearchFields} severity="secondary" text raised>Reset</Button>
                </div>
            </div>
        </div>
    );
};
export default RouteCodeSearch;
