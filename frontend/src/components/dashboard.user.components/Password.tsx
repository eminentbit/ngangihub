// components/Settings/SettingsPasswordForm.tsx
import { useForm } from "react-hook-form";
import { Lock, Save, Check } from "lucide-react";
import { useState } from "react";

export default function SettingsPasswordForm() {
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = () => {
    setPasswordSuccess(true);
    setTimeout(() => setPasswordSuccess(false), 3000);
    reset();
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Update Password</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Ensure your account is using a long, random password to stay secure.
      </p>
      {passwordSuccess && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <Check className="h-5 w-5" />
            <span>Password updated successfully!</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("currentPassword", { required: "Current password is required" })}
                placeholder="Enter your current password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            {typeof errors.currentPassword?.message === "string" && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                })}
                placeholder="Enter your new password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            {typeof errors.newPassword?.message === "string" && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
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
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === getValues("newPassword") || "Passwords do not match",
                })}
                placeholder="Confirm your new password"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            {typeof errors.confirmPassword?.message === "string" && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div className="border-t dark:border-gray-700 pt-4 flex justify-end">
          <button type="submit" className="btn btn-primary flex items-center gap-2">
            <Save className="h-4 w-4" />
            <span>Update Password</span>
          </button>
        </div>
      </form>
    </div>
  );
}