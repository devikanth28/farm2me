import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import DataTable, { TableStyles } from "react-data-table-component";
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useTranslation } from "react-i18next";
import React from "react";
import { Menu } from "primereact/menu";
import RouteConstant from "../../constants/route.constants";
import { Link } from "react-router-dom";
import { Divider } from "primereact/divider";

interface ColumnDef {
  name: string;
  cell?: any;
  selector?: any;
  sortable?: boolean;
  style?: any;
}
interface UserDeliveryList {
  id: any;
  day: string;
  time: string;
  action: string;
}
const dataTableStyles: TableStyles = {
  headCells: {
    style: {
      borderTop: "1px solid rgba(0,0,0,0.07)",
      borderLeft: "1px solid rgba(0,0,0,0.07)",
      "&:last-of-type": {
        borderRight: "1px solid rgba(0,0,0,0.07)",
      },
      justifyContent: "space-between",
      fontWeight: "600",
      paddingRight: "5px",
      fontSize: "16px",
      background: "#f8f9fa",
      color: "rgb(73, 80, 87)",
    },
  },
  cells: {
    style: {
      borderLeft: "1px solid rgba(0,0,0,0.07)",
      "&:last-of-type": {
        borderRight: "1px solid rgba(0,0,0,0.07)",
      },
      fontSize: "16px",
      color: "rgb(73, 80, 87)",
      height: "52px",
      padding: "0.5rem 0.5rem",
    },
  },
  pagination: {
    style: {
      fontSize: "16px",
      color: "#6c757d",
      justifyContent: "center",
      border: "solid #e9ecef",
      borderRadius: "0",
      borderWidth: "1px 1px 1px 1px",
      padding: "0.5rem 1rem",
    },
  },
};

