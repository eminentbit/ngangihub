export interface AccountSetUp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  profilePicUrl: string;
}

export interface GroupDetails {
  groupName: string;
  contributionAmount: number;
  contributionFrequency: string;
  payoutMethod: string;
  startDate: string;
  endDate: string;
  adminEmail?: string;
  numberOfMember: number;
  status?: string;
  rules: string;
}

export type InviteMember = {
  type: "email" | "phone";
  value: string;
};

export interface NjangiSetup {
  accountSetup: AccountSetUp;
  groupDetails: GroupDetails;
  inviteMembers: InviteMember[];
}
