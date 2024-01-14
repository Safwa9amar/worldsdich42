// routesGenerator.js
import Error404 from "../pages/404/404";
import Home from "../pages/home/Home";
import Catergory from "../pages/menu/components/Catergory";
import Checkout from "../pages/checkout/Checkout";
import ChargeSuccess from "../pages/checkout/ChargeSuccess";
import Menu from "../pages/menu/Menu";
import Contact from "../pages/contact/Contact";
import Profile from "../pages/profile/Profile";

export const generateRoutes = (getRouteElement, defaultProps = {}) => [
  { path: "*", element: getRouteElement(Error404) },
  { path: "/", element: getRouteElement(Home) },
  {
    path: "/menu/category",
    element: getRouteElement(Catergory, {
      ...defaultProps.categoryProps,
    }),
  },
  {
    path: "/checkout",
    element: getRouteElement(Checkout, {
      ...defaultProps.checkoutProps,
    }),
  },
  {
    path: "/success",
    element: getRouteElement(ChargeSuccess, {
      ...defaultProps.chargeSuccessProps,
    }),
  },
  { path: "/menu", element: getRouteElement(Menu, defaultProps.menuProps) },
  {
    path: "/contact",
    element: getRouteElement(Contact, defaultProps.contactProps),
  },
  {
    path: "/profile",
    element: getRouteElement(Profile, defaultProps.profileProps),
  },
];
