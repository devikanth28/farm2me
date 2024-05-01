import { DataTable, DataTableRowEditCompleteEvent} from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Column, ColumnEditorOptions} from "primereact/column";
import { OtherUserModel } from "../../models/all-user/edit-user-model";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Button } from "primereact/button";
import UserDeleteDialog from "./user-delete-dialog";
import editUserServices from "../../services/edit-users/edit-users.service";
import { Toast, ToastMessage } from "primereact/toast";
import { Tag } from "primereact/tag";

interface DataTableProps {
  data: OtherUserModel[];
}

const UsersDataTable: React.FC<DataTableProps> = (props) => {

  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const [userData, setUserData] = useState<OtherUserModel[] | any>([]);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [notifyHeader, setNotifyHeader] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);

  const showMessage = (label: string, message: string, severity: ToastMessage['severity']) => {
    toast.current?.show({ severity: severity, summary: label, detail: message, life: 3000 });
  };

  useEffect(() => {
      setUserData(props.data);
  }, [props.data]);

  const onRowEditComplete = async (event: DataTableRowEditCompleteEvent) => {
    let _data = [...userData];
    let { newData, index } = event;
    if(_data[index] !== newData) {      
      let putData = {
        userID: newData.userID, 
        name: newData.name,
        primaryContactNbr: newData.primaryContactNbr,
        secondaryContactNbr: newData.secondaryContactNbr,
        email: newData.email,
        gsT_Number: newData.gsT_Number
      };
      let response = await editUserServices.updateUser(putData);
      if(response.isSuccess) {
        showMessage('User Update','User detail updated successfully', 'success');
        _data[index] = newData as OtherUserModel;
        setUserData(_data);
      }
      else
      {
        showMessage('User Update', response.message + ': Error in update user', 'error');
      }     
    }
  };

  const deleteUser = async () => {
    try {
      let response = await editUserServices.deleteUser(selectedId);
      if(response.isSuccess) {
        showMessage('Delete User','User deleted successfully', 'success');
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

  function updateStatusOnDelete(id: number): OtherUserModel[] {
    return userData.map((item: OtherUserModel) => {
        if (item.userID === id) {
            return { ...item, isDeleted: true };
        }
        return item;
    });
  }

  const deleteActionTemplate = (rowData: OtherUserModel) => {
    return (
      <Button
        icon="pi pi-trash"
        onClick={() => onRowDelete(rowData)}
        style={{ border: 'none',color: 'gray', background: 'none' }}
        className="p-button-rounded p-mr-2"
      />
    )
  } 
  
  const onRowDelete = (rowData: OtherUserModel) => {
      setSelectedId(rowData.userID);
      setNotifyHeader("Delete User");
      setNotifyMessage("Are you sure you want to delete this user?");
      setIsNotifyVisible(true); 
  };

  const hideNotifyDialog = (value: boolean) => {
    if (value) {
      deleteUser();      
    }
    setIsNotifyVisible(false);
  };

  const statusBodyTemplate = (rowData: OtherUserModel) => {
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
    return <InputText type="text" value={options.value} style={{ width: '90%', border:'1px solid #090' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
  };   

  return (
    <>
    <Toast ref={toast} position="top-center" />  
    <div className="col-12">
        <div className="card border-noround p-2">                
            <DataTable value={userData.length>0?userData:props.data} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} paginator
              rows={10} rowsPerPageOptions={[5, 10, 25, 50, 100]} paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
              currentPageReportTemplate="{first} to {last} of {totalRecords}"> 
                <Column field="name" header="User Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}/>
                <Column field="primaryContactNbr" header="Primary Contact" editor={(options) => textEditor(options)} style={{ width: '15%' }}/>
                <Column field="secondaryContactNbr" header="Secondary Contact" editor={(options) => textEditor(options)} style={{ width: '15%' }}/>
                <Column field="email" header="Email Id" editor={(options) => textEditor(options)} style={{ width: '18%' }}/>
                <Column field="gsT_Number" header="GST No." editor={textEditor} style={{ width: '15%' }}/>
                <Column field="isDeleted" header="Status" body={statusBodyTemplate} style={{ width: '12%' }}/>
                <Column rowEditor header={t('assignRouteCode_action')} headerStyle={{ minWidth: '3em', textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }}></Column>                  
                <Column body={(options) => deleteActionTemplate(options)} headerStyle={{ width: '2em', textAlign: 'right' }} bodyStyle={{ textAlign: 'left' }}/>                    
            </DataTable>            
        </div>
        <UserDeleteDialog
          messageHeader={notifyHeader}
          notifyMessage={notifyMessage}
          isVisible={isNotifyVisible}
          isHide={hideNotifyDialog}
        />        
    </div>
    </>
  )
};
export default UsersDataTable;