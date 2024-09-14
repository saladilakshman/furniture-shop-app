import { ShoppingCart, User, Home, Info, ShoppingBag } from "lucide-react";
export const navLinks = [
  {
    page: "home",
    path: "/",
    icon: <Home />,
  },
  {
    page: "about",
    path: "about",
    icon: <Info />,
  },
  {
    page: "products",
    path: "products",
    icon: <ShoppingBag />,
  },
  {
    page: "cart",
    path: "cart",
    hasIcon: true,
    icon: <ShoppingCart />,
  },
  {
    page: "login",
    path: "login",
    icon: <User />,
  },
];
