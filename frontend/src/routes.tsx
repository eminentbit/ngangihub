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
import VerifyEmail from "./pages/very.email";
import ForgotPassword from "./pages/forgot.password";

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
      { path: "verify-email", element: <VerifyEmail /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },

  // Admin routes
  { path: "/admin/dashboard", element: <AdminDashboardPage /> },
  { path: "/admin/manage-members", element: <MemberManagement /> },
  { path: "/njangi-form", element: <NjangiForm /> },
  { path: "/login", element: <Login /> },
  { path: "/manage-admin", element: <MemberManagement /> },
  { path: "/admin/groups", element: <GroupOverviewPage /> },
  { path: "/admin/group-info", element: <GroupInfoPage /> },
  { path: "/admin/stats", element: <StatisticsPage /> },
  { path: "/admin/add-member", element: <AddMemberPage /> },
  { path: "/group-settings-admin", element: <GroupSettingsPage /> },
  { path: "/notifications", element: <NotificationsPage /> },

  // User routes
  // { path: '/dashboard', element: <UserDashboard/>}

  // Catch-all route for 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
