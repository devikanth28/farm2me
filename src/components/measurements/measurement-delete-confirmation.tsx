import { Dialog } from 'primereact/dialog';
import { useTranslation } from 'react-i18next';
import { Divider } from 'primereact/divider';

const MeasurementDeleteConfirmation = ({ showDialog, hideDialog, deleteMeasurement } : any) => {
  const {t} = useTranslation()
    return (
        <>
            <Dialog 
                visible={ showDialog } 
                className='measure-dialog-delete'
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header={t("common_delete_header")} modal 
                footer={ deleteMeasurement } 
                onHide={ hideDialog }>
                      <Divider className='mt-0' />
                <div className="confirmation-content">
                    <span>{t("measurement_delete_confirmation_message")} </span>
                </div>
            </Dialog>
        </>
    );
};

export default MeasurementDeleteConfirmation;