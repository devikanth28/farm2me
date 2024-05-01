import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { useTranslation } from 'react-i18next';

const MeasurementDialog = ({
    measurement,
    showDialog,
    hideDialog,
    measurementDialogFooter,
    onInputChange,
    submitted,
  } : any) => {
  const {t} = useTranslation()

    return (
        <>
            <Dialog visible={showDialog} 
                breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
                header={t("measurement_adddialog_header")} modal className="p-fluid measure-dialog-delete"
                footer={measurementDialogFooter} 
                onHide={ hideDialog }>
                    <Divider className='mt-0' />
                    <div className="field mb-3">
                        <label htmlFor="name" className="font-bold">
                            {t("measurement_adddialog_typeid")}
                        </label>
                        <InputText id="measurementTypeId" 
                            value={ measurement.measurementTypeId }
                            onChange={(e) => onInputChange(e, 'measurementTypeId')}
                            required autoFocus className={'provider-text' + classNames({ 'p-invalid': submitted && !measurement.measurementTypeId })}/>
                        {submitted && !measurement.measurementTypeId && <small className="p-error">Measurement Type Id is required.</small>}
                    </div>
                    
                    <div className="field mb-3">
                        <label htmlFor="name" className="font-bold">
                            {t("measurement_adddialog_measurementname")}
                        </label>
                        <InputText id="uomName" 
                            value={ measurement.uomName }
                            onChange={(e) => onInputChange(e, 'uomName')}
                            required className={'provider-text' + classNames({ 'p-invalid': submitted && !measurement.uomName })} />
                        {submitted && !measurement.uomName && <small className="p-error">Unit of Measurement Name is required.</small>}
                    </div>

                    <div className="field mb-3">
                        <label htmlFor="name" className="font-bold">
                            {t("measurement_adddialog_measurementcode")}
                        </label>
                        <InputText id="uomCode" 
                            value={ measurement.uomCode }
                            onChange={(e) => onInputChange(e, 'uomCode')}
                            required className={'provider-text' + classNames({ 'p-invalid': submitted && !measurement.uomCode })} />
                        {submitted && !measurement.uomCode && <small className="p-error">Measurement Code is required.</small>}
                    </div>

                    <div className="field mb-3">
                        <label htmlFor="name" className="font-bold">
                            {t("measurement_adddialog_description")}
                        </label>
                        <InputText id="description" 
                            value={ measurement.description }
                            onChange={(e) => onInputChange(e, 'description')}
                            required className={'provider-text' + classNames({ 'p-invalid': submitted && !measurement.description })} />
                        {submitted && !measurement.description && <small className="p-error">{t("measurement_description_required")} </small>}
                    </div>

            </Dialog>
        </>
    );
};

export default MeasurementDialog;