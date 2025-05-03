import React from "react";
import { createBrowserRouter } from "react-router-dom";

// And your routed pages:
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFoundPage from "./pages/not-found";
import { AdminDashboardPage } from "./pages/dashboard.admin.pages/AdminDashboardPage";
import App from "./App";
import NjangiForm from "./pages/njangi.form.page";
import Login from "./pages/login";
import MemberManagement from "./pages/dashboard.admin.pages/Manage";
import GroupOverviewPage from "./pages/dashboard.admin.pages/GroupOverview";
import GroupInfoPage from "./pages/dashboard.admin.pages/GroupInfo";
import StatisticsPage from "./pages/dashboard.admin.pages/MyStatistics";
import AddMemberPage from "./pages/dashboard.admin.pages/AddMember";


// eslint-disable-next-line react-refresh/only-export-components
const LandingSections: React.FC = () => <App />;

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
  {
    path: "/njangi-form",
    element: <NjangiForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manage",
    element: <MemberManagement />,
  },
  {
    path: "/groups-admin",
    element: <GroupOverviewPage />,
  },
  {
    path: "/group-info-admin",
    element: <GroupInfoPage />,
  },
  {
    path: "/stats-admin",
    element: <StatisticsPage />,
  },
  {
    path: "/add-member-admin",
    element: <AddMemberPage />,
  },
  
]);
