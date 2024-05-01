import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import Register from "../register/register";
const AddUser = ({
    showAddUserModal,
    hideAddUserModal
}:any) => {
  // const [hidemodal, setHideModal] = useState(hideAddUserModal)
  // const closeModal = (value:boolean)=>{
  //   setHideModal(value);
  // }
return(
    <Dialog
    visible={showAddUserModal}
    className="quickview w-30rem"
    breakpoints={{ "960px": "75vw", "641px": "90vw" }}
    modal
    onHide={hideAddUserModal}
  >
<Register isAdminUser={false} hideAdminModal={hideAddUserModal}/>
      </Dialog>
)
}

export default AddUser;