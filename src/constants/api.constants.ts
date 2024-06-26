
interface ApiConstantModel {
  userRegister: string,
  updateUser: string,
  getUser: string,
  getUserById: string,
  getCurrentUserDetails: string,
  changeUserPassword: string,
  getToken: string,
  getRefreshToken: string,
  getHomeCategories: string,
  getHomeProducts: string,
  apiUserAddress: string,
  updateGPSLocation: string,
  deleteUserAddress: string,
  getCountries: string,
  getStatesByCounty: string,
  getCitiesByState: string,
  sendForgotPasswordOTP: string,
  sendRegistrationVerficationOTP: string,
  resetPassword: string,
  validateOTP: string,
  setCustomerOrder: string,
  getUserAddressById: string,
  sendUpdateUserOTP: string,
  getAllCourierProviders: string
  getAllOrder: string,
  getInvoiceUsers: string,
  getOrderUserList: string,
  getRouteCodesApi: string,
  getRouteCodeUsers: string,
  assignUserRouteCode: string,
  getMyOrderList: string,
  updateOrderStatus: string,
  generateNewInvoice: string,
  getAllUser: string,
  updateUserDetail: string,
  deleteUserDetail: string,
  setAdminCustomerOrder: string,
  getCustomerAddress: string,
  updateCustomerAddress: string,
  createUser: string
}

const ApiConstant: ApiConstantModel = {
  userRegister: "/api/user",
  updateUser: "/api/user",
  getUser: "/api/user",
  getUserById: "/api/user/get/{0}",
  getCurrentUserDetails: "/api/user/GetUserDetail",
  changeUserPassword: "/api/User/ChangePassword",
  getToken: "/api/account/token",
  getRefreshToken: "/api/account/refresh",
  updateGPSLocation: "/api/UserAddress/UpdateGPSLocation/",
  getHomeCategories: "/api/Home/GetHomeCategories/",
  getHomeProducts: "/api/Home/GetHomeProducts/",
  apiUserAddress: "/api/UserAddress/",
  getUserAddressById: "/api/UserAddress/GetAllUserAddress",
  deleteUserAddress: "/api/UserAddress?userAddressID=",
  getCountries: "/api/Country/",
  getStatesByCounty: "/api/State/GetStatebyCountryID/",
  getCitiesByState: "/api/City/GetCitybyID/",
  sendForgotPasswordOTP: "/api/User/sendForgotPasswordOTP",
  sendRegistrationVerficationOTP: "/api/User/sendUserRegistrationOTP",
  getAllOrder: "/api/Order/GetAllOrder",
  getInvoiceUsers: "/api/User/GetInvoiceUserList/",
  resetPassword: "/api/User/resetpassword",
  validateOTP: "/api/User/ValidateOTP/",
  setCustomerOrder: "/api/Order",
  getOrderUserList: "/api/User/GetOrderUserList/",
  getRouteCodesApi: "/api/RouteCode/",
  sendUpdateUserOTP: "/api/User/SendUpdateUserOTP",
  getAllCourierProviders: "/api/CourierCharges",
  getRouteCodeUsers: "/api/UserAddress/GetAllUserAddress",
  assignUserRouteCode: "/api/UserAddress/AssignRouteCode",
  getMyOrderList: "/api/Order",
  updateOrderStatus: "/api/Order/UpdateOrderStatus",
  generateNewInvoice: "/api/OrderInvoice",
  setAdminCustomerOrder: "/api/Order/CreateCustomerOrder",
  getAllUser: "/api/User/GetAllUser",
  updateUserDetail: "/api/User/UpdateOtherUserDetail",
  deleteUserDetail: "/api/User/DeleteOtherUser?userID=",
  getCustomerAddress: "/api/UserAddress/GetAllUserAddress",
  updateCustomerAddress: "/api/UserAddress/UpdateOtherUserAddress",
  createUser: "/api/User/CreateUser"
}

export default ApiConstant;
