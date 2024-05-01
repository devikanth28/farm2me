import { Button } from "primereact/button";
import BreadCrumbCustom from "../../components/bread-crumb/bread-crumb";
import DataTable, { TableStyles } from 'react-data-table-component';
import { BreadcrumbItem } from "../../interfaces/common/common";
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { useFormik } from 'formik';
import { classNames } from "primereact/utils";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { Menu } from 'primereact/menu';



interface ColumnDef {
    name: string,
    cell?: any,
    selector?: any,
    sortable?: boolean,
    style?: any,
    showIcon?: boolean
}
interface ProviderList {
    courierProviderId: string,
    providerName: string,
    address: string,
    address2:string,
    landmark:string,
    country:string,
    state:string,
    city: string,
    zipcode: string,
  }

const dataTableStyles: TableStyles = {
    headCells: {
        style: {
            borderTop: "1px solid rgba(0,0,0,0.07)",
            borderLeft: "1px solid rgba(0,0,0,0.07)",
            '&:last-of-type': {
                borderRight: "1px solid rgba(0,0,0,0.07)",
            },
            justifyContent: "space-between",
            fontWeight: "600",
            paddingRight: "5px",
            fontSize:"16px",
            background:"#f8f9fa",
            color:"rgb(73, 80, 87)"

        }
    },
    cells: {
        style: {
            borderLeft: "1px solid rgba(0,0,0,0.07)",
            '&:last-of-type': {
                borderRight: "1px solid rgba(0,0,0,0.07)",
            },
            fontSize:"16px",
            color:"rgb(73, 80, 87)",
            height: "52px",
            padding: "0.5rem 0.5rem",
        }
    },
    pagination: {
        style: {
        fontSize:"16px",
        color:"#6c757d",
        justifyContent:"center",
        border: "solid #e9ecef",
            borderRadius: "0",
        borderWidth: "1px 1px 1px 1px",
        padding:"0.5rem 1rem",
        }
    }
}

const CourierProvider = () => {
    const {t} = useTranslation();
    const [courierList, setcourierList] = useState<ProviderList[]>([]);
    const op = useRef<any>(null);

    useEffect(() => {
        axios
          .get("courier-provider.json")
          .then((res:any) => setcourierList(res.data))
          .catch((err: any) => console.log(err));
      }, []);

    const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("courierprovider_breadcrumb_label") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: "../assests/images/farmer.png" , title: t("courierprovider_breadcrumb_label") }
    const [isEditMode, setIsEditMode] = useState(false);   
    const [editedItem, setEditedItem] = useState<ProviderList | null>(null);
 

    const columns: ColumnDef[] = [
        {
            name: t("courierprovider_table_courierproviderid"),
            sortable: true,
            selector: (row: any) => row.courierProviderId,
        },
        {
            name: t("courierprovider_table_providername"),
            sortable: true,
            selector: (row: any) => row.providerName,
            showIcon: true,
        },
        {
            name: t("courierprovider_table_address"),
            sortable: true,
            selector: (row: any) => row.address,
        },
        {
            name: t("courierprovider_table_city"),
            sortable: true,
            selector: (row: any) => row.city,
        },
        {
            name: t("courierprovider_table_zipcode"),
            sortable: true,
            selector: (row: any) => row.zipcode,
        },
        {
            name: t("courierprovider_table_action"),
            sortable: true,
            cell: (row: any) => {
                const items = [
                    {
                        label: t("common_edit_button"),
                        icon: 'pi pi-pencil',
                        command: () => handleEdit(row),
                        className:'custom-edit-menu-item'
                    },
                    {
                        label: t("common_delete_button"),
                        icon: 'pi pi-trash',
                        command: () => handleDelete(row.courierProviderId),
                    },
                ];
                return (
                    <>
                    <div>
                    <i
                        className="fa fa-ellipsis-v"
                        aria-hidden="true"
                        style={{ fontSize: '16px' }}
                        onClick={(e) => op.current.toggle(e)}
                    ></i>
                    <Menu model={items} popup ref={op} className="action-btn" />
                    </div>
                    </>
                );
            },
        }
    
    ];

    const [searchText, setSearchText] = useState("");

    const filteredData = courierList.filter((item) =>
    item.courierProviderId.toLowerCase().includes(searchText.toLowerCase()) ||
    item.providerName.toLowerCase().includes(searchText.toLowerCase()) ||
    item.address.toLowerCase().includes(searchText.toLowerCase()) ||
    item.city.toLowerCase().includes(searchText.toLowerCase()) ||
    item.zipcode.toLowerCase().includes(searchText.toLowerCase())
    );

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { label: "New York", value: "NY" },
        { label: "Rome", value: "RM" },
        { label: "London", value: "LDN" },
        { label: "Istanbul", value: "IST" },
        { label: "Paris", value: "PRS" },
    ]; 
    const [visible, setVisible] = useState(false);
    
    const formik: any = useFormik({
        initialValues: {
          providerName: "",
          address: "",
          address2: "",
          landmark: "",
          country: "",
          state: "",
          city: "",
          zipcode: "",

          
        },
        validate: (data: any) => {
          let errors: any = {};
    
          if (!data.providerName) {
            errors.providerName = t("courierprovider_validationfor_providername")
          }
          if (!data.address) {
            errors.address = t("courierprovider_validationfor_address")
          }
          if (!data.address2) {
            errors.address2 = t("courierprovider_validationfor_address")
          }
          if (!data.landmark) {
            errors.landmark = t("courierprovider_validationfor_landmark")
          }
          if (!data.country) {
            errors.country = t("courierprovider_validationfor_country")
          }
          if (!data.state) {
            errors.state = t("courierprovider_validationfor_state")
          }
          if (!data.city) {
            errors.city = t("courierprovider_validationfor_city")
          }
          if (!data.zipcode) {
            errors.zipcode = t("courierprovider_validationfor_zipcode")
          }
          return errors;
        },
        onSubmit: (data: any) => {

        }
      });
    const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: any) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const hideDialog = () => {
    setVisible(false);
    setIsEditMode(false);
    };

    const handleSave = () => {
        const formData = formik.values;
        const newProvider = {
          courierProviderId: String(courierList.length + 1), 
          providerName: formData.providerName || '',
          address: formData.address || '',
          address2: formData.address2 || '',
          landmark: formData.landmark || '',
          country: formData.country || '',
          state: formData.state || '',
          city: formData.city || '',
          zipcode: formData.zipcode || '',
        };
      
        setcourierList((prevList) => [...prevList, newProvider]);
       
        formik.resetForm();
        setVisible(false);
      };
      

