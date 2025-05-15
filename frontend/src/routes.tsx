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
//BOD
import Dashboard from './pages/dashboard.bod.pages/Dashboard';
import Notifications from "./pages/dashboard.bod.pages/Notifications";
import Resolutions from "./pages/dashboard.bod.pages/Resolutions";
import MeetingSchedule from "./pages/dashboard.bod.pages/MeetingSchedule";
import MeetingMinutes from "./pages/dashboard.bod.pages/MeetingMinutes";
import Attendance from "./pages/dashboard.bod.pages/Attendance";
import Documents from "./pages/dashboard.bod.pages/Documents";
import Policies from "./pages/dashboard.bod.pages/Policies";
import Reports from "./pages/dashboard.bod.pages/Reports";
import GroupReqest from "./pages/dashboard.bod.pages/GroupRequest";

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
  {path: "/group-settings-admin", element: <GroupSettingsPage /> },
  {path: "/notifications", element: <NotificationsPage /> },

  // Board of Directors routes
  {
    path: "/board",
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "notifications", element: <Notifications/>},
      { path: "resolutions", element: <Resolutions/>},
      { path: "schedule", element: <MeetingSchedule/>},
      { path: "minutes", element: <MeetingMinutes/>},
      { path: "attendance", element: <Attendance/>},
      { path: "documents", element: <Documents/>},
      { path: "policies", element: <Policies/>},
      { path: "reports", element: <Reports/>},
      { path: "group-requests", element: <GroupReqest/>},
    ],
  },
  // Catch-all route for 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
