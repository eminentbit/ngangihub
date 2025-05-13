import React from "react";
import { createBrowserRouter } from "react-router-dom";
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
import GroupSettingsPage from "./pages/dashboard.admin.pages/GroupSetting";
import NotificationsPage from "./pages/dashboard.admin.pages/Notification";
import UserDashboard from "./pages/dashboard.user.pages/UserDashboardPage";
import UserDashboardPage from "./pages/dashboard.user.pages/UserDashboardPage";

// eslint-disable-next-line react-refresh/only-export-components
const LandingSections: React.FC = () => <App />;

// ----- Build the router -----
export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    children: [
      { index: true, element: <LandingSections /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "login", element: <Login /> },
      { path: "njangi-form", element: <NjangiForm /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // Admin routes
  { path: "/admindashboard", element: <AdminDashboardPage /> },
  { path: "/admin-manage-members", element: <MemberManagement /> },
  { path: "/njangi-form", element: <NjangiForm /> },
  { path: "/login", element: <Login /> },
  { path: "/manage-admin", element: <MemberManagement /> },
  { path: "/groups-admin", element: <GroupOverviewPage /> },
  { path: "/group-info-admin", element: <GroupInfoPage /> },
  { path: "/stats-admin", element: <StatisticsPage /> },
  { path: "/add-member-admin", element: <AddMemberPage /> },
  { path: "/add-member-admin", element: <AddMemberPage /> },
  { path: "/group-settings-admin", element: <GroupSettingsPage /> },
  { path: "/notifications", element: <NotificationsPage /> },
  { path: "/userdashboard", element: <UserDashboardPage /> },

  // Catch-all route for 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