const handleEdit = (row: ProviderList) => {

        setEditedItem(row);
        formik.setValues({
            courierProviderId: row.courierProviderId,
            providerName: row.providerName,
            address: row.address,
            address2: row.address2,
            landmark: row.landmark,
            country: row.country,
            state: row.state,
            city: row.city,
            zipcode: row.zipcode,

        });

        setVisible(true);
        setIsEditMode(true);
    };

    const handleUpdate = () => {
        if (editedItem) {
            const updatedList = courierList.map((provider) => {
                if (provider.courierProviderId === editedItem.courierProviderId) {
                    return {
                        ...provider,
                        providerName: formik.values.providerName,
                        address: formik.values.address,
                        address2: formik.values.address2,
                        landmark: formik.values.landmark,
                        country: formik.values.country,
                        state: formik.values.state,
                        city: formik.values.city,
                        zipcode: formik.values.zipcode,
                    };
                }
                return provider;
            });

            setcourierList(updatedList);
            setVisible(false);
            setIsEditMode(false);
            
        }
    };
    const toast = useRef<Toast | null>(null);
    const showToastMessage = (severity: "success", summary: "Success", detail: "Deleted successfully.") => {
        toast?.current?.show({ severity, summary, detail });
    };
    
    const handleDelete = (courierProviderId: string) => {
        confirm2(courierProviderId)
            .then(() => {
                showToastMessage('success', 'Success', t("common_delete_successmessage"));
            })
            .catch((error) => {
            });
    };
    
    const confirm2 = (courierProviderId: string) => {
        return new Promise((resolve: any, reject: any) => {
            confirmPopup({
                message: t("courierprovider_delete_confirmmessage"),
                acceptClassName: 'p-button-danger',
                acceptLabel: t("common_ok_button"), 
                rejectLabel: t("common_cancel_button"),
                accept: () => {
                    setcourierList((prevList) => prevList.filter((provider) => provider.courierProviderId !== courierProviderId));
                    resolve();
                },
                reject: () => {
                    reject();
                },
            });
        });
    };
    const [sameAddressLine1, setSameAddressLine1] = useState(false);

