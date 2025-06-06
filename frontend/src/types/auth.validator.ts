import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  role: z.enum(["bod", "user", "member", "admin"]),
});

export type ValidatedUser = {
  email: string;
  role: "bod" | "user" | "member" | "admin";
  image?: string;
};

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  phone?: string;
  role: "user" | "admin" | "bod" | "member";
  location?: string;
  groupName?: string;
  monthlyContributions?: number;
  paymentMode?: string;
  totalPayouts?: number;
  profilePicUrl?: string;
  createdAt?: string;
}