const UserPreferredDelivery = () => {
  const { t } = useTranslation();
  const [userDeliveryList, setUserDeliveryList] = useState<UserDeliveryList[]>(
    []
  );
  useEffect(() => {
    //2nd way
    axios
      .get("user-delivery.json")
      .then((res: any) => setUserDeliveryList(res.data))
      .catch((err: any) => console.log(err));
  }, []);

  const breadCrumbItems: BreadcrumbItem = {
    items: [{ label: t("userpreferreddelivery_breadcrumb_label") }],
    home: { label: t("common_breadcrumb_home") },
    backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg",
    title: t("userpreferreddelivery_breadcrumb_label"),
  };

  const [visible, setVisible] = useState(false);
  const [editedItem, setEditedItem] = useState<UserDeliveryList | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const op = useRef<any>(null);

  const [selectedtime, setSelectedtime] = useState<any>("");
  const selectTime = [
    { time: "Before 9 pm" },
    { time: "12 noon to 3pm" },
    { time: "After 6pm" },
    { time: "3pm to 6pm" },
  ];

  const categories = [
    { name: "Sunday", key: "Sun" },
    { name: "Monday", key: "Mon" },
    { name: "Tuesday", key: "Tue" },
    { name: "Wednesday", key: "Wed" },
    { name: "Thursday", key: "Thu" },
    { name: "Friday", key: "Fri" },
    { name: "Saturday", key: "Sat" },
  ];
  const [selectedCategories, setSelectedCategories] = useState([categories[0]]);

  const onCategoryChange = (e: any) => {
    let _selectedCategories = [...selectedCategories];

    if (e.checked) _selectedCategories.push(e.value);
    else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.key !== e.value.key
      );

    setSelectedCategories(_selectedCategories);
  };

  const [searchText, setSearchText] = useState("");
  const filteredUserDeliveryList = userDeliveryList.filter((item) => {
    const dayMatches = item.day
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const timeMatches = item.time
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return dayMatches || timeMatches;
  });

  const columns: ColumnDef[] = [
    {
      name: t("userpreferreddelivery_table_day"),
      sortable: true,
      selector: (row: any) => row.day,
    },
    {
      name: t("userpreferreddelivery_table_time"),
      sortable: true,
      selector: (row: any) => row.time,
    },

    {
      name: t("userpreferreddelivery_table_action"),
      sortable: true,
      cell: (row: any) => {
        const items = [
          {
            label: t("common_edit_button"),
            icon: "pi pi-pencil",
            command: () => handleEditClick(row),
          },
          {
            label: t("common_delete_button"),
            icon: "pi pi-trash",
            command: () => handleDeleteClick(row),
          },
        ];
        return (
          <>
            <div>
              <i
                className="fa fa-ellipsis-v"
                aria-hidden="true"
                style={{ fontSize: "16px" }}
                onClick={(e) => op.current.toggle(e)}
              ></i>
              <Menu model={items} popup ref={op} className="action-btn" />
            </div>
          </>
        );
      },
    },
  ];

  const showToastMessage = (
    severity: "success",
    summary: "Success",
    detail: "Deleted successfully."
  ) => {
    toast?.current?.show({ severity, summary, detail });
  };

  const hideDialog = () => {
    setVisible(false);
    setIsEditMode(false);
  };

  const handleSaveClick = () => {
    let newTime: any;

    if (selectedtime?.time?.length > 0) {
      newTime = selectedtime?.time;
    }

    const newData = {
      id: Math.floor(Math.random() * 1000 + 1),
      day: selectedCategories.map((category) => category.name).join(", "),
      time: newTime !== null ? newTime : "",
      action: "Some Action",
    };

    const updatedData = [...userDeliveryList, newData];

    setUserDeliveryList(updatedData);

    hideDialog();
    setIsEditMode(false);
  };

  const handleEditClick = (row: UserDeliveryList) => {
    setEditedItem(row);
    setIsEditMode(true);
    setVisible(true);
  };

  const handleUpdateClick = () => {
    if (editedItem) {
      const updatedList = userDeliveryList.map((item) =>
        item.id === editedItem.id ? { ...editedItem } : item
      );

      setUserDeliveryList(updatedList);
      hideDialog();
      setIsEditMode(false);
    }
  };

  const handleDeleteClick = async (row: UserDeliveryList) => {
    try {
      await confirm2();
      const updatedList = userDeliveryList.filter((item) => item.id !== row.id);

      setUserDeliveryList(updatedList);
      showToastMessage("success", "Success", t("common_delete_successmessage"));
    } catch (error) {}
  };

  const toast = useRef<Toast | null>(null);

  const confirm2 = () => {
    return new Promise((resolve: any, reject: any) => {
      confirmPopup({
        message: t("userpreferreddelivery_delete_confirmmessage"),
        acceptClassName: "p-button-danger",
        acceptLabel: t("common_ok_button"),
        rejectLabel: t("common_cancel_button"),
        accept: () => resolve(),
        reject: () => reject(),
      });
    });
  };

  const handleCancelClick = () => {
    hideDialog();
    setIsEditMode(false);
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmPopup />
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
            <div className="card  border-noround pt-2">
              <div className="flex align-items-center justify-content-between flex-wrap gap-2	 w-full card-container mb-3">
                <h5 className="mb-0">
                  {t("userpreferreddelivery_breadcrumb_label")}
                </h5>
                <div className="flex align-items-center flex-wrap gap-2">
                  <div
                    className=" font-bold text-white border-round p-input-icon-left"
                    style={{ float: "right" }}
                  >
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
                    <Button
                      className=" flex align-items-center justify-content-center text-white border-round  p-button-primary"
                      onClick={() => setVisible(true)}
                    >
                      {t(
                        "userpreferreddelivery_button_adduserpreferreddelivery"
                      )}{" "}
                    </Button>
                  </div>
                </div>
              </div>
              <Dialog
                header={
                  isEditMode
                    ? t("userpreferreddelivery_editheader")
                    : t("userpreferreddelivery_addheader")
                }
                visible={visible}
                style={{ width: "50vw" }}
                onHide={hideDialog}
                className="courierprovider-wd"
              >
                <Divider className="mt-0" />
                <form>
                  <div className="p-fluid formgrid grid mb-3">
                    <div className="field col-12">
                      <label htmlFor="day" className="label-semi-bold">
                        {t("userpreferreddelivery_dialog_day")}
                      </label>
                      {categories.map((category) => (
                        <div
                          key={category.key}
                          className="flex align-items-center"
                        >
                          <Checkbox
                            inputId={category.key}
                            name="category"
                            value={category}
                            onChange={onCategoryChange}
                            className="mb-2"
                            checked={selectedCategories.some(
                              (item) => item.key === category.key
                            )}
                          />
                          <label htmlFor={category.key} className="ml-2">
                            {category.key}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-fluid formgrid grid mb-3">
                    <div className="field col-12">
                      <label htmlFor="time" className="label-semi-bold">
                        {t("userpreferreddelivery_dialog_time")}{" "}
                      </label>
                      <span className="p-input-icon-left">
                        <Dropdown
                          value={selectedtime}
                          onChange={(e) => setSelectedtime(e.value)}
                          options={selectTime}
                          optionLabel="time"
                          placeholder={t(
                            "userpreferreddelivery_dialog_timeplaceholder"
                          )}
                          className="w-full provider-text"
                        >
                          <i className="fa fa-clock-o" />
                        </Dropdown>
                      </span>
                    </div>
                  </div>
                  <div className="p-d-flex p-jc-center p-flex-wrap p-gap-2 mt-2 mb-3">
                    <Button
                      type="button"
                      className="primary-button p-component justify-content-center m-2"
                      style={{
                        width: "100px",
                        height: "40px",
                        borderRadius: "4px",
                        float: "right",
                      }}
                      onClick={isEditMode ? handleUpdateClick : handleSaveClick}
                    >
                      {isEditMode
                        ? t("common_update_button")
                        : t("common_save_button")}
                    </Button>
                    <Button
                      type="reset"
                      className="surface-0 text-color-secondary p-component justify-content-center m-2"

                      onClick={handleCancelClick}
                    >
                      {t("common_cancel_button")}
                    </Button>
                  </div>
                </form>
              </Dialog>

              <DataTable
                columns={columns}
                data={filteredUserDeliveryList}
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
  );
};
export default UserPreferredDelivery;
