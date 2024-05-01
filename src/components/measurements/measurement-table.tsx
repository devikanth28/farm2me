import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { MeasurementModel } from "../../models/measurement-model";
import MeasurementDeleteConfirmation from "./measurement-delete-confirmation";
import MeasurementDialog from "./measurement-dialog";
import MeasurementToolbar from "./measurement-toolbar";
import { useTranslation } from "react-i18next";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { Link } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { Menu } from 'primereact/menu';



const MeasurementTable = (measuremnts: any) => {
    const {t} = useTranslation();
    const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("measurment_Breadcrumb_label") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/leaf-growing.png" , title: t("measurment_Breadcrumb_label") }


    let emptyMeasurement = {
        measurementId : 0,
        measurementTypeId : 0,
        uomName : '',
        uomCode : '',
        description : ''
    };

    const [measurements, setMeasurements] = useState<MeasurementModel[]>([]);
    const [measurement, setMeasurement] = useState<MeasurementModel>(emptyMeasurement);
    const [selectedMeasurements, setSelectedMeasurements] = useState<MeasurementModel>();
    const [globalFilter, setGlobalFilter] = useState("");
    const [measurementDialog, setMeasurementDialog] = useState(false);
    const [deleteMeasurementDialog, setDeleteMeasurementDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const op = useRef<any>(null);

    useEffect(()=>{
        setMeasurements(measuremnts.measuremnts);
    },[]);

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label={t("measurement_add_button")}  severity="success" onClick={openNew} />
            </div>
        );
    };
    
    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
            <h5 className="mb-0">{t("measurement_header")} </h5>
            <div className=" flex align-items-center flex-wrap gap-2">
            <div className=" font-bold text-white border-round p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder={t("common_search_placeholder")} />
            </div>
            <MeasurementToolbar leftToolbarTemplate={leftToolbarTemplate} />   
            </div>
        </div>
    );

    const openNew = () => {
        setMeasurement(emptyMeasurement);
        setSubmitted(false);
        setMeasurementDialog(true);
    };

    const editMeasurement = (measurement: MeasurementModel) => {
        setMeasurement({ ...measurement });
        setMeasurementDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setMeasurementDialog(false);
    };

    const saveMeasurement = () => {
        setSubmitted(true);

        if(measurement.measurementTypeId.toString().trim()){
            let _measurements = [...measurements];
            let _measurement = { ...measurement }; 
            
            if (measurement.measurementId > 0 ) {
                const index = findIndexById(measurement.measurementId);
                _measurements[index] = _measurement;
            }
            else {
                _measurement.measurementId = createId();
                _measurement.measurementTypeId = measurement.measurementTypeId;
                _measurement.uomName = measurement.uomName;
                _measurement.uomCode = measurement.uomCode;
                _measurements.push(_measurement);
            }

            setMeasurements(_measurements);
            setMeasurementDialog(false);
            setMeasurement(emptyMeasurement);
        }
    }

    const createId = () => {
        let id = 0;
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += Math.floor(Math.random() * chars.length);
        }

        return id;
    };

    const findIndexById = (id : number) => {
        let index = -1;

        for (let i = 0; i < measurements.length; i++) {
            if (measurements[i].measurementId === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const confirmDeleteMeasurement = (measurement: MeasurementModel) => {
        setMeasurement(measurement);
        setDeleteMeasurementDialog(true);
    };

    const actionBodyTemplate = (rowData : MeasurementModel) => {
        const items = [
            {
                label: t("common_edit_button"),
                icon: 'pi pi-pencil',
                command: () => editMeasurement(rowData),
                
            },
            {
                label: t("common_delete_button"),
                icon: 'pi pi-trash',
                command: () => confirmDeleteMeasurement(rowData),
            },
        ];
        
        return (
            <div>
            <i
                className="fa fa-ellipsis-v"
                aria-hidden="true"
                style={{ fontSize: '16px' }}
                onClick={(e) => op.current.toggle(e)}
            ></i>
            <Menu model={items} popup ref={op} className="action-btn" />
            </div>
        );
    };

    const hideDeleteMeasurementDialog = () => {
        setDeleteMeasurementDialog(false);
    };

    const deleteMeasurement = () => {
        let _products = measurements.filter((val) => val.measurementId !== measurement?.measurementId);

        setMeasurements(_products);
        setDeleteMeasurementDialog(false);
        setMeasurement(emptyMeasurement);
        //toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const deleteMeasurementDialogFooter = (
        <React.Fragment>
            <Button label={t("common_cancel_button")}  outlined onClick={hideDeleteMeasurementDialog} />
            <Button label={t("common_ok_button")}  severity="danger" onClick={deleteMeasurement} />
        </React.Fragment>
    );

    const measurementDialogFooter = (
        <React.Fragment>
            <Button label={t("common_cancel_button")} outlined onClick={hideDialog} />
            <Button label={t("common_save_button")}  onClick={saveMeasurement} />
        </React.Fragment>
    );

    const onInputChange = (e : any, name : string) => {
        const val = (e.target && e.target.value) || '';
        let _measurement = { ...measurement };

        if (name === "measurementTypeId"){
            _measurement.measurementTypeId = parseInt(val);
        }

        if (name === "uomName"){
            _measurement.uomName = val;
        }

        if (name === "uomCode"){
            _measurement.uomCode = val;
        }

        if (name === "description"){
            _measurement.description = val;
        }

        setMeasurement(_measurement);
    };

    return (
        <> 
               <BreadCrumbCustom items={breadCrumbItems.items} home={breadCrumbItems.home} backgroundImage={breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>
          <div className="Address-form-container layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col col-12">
                <div className="p-inputgroup justify-content-start">
                <span>
                  <h5 className='mb-0'>
                    <Link to={RouteConstant.setting}>
                      <i className="pi pi-arrow-left font-bold"></i>
                    </Link>
                  </h5>
                </span>
              </div>
            </div>
           { toast.current !== null ? <Toast ref={toast} /> : null }
           <div className="col-12">

            <div className="card border-noround pt-2">
            {header}
                <DataTable ref={dt} value={measurements} selection={selectedMeasurements} onSelectionChange={(e:any) => setSelectedMeasurements(e.value)}
                    dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]} size='small' showGridlines stripedRows resizableColumns
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} measurement" globalFilter={globalFilter}>
                    
                    <Column field="measurementTypeId" header={t("measurement_adddialog_typeid")} sortable style={{ minWidth: '12rem' , height:"52px" }}></Column>
                    <Column field="uomName" header={t("measurement_adddialog_measurementname")} sortable style={{ minWidth: '16rem' , height:"52px"}}></Column>
                    <Column field="uomCode" header={t("measurement_table_measurementcode")} sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="description" header={t("measurement_adddialog_description")} sortable style={{ minWidth: '16rem', height:"52px" }}></Column>
                    <Column header={t("measurement_table_action")} body={actionBodyTemplate} className="action-btn" exportable={false} style={{ minWidth: '12rem', height:"52px" }}></Column>    
                </DataTable>
                
                <MeasurementDialog measurement={measurement} 
                    showDialog={measurementDialog} 
                    hideDialog={ hideDialog }
                    measurementDialogFooter={measurementDialogFooter}
                    onInputChange={onInputChange}
                    submitted={submitted}/>

                <MeasurementDeleteConfirmation 
                    showDialog={ deleteMeasurementDialog } 
                    hideDialog={ hideDeleteMeasurementDialog } 
                    deleteMeasurement={ deleteMeasurementDialogFooter } />
            </div>
           </div>
        </div>
        </>
    );
};

export default MeasurementTable;