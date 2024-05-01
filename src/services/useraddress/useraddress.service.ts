import ApiConstant from "../../constants/api.constants";
import api from "../api";

const getUserAddress = async () => {
  try {
    const userAddress: any = await api
      .get(ApiConstant.apiUserAddress)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error reading get address data.", error);
      });
    const response = userAddress != null ? userAddress : null;
    return response;
  } catch (e) {
    console.log("error in getUserAddress");
    return [];
  }
};

const getUserAddressById = async (userId: number) => {
  try {
    const userAddress: any = await api
      .get(ApiConstant.getUserAddressById + "?$filter=userID eq " + userId)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error reading get address data.", error);
      });
    const response = userAddress != null ? userAddress : null;
    return response;
  } catch (e) {
    console.log("error in getUserAddress");
    return [];
  }
};

const addUserAddress = async (address: any) => {
  try {
    const userAddress: any = await api
      .post(ApiConstant.apiUserAddress, address)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error creating address data.", error);
      });
    const response = userAddress != null ? userAddress : null;
    return response;
    console.warn(address);
  } catch {
    console.log("error in add user address");
    return false;
  }
};

const editUserAddress = async (address: any) => {
  try {
    const userAddress: any = await api
      .put(ApiConstant.apiUserAddress, address)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error updating address data.", error);
      });
    const response = userAddress != null ? userAddress : null;
    return response;
  } catch {
    console.log("error in edit user address");
    return false;
  }
};

const updateGPSLocation = async (addressId: number, gpsLocation: string) => {
  try {
    const userAddress: any = await api
      .put(ApiConstant.updateGPSLocation, {
        userAddressID: addressId,
        gpsLocation: gpsLocation,
      })
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error updating address data.", error);
      });
    const response = userAddress != null ? userAddress : null;
    return response;
  } catch {
    console.log("error in update gps location");
    return false;
  }
};

const deleteUserAddress = async (addressId: number) => {
  try {
    console.warn(ApiConstant.deleteUserAddress + addressId);
    await api
      .delete(ApiConstant.deleteUserAddress + addressId)
      .then((res: any) => {
        if (res) return res.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error deleting address data.", error);
      });
  } catch {
    console.log("error in delete user address");
    return;
  }
};

const getCountries = async () => {
  try {
    const countries: any = await api
      .get(ApiConstant.getCountries)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error reading get countries data.", error);
      });
    const response = countries != null ? countries : null;
    return response;
  } catch (e) {
    console.log("error in getCountries");
    return [];
  }
};

const getStates = async (countryId: any) => {
  try {
    const countries: any = await api
      .get(ApiConstant.getStatesByCounty + countryId)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error reading get states data.", error);
      });
    const response = countries != null ? countries : null;
    return response;
  } catch (e) {
    console.log("error in getStates");
    return [];
  }
};

const getCities = async (stateId: any) => {
  try {
    const countries: any = await api
      .get(ApiConstant.getCitiesByState + stateId)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error reading get states data.", error);
      });
    const response = countries != null ? countries : null;
    return response;
  } catch (e) {
    console.log("error in getStates");
    return [];
  }
};

const getInvoiceUsers = async () => {
  try {
    const invoiceUsers: any = await api
      .get(ApiConstant.getInvoiceUsers)
      .then((result: any) => {
        if (result) return result.data;
        else return null;
      })
      .catch(function (error: any) {
        console.error("error reading get invoice users data.", error);
      });
    const response = invoiceUsers != null ? invoiceUsers : null;
    return response;
  } catch (e) {
    console.log("error in get invoice users");
    return [];
  }
};

const UserAddressService = {
  getUserAddress,
  deleteUserAddress,
  addUserAddress,
  editUserAddress,
  getCountries,
  getStates,
  getCities,
  getInvoiceUsers,
  updateGPSLocation,
  getUserAddressById,
};

export default UserAddressService;
