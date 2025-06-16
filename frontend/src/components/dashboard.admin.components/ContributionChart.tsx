import { useEffect } from "react";
import * as echarts from "echarts";
import { useGetContributionOverview } from "../../hooks/useAdmin";

const ContributionChart = () => {
  const { data, loading, error } = useGetContributionOverview();

  useEffect(() => {
    if (!data || loading || error) return;

    const container = document.getElementById("contribution-chart");
    if (!container) return;

    const chart: echarts.ECharts = echarts.init(container);

    chart.setOption({
      animation: true,
      tooltip: { trigger: "item" },
      legend: { top: "5%", left: "center", textStyle: { color: "#6B7280" } },
      series: [
        {
          name: "Contributions",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: { show: false, position: "center" },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: "bold",
            },
          },
          labelLine: { show: false },
          data,
        },
      ],
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [data, loading, error]);

  if (loading) {
    return (
      <div className="h-64 w-full flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-300">
          <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading contribution data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-64 w-full flex items-center justify-center bg-red-50 dark:bg-red-950 rounded-md border border-red-200 dark:border-red-700">
        <div className="text-center text-red-600 dark:text-red-400">
          <p className="font-semibold">Failed to load contributions.</p>
          <p className="text-sm opacity-70">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id="contribution-chart"
      className="h-64 w-full transition-opacity duration-500 ease-in-out"
    />
  );
};

export default ContributionChart;
