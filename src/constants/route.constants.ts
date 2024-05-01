interface RouteConstantInterface {
  addEditAddress: string;
  addAddress: string;
  userAddresses: string;
  forgotPassword: string;
  userPassword: string;
  resetPassword: string;
  register: string;
  login: string;
  products: string;
  profile: string;
  orderSummary: string;
  userOrders: string;
  wishList: string;
  basket: string;
  productDetail: string;
  payment: string;
  measurement: string;
  courierCharges: string;
  courierProvider: string;
  userPreferredDelivery: string;
  banner: string;
  setting: string;
  aboutUs: string;
  privacyPolicy: string;
  contactUs: string;
  termsAndConditions: string;
  registerTermsAndConditions: string;
  returnPolicy: string;
  orderList: string;
  assignroutecode: string;
  courierProviderList: string;
  myOrders: string;
  generateInvoice: string;
  getwayProcess: string;
  paymentResponse: string;
  editUsers: string;
  customerAddress: string;
}

const RouteConstant: RouteConstantInterface = {
  addEditAddress: process.env.PUBLIC_URL + "/add-edit-address/:id",
  addAddress: process.env.PUBLIC_URL + "/add-edit-address/",
  userAddresses: process.env.PUBLIC_URL + "/user-addresses",
  forgotPassword: process.env.PUBLIC_URL + "/forgot-password",
  userPassword: process.env.PUBLIC_URL + "/user-password",
  resetPassword: process.env.PUBLIC_URL + "/reset-password/:mobileNumber",
  register: process.env.PUBLIC_URL + "/register",
  login: process.env.PUBLIC_URL + "/login",
  products: process.env.PUBLIC_URL + "/",
  profile: process.env.PUBLIC_URL + "/user-profile",
  orderSummary: process.env.PUBLIC_URL + "/order-summary",
  orderList: process.env.PUBLIC_URL + "/order-list",
  userOrders: process.env.PUBLIC_URL + "/orders",
  wishList: process.env.PUBLIC_URL + "/my-wish-list",
  basket: process.env.PUBLIC_URL + "/shop/basket",
  productDetail: process.env.PUBLIC_URL + "/product-detail",
  payment: process.env.PUBLIC_URL + "/payment",
  measurement: process.env.PUBLIC_URL + "/measurement",
  courierCharges: process.env.PUBLIC_URL + "/courier-charges",
  courierProvider: process.env.PUBLIC_URL + "/courier-provider",
  userPreferredDelivery: process.env.PUBLIC_URL + "/user-delivery",
  banner: process.env.PUBLIC_URL + "/banner",
  setting: process.env.PUBLIC_URL + "/setting",
  aboutUs: process.env.PUBLIC_URL + "/about-us",
  privacyPolicy: process.env.PUBLIC_URL + "/privacy",
  contactUs: process.env.PUBLIC_URL + "/contact-us",
  termsAndConditions: process.env.PUBLIC_URL + "/terms-conditions",
  registerTermsAndConditions:
    process.env.PUBLIC_URL + "/register-terms-conditions",
  returnPolicy: process.env.PUBLIC_URL + "/return-policy",
  assignroutecode: process.env.PUBLIC_URL + "/assign-route-code",
  courierProviderList: process.env.PUBLIC_URL + "/courier-provider-list",
  myOrders: process.env.PUBLIC_URL + "/my-orders",
  generateInvoice: process.env.PUBLIC_URL + "/generate-inv",
  getwayProcess: process.env.PUBLIC_URL + "/getway-process",
  paymentResponse: process.env.PUBLIC_URL + "/payment-response",
  editUsers: process.env.PUBLIC_URL + "/edit-users",
  customerAddress: process.env.PUBLIC_URL + "/edit-address",
};

export default RouteConstant;
