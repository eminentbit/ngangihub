import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Save, Check } from "lucide-react";
import InputField, { ProfileFormData } from "../InputField";
import { useAuthStore } from "../../store/create.auth.store";
import { useSession } from "../../hooks/useSession";

const Profile = () => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { user } = useAuthStore();

  useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: user?.firstName || "N/A",
      lastName: user?.lastName || "N/A",
      email: user?.email || "N/A",
      phone: user?.phoneNumber || "N/A",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      console.log("Submitted profile data:", data);
      await new Promise((res) => setTimeout(res, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Profile Information
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Update your account's profile details below.
      </p>

      {saveSuccess && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <Check className="h-5 w-5 text-green-600 dark:text-green-200" />
          <span className="text-green-800 dark:text-green-200">
            Profile updated successfully!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            icon={User}
            register={register}
            name="firstName"
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            icon={User}
            register={register}
            name="lastName"
            error={errors.lastName}
          />
          <InputField
            label="Email Address"
            icon={Mail}
            type="email"
            register={register}
            name="email"
            disabled
            error={errors.email}
          />
          <InputField
            label="Phone Number"
            icon={Phone}
            type="tel"
            register={register}
            disabled
            name="phone"
            error={errors.phone}
          />
        </div>
        <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
