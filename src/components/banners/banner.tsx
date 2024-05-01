import {useEffect, useRef, useState } from 'react';
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import DataTable, { TableStyles } from 'react-data-table-component';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Calendar } from 'primereact/calendar';
import axios from 'axios';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';
import { Divider } from 'primereact/divider';
import { Menu } from 'primereact/menu';
import { Link } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";



interface ColumnDef {
    name: string,
    cell?: any,
    selector?: any,
    sortable?: boolean,
    style?: any
}
interface BannerList {
    bannerId: string,
    bannerName: string,
    image: string,
    startDate: string,
    endDate: string,
    url: string,
    action: string
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

const Banners = () => {

const [bannerList, setBannerList] = useState<BannerList[]>([]);
useEffect(() => {
    //2nd way
    axios
      .get("banners.json")
      .then((res:any) => setBannerList(res.data))
      .catch((err: any) => console.log(err));
  }, []);

    const {t} = useTranslation()

    const [visible, setVisible] = useState(false);
    const op = useRef<any>(null);
    const [dialogMode, setDialogMode] = useState('Add'); 
    const [dialogHeader, setDialogHeader] = useState(t("banner_addbanner_label")); 
    const [bannerName, setBannerName] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [url, setUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [editingBanner, setEditingBanner] = useState<BannerList | null>(null);


    const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("banner_breadcrumb_label") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/farmer2.png" , title:t("banner_breadcrumb_label")}

  const columns: ColumnDef[] = [
    {
        name: t("banner_table_bannerid"),
        sortable: true,
        selector: (row: any) => row.bannerId,
    },
    {
        name: t("banner_table_bannername"),
        sortable: true,
        selector: (row: any) => row.bannerName,
    },
    {
        name: t("banner_table_image"),
        sortable: true,
        cell: (row: any) => (
            <img
            className='flex flex-1 align-content-center ml-6'
              src={row.image}
              alt={row.bannerName}
              style={{ maxWidth: '50px', maxHeight: '50px' }} 
            />
          ),
    },
    {
        name: t("banner_table_startdate"),
        sortable: true,
        selector: (row: any) => row.startDate,
    },
    {
        name: t("banner_table_enddate"),
        sortable: true,
        selector: (row: any) => row.endDate,
    },
    {
        name: t("banner_table_url"),
        sortable: true,
        cell: (row:any) => (
            <a href={row.url} target="_blank" rel="noopener noreferrer">
            {row.url}
            </a>
          ),
    },
    {
        name: t("banner_table_action"),
        sortable: true,
        cell: (row: any) => {
            const items = [
                {
                    label: t("common_edit_button"),
                    icon: 'pi pi-pencil',
                    command: () => handleEditClick(row),
                },
                {
                    label: t("common_delete_button"),
                    icon: 'pi pi-trash',
                    command: () => handleDeleteBanner(row),
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
                    <Menu model={items} popup ref={op} className='action-btn' />
                </div>
                </>
            );
        },
    }

];

const [searchText, setSearchText] = useState("");

    const filteredData = bannerList.filter((item) =>
  (typeof item.bannerId === 'string' && item.bannerId.toLowerCase().includes(searchText.toLowerCase())) ||
  (typeof item.bannerName === 'string' && item.bannerName.toLowerCase().includes(searchText.toLowerCase())) ||
  (typeof item.image === 'string' && item.image.toLowerCase().includes(searchText.toLowerCase())) ||
  (typeof item.startDate === 'string' && item.startDate.toLowerCase().includes(searchText.toLowerCase())) ||
  (typeof item.endDate === 'string' && item.endDate.toLowerCase().includes(searchText.toLowerCase())) ||
  (typeof item.url === 'string' && item.url.toLowerCase().includes(searchText.toLowerCase()))
);


const toast = useRef<Toast | null>(null);

const confirm2 = () => {
    return new Promise((resolve:any, reject:any) => {
      confirmPopup({
        message: t("banner_delete_confirmmessage"),
        acceptClassName: 'p-button-danger',
        acceptLabel: t("common_ok_button"), 
        rejectLabel: t("common_cancel_button"),
        accept: () => resolve(), 
        reject: () => reject(), 
      });
    });
  };

  const handleSave = () => {
    const newBanner = {
        
        bannerId: String(bannerList.length + 1),
        bannerName: (document.getElementById('name') as HTMLInputElement)?.value || '',
        image: selectedImage || '', 
        startDate: startDate?.toLocaleDateString() || '',
        endDate: endDate?.toLocaleDateString() || '',
        url: (document.getElementById('url') as HTMLInputElement)?.value || '',
        action: 'edit'||'delete', 
    };
    setBannerList((prevBannerList) => [...prevBannerList, newBanner]);
    resetFormFields();
    hideDialog();
};
const resetFormFields = () => {
    (document.getElementById('name') as HTMLInputElement).value = '';
    setSelectedImage(null);
    setStartDate(null);
    setEndDate(null);
    (document.getElementById('url') as HTMLInputElement).value = '';
};

const hideDialog = () => {
    setVisible(false);
    setDialogMode('Add'); 
  setDialogHeader(t("banner_addbanner_label")); 
};

const handleEditClick = (row: BannerList) => {
        setDialogMode('Update');
       
        setDialogHeader(t("banner_editbanner_header"));
        setVisible(true); 
        setEditingBanner(row);
        setSelectedImage(row.image);
        setStartDate(new Date(row.startDate)); 
        setEndDate(new Date(row.endDate)); 
        setSelectedFileName(row.image); 
        setBannerName(row.bannerName);
        setUrl(row.url);
};

const handleUpdate = () => {
    if (editingBanner) {

      const index = bannerList.findIndex((banner) => banner.bannerId === editingBanner.bannerId);
      
      if (index !== -1) {
        const updatedBannerList = [...bannerList];
        updatedBannerList[index] = {
            ...editingBanner,
            startDate: startDate?.toLocaleDateString() || '', 
            endDate: endDate?.toLocaleDateString() || '', 
            image: selectedImage || '', 
            bannerName: bannerName, 
            url: url, // 
        };
        // updatedBannerList[index] = editingBanner;

        setBannerList(updatedBannerList);
        hideDialog();
      }
    }
};


const [selectedFileName, setSelectedFileName] = useState<any>(false);
const fileInputRef = useRef<any>(null);
    
const handleImageChange = (e: any) => {
    const file = e.target?.files[0]; 
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setSelectedFileName(file.name);
            setSelectedImage(event.target?.result as string); 
        };
        reader.readAsDataURL(file);
    } else {
        setSelectedFileName('No file chosen');
    }
};

const handleStartDateChange = (e: any) => {
    const newStartDate = e.value as Date; 
    setStartDate(newStartDate);
};

const handleEndDateChange = (e: any) => {
    const newEndDate = e.value as Date; 
    setEndDate(newEndDate);
};
const showToastMessage = (severity: "success", summary: "Success", detail: "Deleted successfully.") => {
    toast?.current?.show({ severity, summary, detail });
};

  const handleDeleteBanner = async (banner: BannerList) => {
    try {
      await confirm2();
      // Identify the index of the banner to delete using its bannerId
      const index = bannerList.findIndex((b) => b.bannerId === banner.bannerId);
      if (index !== -1) {
        const updatedBannerList = [...bannerList];
        // Remove the identified banner from the list
        updatedBannerList.splice(index, 1);
        setBannerList(updatedBannerList);
        showToastMessage('success', 'Success', t("common_delete_successmessage"));
      }
    } catch (error) {
      // Handle any error that may occur during deletion
    }
  };
  

  const handleBannerNameChange = (e:any) => {
    setBannerName(e.target.value);
  };

  const handleUrlChange = (e:any) => {
    setUrl(e.target.value);
  };
  
    return <>
        <Toast ref={toast} />
        <ConfirmPopup />

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
            <div className="col-12">
          <div className="card  border-noround pt-2">
            <div className="flex align-items-center justify-content-between flex-wrap	gap-2 w-full card-container mb-3">
            <h5 className="mb-0">{t("banner_header")}</h5>
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
            <Button className=" text-white border-round p-button-success" onClick={() => setVisible(true)} >{t("banner_addbanner_label")} </Button>
            </div>
            </div>
        </div>
                <Dialog header={dialogHeader} visible={visible} style={{ width: '60vw' }} onHide={hideDialog} className='banner-dialog'>
                <Divider className='mt-0' />
                    <form>
                        <div className="grid">
                            <div className="col-12 md:col-7">
                                <div className="p-fluid formgrid grid">
                                    <div className="field mb-3 col-12">
                                        <label htmlFor="lastname2" className="label-semi-bold">{t("banner_table_bannername")} </label>
                                            <span className="p-input-icon-left">
                                                <i className="fa fa-file-archive-o" />
                                                <InputText 
                                                    type="text" 
                                                    name="name" 
                                                    id="name" 
                                                    value={bannerName}
                                                    onChange={handleBannerNameChange}
                                                    placeholder={t("banner_bannername_placeholder")}
                                                    className='p-inputtext p-component provider-text'
                                                />
                                            </span>
                                    </div>
                                </div>
                                <div className="p-fluid formgrid grid">
                                    <div className="field mb-3 col-12">
                                        <label htmlFor="image" className="label-semi-bold">{t("banner_table_image")} </label>
                                        <span>
                                            <input
                                                type="file"
                                                accept="image/*" 
                                                name="image"
                                                id="image"
                                                onChange={(e) => handleImageChange(e)}
                                                
                                                ref={fileInputRef}
                                                className='p-inputtext provider-text'
                                            />
                                            {/* <span className="p-input-icon-left">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                            >
                                                {t("banner_table_image_choosefile")}
                                            </button>
                                            {selectedFileName? 
                                            <span style={{width:"50%", marginLeft:"10px"}} placeholder=''>{selectedFileName}</span>:
                                                <span style={{width:"50%", marginLeft:"10px"}} >{t("banner_table_image_nofilechosen")} </span>}
                                            </span> */}
                                        </span>
                                    </div>

                                </div>
                                <div className="p-fluid flex-nowrap	 grid">
                                    <div className="mb-3 col-12 md:col-6">
                                        <label htmlFor="date" className="label-semi-bold">{t("banner_table_startdate")} </label>
                                            <span className="p-input-icon-right">
                                                <i className="fa fa-calendar" />
                                                <Calendar
                                                    value={startDate}
                                                    onChange={(e) => handleStartDateChange(e)}
                                                    name="startdate"
                                                    placeholder={t("banner_date_placeholder")}
                                                    showIcon
                                                    className='calendar-input'
                                                />
                                            </span>
                                    </div>
                                    <div className="mb-3 col-12 md:col-6">
                                        <label htmlFor="date" className="label-semi-bold">{t("banner_table_enddate")} </label>
                                            <span className="p-input-icon-right">
                                                <i className="fa fa-calendar" />
                                                <Calendar
                                                    value={endDate}
                                                    onChange={(e) => handleEndDateChange(e)}
                                                    name="enddate"
                                                    placeholder={t("banner_date_placeholder")}
                                                    showIcon
                                                    className='calendar-input'
                                                />
                                            </span>
                                    </div>
                                </div>
                                <div className="p-fluid formgrid grid">
                                    <div className="mb-3 col-12">
                                        <label htmlFor="lastname2" className="label-semi-bold">{t("banner_table_url")} </label>
                                            <span className="p-input-icon-left">
                                                <i className="fa fa-globe" />
                                                <InputText 
                                                type="link" 
                                                name="url" 
                                                id="url" 
                                                value={url}
                                                onChange={handleUrlChange}
                                                placeholder={t("banner_url_placeholder")} 
                                                className='provider-text'
                                                />
                                            </span>
                                    </div>
                                </div>
                                <div className="p-d-flex p-jc-end text-right">
                            <Button
                                type="button"
                                className="primary-button p-component justify-content-center"
                                style={{ width: "100px", height: "40px", borderRadius: "4px", marginRight: "16px"}}
                                onClick={() => {
                                    if (dialogMode === 'Add') {
                                        handleSave(); 
                                    } else if (dialogMode === 'Update') {
                                        handleUpdate(); 
                                    }
                                }}
                            >
                                {dialogMode === 'Add' ? t("common_save_button") : t("common_update_button")}
                            </Button>
                            <Button
                                type="reset"
                                className="surface-0 text-color-secondary p-component justify-content-center"
                                style={{ width: "100px", height: "40px", borderRadius: "4px" }}
                                onClick={hideDialog}
                            >
                                {t("common_cancel_button")}
                            </Button>
                        </div>
                            </div>
                            <div className="col-12 md:col-5">
                                <Card>
                                    {selectedImage ? (
                                        <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                                    ) : (
                                        <div className="p-d-flex p-ai-center" style={{ height: '100%', justifyContent: 'center' }}>
                                            {t("banner_table_addbanner_selectedimage")}
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </div>
                    </form>
                </Dialog>
        <DataTable
            columns={columns}
            data={filteredData}
            keyField="bannerId"
            // sortIcon={sortIcon}
            highlightOnHover={true}
            pagination={true}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
            customStyles={dataTableStyles}
            className='border-1 surface-border'
            
        />
        </div>
            </div>
            </div>
    </>
};
export default Banners;