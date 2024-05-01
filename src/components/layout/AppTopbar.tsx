import { classNames } from "primereact/utils";
import { Badge } from "primereact/badge";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { LayoutContext } from "./context/layoutcontext";
import { AppTopbarRef } from "../../types/layout";
import { useNavigate } from "react-router-dom";
import RouteConstant from "../../constants/route.constants";
import { Menu } from "primereact/menu";
import { useTranslation } from "react-i18next";
import i18n from "../../localisation/i18n";
import AuthService from "../../services/autentication/auth.service";
import { useAppSelector } from "../../redux/hooks";
import UserService from "../../services/user/user.service";
import RoleService from "../../services/role/role-service";

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
  const { t } = useTranslation();
  const { layoutState, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef: any = useRef(null);
  const topbarmenuRef: any = useRef(null);
  const topbarmenubuttonRef: any = useRef(null);
  const menuLeft: any = useRef(null);
  const langMenu: any = useRef(null);
  const isUserLoggedIn: boolean = AuthService.isUserLoggedIn();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const count = useAppSelector((state) => state.counter);

  var navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (AuthService.isUserLoggedIn()) {
        await UserService.getCurrentUser();
      }
    };
    // Call the async function to fetch data when the component mounts
    fetchData();
  }, []);

  const items = [
    {
      label: t("layout_apptopbar_myprofile"),
      icon: "fa-solid fa-user",
      command: () => {
        navigate(RouteConstant.profile);
      },
    },
    {
      label: t("layout_apptopbar_myaddresses"),
      icon: "fa-solid fa-address-book",
      command: () => {
        navigate(RouteConstant.userAddresses);
      },
    },
    {
      label: "Assign Route Code",
      icon: "fa-solid fa-truck-front",
      visible: RoleService.isAdmin(),
      command: () => {
        navigate(RouteConstant.assignroutecode);
      },
    },
    {
      label: "View All Customers",
      icon: "fa-solid fa-user",
      visible: RoleService.isAdmin(),
      command: () => {
        navigate(RouteConstant.editUsers);
      },
    },
    {
      label: "View All Address",
      icon: "fa-solid fa-user",
      visible:true,
      command: () => {
        navigate(RouteConstant.customerAddress);
      },
    },
    {
      label: "Generate Invoice",
      icon: "fa-solid fa-file-invoice",
      visible: RoleService.isAdmin(),
      command: () => {
        navigate(RouteConstant.generateInvoice);
      },
    },
    {
      label: t("layout_apptopbar_previous_order"),
      icon: "fa-solid fa-cart-shopping",
      visible: RoleService.isAdmin(),
      command: () => {
        navigate(RouteConstant.orderList);
      },
    },
    {
      label: "My Orders" /*LT*/,
      icon: "fa-solid fa-cart-shopping",
      visible: RoleService.isCustomer(),
      command: () => {
        navigate(RouteConstant.myOrders); // need to change to order page when it is ready
      },
    },
    {
      label: t("layout_topbarmenu_settings"),
      icon: "fas fa-cog",
      visible: RoleService.isAdmin(),
      command: () => {
        navigate(RouteConstant.setting);
      },
    },
    {
      label: t("layout_apptopbar_logout"),
      icon: "fa-solid fa-right-from-bracket",
      command: () => {
        AuthService.logout();
        navigate(RouteConstant.login);
      },
    },
  ];

  //DOn't change this language labels to local language
  const itemsLang = [
    {
      label: "English",
      icon: "",
      command: () => {
        i18n.changeLanguage("en");
      },
    },
    {
      label: "عربی",
      icon: "",
      command: () => {
        i18n.changeLanguage("ar");
      },
    },
    {
      label: "ಕನ್ನಡ",
      icon: "",
      command: () => {
        i18n.changeLanguage("kn");
      },
    },
    {
      label: "हिंदी",
      icon: "",
      command: () => {
        i18n.changeLanguage("hn");
      },
    },
  ];

  const handleDocumentClick = (e: any) => {
    try {
      if (topbarmenuRef.current && !topbarmenuRef.current.contains(e.target)) {
        // Click occurred outside of the menu, so close it
        setIsMenuVisible(false);
      }
      if (
        topbarmenubuttonRef.current &&
        topbarmenubuttonRef.current.contains(e.target)
      ) {
        // Click occurred on the menu so toggle it
        setIsMenuVisible(!isMenuVisible);
      }
    } catch (ex: any) {
      console.error(ex);
    }
  };

  // Add and remove event listener when the component mounts and unmounts
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  return (
    <>
      <div className="layout-topbar">
        <div
          className="layout-topbar-logo"
          onClick={() => {
            navigate(RouteConstant.products);
          }}
        >
          <img src={process.env.PUBLIC_URL + "/assests/images/logo.png"} />
        </div>
        <button
          ref={topbarmenubuttonRef}
          type="button"
          className="p-link layout-topbar-menu-button layout-topbar-button"
          onClick={(event: any) => {
            setIsMenuVisible(!isMenuVisible);
          }}
        >
          <i className="pi pi-ellipsis-v" />
        </button>

        <div
          ref={topbarmenuRef}
          className={classNames("layout-topbar-menu", {
            "layout-topbar-menu-mobile-active": isMenuVisible,
          })}
        >

          <button
            type="button"
            className="p-link layout-topbar-button"
            onClick={() => {
              navigate(RouteConstant.basket);
            }}
          >
            <i
              className="pi pi-shopping-cart p-overlay-badge"
              style={{ fontSize: "2rem" }}
            >
              {count > 0 ? (
                <Badge
                  value={count}
                  style={{ display: "table" }}
                  severity="danger"
                ></Badge>
              ) : null}
            </i>
            <span>{t("layout_topbarmenu_store")} </span>
          </button>
          {!isUserLoggedIn && (
            <button
              type="button"
              className="p-link layout-topbar-button"
              onClick={() => {
                navigate(RouteConstant.login);
              }}
            >
              <i className="fa-solid fa-user"></i>
              <span>{t("layout_topbarmenu_user")} </span>
            </button>
          )}
          {isUserLoggedIn && (
            <>
              <button
                type="button"
                className="p-link layout-topbar-button"
                onClick={() => {
                  navigate(RouteConstant.products);
                }}
              >
                <i className="fa-solid fa-house-chimney"></i>
                <span>{t("layout_topbarmenu_home")} </span>
              </button>


              <button
                type="button"
                className="p-link layout-topbar-button"
                onClick={(event: any) => {
                  if (menuLeft && menuLeft.current)
                    menuLeft.current.toggle(event);
                }}
              >
                <i className="fa-solid fa-user"></i>
                <span>{t("layout_topbarmenu_user")} </span>
              </button>
            </>
          )}
        </div>
      </div>
      {isUserLoggedIn && (
        <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
      )}
      <Menu model={itemsLang} popup ref={langMenu} id="language_menu" />
    </>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
