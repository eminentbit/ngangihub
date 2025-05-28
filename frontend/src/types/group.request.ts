import { AccountSetUp, GroupDetails } from "./create-njangi-types";

export interface GroupRequest {
  _id: string;
  accountSetup: AccountSetUp;
  groupDetails: GroupDetails;
  adminEmail: string;
  numberOfMember: number;
}
