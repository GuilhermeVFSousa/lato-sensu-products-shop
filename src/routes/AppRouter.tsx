import { useRoutes } from "react-router";
import routes from "./routes";

export default function AppRouter() {
  const element = useRoutes(routes);
  return element;
}
