import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/not-found";
import App from "./App";
import NjangiForm from "./pages/njangi.form.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/njangi-form",
    element: <NjangiForm />,
  },
]);
