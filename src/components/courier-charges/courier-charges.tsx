import { useEffect, useState } from "react";
import CourierChargesService from "../../services/courier-charges/courier-charges.service";
import { CourierChargesModel } from "../../models/courier-charges-model";
import CourierChargesTable from "./courier-charges-table";

const CourierCharges = () => {
  const [courierCharges, setCourierCharges] = useState<CourierChargesModel[]>(
    []
  );

  useEffect(() => {
    CourierChargesService.getAllCoruierCharges().then((response: any) => {
      setCourierCharges(response);
    });
  }, []);

  return (
    <>
      {courierCharges.length > 0 ? (
        <CourierChargesTable courierChargesData={courierCharges} />
      ) : null}
    </>
  );
};

export default CourierCharges;
