import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Users, Calendar, DollarSign } from "lucide-react";
import {
  groupDetailsSchema,
  GroupDetailsFormData,
} from "../../types/njangi.form.schema.type";
import { useFormContext } from "../../context/njangi.form.context";

const Step2GroupDetails: React.FC = () => {
  const { state, updateGroupDetails, nextStep, prevStep } = useFormContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GroupDetailsFormData>({
    resolver: zodResolver(groupDetailsSchema),
    defaultValues: state.groupDetails,
  });

  const onSubmit = (data: GroupDetailsFormData) => {
    updateGroupDetails(data);
    nextStep();
  };

  const frequencyOptions = ["Weekly", "Bi-weekly", "Monthly"];
  const payoutOptions = ["Rotation", "Lottery", "Bidding"];

  return (
    <div className="max-w-2xl mx-auto w-full transition-all duration-300 animate-fadeIn">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Njangi Group Details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Group Name</label>
            <div className="relative mt-1">
              <Users
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="text"
                {...register("groupName")}
                className={`form-input ${
                  errors.groupName ? "form-input-error" : ""
                }`}
              />
              {errors.groupName && (
                <p className="form-error">{errors.groupName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Contribution Amount</label>
              <div className="relative mt-1">
                <DollarSign
                  size={18}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
                <input
                  type="number"
                  {...register("contributionAmount")}
                  className={`form-input ${
                    errors.contributionAmount ? "form-input-error" : ""
                  }`}
                  min="0"
                  step="0.01"
                />
                {errors.contributionAmount && (
                  <p className="form-error">
                    {errors.contributionAmount.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">Contribution Frequency</label>
              <select
                {...register("contributionFrequency")}
                className={`block w-full pl-3 pr-3 py-2 border ${
                  errors.contributionFrequency ? "form-input-error" : ""
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select Frequency</option>
                {frequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.contributionFrequency && (
                <p className="form-error">
                  {errors.contributionFrequency.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payout Method
            </label>
            <select
              {...register("payoutMethod")}
              className={`block w-full pl-3 pr-3 py-2 border ${
                errors.payoutMethod ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Select Payout Method</option>
              {payoutOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.payoutMethod && (
              <p className="form-error">{errors.payoutMethod.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <div className="relative mt-1">
                <Calendar
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />
                <input
                  type="date"
                  {...register("startDate")}
                  className={`form-input ${
                    errors.startDate ? "form-input-error" : ""
                  }`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.startDate && (
                  <p className="form-error">{errors.startDate.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="form-label">End Date (Optional)</label>
              <div className="relative mt-1">
                <Calendar
                  size={18}
                  className="absolute left-3 top-3.5 text-gray-400"
                />

                <input
                  type="date"
                  {...register("endDate")}
                  className={`form-input ${
                    errors.endDate ? "form-input-error" : ""
                  }`}
                  min={new Date().toISOString().split("T")[0]}
                />
                {errors.endDate && (
                  <p className="form-error">{errors.endDate.message}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Members (Optional)
            </label>
            <div className="relative mt-1">
              <Users
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
              <input
                type="number"
                {...register("numOfMembers")}
                className={`form-input ${
                  errors.numOfMembers ? "form-input-error" : ""
                }`}
                min="1"
                step="1"
              />
              {errors.numOfMembers && (
                <p className="form-error">{errors.numOfMembers.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Group Rules (Optional)</label>
            <textarea
              {...register("rules")}
              className={`form-textarea ${
                errors.rules ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe the rules and expectations for your Njangi group..."
            />
            {errors.rules && (
              <p className="text-red-500 text-sm mt-1">
                {errors.rules.message}
              </p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-transform hover:scale-105"
            >
              Back
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-500 text-white rounded-lg transition-transform hover:scale-105 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Loading..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step2GroupDetails;
