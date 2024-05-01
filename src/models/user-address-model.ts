export interface UserAddress {
  userAddressID: number;
  createdBy?: number;
  userName?: string;
  address1: string;
  address2: string;
  landmark: string;
  countryName: string;
  stateName: string;
  cityName: string;
  zipcode: string;
  gpsLocation: string;
  isPrimary: boolean;
  homeDeliveryAvailable: boolean;
}

export interface UserEditAddress {
  userAddressID: number;
  address1: string;
  address2: string;
  landmark: string;
  countryID: number;
  stateID: number;
  cityID: number;
  zipcode: string;
  gpsLocation?: string | null;
}
