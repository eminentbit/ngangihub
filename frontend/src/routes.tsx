
import React from "react";
import {
  createBrowserRouter,
 
} from "react-router-dom";

// And your routed pages:
import AboutPage from "./section.welcome.page/About";
import ContactPage from "./section.welcome.page/Contact";
import NotFoundPage from "./pages/not-found";
import { AdminDashboardPage } from "./pages/dashboard.admin.pages/AdminDashboardPage";
import App from "./App";

const LandingSections: React.FC = () => (
  < App/>
);

// ----- Build the router -----
export const router = createBrowserRouter([
  {
   
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
  
]);
