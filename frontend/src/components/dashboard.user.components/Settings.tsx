"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  Lock,
  CreditCard,
  Bell,
  Shield,
  Save,
  Check,
} from "lucide-react";
import Sidebar from "./Sidebar";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
    // In a real app, this would call an API to update the user profile
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const onPasswordSubmit = (data: unknown) => {
    console.log(data);
    // In a real app, this would call an API to update the password
    setPasswordSuccess(true);
    setTimeout(() => setPasswordSuccess(false), 3000);
    resetPassword();
  };

  const handleAddPaymentMethod = () => {
    // In a real app, this would open a payment method form
    alert("Opening payment method form...");
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onToggle={() => setIsOpen((o) => !o)}
        activeTab={activeTab}
      />
      <div
        className={`space-y-6 px-20 py-10 mx-auto ${
          isOpen ? "lg:ml-64" : "lg:ml-16"
        } transition-all duration-300`}
      >
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 shrink-0">
            <div className="card">
              <nav className="space-y-1">
                <button
                  type="button"
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "profile"
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "password"
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  <Lock className="h-5 w-5" />
                  <span>Password</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "payment"
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                  onClick={() => setActiveTab("payment")}
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Payment Methods</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "notifications"
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="h-5 w-5" />
                  <span>Notifications</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center gap-3 w-full px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === "security"
                      ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="h-5 w-5" />
                  <span>Security</span>
                </button>
              </nav>
            </div>
          </div>
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">
                  Profile Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Update your account's profile information and email address.
                </p>
                {saveSuccess && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <Check className="h-5 w-5" />
                      <span>Profile updated successfully!</span>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        title="firstName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          {...register("firstName", {
                            required: "First name is required",
                          })}
                          aria-label="first name"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          {...register("lastName", {
                            required: "Last name is required",
                          })}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          aria-label="last Name"
                        />
                      </div>
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          })}
                          aria-label="email"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          {...register("phone")}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center gap-2"
                      aria-label="submit"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === "password" && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Update Password</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Ensure your account is using a long, random password to stay
                  secure.
                </p>
                {passwordSuccess && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <Check className="h-5 w-5" />
                      <span>Password updated successfully!</span>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmitPassword(onPasswordSubmit)}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Current Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          {...registerPassword("currentPassword", {
                            required: "Current password is required",
                          })}
                          placeholder="Enter your current password"
                          title="Current Password"
                          aria-label="Current Password"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      {passwordErrors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordErrors.currentPassword?.message as string}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          {...registerPassword("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters",
                            },
                          })}
                          placeholder="Enter your new password"
                          title="New Password"
                          aria-label="New Password"
                          id="newPassword"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      {passwordErrors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordErrors.newPassword.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          {...registerPassword("confirmPassword", {
                            required: "Please confirm your password",
                            validate: (value, formValues) =>
                              value === formValues.newPassword ||
                              "Passwords do not match",
                          })}
                          placeholder="Confirm your new password"
                          title="Confirm Password"
                          aria-label="Confirm Password"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                      {passwordErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {passwordErrors.confirmPassword.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Update Password</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === "payment" && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Add payment methods to make contributions to your groups.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="border dark:border-gray-700 rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md">
                        <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Expires 12/2025
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Default
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary w-full flex items-center justify-center gap-2"
                    onClick={handleAddPaymentMethod}
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Add New Payment Method</span>
                  </button>
                </div>
              </div>
            )}
            {activeTab === "notifications" && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">
                  Notification Settings
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Manage how you receive notifications from your groups.
                </p>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                      title="Enable notifications"
                      aria-label="Enable notifications"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                      title="Enable push notifications"
                      aria-label="Enable push notifications"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Payment Reminders</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive reminders for upcoming payments
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Group Activity</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive notifications for group activities
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      aria-label="recieve notifications"
                    />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
                  </label>
                </div>
                <div className="border-t dark:border-gray-700 pt-4 flex justify-end">
                  <button
                    type="button"
                    className="btn btn-primary flex items-center gap-2"
                    onClick={() => {
                      // In a real app, this would save notification preferences
                      alert("Notification preferences saved!");
                    }}
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}
            {activeTab === "security" && (
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">
                  Security Settings
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Manage your account security settings and two-factor
                  authentication.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        aria-label="TFA"
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive notifications for new login attempts
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Manage your active sessions
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-sm text-indigo-600 dark:text-indigo-400 font-medium"
                      onClick={() => {
                        // In a real app, this would show active sessions
                        alert("Viewing active sessions...");
                      }}
                    >
                      View Sessions
                    </button>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-4 mt-4">
                    <button
                      type="button"
                      className="btn btn-secondary text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full flex items-center justify-center gap-2"
                      onClick={() => {
                        // In a real app, this would show a confirmation dialog
                        if (
                          confirm(
                            "Are you sure you want to delete your account? This action cannot be undone."
                          )
                        ) {
                          alert("Account deletion request submitted.");
                        }
                      }}
                    >
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
