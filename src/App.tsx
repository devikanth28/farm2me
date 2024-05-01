import { PrimeReactProvider } from "primereact/api";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PermissionsProvider } from "./providers/PermissionsProvider";
import { LayoutProvider } from "./components/layout/context/layoutcontext";
import RouteConstant from "./constants/route.constants";
import { Suspense, lazy } from "react";
import AppLoading from "./components/app-loading/app-loading";
import Layout from "./components/layout/layout";
import AboutUs from "./components/layout/footer-notes/about-us";
import Privacy from "./components/layout/footer-notes/privacy-policy";
import ContactUs from "./components/layout/footer-notes/contact-us";
import ReturnPolicy from "./components/layout/footer-notes/return-policy";
import TermsAndConditions from "./components/layout/footer-notes/terms-conditions";
import RegisterTermsAndConditions from "./components/layout/footer-notes/terms-and-conditions-register";
import { PrivateRoute } from "./components/security/private-route";

const SignIn = lazy(() => import("./components/signin/signin-component"));
const ForgotPassword = lazy(
  () => import("./components/forget-password/forget-password")
);
const Setting = lazy(() => import("./components/setting/setting"));
const Register = lazy(() => import("./components/register/register"));
const AddOrEditAddress = lazy(
  () => import("./components/user-address/add-or-edit-address")
);
const AllUserAddress = lazy(
  () => import("./components/user-address/all-address")
);
const UserProfile = lazy(() => import("./components/profile/userprofile"));
const UserPassword = lazy(() => import("./components/profile/password"));
const OrderSummary = lazy(() => import("./components/orders/order-summary"));
const MyWishlist = lazy(() => import("./components/wish-list/my-wish-list"));
const NotFound = lazy(() => import("./components/not-found/not-found"));
const Cart = lazy(() => import("./components/basket/carts"));
const Payment = lazy(() => import("./components/payments/payment"));
const Measurement = lazy(() => import("./components/measurements/measurement"));
const Products = lazy(() => import("./components/products/products"));
const CourierCharges = lazy(
  () => import("./components/courier-charges/courier-charges")
);
const CourierProvider = lazy(
  () => import("./components/courier-provider/courier-provider")
);
const UserPreferredDelivery = lazy(
  () => import("./components/user-preferred-delivery/user-delivery")
);
const Banners = lazy(() => import("./components/banners/banner"));
const ProductDetail = lazy(
  () => import("./components/product/single-product-details")
);
const OrderList = lazy(() => import("./components/orders/order-list"));
const MyOrderList = lazy(() => import("./components/my-order/my-order"));
const AssignRouteCode = lazy(
  () => import("./components/route-code/assign-route-code")
);
const GenerateInvoice = lazy(
  () => import("./components/invoices/generate-inv")
);
const EditUsers = lazy(
  () => import("./components/edit-users/edit-users")
);
const CustomerAddress = lazy(
  () => import("./components/edit-address/edit-cust-address")
);
const CourierProviderList = lazy(
  () => import("./components/courier-provider/courier-provider-new")
);

const MainGetwayRequest = lazy(
  () => import("./components/payment-getways/main-getway-request")
);
const MainGetwayResponse = lazy(
  () => import("./components/payment-getways/main-getway-response")
);

