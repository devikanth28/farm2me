export interface CustomerAddressModel {
  userAddressID: number;
  userID: number;
  userName: string;
  primaryContactNbr: string;
  address1: string;
  address2: string;
  landmark: string;
  countryID: number;
  countryName: string;
  stateID: number;
  stateName: string;
  cityID: number;
  cityName: string;
  zipcode: string;
  gpsLocation: string;
  isDeleted: boolean;
}

export interface EditAddressModel {
  userAddressID: number;
  userID: number;
  address1: string;
  address2: string;
  landmark: string;
  countryID: number;
  stateID: number;
  cityID: number;
  zipcode: string;
}