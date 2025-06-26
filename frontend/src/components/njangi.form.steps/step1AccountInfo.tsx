import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import {
  accountSetupSchema,
  AccountSetupFormData,
} from "../../types/njangi.form.schema.type";
import { useFormContext } from "../../context/njangi.form.context";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loader from "../loader";
// import FormFileInput from "../njangi.form.ui/file.input";
import {
  useValidateEmail,
  useValidatePhoneNumber,
} from "../../hooks/useValidateEmail";
import { useDebouncedValidation } from "../../hooks/useDebouncedValidationPhone&Email";
import PasswordForm from "./PasswordForm";

const Step1AccountInfo: React.FC = () => {
  const { state, updateAccountSetup, nextStep } = useFormContext();
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
    setValue,
    setError,
    clearErrors,
  } = useForm<AccountSetupFormData>({
    resolver: zodResolver(accountSetupSchema),
    defaultValues: state.accountSetup,
    mode: "onChange",
  });

  const email = watch("email");
  const phoneNum = watch("phoneNum");

  const { isFetching: isEmailChecking } = useDebouncedValidation({
    fieldName: "email",
    value: email,
    validateFn: useValidateEmail,
    setError,
    clearErrors,
    errorMessage: "Email already in use! Please choose another.",
  });

  const { isFetching: isPhoneChecking } = useDebouncedValidation({
    fieldName: "phoneNum",
    value: phoneNum,
    validateFn: useValidatePhoneNumber,
    setError,
    clearErrors,
    errorMessage: "Phone number already in use!",
  });

  // Handle phone change and update the form
  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setValue("phoneNum", `+${value}`);
    trigger("phoneNum");
  };

  const onSubmit = async (data: AccountSetupFormData) => {
    const isValid = await trigger();
    if (!isValid || errors.email) {
      console.log("Validation failed, not proceeding to next step.");
      return;
    }
    updateAccountSetup(data);
    state.accountSetup = data;

    if ("credentials" in navigator && "PasswordCredential" in window) {
      // console.log(state);
      const credential = new window.PasswordCredential({
        id: data.email,
        password: data.password,
        name: `${data.firstName} ${data.lastName}`,
      });
      navigator.credentials
        .store(credential)
        .catch((err) => console.error("Error storing credential:", err));
    }

    sessionStorage.setItem(
      "tempData",
      JSON.stringify({ senderEmail: data.email })
    );

    //session storage for phone number. for validating duplicate phone number
    sessionStorage.setItem(
      "tempPhone",
      JSON.stringify({ senderPhone: data.phoneNum })
    );

    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto w-full transition-all duration-500 animate-fadeIn">
      <div className="form-container">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Account Setup
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="form-label">First Name</label>
              <div className="relative">
                <User size={18} className="form-icon" />
                <input
                  type="text"
                  {...register("firstName")}
                  className={`form-input ${
                    errors.firstName ? "form-input-error" : ""
                  }`}
                  placeholder="John"
                  required
                />
                {errors.firstName && (
                  <p className="form-error">{errors.firstName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">Last Name</label>
              <div className="relative">
                <User size={18} className="form-icon" />
                <input
                  type="text"
                  {...register("lastName")}
                  className={`form-input ${
                    errors.lastName ? "form-input-error" : ""
                  }`}
                  placeholder="Doe"
                  required
                />
                {errors.lastName && (
                  <p className="form-error">{errors.lastName.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="form-label">Phone Number</label>
            <div className="relative">
              {/* Using react-phone-input-2 library with custom styling */}
              <PhoneInput
                country={"cm"}
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phoneNum",
                  required: true,
                }}
                enableSearch={true}
                searchPlaceholder="Search countries..."
                countryCodeEditable={false}
                disableSearchIcon={false}
                preferredCountries={["cm", "us", "ca", "gb"]}
              />
              {isPhoneChecking && (
                <span className="text-sm text-blue-600 animate-pulse">
                  Validating your phone number...
                </span>
              )}
              {errors.phoneNum && (
                <p className="form-error">{errors.phoneNum.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Email</label>
            <div className="relative">
              <Mail size={18} className="form-icon" />
              <input
                type="email"
                {...register("email")}
                className={`form-input ${
                  errors.email ? "form-input-error" : ""
                }`}
                placeholder="your.email@example.com"
                required
              />
              {isEmailChecking && (
                <span className="text-sm text-blue-600 animate-pulse">
                  Validating your email...
                </span>
              )}
              {errors.email && (
                <p className="form-error">{errors.email.message}</p>
              )}
            </div>
          </div>

          <PasswordForm errors={errors} register={register} />
          {/* <FormFileInput
            label="Profile Picture (Optional)"
            error={errors.profilePic?.message}
            registration={register("profilePic")}
            accept="image/jpeg, image/png, image/jpg"
          /> */}
          <div className="flex justify-end pt-5">
            <button
              type="submit"
              disabled={
                isSubmitting ||
                isEmailChecking ||
                !!errors.email ||
                isPhoneChecking ||
                !!errors.phoneNum
              }
              className={`form-button ${
                isSubmitting ||
                isEmailChecking ||
                !!errors.email ||
                isPhoneChecking ||
                !!errors.phoneNum
                  ? "form-button-disabled"
                  : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader />
                  Processing...
                </span>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step1AccountInfo;
