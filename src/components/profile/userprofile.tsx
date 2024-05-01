import { useEffect, useRef, useState } from "react";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from "primereact/divider";
import { useFormik } from "formik";
import RouteConstant from "../../constants/route.constants";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useTranslation } from "react-i18next";
import UserService from "../../services/user/user.service";
import { UserModel } from "../../models/user-model";
import { ResponseModel } from "../../models/response/response-model";
import AuthService from "../../services/autentication/auth.service";
import { ForGotPasswordModel } from "../../models/authentication/forgot-password.model";
import UserPasswordService from "../../services/user/user-password.service";

const Profile = () => {
    const { t } = useTranslation();
    const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("profile_breadcrumb_label") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg", title: t("profile_breadcrumb_label") }

    const toast = useRef<Toast | null>(null);
    const [editProfileClicked, setEditProfileClicked] = useState(false);
    const [isInputEditable, setInputEditable] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>([]);
    const [isPhoneNumberVerificationRequired, setIsPhoneNumberVerificationRequired] = useState(false);
    const [isOtpRequestInProgress, setIsOtpRequestInProgress] = useState(false);
    const [isOtpRequestSent, setIsOtpRequestSent] = useState(false);

    const showToastMessage = (severity: any, summary: string, detail: string) => {
        toast?.current?.show({ severity, summary, detail });
    };

    const formik: any = useFormik({
        initialValues: {
            name: "",
            email: "",
            gst: "",
            phonenumber: "",
            anothername: "",
            anotherphonenumber: "",
            address: "",
            otp: ''
        },
        validate: (data: any) => {
            let errors: any = {};

            if (!data.name) {
                errors.name = t("profile_validation_name")
            }
            if (!data.phonenumber) {
                errors.phonenumber = t("profile_validation_phoneNumber")
            }

            if (data.phonenumber && currentUser?.primaryContactNbr && data.phonenumber?.toString() != currentUser?.primaryContactNbr ) {
                setIsPhoneNumberVerificationRequired(true);
               
            } else {
                setIsPhoneNumberVerificationRequired(false);
            }

            return errors;
        },
        onSubmit: async (data: any) => {

            var user: UserModel = {
                email: data.email,
                name: data.name,
                primaryContactNbr: data.phonenumber?.toString(),
                secondaryContactNbr: data.anotherphonenumber?.toString(),
                gsT_Number: data.gst
            }
            if (!isPhoneNumberVerificationRequired || (isPhoneNumberVerificationRequired && isOtpRequestSent)) {
                let response: ResponseModel = await UserService.updateUserProfile(user, data.otp);
                if (response != null && response.isSuccess) {
                    setEditProfileClicked(false);
                    setInputEditable(false);
                    setIsOtpRequestInProgress(false);
                    setIsOtpRequestSent(false);
                    await loadCurrentUserData();
                    showToastMessage('success', 'Success', t("common_save_successmessage"));
                }
                else {
                    showToastMessage('error', 'Error', response.message);
                }
            } else {
                showToastMessage('error', 'Error', "Please verify the phone number.");/*LT*/

            }
            return;
        }
    });


    const sendOTP = async (event: any) => {
        if (formik.values.phonenumber) {
            const data: ForGotPasswordModel = {
                phoneNumber: formik.values.phonenumber?.toString()
            }
            setIsOtpRequestInProgress(true);
            let response = await UserPasswordService.phonenumberUpdateSendOTP(data);
            if (response?.isSuccess) {
                setIsOtpRequestInProgress(false);
                setIsOtpRequestSent(true);
            }
            else {
                if (!response?.isSuccess) {
                    formik.errors["phonenumber"] = response.message;
                }
                setIsOtpRequestInProgress(false);
                setIsOtpRequestSent(false);
            }
        } else {
            //for validating form originally it won't send the form
            formik.submitForm();
        }

    }
    const loadCurrentUserData = async () => {
        try {
            // Perform asynchronous operations, like fetching data from an API
            const data: any = await UserService.getCurrentUser();
            setCurrentUser(data);
            formik.setValues({
                "name": data?.name,
                "email": data?.email,
                "gst": data?.gsT_Number,
                "phonenumber": data?.primaryContactNbr,
                "anothername": data?.name,
                "anotherphonenumber": data?.secondaryContactNbr,
                "address": ""
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Perform asynchronous operations, like fetching data from an API
                const data: any = await UserService.getCurrentUser();
                setCurrentUser(data);
                formik.setValues({
                    "name": data?.name,
                    "email": data?.email,
                    "gst": data?.gsT_Number,
                    "phonenumber": data?.primaryContactNbr,
                    "anothername": data?.name,
                    "anotherphonenumber": data?.secondaryContactNbr,
                    "address": ""
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the async function
        fetchData();
    }, []);

    const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: any) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : "";
    };

    const navigate = useNavigate();

    const handleEditProfileClick = () => {
        setEditProfileClicked(true);
        setInputEditable(true);
    };

    const handlePasswordClick = () => {
        navigate(RouteConstant.userPassword);
    };



    const handleSavePictureClick = () => {
        showToastMessage('success', 'Success', t("common_save_successmessage"));
    }

    const logoutUser = () => {
        confirmDialog({
            className: 'logout-modal',
            message: t("profile_logout_confirmmessage"),
            header: t("profile_logout_label"),
            acceptClassName: 'p-button-danger',
            rejectClassName: 'surface-0 text-color-secondary',
            acceptLabel: t("profile_logout_label"),
            rejectLabel: t("common_cancel_button"),
            accept: accept,
            reject: reject,
        });
    };

    const accept = () => {
        toast?.current?.show({
            severity: 'success',
            summary: 'Logging out', /*LT*/
            detail: 'logging out....',
            life: 3000
        });/*LT*/
        AuthService.logout();
        navigate(RouteConstant.login);
    }

    const reject = () => {
    };

    const backButtonLabel = editProfileClicked ? t("profile_backbutton_label") : t("profile_backarrow_label");
    const handleBackClick = () => {
        if (editProfileClicked) {
            // If in edit mode, exit the edit mode
            setEditProfileClicked(false);
            setInputEditable(false);
            formik.setErrors({});
            setIsPhoneNumberVerificationRequired(false);
            setIsOtpRequestSent(false);
            setIsOtpRequestInProgress(false);
            loadCurrentUserData();
        }
        else {
            navigate(RouteConstant.products);
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <BreadCrumbCustom
                items={breadCrumbItems.items}
                home={breadCrumbItems.home}
                backgroundImage={breadCrumbItems.backgroundImage}
                title={breadCrumbItems.title}
            ></BreadCrumbCustom>
            <div className="Address-form-container layout-content mt-3 mb-3">
                {/* <Link to={editProfileClicked ? RouteConstant.profile : RouteConstant.layout}> */}
                <div className="col-12">
                    <h5 className='mobile-txt-fnt mb-0'>
                        <span className="site-nav mobile-txt-fnt" onClick={handleBackClick}>
                            <i className="pi pi-arrow-left"></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;{backButtonLabel}
                        </span>
                    </h5>
                </div>
                {/* </Link> */}
                <div className="grid user-page">
                    {editProfileClicked ? null : (
                        <div className="col-12  md:col-4 lg:col-4 xl:col-3 pl-0 pt-0">
                            <Card className="border-1 surface-border h-full">
                                <div>
                                    <div className="flex align-items-center justify-content-center">
                                        <img
                                            src={process.env.PUBLIC_URL + '/assests/images/user-image.png'}
                                            alt="User Avatar"
                                            width={74}
                                            height={74}
                                        ></img>
                                    </div>

                                    <div className="sub-header">
                                        <h4 className="mb-1 mt-3">{currentUser?.name}</h4>
                                        <span className="mb-1 txt-grey">{currentUser?.email}</span>
                                        <span className="p-inputgroup-icon-left txt-grey">
                                            <i className="fa-solid fa-map-marker"></i>{currentUser?.address}
                                        </span>
                                    </div>
                                </div>
                                <div className="grid pt-8">
                                    <div className="col-12">
                                        <div className="p-d-flex p-jc-center p-flex-wrap p-gap-2">
                                            <div className="flex flex-column align-items-center flex-wrap justify-content-center">
                                                <Button className="button-align blue w-12 flex flex-1 flex-wrap bg-info-500 mb-2 surface-border" onClick={handleEditProfileClick}>
                                                    <i className="fa-solid fa-edit pr-2"></i>
                                                    <span>{t("profile_editbutton")}</span>
                                                </Button>
                                                <Button className="button-align w-12 flex flex-1 flex-wrap p-button-primary mb-2 surface-border" onClick={handlePasswordClick}>
                                                    <i className="fa-solid fa-key pr-2"></i>
                                                    <span>{t("profile_changepassword_button")}</span>
                                                </Button>
                                                <div className="col-8 col-offset-0">
                                                    <ConfirmDialog />
                                                </div>
                                                <Toast ref={toast} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                   
                    <div className={editProfileClicked ? "col-12 pt-0 pl-0" : "col-12  md:col-8 lg:col-8 xl:col-9 pt-0 pl-0"}>
                        <Card className="border-1 surface-border" header={editProfileClicked ? <div className="edit-details">{t("profile_editdetails_header")}</div> : null}>
                            <form onSubmit={formik.handleSubmit} className="flex flex-column">
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 sm:col-12 md:col-12 lg:col-6 ">
                                        <label htmlFor="name" className="label-semi-bold">{t("profile_edit_name")}<span className="required">*</span></label>
                                        <span className="p-input-icon-left">
                                            <i className="fa-solid fa-user" />
                                            <InputText type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.name })} readOnly={!isInputEditable} />
                                        </span>
                                        {formik.errors.name && <small className="p-error">{formik.errors['name']}</small>}
                                    </div>
                                </div>

                                <div className="p-fluid  grid">
                                    <div className="field col-12 sm:col-12 md:col-12 lg:col-6 ">
                                        <label htmlFor="email" className="label-semi-bold">{t("profile_edit_email")}</label>
                                        <span className="p-input-icon-left">
                                            <i className="fa-solid fa-envelope" />
                                            <InputText type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.email })} readOnly={!isInputEditable} />
                                        </span>
                                        {getFormErrorMessage('email')}
                                    </div>

                                    <div className="field col-12 sm:col-12 md:col-12 lg:col-6 ">
                                        <label htmlFor="gst" className="label-semi-bold">{t("profile_edit_gstNo")}</label>
                                        <span className="p-input-icon-left">
                                            <i className="fa-solid fa-percentage" />
                                            <InputText type="text" name="gst" id="gst" value={formik.values.gst} onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.gst })} readOnly={!isInputEditable} />
                                        </span>
                                        {getFormErrorMessage('gst')}
                                    </div>
                                </div>
                                <div className="p-fluid grid">
                                    <div className="field col-6 sm:col-12 md:col-12 lg:col-6 ">
                                        <label htmlFor="phonenumber" className="label-semi-bold">{t("profile_edit_phonenumber")}<span className="required">*</span></label>
                                        <span className="p-input-icon-left">
                                            <i className="fa-solid fa-phone" />
                                            <InputText type="number" name="phonenumber" id="phonenumber" value={formik.values.phonenumber} onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.phonenumber })} readOnly={!isInputEditable} />
                                        </span>
                                        {formik.errors.phonenumber && <small className="p-error">{formik.errors['phonenumber']}</small>}
                                        {isInputEditable && isPhoneNumberVerificationRequired && <><br></br><span className="text-primary">Phone number update require verification.</span></> /*LT*/}
                                        
                                        {isInputEditable && isPhoneNumberVerificationRequired && !isOtpRequestSent &&
                                            <div className="col-6  md:col-4 lg:col-6 mb-2" >
                                                <Button type="button" className="sm-btn" onClick={sendOTP} label={isOtpRequestInProgress ? "sending.." : "Send OTP"} loading={isOtpRequestInProgress}  > </Button>{/*LT*/}
                                            </div>
                                        }
                                        {isInputEditable && isPhoneNumberVerificationRequired && isOtpRequestSent &&
                                            <div className="p-fluid grid">
                                                <div className="field col-6 sm:col-12 md:col-12 lg:col-6 ">
                                                    <label htmlFor="otp" className="label-semi-bold">OTP</label>
                                                    <span className="p-input-icon-left">
                                                        <i className="fa-solid fa-mobile" />
                                                        <InputText type="text" name="otp" id="otp" value={formik.values.otp} onChange={formik.handleChange} className={classNames({ 'p-invalid': false })} />
                                                    </span>
                                                    {formik.errors.otp && <small className="p-error">{formik.errors['otp']}</small>}
                                                </div>
                                            </div>
                                        }
                                    </div>

                                    <div className="field col-6 sm:col-12 md:col-12 lg:col-4 ">
                                        <label htmlFor="anotherphonenumber" className="label-semi-bold">{t("profile_edit_anotherphonenumber")}</label>
                                        <span className="p-input-icon-left">
                                            <i className="fa-solid fa-phone" />
                                            <InputText type="number" name="anotherphonenumber" id="anotherphonenumber" value={formik.values.anotherphonenumber} onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.anotherphonenumber })} readOnly={!isInputEditable} />
                                        </span>
                                        {getFormErrorMessage('anotherphonenumber')}
                                    </div>
                                </div>


                                {editProfileClicked ? (
                                    <div className="edit-add-btns p-d-flex p-jc-center p-flex-wrap p-gap-2">
                                        <div className="p-inputgroup">
                                            <span className="new-address">
                                                <i className="fa-solid fa-plus" />
                                                <Link className="text-blue-500 font-semibold ml-2" to={process.env.PUBLIC_URL + "/add-edit-address/0"}>{t("profile_edit_newaddress")}</Link>
                                            </span>
                                        </div>
                                        <div className="btn-wrap">
                                            <Button
                                                type="submit"
                                                disabled={isPhoneNumberVerificationRequired && !isOtpRequestSent}
                                                className="primary-button p-component justify-content-center "
                                                style={{ width: "100px", height: "40px", borderRadius: "4px", marginLeft: "16px", marginBottom: "6px", float: 'right' }}
                                            >{t("common_save_button")}
                                            </Button>
                                            <Button
                                                type="reset"
                                                className="surface-0 text-color-secondary p-component justify-content-center "
                                                style={{ width: "100px", height: "40px", borderRadius: "4px", marginBottom: "6px", float: 'right' }}
                                                onClick={handleBackClick}
                                            >
                                                {t("common_cancel_button")}
                                            </Button>
                                        </div>
                                    </div>
                                ) : null}
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Profile;