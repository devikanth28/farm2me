import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';

const CourierChargeDialog = ({
    courierCharge,
    showDialog,
    hideDialog,
    courierChargeDialogFooter,
    onInputChange,
    submitted,
  } : any) => {
   
    const {t} = useTranslation();


    return (
        <>
            <Dialog visible={showDialog} 
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header={t("couriercharges_dialog_header")} modal className="p-fluid measure-dialog-delete"
                footer={courierChargeDialogFooter} 
                onHide={ hideDialog }>
                    <Divider className='mt-0' />
                    <div className="field mb-3">
                        <label htmlFor="name" className="font-bold">
                            {t("couriercharges_weightslab_label")}
                        </label>
                        <InputText id="weightSlab" 
                            value={ courierCharge.weightSlab }
                            onChange={(e) => onInputChange(e, 'weightSlab')}
                            required autoFocus className={'provider-text' + classNames({ 'p-invalid': submitted && !courierCharge.weightSlab })}/>
                        {submitted && !courierCharge.weightSlab && <small className="p-error">{t("couriercharges_required_weightslab")} </small>}
                    </div>
                    
                    <div className="field mb-3">
                        <label htmlFor="name" className="font-bold">
                            {t("couriercharges_rateperkg_label")}
                        </label>
                        <InputText id="rateperkg" 
                            value={ courierCharge.rateperkg }
                            onChange={(e) => onInputChange(e, 'rateperkg')}
                            required className={'provider-text' + classNames({ 'p-invalid': submitted && !courierCharge.rateperkg })} />
                        {submitted && !courierCharge.rateperkg && <small className="p-error">{t("couriercharges_required_rateperkg")} </small>}
                    </div>

                    <div className="field mb-3">
                        <label htmlFor="name" className="font-bold">
                            {t("couriercharges_state_label")}
                        </label>
                        <InputText id="state" 
                            value={ courierCharge.state }
                            onChange={(e) => onInputChange(e, 'state')}
                            required className={'provider-text' + classNames({ 'p-invalid': submitted && !courierCharge.state })} />
                        {submitted && !courierCharge.state && <small className="p-error">{t("couriercharges_required_state")} </small>}
                    </div>

            </Dialog>
        </>
    );
};

export default CourierChargeDialog;