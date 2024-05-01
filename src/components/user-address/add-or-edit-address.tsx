import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Image } from "primereact/image";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import RouteConstant from "../../constants/route.constants";
import { Card } from "primereact/card";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Dialog } from "primereact/dialog";
import { useTranslation } from "react-i18next";
import UserAddressService from "../../services/useraddress/useraddress.service";
import GetAddressByLocation from "./location-search/get-location";
import { UserEditAddress } from "../../models/user-address-model";
import { CountryModel } from "../../models/country-model";
import { StateModel } from "../../models/state-model";
import { CityModel } from "../../models/city-model";

const AddOrEditAddress = () => {
  const { id } = useParams();
  const isEdit: boolean = id != "0";
  const [isLocationMapVisible, setIsLocationMapVisible] = useState(false);
  const [countries, setCountries] = useState<CountryModel[]>([]);
  const [cities, setCities] = useState<StateModel[]>([]);
  const [states, setStates] = useState<CityModel[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [latLngSelected, setLatLngSelected] = useState<string | null>(null);

  var navigate = useNavigate();
  const { t } = useTranslation();

  const formik: any = useFormik({
    initialValues: {
      id: "",
      name: "",
      addressLine1: "",
      addressLine2: "",
      landMark: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      sameAddressLine1: false
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.addressLine1) {
        errors.addressLine1 = t('editaddress_address_line1_is_required')
      }

      if (!data.landMark) {
        errors.landMark = t('editaddress_Land_mark_is_required')
      }

      if (!data.country) {
        errors.country = t('editaddress_please_select_a_country')
      }

      if (!data.state) {
        errors.state = t('editaddress_please_select_a_state')
      }

      if (!data.city) {
        errors.city = t('editaddress_please_select_a_state')
      }

      if (!data.pincode) {
        errors.pincode = t('editaddress_pin_code')
      }

      return errors;
    },
    onSubmit: async (data: any) => {
      let addressData: UserEditAddress = {
        userAddressID: data.id,
        address1: data.addressLine1,
        address2: data.addressLine2,
        landmark: data.landMark,
        countryID: data.country,
        stateID: data.state,
        cityID: data.city,
        zipcode: data.pincode,
        gpsLocation: latLngSelected
      };

      if (!isEdit) {
        await UserAddressService.addUserAddress(addressData);
      }
      else {
        await UserAddressService.editUserAddress(addressData);
      }
      navigate(RouteConstant.userAddresses)
    }
  });

  const updateLatitudeAndLongitude = (location: string) => {
    if (location) {
      try {
        var locationSplit = location.split(",");
        setLatitude(parseFloat(locationSplit[0]));
        setLongitude(parseFloat(locationSplit[1]));
        setLatLngSelected(location);
       
      } catch {

      }
    }
  }

  async function fetchData(addressId: number) {
    var userAddresses: any = await UserAddressService.getUserAddress();
    var userAddress: any = userAddresses.find((x: any) => x.userAddressID === addressId);
    if (userAddress) {
      let countryId: number = await getCountryIdByName(userAddress.countryName);
      let stateId: number = await getStateIdByName(countryId, userAddress.stateName);
      let cityId: number = await getCityIdByName(stateId, userAddress.cityName);
      FetchStates(countryId);
      FetchCities(stateId);
      UserAddressService.getCities(stateId).then(r => setCities(r));
      updateLatitudeAndLongitude(userAddress.gpsLocation);

      formik.setValues({
        "id": userAddress.userAddressID,
        "name": userAddress.userName,
        "addressLine1": userAddress.address1,
        "addressLine2": userAddress.address2,
        "landMark": userAddress.landmark,
        "country": countryId,
        "state": stateId,
        "city": cityId,
        "pincode": userAddress.zipcode,
        "sameAddressLine1": userAddress.sameAddressLine1
      });
    } else {
      navigate(RouteConstant.userAddresses)
    }
  }

  useEffect(() => {
    UserAddressService.getCountries().then(r => setCountries(r));
    if (isEdit) {
      let addressId: number = id != null ? parseInt(id) : 0;
      fetchData(addressId);
    }
  }, []);

  const getCountryIdByName = async (countryName: string) => {
    var countryList: any = await UserAddressService.getCountries();
    var country: any = countryList.find((x: any) => x.name === countryName);
    return country.countryID;
  };

  const getStateIdByName = async (countryId: number, stateName: string) => {
    let stateList: any = await UserAddressService.getStates(countryId);
    let state: any = stateList.find((x: any) => x.name === stateName);
    return state.stateID;
  };

  const getCityIdByName = async (stateId: number, cityName: string) => {
    let cityList: any = await UserAddressService.getCities(stateId);
    let city: any = cityList.find((x: any) => x.name === cityName);
    return city.cityID;
  };

  const FetchStates = (countryId: number) => {
    UserAddressService.getStates(countryId).then(r => setStates(r));
  };

  const FetchCities = (stateId: number) => {
    UserAddressService.getCities(stateId).then(r => setCities(r));
  };

  const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: any) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  const updateGpsLocation = useCallback(async (latLng: any) => {
    setIsLocationMapVisible(false);
    setLatLngSelected(latLng);
    updateLatitudeAndLongitude(latLng);
    if(isEdit && latLng && id != null){
      UserAddressService.updateGPSLocation(parseInt(id),latLng);
    }
    
  }, []);

  const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("editaddress_breadcrumb_editaddress") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg", title: t("useraddress_breadcrumb_label") }

  return (
    <>
      <BreadCrumbCustom items={breadCrumbItems.items} home={breadCrumbItems.home} backgroundImage={breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>

      <div className="container-fluid Address-form-container layout-content mt-3 mb-3">
        <div className="col-12">
          <h5 className='mobile-txt-fnt mb-0'>
            <Link to={RouteConstant.userAddresses} className="history-title">
              <i className="pi pi-arrow-left"></i>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp; {isEdit ? t('editaddress_edit_address') : t('editaddress_add_address')}
          </h5>
        </div>

        <div className="flex flex-column md:flex-row">
          <div className="col-9 p-0">
            <Card className="user-address-card border-1 surface-border">
              <form onSubmit={formik.handleSubmit} className="flex flex-column">

                <div className="p-fluid formgrid grid">

                  <div className="field col-12 ">
                    <label htmlFor="addressLine1" className="label-semi-bold">{t('editaddress_address_line_1')}<span className="required">*</span></label>
                    <span className="p-input-icon-left">
                      <i className="fa-solid fa-home text-area-icon" />
                      <InputTextarea placeholder={t('editaddress_please_enter_address_line1')} rows={2} name="addressLine1" id="addressLine1" value={formik.values.addressLine1}
                        onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.addressLine1 })}
                      />
                    </span>
                    {getFormErrorMessage('addressLine1')}
                  </div>

                  <div className="field col-12 ">
                    <label htmlFor="addressLine2" className="label-semi-bold">{t('editaddress_address_line_2')}</label>
                    <span className="p-input-icon-left">
                      <i className="fa-solid fa-home text-area-icon" />
                      <InputTextarea placeholder={t('editaddress_please_enter_address_line2')} rows={2} name="addressLine2" id="addressLine2" value={formik.values.addressLine2}
                        onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.addressLine2 })}
                      />
                    </span>
                    {getFormErrorMessage('addressLine2')}
                  </div>

                  <div className="field col-12 ">
                    <label htmlFor="landMark" className="label-semi-bold">{t('editaddress_land_mark')}<span className="required">*</span></label>
                    <span className="p-input-icon-left">
                      <i className="fa-solid fa-home text-area-icon" />
                      <InputTextarea placeholder={t('editaddress_please_enter_land_mark')} value={formik.values.landMark || ""} rows={2} name="landMark" id="landMark"
                        onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.landMark })}
                      />
                    </span>
                    {getFormErrorMessage('editaddress_land_mark')}
                  </div>

                  <div className="grid col-12">
                    <div className="col-12 md:col-4">
                      <label htmlFor="country" className="label-semi-bold">{t('editaddress_country')}<span className="required">*</span></label>
                      <Dropdown
                        value={formik.values.country}
                        onChange={(e) => {
                          formik.handleChange(e);
                          FetchStates(e.target.value);
                        }}
                        options={countries}
                        optionLabel="name"
                        optionValue="countryID"
                        name="country"
                        id="country"
                        placeholder={t('editaddress_select_country')}
                        className={classNames({ 'p-invalid': formik.errors.country })}
                      />
                      {getFormErrorMessage('country')}
                    </div>

                    <div className="col-12 md:col-4">
                      <label htmlFor="state" className="label-semi-bold">{t('editaddress_state')}<span className="required">*</span></label>
                      <Dropdown
                        value={formik.values.state}
                        onChange={(e) => {
                          formik.handleChange(e);
                          FetchCities(e.target.value);
                        }}
                        options={states}
                        optionLabel="name"
                        optionValue="stateID"
                        name="state"
                        id="state"
                        placeholder={t('editaddress_select_state')}
                        className={classNames({ 'p-invalid': formik.errors.state })}
                      />
                      {getFormErrorMessage('state')}
                    </div>

                    <div className="col-12 md:col-4">
                      <label htmlFor="city" className="label-semi-bold">{t('editaddress_city')}<span className="required">*</span></label>
                      <Dropdown
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        options={cities}
                        optionLabel="name"
                        optionValue="cityID"
                        name="city"
                        id="city"
                        placeholder={t('editaddress_select_city')}
                        className={classNames({ 'p-invalid': formik.errors.city })}
                      />
                      {getFormErrorMessage('city')}
                    </div>
                  </div>

                  <div className="grid col-12">
                    <div className="field col-12 md:col-6">
                      <label htmlFor="pincode">{t('editaddress_pincode')}<span className="required">*</span> </label>
                      <span className="p-input-icon-left">
                        <i className="pi pi-hashtag" />
                        <InputText type="text" name="pincode" id="pincode" placeholder={t('editaddress_please_enter_pincode')} value={formik.values.pincode}
                          onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.pincode })}
                        />
                      </span>
                      {getFormErrorMessage('pincode')}
                    </div>
                    <div className="field col-12 md:col-6">
                      <label></label>
                      <span className="p-inputgroup get-location-btn">
                        <Button type="button" severity="secondary" label={latLngSelected ? "Edit Location" : "Add Location"} icon="fa-solid fa-map-location-dot"
                          value={formik.values.secondary} outlined onClick={() => setIsLocationMapVisible(true)}></Button>
                      </span>
                    </div>
                  </div>

                  <div className="col-12 flex justify-content-end">
                    <div>
                      <Button
                        type="submit"
                        className="bg-primary"
                        label={isEdit ? t('common_update_button') : t('common_add_button')}
                        severity="success"
                      />
                    </div>
                  </div>

                </div>
              </form>
            </Card>
          </div>
          <div className="col-3 flex bg-light-green justify-content-center ">
            <Image width="150" src={process.env.PUBLIC_URL + '/assests/images/homelogo.png'} alt="Image" className="align-self-center align-items-center" />
          </div>
        </div>
      </div>

      <Dialog
        header="Search your location"
        className='location-dialog'
        visible={isLocationMapVisible}
        onHide={() => setIsLocationMapVisible(false)}
        footer={""}
        style={{ width: "50%" }}
      >
        <GetAddressByLocation getLatitudeLongitude={updateGpsLocation} lat={latitude} lng={longitude}></GetAddressByLocation>
      </Dialog>
    </>
  );
};

export default AddOrEditAddress;
