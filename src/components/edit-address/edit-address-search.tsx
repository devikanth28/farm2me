import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { userOption, userResult } from '../../models/orders/order-list-model';
import { Dropdown, DropdownChangeEvent, DropdownFilterEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';
import orderServices from '../../services/orders/orderservice';

interface SearchPanelProps {
  onSearch: (query: string) => void;
  onLocalFilter: (keyword: string) => void;
}

const EditAddressSearch: React.FC<SearchPanelProps> = ({ onSearch, onLocalFilter }) => {

    const { t } = useTranslation();
    const [selectedUser, setSelectedUser] = useState<any>();
    const blankUserDetail: userOption[] = [{ userID: 0, name: '', primaryContactNbr: ''},];
    const [orderUsers, setOrderUsers] = useState<userOption[]>(blankUserDetail);
    const [orderUser, setOrderUser] = useState<userResult[]>([]);
    
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
        onSearch(searchFilter);      
    }

    const resetSearchFields = () => {
        setOrderUsers(blankUserDetail);
        setSelectedUser(null);
    }

    return (
        <div className="col-12">
            <div className="card border-noround p-2" style={{ minHeight: '3.5rem'}}>
                <div className="font-bold text-white border-round" style={{ float: "left", width: "18%" }}>
                    <div className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type='search' onChange={(e) => onLocalFilter(e.target.value)} placeholder="Keyword Search" style={{ width: "100%" }} />
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
export default EditAddressSearch;