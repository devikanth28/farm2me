import { AppDispatch } from "../../store";
import { fetchDataStart, fetchDataSuccess, fetchDataFailure } from "./";
import CourierProviderService from "../../../services/courier-provider/courier-provider.service";

export const fetchCourierProviderData =
  (stateId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchDataStart());
      const response = await CourierProviderService.getAllCourierProviders();
      const data = await response;
      dispatch(fetchDataSuccess(data));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.message));
    }
  };
