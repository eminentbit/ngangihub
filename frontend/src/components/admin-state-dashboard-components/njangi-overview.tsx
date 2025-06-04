import { CheckCircle, Clock, XCircle, Users } from "lucide-react";
import { useAdminState } from "../../store/create.admin.store";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function NjangiOverview() {
  const { submissionStats, fetchSubmissionStats, setGroupId } = useAdminState();
  const stats = [
    {
      title: "Total Submissions",
      value: submissionStats?.total,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Approved",
      value: submissionStats?.approved,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: submissionStats?.pending,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Rejected",
      value: submissionStats?.rejected,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draftId");

  useEffect(() => {
    if (draftId) {
      setGroupId(draftId);
    }
  }, [draftId, setGroupId]);

  useEffect(() => {
    // const fetchStats = async () => {
    //   try {
    //     await fetchSubmissionStats();
    //   } catch (error) {
    //     console.error("Error fetching submission stats:", error);
    //   }
    // };
    // fetchStats();
    fetchSubmissionStats();
  }, [fetchSubmissionStats]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow border-l-4 border-l-blue-500 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">
                {stat.title}
              </h3>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">
                Community Savings Group
              </p>
              <p className="text-sm text-gray-600">Submitted 2 days ago</p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mt-2 sm:mt-0 w-fit min-w-[80px] text-center">
              Approved
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">
                Monthly Contribution Circle
              </p>
              <p className="text-sm text-gray-600">Submitted 5 days ago</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium mt-2 sm:mt-0 w-fit min-w-[80px] text-center">
              Pending Review
            </span>
          </div>

          <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="space-y-1">
              <p className="font-medium text-gray-900">
                Family Investment Group
              </p>
              <p className="text-sm text-gray-600">Submitted 1 week ago</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mt-2 sm:mt-0 w-fit min-w-[80px] text-center">
              Under Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
