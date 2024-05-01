import { BreadCrumb } from "primereact/breadcrumb";
import { BreadcrumbItem } from "../../interfaces/common/common";
import RouteConstant from "../../constants/route.constants";

const BreadCrumbCustom = (breadcrumbItems: BreadcrumbItem) => {
  const homeMenuItem = {
    label: breadcrumbItems.home.label,
    url: RouteConstant.products,
  };

  return (
    <div
      className="bread-crumb-main flex flex-wrap justify-content-center align-content-center"
      style={{
        backgroundImage: "url(" + breadcrumbItems.backgroundImage + ")",
      }}
    >
      <div className="flex-1 light-wrapper">
        <div className="text-center bread-crumb-title">
          {breadcrumbItems.title}
        </div>
        <BreadCrumb
          pt={{
            root: { className: "transparent-background align-items-center" },
          }}
          model={breadcrumbItems.items}
          home={homeMenuItem}
          className="breadcrumb-green"
        />
      </div>
    </div>
  );
};

export default BreadCrumbCustom;
