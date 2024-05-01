import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import RouteConstant from "../../constants/route.constants";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import { ChangePasswordModel } from "../../models/authentication/change-password-model";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import UserPasswordService from "../../services/user/user-password.service";
import { ResetPasswordModel } from "../../models/authentication/reset-password-model";
import { Password } from "primereact/password";

export interface UserPasswordProps {
    isResetPasswordPage: boolean;
}

const UserPassword = (UserPasswordProps: UserPasswordProps) => {
    const { mobileNumber } = useParams();
    const { t } = useTranslation()
    const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("profile_breadcrumb_label") }, { label: t("profile_password_breadcrumb_label") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg", title: UserPasswordProps.isResetPasswordPage ? "Reset password" : t("profile_breadcrumb_label") }
    const navigate = useNavigate();

    const handleProfileBreadcrumbClick = () => {
        navigate(RouteConstant.profile);
    };

    const formik: any = useFormik({
        initialValues: {
            userID: 9, /*hardcoded*/
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        validate: (data: any) => {
            let errors: any = {};

            if (!UserPasswordProps.isResetPasswordPage && !data.oldPassword) {
                errors.oldPassword = t("profile_password_validation_oldpassword");
            }

            if (!data.newPassword) {
                errors.newPassword = t("profile_password_validation_newpassword");
            } else if (!isPasswordValid(data.newPassword)) {
                errors.newPassword = t("profile_password_criteria");
            }

            if (!data.confirmPassword) {
                errors.confirmPassword = t("profile_password_validation_confirmpassword");
            } else if (data.newPassword !== data.confirmPassword) {
                errors.confirmPassword = t("profile_password_newpassword_compare");
            }

            return errors;
        },
        onSubmit: async (data: ChangePasswordModel) => {

            if (!UserPasswordProps.isResetPasswordPage) {
                let response = await UserPasswordService.changePassword(data);
                if (response?.isSuccess) {
                    showToastMessage('success', 'Success', t("common_save_successmessage"));
                    formik.resetForm();
                    return;
                }
                else {
                    showToastMessage('error', 'Error', response?.message);
                    return;
                }
            } else {

                var changePassword: ResetPasswordModel = { mobileNo: mobileNumber ?? "", newPassword: data.newPassword }
                let response = await UserPasswordService.resetPassword(changePassword);
                if (response?.isSuccess) {
                    showToastMessage('success', 'Success', t("common_save_successmessage"));
                    formik.resetForm();
                    navigate(RouteConstant.login);
                    return;
                }
                else {
                    showToastMessage('error', 'Error', response?.message);
                    return;
                }
            }


        }
    });

    const isPasswordValid = (password: string) => {
        const atLeast8Chars = /.{8,}/;
        const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
        const hasCapitalLetter = /[A-Z]/;
        const hasNumber = /[0-9]/;

        return (
            atLeast8Chars.test(password) &&
            hasSpecialChar.test(password) &&
            hasCapitalLetter.test(password) &&
            hasNumber.test(password)
        );
    };

    const toast: React.MutableRefObject<Toast | null> = useRef(null);

    const showToastMessage = (severity: any, summary: string, detail: string) => {
        toast?.current?.show({ severity, summary, detail });
    };

    const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: any) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const handleCancelClick = () => {
        formik.resetForm();
        handleBackClick();
    };

    const handleBackClick = () => {
        navigate(RouteConstant.profile);
    };

    return <>
        <Toast ref={toast} />
        <BreadCrumbCustom items={[
             !UserPasswordProps.isResetPasswordPage && {
                label: (
                    <span
                        onClick={handleProfileBreadcrumbClick}
                        style={{ cursor: 'pointer' }}
                    >
                        {t("profile_breadcrumb_label")}
                    </span>
                ),
            },
            { label: UserPasswordProps.isResetPasswordPage ? "Reset password" : t("profile_password_breadcrumb_label") }
        ]}
            home={breadCrumbItems.home} backgroundImage={breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>
        <div className="Address-form-container layout-content mt-3 mb-3">
            {!UserPasswordProps.isResetPasswordPage &&
                <div className="col-12 p-0">
                    <h5 className='mobile-txt-fnt mb-0'>
                        <span className="site-nav" onClick={handleBackClick}>
                            <i className="pi pi-arrow-left"></i>
                            &nbsp;&nbsp;&nbsp;&nbsp;{t("profile_backbutton_label")}
                        </span>
                    </h5>
                </div>
            }
            <div className="grid user-page">
                <div className="col-12  md:col-4 lg:col-3 xl:col-3" style={{ height: "100%" }}>
                    <Card className="border-1 surface-border" header={<div className="edit-header password-header">{t("profile_password_passwordtips_header")}</div>} >
                        <div className="password-tip-card">
                            <p>{t("profile_password_passwordtips1")} </p>
                            <Divider className="" />
                            <p>{t("profile_passwordtips2")} <b>{t("profile_passwordtip2_boldtext")}</b>.
                            </p>
                            <Divider className="" />
                        </div>

                    </Card>
                </div>
                <div className="col-12  md:col-8 lg:col-8 xl:col-9" style={{ height: "100%" }}>
                    <form onSubmit={formik.handleSubmit} className="">
                        <Card className="border-1 surface-border" header={<div className=" edit-header change-password-header">{UserPasswordProps.isResetPasswordPage ? "Reset password" : t("profile_password_changepassword_header")}</div>} >
                            <div className="formgrid grid ">
                                <div className="col-12 md:col-12 lg:col-6 sm:col-12 " >
                                    <div className="p-fluid">
                                        {!UserPasswordProps.isResetPasswordPage && <>
                                            <div className="p-field">
                                                <label htmlFor="oldpassword" className="label-semi-bold">{t("profile_password_oldpassword_button")}<span className="required"> *</span></label>
                                                <span className="p-input-icon-left">
                                                    <i className="fa-solid fa-lock"></i>
                                                    <Password
                                                        inputId="oldPassword"
                                                        name="oldPassword"
                                                        className={classNames({ 'p-invalid': formik.errors.oldPassword })}
                                                        feedback={false}
                                                        onChange={formik.handleChange}
                                                        toggleMask
                                                    />
                                                </span>
                                                {getFormErrorMessage('oldPassword')}
                                            </div><br></br>
                                        </>
                                        }
                                        <div className="p-field">
                                            <label htmlFor="newPassword" className="label-semi-bold">{t("profile_password_newpassword_button")}<span className="required"> *</span></label>
                                            <span className="p-input-icon-left">
                                                <i className="fa-solid fa-lock"></i>
                                                <Password
                                                        inputId="newPassword"
                                                        name="newPassword"
                                                        className={classNames({ 'p-invalid': formik.errors.newPassword })}
                                                        feedback={false}
                                                        onChange={formik.handleChange}
                                                        toggleMask
                                                    />
                                                
                                            </span>
                                            {getFormErrorMessage('newPassword')}
                                        </div><br></br>

                                        <div className="p-field">
                                            <label htmlFor="confirmPassword" className="label-semi-bold">{t("profile_password_confirmpassword_button")}<span className="required"> *</span></label>
                                            <span className="p-input-icon-left">
                                                <i className="fa-solid fa-lock"></i>
                                                <Password
                                                        inputId="confirmPassword"
                                                        name="confirmPassword"
                                                        className={classNames({ 'p-invalid': formik.errors.confirmPassword })}
                                                        feedback={false}
                                                        onChange={formik.handleChange}
                                                        toggleMask
                                                    />
                                            </span>
                                            {getFormErrorMessage('confirmPassword')}
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <div className="col-12 md:col-6 sm:col-12">
                                    <div className="submit-button">
                                        <Button type="submit"
                                            label={t("common_save_button")}
                                            className="p-button-primary"
                                        />
                                        <Button type="button"
                                            label={t("common_cancel_button")}
                                            className="surface-0 text-color-secondary p-component justify-content-center "
                                            onClick={handleCancelClick}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </div>
    </>
}
export default UserPassword;