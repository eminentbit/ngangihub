import { useSearchParams } from "react-router-dom";
export default function InviteMemberRegistrationForm() {
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get("inviteToken");
  return (
    <div>
      <p>Invite token: {inviteToken}</p>
    </div>
  );
}
