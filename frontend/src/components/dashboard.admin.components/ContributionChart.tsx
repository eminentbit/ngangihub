import { useEffect, useRef, useMemo } from "react";
import * as echarts from "echarts";
import { useGetContributionOverview } from "../../hooks/useAdmin";

// Define the correct structure of contribution items
interface ContributionItem {
  label?: string;
  groupName?: string;
  totalContributed?: number;
}

// Define the shape of the chart data ECharts expects
interface PieChartData {
  name: string;
  value: number;
}

const ContributionChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<echarts.ECharts | null>(null);

  const { data, loading, error } = useGetContributionOverview() as unknown as {
    data: ContributionItem[] | undefined;
    loading: boolean;
    error: boolean;
  };

  // Memoized transformation of data into ECharts format
  const formattedData: PieChartData[] = useMemo(() => {
    if (!data) return [];
    return data.map((item: ContributionItem) => ({
      name: item.label ?? item.groupName ?? "Unknown",
      value: item.totalContributed ?? 0,
    }));
  }, [data]);

  // Initialize chart once
  useEffect(() => {
    if (!chartRef.current) return;

    chartInstanceRef.current = echarts.init(chartRef.current);

    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstanceRef.current?.dispose();
      chartInstanceRef.current = null;
    };
  }, []);

  // Update chart when data changes
  useEffect(() => {
    if (
      !chartInstanceRef.current ||
      loading ||
      error ||
      formattedData.length === 0
    )
      return;

    chartInstanceRef.current.setOption({
      animation: true,
      tooltip: { trigger: "item" },
      legend: {
        top: "5%",
        left: "center",
        textStyle: { color: "#6B7280" },
      },
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
          data: formattedData,
        },
      ],
    });
  }, [formattedData, loading, error]);

  // Loading state
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

  // Error state
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

  // Chart container (always mounted so chart can init on useEffect)
  return (
    <div
      ref={chartRef}
      className="h-64 w-full transition-opacity duration-500 ease-in-out"
    />
  );
};

export default ContributionChart;
