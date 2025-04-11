import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/welcome.page";
import AboutPage from "./pages/about.page";
import ContactPage from "./pages/contact.page";
import NotFoundPage from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",   
    element: <ContactPage />,
  }
]);
