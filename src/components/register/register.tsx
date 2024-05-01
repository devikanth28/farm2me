import { useContext, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Image } from "primereact/image";
import { Dropdown } from "primereact/dropdown";
import { LayoutContext } from "../layout/context/layoutcontext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import AuthService from "../../services/autentication/auth.service";
import RouteConstant from "../../constants/route.constants";
import { ResponseModel } from "../../models/response/response-model";
import Helpers from "../../utils/helpers";
import UserPasswordService from "../../services/user/user-password.service";
import { ForGotPasswordModel } from "../../models/authentication/forgot-password.model";
import { AuthenticateModel } from "../../models/authentication/validating-password-model";
import { RegistrationMobileSendOtpModel } from "../../models/authentication/registration-mobile-verification.model";
import { Password } from "primereact/password";
import RoleService from "../../services/role/role-service";

interface RegisterProps {
    isAdminUser?: boolean;
    hideAdminModal: (value:boolean) => void;
  }
  

const Register = ({ isAdminUser = true, hideAdminModal = () => {} }: RegisterProps) => {

    var navigate = useNavigate();
    const { t } = useTranslation();
    const [isAnyApiError, setAnyApiError] = useState(false);
    const tenantGuid: string = process.env.REACT_APP_TENAT_ID ?? "";
    const [isOtpRequestInProgress, setIsOtpRequestInProgress] = useState(false);
    const [isOtpRequestSent, setIsOtpRequestSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(true);


   

    const formik: any = useFormik({
        initialValues: {
            title: { name: "Mr", code: "Mr" },
            contactName: "",
            primaryNumber: "",
            secondaryNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeTermsAndConditions: false,
            otp: ""
        },
        validate: (data: any) => {
            setAnyApiError(false);

            let errors: any = {};

            if (!data.title) {
                errors.title = t('register_title_is_required')
            }

            if (!data.contactName) {
                errors.contactName = t('register_contact_name_is_required')
            }
            console.log(data.primaryNumber)
            if (!data.primaryNumber) {
                errors.primaryNumber = t('register_primary_number_is_required')
            }

            if (data.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = "Not a valid email"/*LT*/
            }

            if (!data.password) {
                errors.password = t('register_password_is_required')
            } else if ((!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/i.test(data.password))) {
                errors.password = "Password must contain at least one uppercase, one lowercase, one special character, and one number with a minimum of eight characters";
            }/*LT*/

            if (!data.confirmPassword) {
                errors.confirmPassword = t('register_confirm_password_is_required')
            }

            if (!data.confirmPassword) {
                errors.confirmPassword = t('register_confirm_password_is_required')
            } else if (data.password !== data.confirmPassword) {
                errors.confirmPassword = t('register_passwords_do_not_match');
            }

            if(!RoleService.isAdmin() && !data.agreeTermsAndConditions){
                    errors.agreeTermsAndConditions = t('register_please_agree_terms_and_conditions')
            }

            


            return errors;
        },
        onSubmit: async (data: any) => {

            var user = {
                "tenantGUID": tenantGuid,
                "name": data.contactName,
                "primaryContactNbr": data.primaryNumber?.toString(),
                "secondaryContactNbr": data.secondaryNumber?.toString(),
                "email": data.email,
                "title": data.title.code,
                "password": data.password,
                "otp": data.otp,
                "roleID":3
            };

            
 
            var userRegister: ResponseModel = RoleService.isAdmin() ?  await AuthService.createUser(user) :await AuthService.register(user);
           
            const closeDialogModal = () => {
                hideAdminModal(false)
            }
            
            Helpers.ConsoleLog(userRegister);
            if(userRegister.isSuccess){
                if(RoleService.isAdmin()){
                    closeDialogModal()
                }
                else{
                    navigate(RouteConstant.login)
                }
            }
            else {
                setAnyApiError(true);
                return formik.errors["userError"] = userRegister.message;
            }
        }
    });

    const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: any) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : "";
    };

    const verifyOTP = async (event: any) => {
        if (formik.values.otp) {
            const data: ForGotPasswordModel = {
                phoneNumber: formik.values.primaryNumber?.toString()
            }
            setIsOtpRequestInProgress(true);
            var authenticateModel: AuthenticateModel = { mobileNumber: formik.values.primaryNumber?.toString(), otp: formik.values.otp };

            let response = await UserPasswordService.forgotPasswordVerifyOTP(authenticateModel);
            if (response?.isSuccess) {
                setIsOtpRequestInProgress(false);
                setIsOtpVerified(true);
            }
            else {
                if (!response?.isSuccess) {
                    formik.errors["userError"] = response.message;
                }
                setIsOtpRequestInProgress(false);
                setIsOtpVerified(false);
            }
        } else {
            //for validating form originally it won't send the form
            formik.submitForm();
        }
    }

    const sendOTP = async (event: any) => {
        if (formik.values.primaryNumber) {
            const data: RegistrationMobileSendOtpModel = {
                mobileNo: formik.values.primaryNumber?.toString(),
                tenantGUID: tenantGuid
            }
            setIsOtpRequestInProgress(true);
            let response = await UserPasswordService.sendUserRegistrationOTP(data);
            if (response?.isSuccess) {
                setIsOtpRequestInProgress(false);
                setIsOtpRequestSent(true);
            }
            else {
                if (!response?.isSuccess) {
                    formik.errors["userError"] = response.message;
                }
                setIsOtpRequestInProgress(false);
                setIsOtpRequestSent(false);
            }
        } else {
            //for validating form originally it won't send the form
            formik.submitForm();
        }

    }

    const { layoutConfig } = useContext(LayoutContext);
    const dropdownItems = [
        { name: "Mr", code: "Mr" },
        { name: "Miss", code: "Miss" }
    ];

    const containerClassName = classNames(
        "surface-ground flex min-h-screen min-w-screen overflow-hidden",
        { "p-input-filled": layoutConfig.inputStyle === "filled" }
    );
