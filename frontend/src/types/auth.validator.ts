import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  role: z.enum(["bod", "user", "member", "admin"]),
});

export type ValidatedUser = {
  email: string;
  role: "bod" | "user" | "member" | "admin";
};
