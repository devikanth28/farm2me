import { useEffect, useState } from "react";
import { MeasurementModel } from "../../models/measurement-model";
import MeasurementService  from "../../services/measurement/measurement.service";
import MeasurementTable from "./measurement-table";

const Measurement = () => {
    const [measurements, setMeasurements] = useState<MeasurementModel[]>([]);
    
    useEffect(()=>{
        MeasurementService.getAllMeasurement().then((response : any)=>{
            setMeasurements(response);
        })
    }, []);

    return (
        <>
            
            { measurements.length > 0 ? <MeasurementTable measuremnts={ measurements } /> : null }
            
        </>
    );
};

export default Measurement;