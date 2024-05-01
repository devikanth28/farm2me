import { useContext, useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Image } from "primereact/image";
import { LayoutContext } from "../layout/context/layoutcontext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { ForGotPasswordModel } from "../../models/authentication/forgot-password.model";
import UserPasswordService from "../../services/user/user-password.service";
import RouteConstant from "../../constants/route.constants";
import { AuthenticateModel } from "../../models/authentication/validating-password-model";

const ForgotPassword = () => {

  const { layoutConfig } = useContext(LayoutContext);
  const [isOtpRequestInProgress, setIsOtpRequestInProgress] = useState(false);
  const [isValidateOtpRequestInProgress, setIsValidateOtpRequestInProgress] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isOtpRequestSent, setIsOtpRequestSent] = useState(false);
  const [isCountDownInProgress, setIsCountDownInProgress] = useState(false);
  
  var navigate = useNavigate();
  const { t } = useTranslation();

  const containerClassName = classNames(
    "surface-ground flex min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  useEffect(() => {
    const timer: any = seconds > 0 && setInterval(() => setSeconds(seconds - 1), 1000);
    if (seconds <= 0) setIsCountDownInProgress(false);
    return () => clearInterval(timer);
  }, [seconds]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const resendOTP = async (event: any) => {
    let data: ForGotPasswordModel = {
      phoneNumber: sendOTPForm.values.phoneNumber
    }
    setIsOtpRequestInProgress(true);
    let response = await UserPasswordService.forgotPasswordSendOTP(data);
    if (response?.isSuccess) {
      setIsOtpRequestInProgress(false);
      setIsCountDownInProgress(true);
      setIsOtpRequestSent(true);
      setSeconds(60);
      return;
    }
    else {
      setIsOtpRequestInProgress(false);
      setIsOtpRequestSent(false);
      if (!response?.isSuccess) {
        return sendOTPForm.errors["phoneNumber"] = response.message;
      }else return;
    }
  }

  const validateOTPForm: any = useFormik({
    initialValues: {
      otp: ""
    },
    validate: (data: any) => {
      let errors: any = {};
      if (!data.otp) {
        errors.otp = "Please enter valid OTP";
      }
      return errors;
    },
    onSubmit: async (data: ForGotPasswordModel) => {

      var authenticateModel: AuthenticateModel = { mobileNumber: sendOTPForm.values.phoneNumber?.toString(), otp: data.otp };
      setIsValidateOtpRequestInProgress(true);
      let response = await UserPasswordService.forgotPasswordVerifyOTP(authenticateModel);
      if (response?.isSuccess) {
        setIsValidateOtpRequestInProgress(false);
        navigateToUserPassword();
        return;
      }
      else {
        setIsValidateOtpRequestInProgress(false);
        return validateOTPForm.errors["otp"] = response.message;
      }
    }
  });

  const navigateToUserPassword = () => {
    navigate(process.env.PUBLIC_URL +  "/reset-password/"+ sendOTPForm.values.phoneNumber);
  }

  const sendOTPForm: any = useFormik({
    initialValues: {
      phoneNumber: "",
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.phoneNumber) {
        errors.phoneNumber = "Please enter contact number.";
      }

      if (isOtpRequestSent && !data.otp) {
        errors.otp = "Please enter valid OTP";
      }
      return errors;
    },
    onSubmit: async (data: ForGotPasswordModel) => {
      setIsOtpRequestInProgress(true);
      data.phoneNumber = data.phoneNumber?.toString();
      let response = await UserPasswordService.forgotPasswordSendOTP(data);
      if (response?.isSuccess) {
        setIsOtpRequestInProgress(false);
        setIsCountDownInProgress(true);
        setIsOtpRequestSent(true);
        setSeconds(60);
        return;
      }
      else {
        setIsOtpRequestInProgress(false);
        setIsOtpRequestSent(false);
        if (!response?.isSuccess) {
          return sendOTPForm.errors["phoneNumber"] = response.message;
        }else return;
      }
    }
  });

  const isFormFieldInvalid = (name: any, form: any) => !!(form.touched[name] && form.errors[name]);

  const getFormErrorMessage = (name: any, form: any) => {
    return isFormFieldInvalid(name, form) ? <small className="p-error">{form.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  return (
    <div className={containerClassName} >
      <div className="flex flex-1 flex-row grid">
        <div className="col-12 md:col-6 lg:col-6  p-5 flex flex-column justify-content-center flex-wrap cursor-pointer" onClick={()=> navigate(RouteConstant.products)} >
          <div className="flex flex-1 align-items-center justify-content-center">
            <Image src={process.env.PUBLIC_URL + '/assests/images/logo.png'} className="flex flex-wrap align-items-center justify-content-center" width="25%" />
          </div>
          <div className="flex flex-1 align-items-center justify-content-center">
            <Image src={process.env.PUBLIC_URL + "/assests/images/form2me-fruits.png"} className="flex flex-wrap align-items-center justify-content-center" width="80%" />
          </div>
        </div>
        <div className="col-12 md:col-6 lg:col-6 flex align-items-stretch flex-wrap">
          <div className="p-5 flex flex-1 bg-white align-items-center justify-content-center">
            <div className="login-panel" >
              <h5 className="panel-header-text">{t('forgotpassword_forgot_password')} ?</h5>

              <div className="p-fluid formgrid grid">
                <form onSubmit={sendOTPForm.handleSubmit} className="">
                  <div className="field col-12 grid">
                    <div className="field col-12 md:col-12 lg:col-9">
                      <label htmlFor="phoneNumber" className="label-semi-bold">{t('forgotpassword_phone_number')}<span className="required">*</span></label>
                      <span className="p-input-icon-left">
                        <i className="fa-solid fa-phone" />
                        <InputText type="number" name="phoneNumber" id="phoneNumber" onChange={sendOTPForm.handleChange} placeholder={t('forgotpassword_enter_your_contact_number')} className={classNames({ 'p-invalid': sendOTPForm.errors.phoneNumber })} />
                      </span>
                      {getFormErrorMessage('phoneNumber', sendOTPForm)}
                    </div>
                    <div className="field col-12 md:col-6 lg:col-3">
                      <Button disabled={isOtpRequestSent} label={isOtpRequestInProgress ? "sending.." : t('forgotpassword_get_otp')} loading={isOtpRequestInProgress} className="get-otp-btn" type="submit" />
                    </div>
                  </div>
                </form>
                {isOtpRequestSent && <>
                  <form onSubmit={validateOTPForm.handleSubmit} className="">
                    <div className="field col-12" >
                      <label htmlFor="lastname2" className="label-semi-bold">{t('forgotpassword_enter_your_otp_code')}<span className="required">*</span></label>
                      <span className="p-input-icon-right">
                        <InputText type="number" name="otp" id="otp" onChange={validateOTPForm.handleChange} placeholder={t('forgotpassword_otp')} className={classNames({ 'p-invalid': validateOTPForm.errors.otp })} />
                        <i className="fa-sharp fa-light fa-shield-check" />
                      </span>
                      {getFormErrorMessage('otp', validateOTPForm)}
                    </div>
                    <div className="field col-12 grid grid-row mb-3">
                      <div className="field col-12 md:col-6 lg:col-6">
                        <div className="">
                          {t('forgotpassword_resend_otp_in')}  <span className="primary-text-color">{formatTime(seconds)}</span>
                        </div>
                      </div>
                      <div className="field col-12 md:col-6 lg:col-6">
                        <Button label={t('forgotpassword_resend_otp_in')} text className="right-align" severity="success" type="button" onClick={resendOTP} disabled={isCountDownInProgress} />
                      </div>
                    </div>

                    <div className="col-12" ><Button type="submit" loading={isValidateOtpRequestInProgress} label={t('forgotpassword_signin')} />
                    </div>
                  </form>
                </>
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
