/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Calendar, Users, DollarSign } from "lucide-react";

const editNjangiSchema = z.object({
  groupName: z.string().min(3, "Group name must be at least 3 characters"),
  contributionAmount: z.number().min(1000, "Minimum contribution is ₦1,000"),
  contributionFrequency: z.string().min(1, "Please select frequency"),
  numberOfMember: z
    .number()
    .min(2, "Minimum 2 members required")
    .max(50, "Maximum 50 members allowed"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  payoutMethod: z.string().min(1, "Please select payout method"),
  rules: z.string().min(10, "Rules must be at least 10 characters"),
});

type EditNjangiFormData = z.infer<typeof editNjangiSchema>;

interface EditNjangiModalProps {
  njangi: any;
  onClose: () => void;
}

export function EditNjangiModal({ njangi, onClose }: EditNjangiModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditNjangiFormData>({
    resolver: zodResolver(editNjangiSchema),
    defaultValues: {
      groupName: njangi.groupDetails.groupName,
      contributionAmount: njangi.groupDetails.contributionAmount,
      contributionFrequency: njangi.groupDetails.contributionFrequency,
      numberOfMember: njangi.groupDetails.numberOfMember,
      startDate: njangi.groupDetails.startDate,
      endDate: njangi.groupDetails.endDate,
      payoutMethod: njangi.groupDetails.payoutMethod,
      rules: njangi.groupDetails.rules,
    },
  });

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const onSubmit = async (data: EditNjangiFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Updated Njangi:", data);
      alert("Njangi updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating njangi:", error);
      alert("Error updating njangi. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed top-0 inset-0 min-h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="md:text-xl text-lg font-semibold text-gray-900">Edit {njangi.groupDetails.groupName}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Group Name */}
          <div>
            <label
              htmlFor="groupName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              {...register("groupName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter group name"
            />
            {errors.groupName && (
              <p className="text-red-600 text-sm mt-1">
                {errors.groupName.message}
              </p>
            )}
          </div>

          {/* Contribution Amount and Frequency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contributionAmount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <DollarSign className="inline h-4 w-4 mr-1" />
                Contribution Amount (₦)
              </label>
              <input
                type="number"
                id="contributionAmount"
                {...register("contributionAmount", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="25000"
              />
              {errors.contributionAmount && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.contributionAmount.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contributionFrequency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Calendar className="inline h-4 w-4 mr-1" />
                Frequency
              </label>
              <select
                id="contributionFrequency"
                {...register("contributionFrequency")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Select frequency</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
              </select>
              {errors.contributionFrequency && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.contributionFrequency.message}
                </p>
              )}
            </div>
          </div>

          {/* Number of Members */}
          <div>
            <label
              htmlFor="numberOfMember"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <Users className="inline h-4 w-4 mr-1" />
              Number of Members
            </label>
            <input
              type="number"
              id="numberOfMember"
              {...register("numberOfMember", { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="8"
              min="2"
              max="50"
            />
            {errors.numberOfMember && (
              <p className="text-red-600 text-sm mt-1">
                {errors.numberOfMember.message}
              </p>
            )}
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                {...register("startDate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              {errors.startDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                {...register("endDate")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              {errors.endDate && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Payout Method */}
          <div>
            <label
              htmlFor="payoutMethod"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Payout Method
            </label>
            <select
              id="payoutMethod"
              {...register("payoutMethod")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              <option value="">Select payout method</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Cash">Cash</option>
            </select>
            {errors.payoutMethod && (
              <p className="text-red-600 text-sm mt-1">
                {errors.payoutMethod.message}
              </p>
            )}
          </div>

          {/* Rules */}
          <div>
            <label
              htmlFor="rules"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Group Rules
            </label>
            <textarea
              id="rules"
              {...register("rules")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="Enter group rules and regulations..."
            />
            {errors.rules && (
              <p className="text-red-600 text-sm mt-1">
                {errors.rules.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                "Update Njangi"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
