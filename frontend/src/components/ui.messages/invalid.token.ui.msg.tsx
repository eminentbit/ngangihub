import { AlertCircle, Clock, XCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function InviteTokenStatusUi({ inviteStatus }: { inviteStatus: string }) {
  const navigate = useNavigate();

  const getStatusConfig = () => {
    switch (inviteStatus) {
      case "missing":
        return {
          icon: (
            <AlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          ),
          title: "Oops! Something's Missing",
          message:
            "It looks like your invitation link is incomplete. Don't worry, this happens sometimes! Please check your email for the complete invitation link or contact the person who invited you.",
          bgGradient: "from-blue-50 to-blue-50",
        };  
      case "invalid":
        return {
          icon: <XCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />,
          title: "Invalid Invitation",
          message:
            "This invitation link appears to be invalid or may have already been used. No worries though! Please reach out to the group admin for a fresh invitation link.",
          bgGradient: "from-blue-50 to-purple-50",
        };
      case "expired":
        return {
          icon: <Clock className="w-16 h-16 text-blue-500 mx-auto mb-4" />,
          title: "Invitation Expired",
          message:
            "This invitation link has expired, but getting a new one is easy! Simply contact your group admin and they'll send you a fresh invitation link right away.",
          bgGradient: "from-blue-50 to-cyan-50",
        };
      default:
        return {
          icon: (
            <AlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          ),
          title: "Something Went Wrong",
          message:
            "We encountered an unexpected issue with your invitation. Please try again or contact support.",
          bgGradient: "from-blue-50 to-blue-50",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${config.bgGradient} p-4`}
    >
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 max-w-md w-full text-center">
        {config.icon}

        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {config.title}
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">{config.message}</p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
        >
          <Home className="w-4 h-4" />
          Return Home
        </button>

        <div className="mt-6 text-sm text-gray-500">
          Need help? Contact your group administrator
        </div>
      </div>
    </div>
  );
}
