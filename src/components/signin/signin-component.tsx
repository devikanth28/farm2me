import { useContext, useEffect } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Image } from "primereact/image";
import { useFormik } from 'formik';
import { LayoutContext } from "../layout/context/layoutcontext";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { useTranslation } from "react-i18next";
import AuthService from "../../services/autentication/auth.service";
import LocalStorageConstant from "../../constants/localstroage.constant";
import { Password } from "primereact/password";

const LoginPage = () => {

  const { layoutConfig } = useContext(LayoutContext);
  const { t } = useTranslation();

  var navigate = useNavigate();

  const formik: any = useFormik({
    initialValues: {
      username: "",
      password: "",
      rememberMe: false
    },
    validate: (data: any) => {
      let errors: any = {};

      if (!data.username) {
        errors.username = t('login_Email or Phone number is required')
      }

      if (!data.password) {
        errors.password = t('login_password_is_required')
      }

      return errors;
    },
    onSubmit: async (data: any) => {

      if (data.rememberMe) {
        localStorage.setItem(
          LocalStorageConstant.rememberedCredentials,
          JSON.stringify({ savedUsername: data.username, savedPassword: "" })
        );
      } else {
        localStorage.removeItem(LocalStorageConstant.rememberedCredentials);
      }

      let response = await AuthService.login({ userId: data.username?.toString(), password: data.password });
      if (response && response?.access_token != null) {
        navigate(RouteConstant.products);
        return;
      }
      else {
        if (response == "Invalid Password.")
          return formik.errors["password"] = response;
        
        return formik.errors["username"] = response;
      }
    }
  });



  const navigateToSignUp = () => {
    navigate(RouteConstant.register);
  }

  const navigateToForgotpassword = () => {
    navigate(RouteConstant.forgotPassword);
  }

  const isFormFieldInvalid = (name: any) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: any) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
  };

  const containerClassName = classNames(
    "surface-ground flex min-h-screen min-w-screen overflow-hidden",
    { "p-input-filled": layoutConfig.inputStyle === "filled" }
  );

  useEffect(() => {
    // Check localStorage for saved credentials when the component mounts
    const savedCredentials = localStorage.getItem(LocalStorageConstant.rememberedCredentials);
    if (savedCredentials) {
      const { savedUsername, savedPassword } = JSON.parse(savedCredentials);

      formik.setValues({
        "username": savedUsername,
        "password": savedPassword,
        "rememberMe": true,
      });
    }
  }, []);

  return (
    <>
      <div className={containerClassName}>
        <div className="flex flex-1 flex-row grid">
          <div className="col-12 md:col-6 lg:col-6  p-5 flex flex-column justify-content-center flex-wrap cursor-pointer" onClick={() => navigate(RouteConstant.products)}>
            <div className="flex flex-1 align-items-center justify-content-center">
              <Image src={process.env.PUBLIC_URL + "/assests/images/logo.png"} className="flex flex-wrap align-items-center justify-content-center" width="25%" />
            </div>
            <div className="flex flex-1 align-items-center justify-content-center">
              <Image src={process.env.PUBLIC_URL + "/assests/images/form2me-fruits.png"} className="flex flex-wrap align-items-center justify-content-center" width="80%" />
            </div>
          </div>
          <div className="col-12 md:col-6 lg:col-6 flex align-items-stretch flex-wrap">
            <div className="p-5 mobile-pd mobile-block flex flex-1 bg-white align-items-center justify-content-center">
              <div className="login-panel" >
                <form onSubmit={formik.handleSubmit} className="">
                  <h5 className="panel-header-text">{t('login_login')}</h5>
                  <div className="p-fluid formgrid grid">
                    <div className="field col-12">
                      <label htmlFor="email" className="label-semi-bold">{t("login_email_or_phone_number_label")}<span className="required">*</span></label>
                      <span className="p-input-icon-left">
                        <i className="fa-solid fa-envelope" />
                        <InputText type="number" name="username" id="username" onChange={formik.handleChange} value={formik.values.username} placeholder={t("login_email_or_phone_number")} className={classNames({ 'p-invalid': formik.errors.username })} />
                      </span>
                      {getFormErrorMessage('username')}
                    </div>
                    <div className="field col-12 ">
                      <label htmlFor="lastname2" className="label-semi-bold">{t('login_password')}<span className="required">*</span></label>
                      <span className="p-input-icon-left">
                        <i className="fa-solid fa-lock" />
                        <Password
                            inputId="password"
                            name="password"
                            className={classNames({ 'p-invalid': formik.errors.password })}
                            feedback={false}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder={t('login_enter_password')}
                            toggleMask
                        />
                      </span>
                      {getFormErrorMessage('password')}
                    </div>
                    <div className="field grid grid-row col-12">
                      <div className="field-checkbox col-6">
                        <Checkbox
                          inputId="RememberMe"
                          name="option"
                          checked={formik.values.rememberMe}
                          onChange={(e) => {
                            formik.setFieldValue('rememberMe', e.checked);
                          }}
                        />
                        <label htmlFor="RememberMe">{t('login_remember_me')}</label>
                      </div>
                      <div className="field mb-3 col-6 ">
                        <div className="right-align forgot-password-link" onClick={navigateToForgotpassword}>
                          {t('login_forgot_password')}?
                        </div>
                      </div>
                    </div>
                    <div className="col-12" >
                      <Button label={t('login_signin')} type="submit" />
                      <div className="dont-have-anaccount">{t('login_donot_have_an_account')}? <span className="primary-text-color" onClick={navigateToSignUp}>{t('login_sign_up')}</span></div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
