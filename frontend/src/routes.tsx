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
import ContributionPage from "./pages/dashboard.admin.pages/Contribution";
import LoanRequestPage from "./pages/dashboard.admin.pages/LoanRequested";
import VerifyEmail from "./pages/very.email";
import ForgotPassword from "./pages/forgot.password";
import Dashboard from "./pages/dashboard.bod.pages/Dashboard";
import UserDashboard from "./pages/dashboard.user.pages/dashboard";
import MyGroups from "./pages/dashboard.user.pages/MYGroup";
import Notifications from "./pages/dashboard.bod.pages/Notifications";
import Resolutions from "./pages/dashboard.bod.pages/Resolutions";
import MeetingSchedule from "./pages/dashboard.bod.pages/MeetingSchedule";
import MeetingMinutes from "./pages/dashboard.bod.pages/MeetingMinutes";
import Attendance from "./pages/dashboard.bod.pages/Attendance";
import Documents from "./pages/dashboard.bod.pages/Documents";
import Policies from "./pages/dashboard.bod.pages/Policies";
import Reports from "./pages/dashboard.bod.pages/Reports";
import GroupReqest from "./pages/dashboard.bod.pages/GroupRequest";
import PaymentsPage from "./pages/dashboard.user.pages/payments/page";
import Settings from "./components/dashboard.user.components/Settings";

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

  {
    path: "/user",
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "my-groups", element: <MyGroups /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "settings", element: <Settings /> },
    ],
  },

  // Admin routes
  {
    path: "/admin",
    caseSensitive: false,
    children: [
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "manage-members", element: <MemberManagement /> },
      { path: "njangi-form", element: <NjangiForm /> },
      { path: "login", element: <Login /> },
      { path: "groups", element: <GroupOverviewPage /> },
      { path: "group-info", element: <GroupInfoPage /> },
      { path: "stats", element: <StatisticsPage /> },
      { path: "add-member", element: <AddMemberPage /> },
      { path: "group-settings", element: <GroupSettingsPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "contributions", element: <ContributionPage /> },
      { path: "loans-request", element: <LoanRequestPage /> },
    ],
    
  },

  // Board of Directors routes
  {
    path: "/board",
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "notifications", element: <Notifications /> },
      { path: "resolutions", element: <Resolutions /> },
      { path: "schedule", element: <MeetingSchedule /> },
      { path: "minutes", element: <MeetingMinutes /> },
      { path: "attendance", element: <Attendance /> },
      { path: "documents", element: <Documents /> },
      { path: "policies", element: <Policies /> },
      { path: "reports", element: <Reports /> },
      { path: "group-requests", element: <GroupReqest /> },
    ],
  },
  // Catch-all route for 404
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
