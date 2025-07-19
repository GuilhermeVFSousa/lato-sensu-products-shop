import { RouteObject } from "react-router-dom";
import App from "../App";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProductsPage />,
  },
    {
    path: "/products",
    element: <ProductsPage />,
  },
];

export default routes;
