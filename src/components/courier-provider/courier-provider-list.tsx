import { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CourierProviderModel } from "../../models/courier-provider/courier-provider-model";
import { CourierProviderNewModel } from "../../models/courier-provider/courier-provider-new-model";
import Helpers from "../../utils/helpers";
import { OverlayPanel } from "primereact/overlaypanel";
import { Message } from "primereact/message";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { fetchCourierProviderData } from "../../redux/slices/courier-provider/courierProviderActions";
import { CriteriaChecker } from "./courier-criteria";
import { CourierTinCriteria } from "./courier-tin-criteria";
import { CourierVasselBottolsCriteria } from "./courier-vassel-bottols-criteria";

const CourierProviderList = ({ isProcessed }: any) => {
  const [selectedCourierProvider, setSelectedCourierProvider] =
    useState<CourierProviderNewModel | null>(null);
  const [rowClick, setRowClick] = useState<boolean>(true);
  const op = useRef<any>();
  const dispatch = useAppDispatch();
  const defaultList: CourierProviderNewModel[] = [
    {
      courierProviderID: 0,
      providerName: "Home Delivery",
      stateID: "0",
      stateName: "",
      criteria: "0",
      amount: 0,
    },
  ];
  const [courierProviderData, setCourierProviderData] = useState<
    CourierProviderNewModel[]
  >([]);

  const courierData = useAppSelector((state) => state.courierProviders.data);
  const loading = useAppSelector((state) => state.courierProviders.loading);
  const error = useAppSelector((state) => state.courierProviders.error);

  const selectedUserAddress = useAppSelector((state) => state.userAddress);

  const serializedWeights = localStorage.getItem("total-weight");
  let totalWeights = 0;
  if (serializedWeights !== null) {
    totalWeights = JSON.parse(serializedWeights!.toString());
  }

  const loadSelectedCourierProvider = () => {
    const serializedprovider = localStorage.getItem("courier-provider");
    if (serializedprovider !== null) {
      setSelectedCourierProvider(JSON.parse(serializedprovider));
    }
  };

  useEffect(() => {
    if (courierData !== undefined) {
      if (courierData.length > 0) {
        setCourierProviderData(
          courierData.filter(
            (item) =>
              item.stateName ===
                selectedUserAddress.selecedUserAddresses?.stateName &&
              item.criteria === CriteriaChecker(totalWeights)
          )
        );
        if (selectedUserAddress.selecedUserAddresses?.homeDeliveryAvailable) {
          let isTinApplicable = CourierTinCriteria();
          if (!isTinApplicable) {
            let isVasselBottolApplicable = CourierVasselBottolsCriteria();
            if (!isVasselBottolApplicable) {
              setCourierProviderData((prevList) => [
                ...defaultList,
                ...prevList,
              ]);
              isProcessed(true);
            } else {
              setCourierProviderData((prevList) => [...defaultList]);
              isProcessed(false);
            }
          } else {
            setCourierProviderData((prevList) => [...prevList]);
            isProcessed(true);
          }
        } else {
          isProcessed(true);
        }
        loadSelectedCourierProvider();
      }
    }
  }, [courierData]);

  useEffect(() => {
    dispatch(fetchCourierProviderData(""));
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const providerTemplate = (slab: any) => {
    if (slab.providerName === "Home Delivery") {
      return (
        <img
          src={
            process.env.PUBLIC_URL + "/assests/images/home-delivery-service.png"
          }
          alt={slab.providerName}
          style={{ width: 120 }}
        />
      );
    } else if (slab.providerName === "Professional Courier") {
      return (
        <img
          src={
            process.env.PUBLIC_URL + "/assests/images/professinal-courier01.jpg"
          }
          alt={slab.providerName}
          style={{ width: 120 }}
        />
      );
    } else if (slab.providerName === "DTDC") {
      return (
        <img
          src={process.env.PUBLIC_URL + "/assests/images/dtdc.png"}
          alt={slab.providerName}
          style={{ width: 120 }}
        />
      );
    } else if (slab.providerName === "VRL Service") {
      return (
        <>
          <img
            src={process.env.PUBLIC_URL + "/assests/images/vrl-service-new.png"}
            alt={slab.providerName}
            style={{ width: 120 }}
          />
        </>
      );
    }
  };

  const calculateTemplate = (slab: any) => {
    const courierCharges = slab.amount * totalWeights + slab.amount;
    return (
      <span className="font-bold">
        {Helpers.formatAmountInINR(courierCharges)}
      </span>
    );
  };

  const showMessage = (e: any, data: any) => {
    if (data.providerName === "VRL Service") {
      op.current.toggle(e);
    }
  };

  const onRowSelect = (event: any) => {
    saveCourierProvider(event.data);
    const courierCharges = event.data.amount * totalWeights + event.data.amount;
    localStorage.setItem("courier-charges", JSON.stringify(courierCharges));
  };

  const onRowUnselect = (event: any) => {
    localStorage.removeItem("courier-provider");
    const courierCharges = 0;
    localStorage.setItem("courier-charges", JSON.stringify(courierCharges));
  };

  const saveCourierProvider = (state: CourierProviderModel) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("courier-provider", serializedState);
    } catch (err) {
      console.error(err);
    }
  };

  const isSelectable = (data: CourierProviderModel) =>
    data.courierProviderId === 0;
  const rowClassName = (data: CourierProviderModel) =>
    isSelectable(data) ? "p-disabled" : "";

  return (
    <>
      {courierProviderData !== null ? (
        <DataTable
          value={courierProviderData}
          selectionMode={rowClick ? undefined : "radiobutton"}
          selection={selectedCourierProvider!}
          onSelectionChange={(e: any) => setSelectedCourierProvider(e.value)}
          dataKey="courierProviderID"
          tableStyle={{ minWidth: "10rem" }}
          size="small"
          showGridlines
          onRowSelect={onRowSelect}
          onRowUnselect={onRowUnselect}
          onRowClick={(e) => showMessage(e.originalEvent, e.data)}
        >
          <Column
            selectionMode="single"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="providerName"
            header="Courier Provider"
            body={providerTemplate}
          ></Column>
          <Column
            field="amount"
            header="Courier Charges"
            body={calculateTemplate}
          ></Column>
        </DataTable>
      ) : null}
      <OverlayPanel ref={op}>
        <Message text="Customer need to pick up from nearest VRL Godown." />
      </OverlayPanel>
    </>
  );
};

export default CourierProviderList;
