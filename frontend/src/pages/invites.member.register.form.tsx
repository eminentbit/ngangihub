import { useSearchParams } from "react-router-dom";
export default function InviteMemberRegistrationForm() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");
  return (
    // Design of the invite registration form will go here
    <div>
      <p>Invite token: {inviteToken}</p>
    </div>
  );
}
