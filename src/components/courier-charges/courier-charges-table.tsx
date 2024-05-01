import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { CourierChargesModel } from "../../models/courier-charges-model";
import CourierChargesToolbar from "./courier-charges-toolbar";
import CourierChargeDelete from "./courier-charges-delete";
import CourierChargeDialog from "./courier-charges-dialog";
import { useTranslation } from "react-i18next";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { Link } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { Menu } from 'primereact/menu';

const CourierChargesTable = (courierChargesData: any) => {
  const { t } = useTranslation();
  const breadCrumbItems: BreadcrumbItem = {
    items: [{ label: t("couriercharge__Breadcrumb_label") }],
    home: { label: t("common_breadcrumb_home") },
    backgroundImage: process.env.PUBLIC_URL + "/assests/images/leaf-growing.png",
    title: t("couriercharge__Breadcrumb_label"),
  };

  let emptyCourierCharges = {
    courierChargesId: 0,
    weightSlab: "",
    rateperkg: 0,
    state: "",
  };

  const [courierCharges, setCourierCharges] = useState<CourierChargesModel[]>(
    []
  );
  const [selectedCourierCharges, setSelectedCourierCharges] =
    useState<CourierChargesModel>();
  const [courierCharge, setCourierCharge] =
    useState<CourierChargesModel>(emptyCourierCharges);
  const [deleteCourierChargeDialog, setDeleteCourierChargeDialog] =
    useState(false);
  const [courierChargeDialog, setCourierChargeDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const dt = useRef(null);
  const op = useRef<any>(null);

  useEffect(() => {
    setCourierCharges(courierChargesData.courierChargesData);
  }, []);

  const openNew = () => {
    setCourierCharge(emptyCourierCharges);
    setSubmitted(false);
    setCourierChargeDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      
        <Button
          label={t("couriercharges_addnew")}
          severity="success"
          onClick={openNew}
        />

    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between mb-3">
        <h5 className="mb-0">{t("couriercharges_header")} </h5>
        <div className=" flex align-items-center flex-wrap gap-2">
        <div className=" font-bold text-white border-round p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.currentTarget.value)}
            placeholder={t("common_search_placeholder")}
            />
        </div>
        <CourierChargesToolbar leftToolbarTemplate={leftToolbarTemplate} />
        </div>
    </div>
  );

  const hideDeleteCourierChargeDialog = () => {
    setDeleteCourierChargeDialog(false);
  };

  const confirmDeleteCourierCharge = (courierCharge: CourierChargesModel) => {
    setCourierCharge(courierCharge);
    setDeleteCourierChargeDialog(true);
  };

  const deleteCourierCharge = () => {
    let _products = courierCharges.filter(
      (val) => val.courierChargesId !== courierCharge?.courierChargesId
    );

    setCourierCharges(_products);
    setDeleteCourierChargeDialog(false);
    setCourierCharge(emptyCourierCharges);
    //toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  };

  const editCourierCharge = (courierCharge: CourierChargesModel) => {
    setCourierCharge({ ...courierCharge });
    setCourierChargeDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCourierChargeDialog(false);
  };

  const saveCourierCharge = () => {
    setSubmitted(true);

    if (courierCharge.courierChargesId.toString().trim()) {
      let _courierCharges = [...courierCharges];
      let _courierCharge = { ...courierCharge };

      if (courierCharge.courierChargesId > 0) {
        const index = findIndexById(courierCharge.courierChargesId);
        _courierCharges[index] = _courierCharge;
      } else {
        _courierCharge.courierChargesId = createId();
        _courierCharge.weightSlab = courierCharge.weightSlab;
        _courierCharge.rateperkg = courierCharge.rateperkg;
        _courierCharge.state = courierCharge.state;
        _courierCharges.push(_courierCharge);
      }

      setCourierCharges(_courierCharges);
      setCourierChargeDialog(false);
      setCourierCharge(emptyCourierCharges);
    }
  };

  const createId = () => {
    let id = 0;
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
      id += Math.floor(Math.random() * chars.length);
    }

    return id;
  };

  const findIndexById = (id: number) => {
    let index = -1;

    for (let i = 0; i < courierCharges.length; i++) {
      if (courierCharges[i].courierChargesId === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const actionBodyTemplate = (rowData: CourierChargesModel) => {
    const items = [
        {
            label: t("common_edit_button"),
            icon: 'pi pi-pencil',
            command: () => editCourierCharge(rowData),
        },
        {
            label: t("common_delete_button"),
            icon: 'pi pi-trash',
            command: () => confirmDeleteCourierCharge(rowData),
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
        <Menu model={items} popup ref={op} className="action-btn"/>
        </div>
    );
  };

  const deleteCourierChargeDialogFooter = (
    <React.Fragment>
      <Button
        label={t("common_cancel_button")}
        outlined
        onClick={hideDeleteCourierChargeDialog}
      />
      <Button
        label={t("common_ok_button")}
        severity="danger"
        onClick={deleteCourierCharge}
      />
    </React.Fragment>
  );

  const courierChargeDialogFooter = (
    <React.Fragment>
      <Button
        label={t("common_cancel_button")}
        outlined
        onClick={hideDialog}
      />
      <Button
        label={t("common_save_button")}
        onClick={saveCourierCharge}
      />
    </React.Fragment>
  );

  const onInputChange = (e: any, name: string) => {
    const val = (e.target && e.target.value) || "";
    let _courierCharge = { ...courierCharge };

    if (name === "weightSlab") {
      _courierCharge.weightSlab = val;
    }

    if (name === "rateperkg") {
      _courierCharge.rateperkg = parseInt(val);
    }

    if (name === "state") {
      _courierCharge.state = val;
    }

    setCourierCharge(_courierCharge);
  };

  return (
    <>
      <BreadCrumbCustom
        items={breadCrumbItems.items}
        home={breadCrumbItems.home}
        backgroundImage={breadCrumbItems.backgroundImage}
        title={breadCrumbItems.title}
      ></BreadCrumbCustom>
        <div className="Address-form-container layout-content mt-3 mb-3 grid grid-table-mobile">
          <div className="col col-12">
            <div className="p-inputgroup justify-content-start">
              <span>
                <h5 className="mb-0">
                  <Link to={RouteConstant.setting}>
                    <i className="pi pi-arrow-left font-bold"></i>
                  </Link>
                </h5>
              </span>
            </div>
          </div>
          <div className="col-12">
            <div className="card border-noround  pt-2">
      
              {header}
              
            <DataTable
              ref={dt}
              value={courierCharges}
              selection={selectedCourierCharges}
              onSelectionChange={(e: any) => setSelectedCourierCharges(e.value)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              size="small"
              showGridlines
              stripedRows
              resizableColumns
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} measurement"
              globalFilter={globalFilter}
           
            
            >
              <Column
                field="weightSlab"
                header={t("couriercharges_weightslab_label")}
                sortable
                style={{ minWidth: "12rem" , height:"52px" }}
              ></Column>
              <Column
                field="rateperkg"
                header={t("couriercharges_rateperkg_label")}
                sortable
                style={{ minWidth: "16rem", height:"52px"  }}
              ></Column>
              <Column
                field="state"
                header={t("couriercharges_state_label")}
                sortable
                style={{ minWidth: "16rem" , height:"52px" }}
              ></Column>
              <Column
                header={t("couriercharges_table_action")}
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "12rem", height:"52px"  }}
              ></Column>
            </DataTable>

            <CourierChargeDialog
              courierCharge={courierCharge}
              showDialog={courierChargeDialog}
              hideDialog={hideDialog}
              courierChargeDialogFooter={courierChargeDialogFooter}
              onInputChange={onInputChange}
              submitted={submitted}
            />

            <CourierChargeDelete
              showDialog={deleteCourierChargeDialog}
              hideDialog={hideDeleteCourierChargeDialog}
              deleteCourierCharge={deleteCourierChargeDialogFooter}
            />
          </div>
          </div>
        </div>
    </>
  );
};

export default CourierChargesTable;
