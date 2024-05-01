import { MeasurementMock } from "./measurement_mocks/measurement-mock";
const getAllMeasurement = async () => {
    try {
        const response = MeasurementMock;
        return response;
    } catch (error)
    {
        console.error('error reading measurement data.', error);
        throw error;
    }
}

const MeasurementService = {
    getAllMeasurement
};

export default MeasurementService;

// const writeMeasurement = async (newData) => {

// }
