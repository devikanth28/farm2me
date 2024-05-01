import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { useTranslation } from "react-i18next";

const MyWishlist = () => {
  const {t} = useTranslation()

  const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("wishlist_breadcrumb_label") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg" , title: t("wishlist_breadcrumb_title")}

  return (
      <BreadCrumbCustom items={breadCrumbItems.items} home={breadCrumbItems.home} backgroundImage={breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>
  );
};

export default MyWishlist;
