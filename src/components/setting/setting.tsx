import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";


const Setting = () => {
  const { t } = useTranslation();
  var navigate = useNavigate();
  return (
    <>
      <div className="flex flex-column flex-wrap p-8">
        <button type="button" className="p-link layout-topbar-button flex align-items-center p-2 justify-content-center" onClick={() => { navigate(RouteConstant.courierCharges) }}>
          <i className="fa-solid fa-people-carry-box"></i>&nbsp;&nbsp;&nbsp;     
          <span>{t("layout_topbarmenu_couriercharges")} </span>
        </button>
        <button type="button" className="p-link layout-topbar-button flex align-items-center p-2 justify-content-center" onClick={() => { navigate(RouteConstant.measurement) }}>
          <i className="fa-solid fa-book"></i>&nbsp;&nbsp;&nbsp;
          <span>{t("layout_topbarmenu_measurement")} </span>
        </button>
        <button type="button" className="p-link layout-topbar-button flex align-items-center p-2 justify-content-center" onClick={() => { navigate(RouteConstant.banner) }}>
          <i className="fa-solid fa-image"></i>&nbsp;&nbsp;&nbsp;
          <span>{t("layout_topbarmenu_banner")} </span>
        </button>
        <button type="button" className="p-link layout-topbar-button flex align-items-center p-2 justify-content-center" onClick={() => { navigate(RouteConstant.userPreferredDelivery) }}>
          <i className="fa-solid fa-truck"></i>&nbsp;&nbsp;&nbsp;
          <span>{t("layout_topbarmenu_userpreferreddelivery")} </span>
        </button>
        <button type="button" className="p-link layout-topbar-button flex align-items-center p-2 justify-content-center" onClick={() => { navigate(RouteConstant.courierProvider) }}>
          <i className="fa-solid fa-shipping-fast"></i>&nbsp;&nbsp;&nbsp;
          <span>{t("layout_topbarmenu_courierprovider")} </span>
        </button>
      </div>
    </>
  );
}

export default Setting;