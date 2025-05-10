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
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    rules: string;
}

export interface InviteMember {
    contact: string; // Can be an email or phone number
}

export interface NjangiSetup {
    accountSetup: AccountSetUp;
    groupDetails: GroupDetails;
    inviteMembers: InviteMember[];
}

