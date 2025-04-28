import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/not-found";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFoundPage />,
  },
  
]);
