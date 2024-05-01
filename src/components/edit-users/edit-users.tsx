import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import editUserServices from '../../services/edit-users/edit-users.service';
import UsersSearch from './users-search';
import UsersDataTable from './users-datatable';
import { OtherUserModel } from '../../models/all-user/edit-user-model';

const EditUsers: React.FC = () => {
    
    const { t } = useTranslation();
    const [userList, setUserList] = useState<OtherUserModel[]>([]);
    const [refreshPage, setRefreshPage] = useState(true);

    useEffect(() => {              
        handleSearch("");
    }, [refreshPage]);

    function handleSearch(query: string): void {
        editUserServices.getUsers(query).then((response: any) => {
            const sortedData = [...response].sort((a, b) => b.userID - a.userID);
            setUserList(sortedData);
        });
    }
    
    const reloadPage = (val:boolean)=>{
        setRefreshPage(val)
    } 

    return (
        <>
        <div className="layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col-12">                
                <h5 className="ml-1 mb-0">{t('edit_users_head')}</h5>
            </div>
            <UsersSearch onSearch={handleSearch} reloadPage={reloadPage}/>            
            <UsersDataTable data={userList} />
        </div>
        </>
    );
}

export default EditUsers;