return<>
        <Toast ref={toast} />
        <ConfirmPopup />

        <BreadCrumbCustom items={breadCrumbItems.items} home={breadCrumbItems.home} backgroundImage={breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>
          <div className="Address-form-container layout-content mt-3 mb-3 grid grid-table-mobile">
            <div className="col-12">
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
        <div className="col-12">
          <div className="card  border-noround pt-2">
        <div className="flex align-items-center justify-content-between flex-wrap gap-2	 w-full card-container mb-3">
            <h5 className="mb-0">{t("courierprovider_breadcrumb_label")}</h5>
            <div className="flex align-items-center flex-wrap gap-2">
                
            <div className=" font-bold text-white border-round  p-input-icon-left" style={{float:"right"}}> 
                <i className="fa-solid fa-search"></i>
                    <InputText
                        id="search"
                        name="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder={t("common_search_placeholder")}
                    />
            </div> 
            <div>
            <Button className=" text-white border-round  p-button-success" onClick={() => setVisible(true)} >{t("courierprovider_addcourierprovider_button")} </Button>
            </div>
            </div>
        </div>

        <Dialog header={isEditMode ? t("courierprovider_editheader") : t("courierprovider_addheader")} visible={visible} style={{ width: '50vw' }} onHide={() => hideDialog()} className="courierprovider-wd">
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
            <div className="p-fluid formgrid grid">
                <div className="field col-12">
                <label htmlFor="providername" className="label-semi-bold">{t("courierprovider_providername_label")} <span className="required">*</span></label>
                <span className="p-input-icon-left">
                    <i className="fa-solid fa-user" />
                    <InputText type="text" value={formik.values.providerName} name="providerName" id="providerName" onChange={formik.handleChange} placeholder={t("courierprovider_providername_placeholder")}  className={'provider-text' + classNames({'p-invalid': formik.errors.providerName })}  />
                </span>
                {getFormErrorMessage('providerName')}
                </div>
            </div>
            <div className="p-fluid formgrid grid">
                <div className="field col-12">
                <label htmlFor="address" className="label-semi-bold">{t("courierprovider_address_label")} <span className="required">*</span></label>
                <span className="p-input-icon-left">
                    <i className="fa-solid fa-home" />
                    <InputText type="text" value={formik.values.address} name="address" id="address" onChange={formik.handleChange} placeholder={t("courierprovider_address_placeholder")}  className={'provider-text' + classNames({ 'p-invalid': formik.errors.address })} />
                </span>
                {getFormErrorMessage('address')}
                </div>
                <span className="col-12 field-checkbox justify-content-end">
                <Checkbox inputId="sameAddressLine1" name="sameAddressLine1" checked={formik.values.sameAddressLine1} 
                onChange={(e) => {
                formik.handleChange(e); 
                if (e.checked) {
                    formik.setFieldValue('address2', formik.values.address);
                } else {
                    formik.setFieldValue('address2', '');
                }
            }}/>
                <label htmlFor="sameAddressLine1">{t("courierprovider_sameaddress_label")} </label>
                </span>
            </div>  
            <div className="p-fluid formgrid grid">
                <div className="field col-12">
                <label htmlFor="address2" className="label-semi-bold">{t("courierprovider_address2_label")}<span className="required">*</span></label>
                <span className="p-input-icon-left">
                    <i className="fa-solid fa-home" />
                    <InputText type="text" value={sameAddressLine1 ? formik.values.address : formik.values.address2} name="address2" id="address2" onChange={formik.handleChange} placeholder= {t("courierprovider_address_placeholder")} className={'provider-text' + classNames({ 'p-invalid': formik.errors.address2 })} />
                </span>
                {getFormErrorMessage('address2')}
                </div>
            </div>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                <label htmlFor="landmark" className="label-semi-bold">{t("courierprovider_landmark_label")}<span className="required">*</span></label>
                <span className="p-input-icon-left">
                    <i className="fa-solid fa-location" />
                    <InputText type="text" value={formik.values.landmark} name="landmark" id="landmark" onChange={formik.handleChange} placeholder={t("courierprovider_landmark_placeholder")} className={'provider-text' + classNames({ 'p-invalid': formik.errors.landmark })} />
                </span>
                {getFormErrorMessage('landmark')}
                </div>
                <div className="field col-12 md:col-4">
                <label htmlFor="country" className="label-semi-bold">{t("courierprovider_country_label")}<span className="required">*</span></label>
                <span className="p-input-icon-left p-dropdown">
                    <i className="fa-solid fa-map-marker" />
                    <Dropdown
                        name="country"
                        value={formik.values.country}
                        options={cities}
                        onChange={(e) => formik.setFieldValue('country', e.value)}
                        placeholder= {t("courierprovider_country_placeholder")}
                        className={'provider-text' + classNames({ 'p-invalid': isFormFieldInvalid('country') })}
                    />
                    {/* <Dropdown type="text" name="country" options={cities} id="country" onChange={formik.handleChange} placeholder="Select a country" className={classNames({ 'p-invalid': formik.errors.country })} /> */}
                </span>
                {getFormErrorMessage('country')}
                </div>
                <div className="field col-12 md:col-4">
                <label htmlFor="state" className="label-semi-bold">{t("courierprovider_state_label")}<span className="required">*</span></label>
                <span className="p-input-icon-left p-dropdown">
                <i className="fa-solid fa-map-marker" />
                <Dropdown
                    name="state"
                    value={formik.values.state}
                    options={cities}
                    onChange={(e) => formik.setFieldValue('state', e.value)}
                    placeholder={t("courierprovider_state_placeholder")}
                    className={'provider-text' + classNames({'p-invalid': isFormFieldInvalid('state') })}
                />
                    {/* <Dropdown type="text" name="state" options={cities} id="state" onChange={formik.handleChange} placeholder="Select a state" className={classNames({ 'p-invalid': formik.errors.state })} /> */}
                </span>
                {getFormErrorMessage('state')}
                </div>
            </div>
            <div className="p-fluid  grid">
                <div className="field col-12 md:col-4">
                <label htmlFor="city" className="label-semi-bold">{t("courierprovider_city_label")}<span className="required">*</span></label>
                <span className="p-input-icon-left p-dropdown">
                    <i className="fa-solid fa-map-marker" />
                    <Dropdown
                        name="city"
                        value={formik.values.city}
                        options={cities}
                        onChange={(e) => formik.setFieldValue('city', e.value)}
                        placeholder={t("courierprovider_city_placeholder")}
                        className={'provider-text' + classNames({ 'p-invalid': isFormFieldInvalid('city') })}
                    />
                    {/* <Dropdown type="text" name="city" options={cities} id="city" onChange={formik.handleChange} placeholder="Select a city" className={classNames({ 'p-invalid': formik.errors.city })} /> */}
                </span>
                {getFormErrorMessage('city')}
                </div>
                <div className="field col-12 md:col-4">
                <label htmlFor="zipcode" className="label-semi-bold">{t("courierprovider_zipcode_label")}<span className="required">*</span></label>
                <span className="p-input-icon-left p-dropdown">
                    <i className="fa-solid fa-hash" />
                    <InputText type="text" value={formik.values.zipcode} name="zipcode" id="zipcode" onChange={formik.handleChange} placeholder={t("courierprovider_zipcode_placeholder")} className={'provider-text' + classNames({ 'p-invalid': formik.errors.zipcode })} />
                </span>
                {getFormErrorMessage('zipcode')}
                </div>
            </div>
            <div className="p-fluid  grid">
            <Button
                type="submit"
                className="primary-button p-component justify-content-center m-2"
                style={{ width: "100px", height: "40px", borderRadius: "4px", float:"right"}}

                onClick= {isEditMode ? handleUpdate : handleSave}
            >
              {(isEditMode)? t("common_update_button") : t("common_save_button") }            
              </Button>
            <Button
                type="reset"
                className="surface-0 text-color-secondary p-component justify-content-center m-2"
                style={{ width: "100px", height: "40px",float:"right" }}
                onClick={hideDialog}
            > {t("common_cancel_button")}
           </Button>  
           </div> 
        </form>
        </Dialog>
        <DataTable
            columns={columns}
            data={filteredData}
            keyField="courierProviderId"
            sortIcon={<i className="pi pi-sort-amount-down" />}
            highlightOnHover={true}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 50, 100]}

            customStyles={dataTableStyles}
        /> 
          </div>
        </div>
            </div>

</>
}
export default CourierProvider;