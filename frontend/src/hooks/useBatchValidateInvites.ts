import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type Invite = {
  type: "email" | "phone";
  value: string;
};

type InviteMembersFormData = {
  invites: {
    type: "email" | "phone";
    value: string;
  }[];
};

export const useBatchValidateInvites = (
  invites: Invite[],
  setError: UseFormSetError<InviteMembersFormData>,
  clearErrors: UseFormClearErrors<InviteMembersFormData>
) => {
  const query = useQuery({
    queryKey: ["batch-validate-invites", invites],
    queryFn: async () => {
      const results = await Promise.all(
        invites.map(async (invite) => {
          const { data } = await axios.get(
            `${API_URL}/validate-invite-contact`,
            {
              params: { contact: invite.value },
            }
          );
          return data;
        })
      );
      return results;
    },
    enabled: invites.length > 0,
    staleTime: 0,
    gcTime: 0,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      query.data.forEach((result, index: number) => {
        if (!result.valid) {
          setError(`invites.${index}.value`, {
            type: "manual",
            message: result.message || "Invalid contact",
          });
        } else {
          clearErrors(`invites.${index}.value`);
        }
      });
    }
  }, [query.data, setError, clearErrors]);

  return {
    isFetching: query.isFetching,
    hasErrors: query.data?.some((r) => !r.valid),
  };
};