function App() {
  const emptyFunction = () => {};
  return (
    <>
      <Router>
        <PrimeReactProvider>
          <PermissionsProvider>
            <LayoutProvider>
              <Suspense fallback={<AppLoading />}>
                <Routes>
                  
                  <Route path='*' element={<Navigate replace to={RouteConstant.products} />} />
                  <Route path={RouteConstant.paymentResponse} element={<MainGetwayResponse />} />
                  <Route

                    element={<PrivateRoute isAuthenticationRequired={true} />}
                  >
                    <Route element={<Layout />}>
                      <Route
                        path={RouteConstant.addEditAddress}
                        element={<AddOrEditAddress />}
                      />
                      <Route
                        path={RouteConstant.userAddresses}
                        element={<AllUserAddress />}
                      />

                      <Route
                        path={RouteConstant.profile}
                        element={<UserProfile />}
                      />
                      <Route
                        path={RouteConstant.orderSummary}
                        element={<OrderSummary />}
                      />
                      <Route
                        path={RouteConstant.orderList}
                        element={<OrderList />}
                      />
                      <Route
                        path={RouteConstant.myOrders}
                        element={<MyOrderList />}
                      />
                      <Route
                        path={RouteConstant.assignroutecode}
                        element={<AssignRouteCode />}
                      />
                      <Route
                        path={RouteConstant.generateInvoice}
                        element={<GenerateInvoice />}
                      />
                      <Route
                        path={RouteConstant.editUsers}
                        element={<EditUsers />}
                      />
                      <Route
                        path={RouteConstant.customerAddress}
                        element={<CustomerAddress />}
                      />
                      <Route
                        path={RouteConstant.wishList}
                        element={<MyWishlist />}
                      />
                      <Route
                        path={RouteConstant.userPassword}
                        element={<UserPassword isResetPasswordPage={false} />}
                      />

                      <Route
                        path={RouteConstant.payment}
                        element={<Payment />}
                      />
                      <Route
                        path={RouteConstant.banner}
                        element={<Banners />}
                      />
                      <Route
                        path={RouteConstant.measurement}
                        element={<Measurement />}
                      />
                      <Route
                        path={RouteConstant.courierCharges}
                        element={<CourierCharges />}
                      />
                      <Route
                        path={RouteConstant.courierProvider}
                        element={<CourierProvider />}
                      />
                      <Route
                        path={RouteConstant.userPreferredDelivery}
                        element={<UserPreferredDelivery />}
                      />
                      <Route
                        path={RouteConstant.setting}
                        element={<Setting />}
                      />
                      <Route
                        path={RouteConstant.courierProviderList}
                        element={<CourierProviderList />}
                      />
                      <Route
                        path={RouteConstant.getwayProcess}
                        element={<MainGetwayRequest />}
                      />
                      {/* <Route
                        path={RouteConstant.paymentResponse}
                        element={<MainGetwayResponse />}
                       /> */}
                    </Route>
                  </Route>
                  <Route
                    element={<PrivateRoute isAuthenticationRequired={false} />}
                  >
                    <Route
                      path={RouteConstant.resetPassword}
                      element={<UserPassword isResetPasswordPage={true} />}
                    />
                    <Route path={RouteConstant.login} element={<SignIn />} />
                    <Route
                      path={RouteConstant.forgotPassword}
                      element={<ForgotPassword />}
                    />
                    <Route
                      path={RouteConstant.register}
                      element={<Register hideAdminModal={emptyFunction}/>}
                    />
                  </Route>
                  <Route element={<Layout />}>
                    <Route
                      path={RouteConstant.products}
                      element={<Products />}
                    />
                    <Route path={RouteConstant.basket} element={<Cart />} />
                    <Route
                      path={RouteConstant.productDetail}
                      element={<ProductDetail />}
                    />
                    <Route path={RouteConstant.aboutUs} element={<AboutUs />} />
                    <Route
                      path={RouteConstant.privacyPolicy}
                      element={<Privacy />}
                    />
                    <Route
                      path={RouteConstant.contactUs}
                      element={<ContactUs />}
                    />
                    <Route
                      path={RouteConstant.termsAndConditions}
                      element={<TermsAndConditions />}
                    />
                    <Route
                      path={RouteConstant.returnPolicy}
                      element={<ReturnPolicy />}
                    />
                    <Route
                      path={RouteConstant.registerTermsAndConditions}
                      element={<RegisterTermsAndConditions />}
                    />
                  </Route>
                 
                </Routes>
              </Suspense>
            </LayoutProvider>
          </PermissionsProvider>
        </PrimeReactProvider>
      </Router>
    </>
  );
}

export default App;
