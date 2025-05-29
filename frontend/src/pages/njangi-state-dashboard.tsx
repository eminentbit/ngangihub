import { useSearchParams } from "react-router-dom";
export default function NjangiStateDashBoard() {
  const [searchParams] = useSearchParams();
  const njangiId = searchParams.get("draftId");
  return (
    <div className="min-h-screen flex items-center justify-center text-3xl text-blue-600 font-semibold">
      Welcome to your sate dashboard where you will see your njangi state if
      accepted or rejected.
      <p>njangi id: {njangiId}</p>
    </div>
  );
}
