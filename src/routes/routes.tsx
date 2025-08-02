import { RouteObject } from "react-router-dom";
import { ProductsPage } from "../pages/ProductsPage/ProductsPage";
import { MainPage } from "../pages/MainPage/MainPage";
import { ProductService } from "../features/products/service/ProductService";
import { ProductHandlerPage } from "../pages/ProductHandlerPage/ProductHandlerPage";
import { Product } from "../features/products/models/product";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/products",
        element: <ProductsPage />,
        loader: () => ProductService.getProducts()
      },
      {
        path: "/product/add",
        element: <ProductHandlerPage />,
        action: async ({ request }) => {
          const formData = await request.formData();
          const product = Object.fromEntries(formData.entries()) as unknown as Product;
          try {
            return { product: await ProductService.addProduct(product)};
          } catch (error) {
            return { error: (error as Error).message };
          }
        }
      }
    ]
  }
];

export default routes;
