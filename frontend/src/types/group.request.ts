import { GroupDetails } from "./create-njangi-types";

export interface GroupRequest {
  _id: string;
  groupDetails: GroupDetails;
  adminEmail: string;
  numberOfMember: number;
}