const isAdminConatinerClassName = classNames("p-input-filled");
    return (
        <div className={RoleService.isAdmin()? isAdminConatinerClassName: containerClassName}>
            <div className={`${!RoleService.isAdmin()?'flex flex-1 flex-row grid':""}`}>
                {isAdminUser && <div className="col-12 md:col-6 lg:col-6 p-5 flex flex-column justify-content-center flex-wrap cursor-pointer" onClick={() => navigate(RouteConstant.products)} >
                    <div className="flex flex-1 align-items-center justify-content-center">
                        <Image src={process.env.PUBLIC_URL + "/assests/images/logo.png"} className="flex flex-wrap align-items-center justify-content-center" width="25%" />
                    </div>
                    <div className="flex flex-1 align-items-center justify-content-center">
                        <Image src={process.env.PUBLIC_URL + "/assests/images/form2me-fruits.png"} className="flex flex-wrap align-items-center justify-content-center" width="80%" />
                    </div>
                </div>}
                
                <div className={`${!RoleService.isAdmin()? 'col-12 md:col-6 lg:col-6  flex align-items-stretch flex-wrap':""}`}>
                    <div className="flex flex-1 bg-white align-items-center justify-content-center">
                        <div className="login-panel" >
                            <form onSubmit={formik.handleSubmit} >
                                <h5 className={`${RoleService.isAdmin()?'border-round mb-3 order-top-color p-2 panel-header-text text-center':'panel-header-text'}`}>{t('register_create_your_account')}</h5>
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 mb-2">
                                        <label htmlFor="primaryNumber" className="label-semi-bold">{t('register_primary_contact_number')}<span className="required">*</span></label>
                                        <span className="p-input-icon-left">
                                            <i className="fa-solid fa-phone" />
                                            <InputText type="number" disabled={!RoleService.isAdmin()} id="primaryNumber" name="primaryNumber" onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.primaryNumber })} placeholder={t('register_enter_your_contact_number')} />
                                        </span>
                                        {getFormErrorMessage('primaryNumber')}
                                    </div>
                                    {isOtpRequestSent && !isOtpVerified &&
                                        <div className="field col-12  mb-2" >
                                            <label htmlFor="lastname2" className="label-semi-bold">{t('forgotpassword_enter_your_otp_code')}<span className="required">*</span></label>
                                            <span className="p-input-icon-right">
                                                <InputText type="number" name="otp" id="otp" onChange={formik.handleChange} placeholder={t('forgotpassword_otp')} className={classNames({ 'p-invalid': formik.errors.otp })} />
                                                <i className="fa-sharp fa-light fa-shield-check" />
                                            </span>
                                            {getFormErrorMessage('otp')}
                                        </div>
                                    }
                                    {isOtpVerified &&
                                        <>
                                            <div className="col-12">

                                                <div className="grid">
                                                    <div className="col-12 md:col-6 lg:col-3 mb-2">
                                                        <div className="field">
                                                            <label htmlFor="title" className="label-semi-bold">{t('register_title')}<span className="required">*</span></label>
                                                            <Dropdown
                                                                id="title"
                                                                name="title"
                                                                className={classNames({ 'p-invalid': formik.errors.title })}
                                                                value={formik.values.title}
                                                                onChange={formik.handleChange}
                                                                options={dropdownItems}
                                                                optionLabel="name"
                                                                placeholder="Mr"
                                                            ></Dropdown>
                                                            {getFormErrorMessage('title')}
                                                        </div>
                                                    </div>
                                                    <div className="col-12 md:col-6 lg:col-9 mb-2">
                                                        <div className="field">
                                                            <label htmlFor="contactName" className="label-semi-bold">{t('register_name')}<span className="required">*</span></label>
                                                            <span className="p-input-icon-left">
                                                                <i className="fa-solid fa-circle-user" />
                                                                <InputText type="text" id="contactName" name="contactName" onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.contactName })} placeholder={t('register_enter_your_name')} />
                                                            </span>
                                                            {getFormErrorMessage('contactName')}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="field col-12 mb-2">
                                                <label htmlFor="secondaryNumber" className="label-semi-bold">{t('register_secondary_contact_number')}</label>
                                                <span className="p-input-icon-left">
                                                    <i className="fa-solid fa-phone" />
                                                    <InputText type="number" name="secondaryNumber" id="secondaryNumber" onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.secondaryNumber })} placeholder={t('register_enter_your_contact_number')} />
                                                </span>
                                                {getFormErrorMessage('secondaryNumber')}
                                            </div>
                                            <div className="field col-12 mb-2">
                                                <label htmlFor="email" className="label-semi-bold">{t('register_email')}</label>
                                                <span className="p-input-icon-left">
                                                    <i className="fa-solid fa-envelope" />
                                                    <InputText type="text" name="email" id="email" onChange={formik.handleChange} className={classNames({ 'p-invalid': formik.errors.email })} placeholder={t('register_enter_your_email')} />
                                                </span>
                                                {getFormErrorMessage('email')}
                                            </div>
                                            <div className="field col-12 mb-2">
                                                <label htmlFor="password" className="label-semi-bold">{t('register_create_password')}<span className="required">*</span></label>
                                                <span className="p-input-icon-left">
                                                    <i className="fa-solid fa-lock" />
                                                    <Password
                                                        inputId="password"
                                                        name="password"
                                                        className={classNames({ 'p-invalid': formik.errors.password })}
                                                        feedback={false}
                                                        onChange={formik.handleChange}
                                                        placeholder={t('register_create_password')} 
                                                        toggleMask
                                                    />
                                                </span>
                                                {getFormErrorMessage('password')}
                                            </div>
                                            <div className="field col-12 mb-2">
                                                <label htmlFor="confirmPassword" className="label-semi-bold">{t('register_confirm_password')}<span className="required">*</span></label>
                                                <span className="p-input-icon-left">
                                                    <i className="fa-solid fa-lock" />
                                                    <Password
                                                        inputId="confirmPassword"
                                                        name="confirmPassword"
                                                        className={classNames({ 'p-invalid': formik.errors.confirmPassword })}
                                                        feedback={false}
                                                        onChange={formik.handleChange}
                                                        placeholder={t('register_confirm_password')} 
                                                        toggleMask
                                                    />
                                                </span>
                                                {getFormErrorMessage('confirmPassword')}
                                            </div>
                                            <div className="field col-12 mb-2">
                                                <div className="field-checkbox col-12">
                                                    <Checkbox
                                                        id="agreeTermsAndConditions"
                                                        name="agreeTermsAndConditions"
                                                        onChange={(e) => {
                                                            formik.setFieldValue('agreeTermsAndConditions', e.checked);
                                                        }}
                                                        checked={formik.values.agreeTermsAndConditions}
                                                    />
                                                    <label htmlFor="agreeTermsAndConditions">{t('register_i_agree_to')} <span className="link-text cursor-pointer" onClick={() => { window.open(RouteConstant.registerTermsAndConditions, '_blank', 'rel=noopener noreferrer') }}>{t('register_all_terms_conditions')}</span><span className="required">*</span></label>
                                                </div>
                                                {getFormErrorMessage('agreeTermsAndConditions')}
                                            </div>
                                        </>
                                    }

                                    {
                                        formik.errors['userError'] &&
                                        <div className="col-12 mb-2" >
                                            <small className="p-error">{formik.errors['userError']}</small>
                                        </div>
                                    }
                                    {
                                        !isOtpRequestSent && !isOtpVerified &&
                                        <div className="col-12 mb-2" >
                                            <Button type="button" onClick={sendOTP} label={isOtpRequestInProgress ? "sending.." : "Send OTP"} loading={isOtpRequestInProgress}  > </Button>{/*LT*/}
                                        </div>
                                    }
                                    {
                                        isOtpRequestSent && !isOtpVerified &&
                                        <div className="col-12 mb-2" >
                                            <Button type="button" onClick={verifyOTP} label={isOtpRequestInProgress ? "Verifing.." : "Verify OTP & Continue.."} loading={isOtpRequestInProgress}  > </Button>{/*LT*/}
                                        </div>
                                    }
                                    {
                                        isOtpVerified &&
                                        <>
                                            <div className="col-12 mb-2" >
                                                <Button type="submit" label={t('register_sign_up')} > </Button>
                                                <div className="dont-have-anaccount">{t('register_do_not_have_an_account')}? <span className="primary-text-color" onClick={() => { navigate(RouteConstant.login) }} >{t('register_login')}</span></div>
                                            </div>
                                        </>
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
