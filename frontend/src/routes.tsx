
import React from "react";
import {
  createBrowserRouter,
  Outlet,
  useLocation,
} from "react-router-dom";

import Header from "./section.welcome.page/Header";
import Footer from "./section.welcome.page/Footer";

// And your routed pages:
import AboutPage from "./section.welcome.page/About";
import ContactPage from "./section.welcome.page/Contact";
import NotFoundPage from "./pages/not-found";
import { AdminDashboardPage } from "./pages/dashboard.admin.pages/AdminDashboardPage";
import App from "./App";

// ----- Layout for landing + children -----
const RootLayout: React.FC = () => {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith("/admindashboard");

  return (
    <div className="font-sans antialiased">
      {!hideLayout && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

const LandingSections: React.FC = () => (
  < App/>
);

// ----- Build the router -----
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout  />,
    children: [
      { index: true, element: <LandingSections /> },       
      { path: "about", element: <AboutPage /> },           
      { path: "contact", element: <ContactPage /> },        
      { path: "admindashboard", element: <AdminDashboardPage /> }, 
      { path: "*", element: <NotFoundPage /> },             
    ],
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
