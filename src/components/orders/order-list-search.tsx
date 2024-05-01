import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { StateModel } from '../../models/state-model';
import { CityModel } from '../../models/city-model';
import { InvoiceUserModel, userOption, userResult, RouteCodeModel } from '../../models/orders/order-list-model';
import { Dropdown, DropdownChangeEvent, DropdownFilterEvent } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { reportTypes, statusTypes } from '../../services/order/order-list.-mock';
import UserAddressService from '../../services/useraddress/useraddress.service';
import orderServices from '../../services/orders/orderservice';
import routeCodeServices from '../../services/route-codes/routecode.service';

interface SearchPanelProps {
  onSearch: (query: string) => void;
}

const OrderListSearch: React.FC<SearchPanelProps> = ({ onSearch }) => {

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const [selectedDateRange, setSelectedDateRange] = useState<any>([yesterday, today]);
    const [cities, setCities] = useState<StateModel[]>([]);
    const [states, setStates] = useState<CityModel[]>([]);
    const [invoiceUsers, setInvoiceUsers] = useState<InvoiceUserModel[]>([]);
    const [voucherNo, setVoucherNo] = useState("");
    const [voucherType, setVoucherType] = useState("Order");
    const [searchStatus, setSearchStatus] = useState("");
    const [searchInvoiceBy, setSearchInvoiceBy] = useState("");
    const [searchState, setSearchState] = useState("");
    const [searchCity, setSearchCity] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>();
    const blankUserDetail: userOption[] = [{ userID: 0, name: '', primaryContactNbr: ''},];
    const [orderUsers, setOrderUsers] = useState<userOption[]>(blankUserDetail);
    const [orderUser, setOrderUser] = useState<userResult[]>([]);
    const [routeCodes, setRouteCodes] = useState<RouteCodeModel[]>([]);
    const [searchRouteCode, setSearchRouteCode] = useState("");

    const FetchStates = (countryId: number) => {
        UserAddressService.getStates(countryId).then(r =>  setStates(r));
    }
    
    const FetchCities = (stateId: number) => {
        UserAddressService.getCities(stateId).then(r =>  setCities(r));
    }

    const FetchInvoiceUsers = () => {
        UserAddressService.getInvoiceUsers().then(r =>  setInvoiceUsers(r));
    }

    const FetchRouteCodes = () => {
        routeCodeServices.getRouteCodes().then(r =>  setRouteCodes(r));
    }

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

    useEffect(() => {
        FetchStates(1);
        FetchInvoiceUsers();
        FetchRouteCodes();
        const searchFilter: string = "?$filter=createdDate ge " + selectedDateRange[0].toISOString().substr(0, 10) + " and createdDate le " + selectedDateRange[1].toISOString().substr(0, 10);
        onSearch(searchFilter);
    }, []);

    useEffect(() => {              
        setOrderUser(orderUsers.map((user) => ({
            userID: user.userID,
            detail: `${user.name}, ${user.primaryContactNbr}`,
        })));
    }, [orderUsers]);

    const handleSearch = () => {
        let searchFilter: string = "?$filter=true";
        if(selectedDateRange[0] && selectedDateRange[1]) {
            const startDate = selectedDateRange[0].toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );
            const endDate = selectedDateRange[1].toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' );
            if(voucherType==='Invoice'){
                searchFilter = searchFilter + " and invoiceDate ge " + startDate + " and invoiceDate le " + endDate;
            }
            else {
                searchFilter = searchFilter + " and createdDate ge " + startDate + " and createdDate le " + endDate;
            }
        }
        if(searchState && searchState.length > 0) {
            if(searchCity && searchCity.length > 0) {
                searchFilter = searchFilter + " and cityID in (" + searchCity + ")";
            }
            else {
                searchFilter = searchFilter + " and stateID in (" + searchState + ")";
            }
        }
        if(searchInvoiceBy && searchInvoiceBy.length > 0) {
            searchFilter = searchFilter + " and invoiceBy in (" + searchInvoiceBy + ")";
        }
        if(searchStatus && searchStatus.length > 0) {
            searchFilter = searchFilter + " and orderStatusID in (" + searchStatus + ")";
        }
        if(voucherNo) {
            if(voucherType==='Order'){
                searchFilter = searchFilter + " and orderID in (" + voucherNo + ")";
            }
            else{
                searchFilter = searchFilter + " and invoiceNumber in (" + voucherNo + ")";
            }            
        }
        if(selectedUser) {
            searchFilter = searchFilter + " and userID eq " + selectedUser;
        }
        onSearch(searchFilter);        
    }    

    const resetSearchFields = () => {
        setOrderUsers(blankUserDetail);
        setSelectedUser(null);
        setSearchState("");
        setSearchCity("");
        setVoucherNo("");
        setVoucherType("Order");
        setSearchStatus("");
        setSearchInvoiceBy("");
        setSelectedDateRange("");
        setSearchRouteCode("");
    }

    return (
        <div className="col-12">
            <div className="card border-noround p-2" style={{ minHeight: '9rem'}}>
                <div className="font-bold text-white border-round" style={{ float: "left", width: "25%" }}>
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
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "25%" }}>
                    <MultiSelect
                        id="status"
                        name="status"
                        options={statusTypes}
                        optionLabel="name"
                        optionValue="id"
                        value={searchStatus}
                        display="chip"
                        onChange={(e) => setSearchStatus(e.target.value)}
                        placeholder="Choose Status" style={{ width: "100%" }}
                    />
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "25%" }}>
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
                <br /><br />                        
                <div className="font-bold text-white border-round"  style={{ float: "left", width: "25%" }}>
                    <MultiSelect
                        id="State"
                        name="State"
                        options={states}
                        optionLabel="name"
                        optionValue="stateID"
                        value={searchState}
                        display="chip"
                        onChange={(e) => {setSearchState(e.target.value); FetchCities(e.target.value);}}
                        placeholder="Choose State" style={{ width: "100%" }}
                    />
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "25%" }}>
                    <MultiSelect
                        id="city"
                        name="city"
                        options={cities}
                        optionLabel="name"
                        optionValue="cityID"
                        value={searchCity}
                        display="chip"
                        onChange={(e) => setSearchCity(e.target.value)}
                        placeholder="Choose City" style={{ width: "100%" }}
                    />
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "25%" }}>
                    <MultiSelect
                        id="invoiceBy"
                        name="invoiceBy"
                        options={invoiceUsers}
                        optionLabel="name"
                        optionValue="userID"
                        value={searchInvoiceBy}
                        display="chip"
                        onChange={(e) => setSearchInvoiceBy(e.target.value)}
                        placeholder="Invoice By" style={{ width: "100%" }}
                    />
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", textAlign:'center', width: "23%" }}>
                    <Button className=" text-black border-round" style={{ width: "50%", textAlign:'center' }} onClick={handleSearch} severity="success">Filter</Button>
                </div>
                <br /><br />
                <div className="font-bold text-white border-round" style={{ float: "left", width: "25%" }}>
                    <Dropdown
                        id="reportType"
                        name="reportType"
                        options={reportTypes}
                        optionLabel="name"
                        optionValue="name"
                        value={voucherType}
                        onChange={(e) => setVoucherType(e.target.value)}
                        placeholder="Report Type" style={{ width: "100%" }}
                    />
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "25%" }}>
                    <InputText
                        id="OrderNo"
                        name="OrderNo"
                        value={voucherNo}
                        onChange={(e) => setVoucherNo(e.target.value)}
                        placeholder={voucherType + "#"} style={{ width: "100%" }}
                    />
                </div>                        
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", width: "25%" }}>
                    <Calendar value={selectedDateRange}  onChange={(e) => setSelectedDateRange(e.value)} 
                    selectionMode="range" dateFormat="dd/mm/yy" style={{ width: "100%" }} 
                    placeholder="start date - end date"/>
                </div>
                <div className="font-bold text-white border-round ml-2" style={{ float: "left", textAlign:'center', width: "23%" }}>
                    <Button className="text-black border-round" style={{ width: "50%", textAlign:'center' }} onClick={resetSearchFields} severity="secondary" text raised>Reset</Button>
                </div>
            </div>
        </div>
    );
};
export default OrderListSearch;