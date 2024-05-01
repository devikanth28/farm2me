import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import AppLoading from "../app-loading/app-loading";

const EmptyLayout = () => {

  const breadCrumbItems: BreadcrumbItem = { items: [{ label: 'Empty Layout' }], home: { label: 'Home' }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg", title: "Layout" }

  return (<>
    <AppLoading />
    <BreadCrumbCustom items={breadCrumbItems.items} home={breadCrumbItems.home} backgroundImage={breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>
  </>);
};

export default EmptyLayout;
