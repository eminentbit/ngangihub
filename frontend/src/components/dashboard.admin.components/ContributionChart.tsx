
import { FC, useEffect } from 'react';
import * as echarts from 'echarts';

const ContributionChart: FC = () => {
  useEffect(() => {
    const container = document.getElementById('contribution-chart');
    if (!container) return;

    // Type the chart variable for clarity
    const chart: echarts.ECharts = echarts.init(container);

    chart.setOption({
      animation: false,
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: 'Contributions',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: 18, fontWeight: 'bold' } },
          labelLine: { show: false },
          data: [
            { value: 1200, name: 'Team Alpha' },
            { value: 800, name: 'Project Beta' },
            { value: 600, name: 'Finance Club' },
          ],
        },
      ],
    });

    // Resize handler
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return <div id="contribution-chart" className="h-64 w-full" />;
};

export default ContributionChart;
