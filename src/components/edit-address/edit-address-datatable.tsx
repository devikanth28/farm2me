import { DataTable, DataTableRowEditCompleteEvent, DataTableRowEditEvent} from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Column, ColumnEditorOptions} from "primereact/column";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Button } from "primereact/button";
import UserDeleteDialog from "./edit-address-delete";
import { Toast, ToastMessage } from "primereact/toast";
import { Tag } from "primereact/tag";
import { CustomerAddressModel, EditAddressModel } from "../../models/cust-address/cust-address-model";
import customerAddressService from "../../services/edit-address/cust-address.service";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { CityModel } from "../../models/city-model";
import { StateModel } from "../../models/state-model";
import UserAddressService from "../../services/useraddress/useraddress.service";
import { Dialog } from "primereact/dialog";
import GetAddressByLocation from "../user-address/location-search/get-location";

interface DataTableProps {
  data: CustomerAddressModel[];
  filter: string;
}

const EditAddressDataTable: React.FC<DataTableProps> = (props) => {

  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [userData, setUserData] = useState<CustomerAddressModel[] | any>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const [cities, setCities] = useState<CityModel[]>([]);
  const [states, setStates] = useState<StateModel[]>([]);
  const [isLocationMapVisible, setIsLocationMapVisible] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const FetchStates = (countryId: number) => {
    UserAddressService.getStates(countryId).then(r =>  setStates(r));
  }

  const FetchCities = (stateId: number) => {
    UserAddressService.getCities(stateId).then(r =>  setCities(r));
  }

  const showMessage = (label: string, message: string, severity: ToastMessage['severity']) => {
    toast.current?.show({ severity: severity, summary: label, detail: message, life: 3000 });
  };

  useEffect(() => {
      setUserData(props.data);
  }, [props.data]);

  useEffect(()=>{
    FetchStates(1);
  },[]);

  const onRowEditInit = async (event: DataTableRowEditEvent) => {
    FetchCities(event.data.stateID);
  }

  const onRowEditComplete = async (event: DataTableRowEditCompleteEvent) => {
    let _data = [...userData];
    let { newData, index } = event;
    if(_data[index] !== newData) {       
      if(typeof newData.stateName === 'number')
      {
        newData.stateID = newData.stateName;
        let stateData: any = states.find(x=> x.stateID === newData.stateID);
        newData.stateName = stateData.name;
      }        
      if(typeof newData.cityName === 'number')
      {
        newData.cityID = newData.cityName;
        let cityData: any = cities.find(x=> x.cityID === newData.cityID)
        newData.cityName = cityData.name;
      }
      let putData: EditAddressModel = {
        userAddressID: newData.userAddressID, 
        userID: newData.userID,
        address1: newData.address1,
        address2: newData.address2,
        landmark: newData.landmark,
        countryID: newData.countryID,
        stateID:  newData.stateID,
        cityID: newData.cityID,
        zipcode: newData.zipcode
      };
      let response = await customerAddressService.updateAddress(putData);
      if(response.isSuccess) {
        showMessage('Update Address','User address updated successfully', 'success');
        _data[index] = newData as CustomerAddressModel;
        setUserData(_data);
      }
      else
      {
        showMessage('Update Address', response.message + ': Error in update address', 'error');
      }     
    }
  };

  const deleteUser = async () => {
    try {
      let response = await customerAddressService.deleteAddress(selectedId);
      if(response.isSuccess) {
        showMessage('Delete Address','Address deleted successfully', 'success');
        const updatedData = updateStatusOnDelete(selectedId);
        setUserData(updatedData);
      }
      else
      {
        showMessage('Delete User', response.message + ': Error in delete user', 'error');
      }
    }
    catch(error) {
      console.error(error);
    }       
  };

  function updateStatusOnDelete(id: number): CustomerAddressModel[] {
    return userData.map((item: CustomerAddressModel) => {
        if (item.userAddressID === id) {
            return { ...item, isDeleted: true };
        }
        return item;
    });
  }

  const otherActionTemplate = (rowData: CustomerAddressModel) => {
    return (
      <div className="flex">
      <Button
        icon="pi pi-trash"
        onClick={() => onRowDelete(rowData)}
        style={{ border: 'none', color: 'gray', background: 'none'}}
        className="p-button-rounded"
      />
      <Button
        icon="pi pi-map-marker"
        onClick={() => {setIsLocationMapVisible(true); setSelectedId(rowData.userAddressID)}}
        style={{ border: 'none', color: 'gray', background: 'none'}}
        className="p-button-rounded ml-1"
      />
      </div>
    )
  }
  
  const onRowDelete = (rowData: CustomerAddressModel) => {
      setSelectedId(rowData.userAddressID);
      setNotifyHeader("Delete Address");
      setNotifyMessage("Are you sure you want to delete this address?");
      setIsNotifyVisible(true); 
  };

  const hideNotifyDialog = (value: boolean) => {
    if (value) {
      deleteUser();      
    }
    setIsNotifyVisible(false);
  };

  const statusBodyTemplate = (rowData: CustomerAddressModel) => {
    return <Tag value={rowData.isDeleted ? "Deleted" : "Active"} severity={getSeverity(rowData.isDeleted)}></Tag>;
  };

  const getSeverity = (value: boolean) => {
    switch (value) {
        case true:
            return 'danger';

        case false:
            return 'info';

        default:
            return null;
    }
  };

  const textEditor = (options: ColumnEditorOptions) => {
    return <InputText type="text" value={options.value} style={{ width: '95%', border:'1px solid #090' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
  };   

  const stateEditor = (options: ColumnEditorOptions) => {
    let editOptionVal = typeof options.value === 'string' ? options.rowData.stateID : options.value;
    return (<Dropdown className='border-1 border-primary' value={editOptionVal} options={states} optionLabel="name" optionValue="stateID"
      style={{ width: '95%' }} onChange={(e: DropdownChangeEvent) => {options.editorCallback!(e.value); FetchCities(e.value)}} />);
  };

  const cityEditor = (options: ColumnEditorOptions) => {
    let editOptionVal = typeof options.value === 'string' ? options.rowData.cityID : options.value;
    return (<Dropdown className='border-1 border-primary' value={editOptionVal} options={cities} optionLabel="name" optionValue="cityID"
      style={{ width: '95%' }} onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)} />);
  };

  const updateLatitudeAndLongitude = (location: string) => {
    if (location) {
      try {
        var locationSplit = location.split(",");
        setLatitude(parseFloat(locationSplit[0]));
        setLongitude(parseFloat(locationSplit[1]));
      } catch {
      }
    }
  }

  const updateGpsLocation = async (latLng: any) => {
    setIsLocationMapVisible(false);
    updateLatitudeAndLongitude(latLng);
    if(latLng && selectedId != null){
      UserAddressService.updateGPSLocation(selectedId, latLng);
    }    
  }

  return (
    <>
    <Toast ref={toast} position="top-center" />  
    <div className="col-12">
        <div className="card border-noround p-2">                
            <DataTable value={userData.length>0?userData:props.data} editMode="row" onRowEditInit={onRowEditInit} onRowEditComplete={onRowEditComplete} paginator
              globalFilter={props.filter || " "} rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100]} 
              paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" currentPageReportTemplate="{first} to {last} of {totalRecords}"> 
                <Column field="userName" header="User Name" style={{ width: '9%' }}/>
                <Column field="primaryContactNbr" header="Mobile #" style={{ width: '8%' }}/>
                <Column field="address1" header="Address line1" editor={textEditor} style={{ width: '12%' }}/>
                <Column field="address2" header="Address line2" editor={textEditor} style={{ width: '12%' }}/>
                <Column field="landmark" header="Landmark" editor={textEditor} style={{ width: '12%' }}/>
                <Column field="stateName" header="State" editor={stateEditor} style={{ width: '12%' }}/>
                <Column field="cityName" header="City" editor={cityEditor} style={{ width: '12%' }}/>
                <Column field="zipcode" header="Pincode" editor={textEditor} style={{ width: '10%' }}/>
                <Column field="isDeleted" header="Status" body={statusBodyTemplate} style={{ width: '6%' }}/>
                <Column rowEditor header={t('assignRouteCode_action')} headerStyle={{ textAlign: 'right' }}/>                  
                <Column body={(options) => otherActionTemplate(options)}/>
            </DataTable>            
        </div>
        <UserDeleteDialog
          messageHeader={notifyHeader}
          notifyMessage={notifyMessage}
          isVisible={isNotifyVisible}
          isHide={hideNotifyDialog}
        />        
    </div>
    <Dialog
        header="Search your location"
        className='location-dialog'
        visible={isLocationMapVisible}
        onHide={() => setIsLocationMapVisible(false)}
        footer={""}
        style={{ width: "50%" }}
      >
        <GetAddressByLocation getLatitudeLongitude={updateGpsLocation} lat={latitude} lng={longitude}></GetAddressByLocation>
    </Dialog>
    </>
  )
};
export default EditAddressDataTable;