import { CourierChargesMocks } from "./courier-charges-mocks/courier-charges-mock";

const getAllCoruierCharges = async () => {
    try {
        const response = CourierChargesMocks;
        return response;
    } catch (error)
    {
        console.error('error reading courier charges data.', error);
        throw error;
    }
}

const CourierChargesService = {
    getAllCoruierCharges
};

export default CourierChargesService;