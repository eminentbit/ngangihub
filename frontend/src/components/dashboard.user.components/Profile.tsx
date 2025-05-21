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
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
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
          <InputField
            label="First Name"
            icon={User}
            register={register}
            name="firstName"
            // error={errors.firstName}
          />
          <InputField
            label="Last Name"
            icon={User}
            register={register}
            name="lastName"
            // error={errors.lastName}
          />
          <InputField
            label="Email Address"
            icon={Mail}
            type="email"
            register={register}
            name="email"
            // error={errors.email}
          />
          <InputField
            label="Phone Number"
            icon={Phone}
            type="tel"
            register={register}
            name="phone"
          />
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
  );
};

interface InputFieldProps {
  label: string;
  icon: React.ComponentType<{ className: string }>;
  type?: string;
  register: ReturnType<typeof useForm<ProfileFormData>>["register"];
  name: keyof ProfileFormData;
  error?: { message: string };
}

const InputField: React.FC<InputFieldProps> = ({ label, icon: Icon, type = "text", register, name, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        {...register(name)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    {error?.message && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default Profile;