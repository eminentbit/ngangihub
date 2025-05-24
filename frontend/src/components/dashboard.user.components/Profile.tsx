import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Save, Check } from "lucide-react";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const Profile = () => {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567"
    }
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
        Update your account’s profile details below.
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
            error={errors.email}
          />
          <InputField
            label="Phone Number"
            icon={Phone}
            type="tel"
            register={register}
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
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  icon: React.ComponentType<{ className: string }>;
  type?: string;
  register: ReturnType<typeof useForm<ProfileFormData>>['register'];
  name: keyof ProfileFormData;
  error?: { message?: string };
}

const InputField: React.FC<InputFieldProps> = ({ label, icon: Icon, type = "text", register, name, error }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        {...register(name, { required: `${label} is required` })}
        className={`block w-full pl-10 pr-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      />
    </div>
    {error?.message && (
      <p className="text-red-500 text-sm mt-1">
        {error.message}
      </p>
    )}
  </div>
);

export default Profile;
