import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

const ProductNotifyDialog = ({
  messageHeader,
  notifyMessage,
  isVisible,
  isHide,
}: any) => {
  const footerContent = (
    <div>
      <Divider />
      <Button
        label="Close"
        icon="pi pi-times"
        onClick={isHide}
        className="p-button-text"
      />
    </div>
  );

  return (
    <>
      <Dialog
        header={messageHeader}
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

export default ProductNotifyDialog;
