import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Mail } from "lucide-react";
import {
  inviteMembersSchema,
  InviteMembersFormData,
} from "../../types/njangi.form.schema.type";
import { useFormContext } from "../../context/njangi.form.context";

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
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Invite Members
        </h2>
        <p className="text-gray-600 mb-6">
          Add email addresses or phone numbers of people you'd like to invite to
          your Njangi group.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-start gap-2">
              <div className="flex-grow">
                <label className="form-label">
                  Member {index + 1}
                </label>
                <div className="relative mt-1">
                  <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    {...register(`invites.${index}.contact`)}
                    placeholder="Email or phone number"
                    className={`form-input ${
                      errors.invites?.[index]?.contact
                        ? "form-input-error"
                        : ""
                    }`}
                  />
                  {errors.invites?.[index]?.contact && (
                    <p className="form-error">
                      {errors.invites[index].contact?.message}
                    </p>
                  )}
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-6 text-red-500 hover:bg-red-50 p-2 rounded-md transition-transform hover:scale-105"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ))}

          <div className="pt-2">
            <button
              type="button"
              onClick={() => append({ contact: "" })}
              className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Plus size={18} />
              Add Another Member
            </button>
          </div>

          {errors.invites && errors.invites.root && (
            <p className="text-sm text-red-500">
              {errors.invites.root.message}
            </p>
          )}

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

export default Step3InviteMembers;