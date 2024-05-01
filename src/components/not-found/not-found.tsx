import Layout from "../layout/layout";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { BreadcrumbItem } from "../../interfaces/common/common";

const NotFound = () => {

    const breadCrumbItems: BreadcrumbItem = { items: [{ label: 'Not Found' }], home: { label: 'Home' }, backgroundImage: process.env.PUBLIC_URL+ "/assests/images/image-1.jpeg", title: "404 Page Not Found" }

    return (
        <BreadCrumbCustom items={breadCrumbItems.items} home={breadCrumbItems.home} backgroundImage={breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>
    );
};

export default NotFound;
