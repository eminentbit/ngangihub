import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Mail, Info } from "lucide-react";
import {
  inviteMembersSchema,
  InviteMembersFormData,
} from "../../types/njangi.form.schema.type";
import { useFormContext } from "../../context/njangi.form.context";

const MAX_MEMBERS = 3;

const Step3InviteMembers: React.FC = () => {
  const { state, updateInviteMembers, nextStep, prevStep } = useFormContext();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InviteMembersFormData>({
    resolver: zodResolver(inviteMembersSchema),
    defaultValues: state.inviteMembers.invites?.length
      ? state.inviteMembers
      : { invites: [{ contact: "" }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invites",
  });

  const onSubmit = (data: InviteMembersFormData) => {
    updateInviteMembers(data);
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto w-full transition-all duration-300 animate-fadeIn">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Invite Members
        </h2>
        <div className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-md mb-4 flex items-start gap-2">
          <Info size={16} className="mt-1 text-blue-500" />
          <span>
            You can invite up to 3 members during setup. You’ll be able to add
            more later from your dashboard.
          </span>
        </div>
        <p className="text-gray-600 mb-6">
          Add email addresses or phone numbers of people you'd like to invite to
          your Njangi group.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <div className="flex-grow">
                <label className="form-label font-medium text-gray-700">
                  Member {index + 1}
                </label>
                <div className="relative mt-1">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />
                  <input
                    type="text"
                    {...register(`invites.${index}.contact`)}
                    placeholder="Email or phone number"
                    className={`form-input pl-10 w-full rounded-md border ${
                      errors.invites?.[index]?.contact
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  />
                  {errors.invites?.[index]?.contact && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.invites[index].contact?.message}
                    </p>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-7 text-red-500 hover:bg-red-50 p-2 rounded-md transition-transform hover:scale-105"
                  aria-label="Remove member"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                if (fields.length < MAX_MEMBERS) {
                  append({ contact: "" });
                }
              }}
              disabled={fields.length >= MAX_MEMBERS}
              className={`flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-transform hover:scale-105 ${
                fields.length >= MAX_MEMBERS
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <Plus size={18} />
              Add Another Member
            </button>

            {fields.length >= MAX_MEMBERS && (
              <div className="text-sm text-gray-500 mt-2 flex items-start gap-2">
                <strong>NB:</strong>
                <span>
                  You can only invite {MAX_MEMBERS} members for now. You’ll be
                  able to add more from your dashboard after setup.
                </span>
                <div
                  className="relative group max-sm:hidden"
                  aria-label="After your Njangi is created, you can add more members from the dashboard."
                >
                  <Info
                    size={16}
                    className="text-gray-400 mt-0.5 cursor-pointer"
                  />
                  <div className="absolute z-10 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 bottom-full left-1/2 transform -translate-x-1/2 mb-1 whitespace-nowrap">
                    After your Njangi is created, you can add more members from
                    the dashboard.
                  </div>
                </div>
              </div>
            )}
          </div>

          {errors.invites && errors.invites.root && (
            <p className="text-sm text-red-500">
              {errors.invites.root.message}
            </p>
          )}

          <div className="flex justify-between pt-6">
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

export default Step3InviteMembers;
