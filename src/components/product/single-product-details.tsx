import { useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumbCustom from "../bread-crumb/bread-crumb";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { BreadcrumbItem } from "../../interfaces/common/common";
import { useTranslation } from "react-i18next";

const ProductDetail = () => {
  const [qty, setQty] = useState(0);
  const {t} = useTranslation()

  const breadCrumbItems: BreadcrumbItem = { items: [{ label: t("Products_breadcrumb_label") }, { label: t("Productsdetails_breadcrumb_label") }], home: { label: t("common_breadcrumb_home") }, backgroundImage: process.env.PUBLIC_URL + "/assests/images/image-1.jpeg", title: t("Productsdetails_breadcrumb_label") }

  function handleDecrement() {
    setQty(qty - 1);
  }

  function handleIncrement() {
    setQty(qty + 1);
  }


  return (<>
    <BreadCrumbCustom items={breadCrumbItems.items} home={breadCrumbItems.home} backgroundImage={process.env.PUBLIC_URL+ breadCrumbItems.backgroundImage} title={breadCrumbItems.title} ></BreadCrumbCustom>
    <div className="flex-auto" style={{ paddingTop: "85px" }}>
      <div className="p-inputgroup justify-content-start ml-4 mt-8">
        <span>
          <h5 style={{ marginTop: "-152px", marginLeft: '20px' }}>
            <Link to="#">
              <i className="pi pi-arrow-left"></i>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
          </h5>
        </span>
      </div>

      <div className="Product-form-container flex-column md:flex-row">
        <div className="col col-4  border-1">
          <div
            className="card flex justify-content-center"
            style={{ position: "relative", height: "600px" }}
          >
            <div className="flex justify-content-center">
              <Image
                src={process.env.PUBLIC_URL+ '/assests/images/Desiri-Groundnut.png'}
                alt="Image"
                className="justify-content-center mt-6"
              />
            </div>
            <div
              className="flex flex-column md:flex-row justify-content-center"
              style={{ position: "absolute", marginTop: "350px" }}
            >
              <Image
                src={process.env.PUBLIC_URL+ '/assests/images/Rectangle 87.png'}
                className="mr-2"
                alt="Image"
                width="80"
                height="60"
                preview
              />
              <Image
                src={process.env.PUBLIC_URL+ '/assests/images/Rectangle 88.png'}
                className="mr-2"
                alt="Image"
                width="80"
                height="60"
                preview
              />
              <Image
                src={process.env.PUBLIC_URL+ '/assests/images/Rectangle 89.png'}
                className="mr-2"
                alt="Image"
                width="80"
                height="60"
                preview
              />
            </div>
          </div>
        </div>

        <div className="col col-8 border-1">
          <div className="card flex ">
            <div className="p-fluid formgrid grid">
              <div className="field col-12">
                <div className="flex flex-column ">
                  Categories:Oil
                  <br />
                  <span style={{ fontSize: "26px", fontStyle: "bold" }}>
                    <h5>Groundnut Oil</h5>
                  </span>
                  <span
                    style={{
                      fontSize: "26px",
                      fontStyle: "bold",
                      padding: "0px",
                    }}
                  >
                    ₹390/lt
                  </span>
                </div>
              </div>

              <div className="field col-12 ">
                <p>
                  {" "}
                  -It is an Anti-viral, Anti Inflammatory, Anti-bacterial,
                  Anti-carcinogenic.
                </p>
                <p>
                  -It is a natural source of phytochemicals, antioxidants
                  that protect our body from damages{" "}
                </p>
                <p> caused due to toxins & free radicals.</p>
                <p>
                  {" "}
                  -Contains extremely high % of Resveratrol an anti ageing
                  factor and good for heart diseases.
                </p>
                <p>
                  {" "}
                  -If we take three spoons on empty stomach everyday
                  morning, It helps in
                </p>
                <p>-curing Parkinson & Thyroid</p>
                <p> -reducing Cholesterol.</p>
                <p>-curing Nerve disorders</p>
                <p> -curing Paralysis & Alzheimer </p>
              </div>

              <div className="field col-12 ">
                <h6>InStock</h6>
              </div>

              <div className="field col-12 grid">
                <h6>Quantity</h6>
                <div className="flex  ml-4">
                  <button onClick={handleDecrement} className="icon" style={{ width: '45px' }}>
                    -
                  </button>
                  <div className="icon pl-4 pt- border-1" style={{ width: '55px' }}>{qty}</div>
                  <button onClick={handleIncrement} className="icon" style={{ width: '45px' }}>
                    +
                  </button>
                </div>
              </div>

              <div className="field col-12 ">
                <h6>Weight:2.5 ltr</h6>
              </div>

              <div className="field col-12 ">
                <h6>Total : ₹1,950.00</h6>
              </div>

              <div className="field col-12 grid formgroup-inline ">
                <div className="field">
                  <Button
                    label="Continue Shopping"
                    className="mr-2 bg-white text-color"
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="field">
                  <Button
                    label="Add to Cart"
                    className="p-button-primary"
                    style={{ width: "250px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default ProductDetail;
