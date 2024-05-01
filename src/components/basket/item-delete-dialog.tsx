import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

const ItemDeleteDialog = ({
  messageHeader,
  notifyMessage,
  isVisible,
  isHide,
}: any) => {
  const dialogHeaderTemplate = (
    <div className="p-dialog-title">
      <h5>{messageHeader}</h5>
    </div>
  );

  const footerContent = (
    <div>
      <Divider />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => isHide(false)}
        className="p-button-text"
        raised
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => isHide(true)}
        autoFocus
        raised
        severity={messageHeader === "Delete Item" ? "danger" : "success"}
      />
    </div>
  );

  return (
    <>
      <Dialog
        header={dialogHeaderTemplate}
        visible={isVisible}
        onHide={isHide}
        style={{ width: "30vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={footerContent}
      >
        <p className="m-0">{notifyMessage}</p>
      </Dialog>
    </>
  );
};

export default ItemDeleteDialog;
