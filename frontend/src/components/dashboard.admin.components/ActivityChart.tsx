import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const ActivityChart: React.FC = () => {
  useEffect(() => {
    const chart = echarts.init(document.getElementById('activity-chart')!);
    chart.setOption({
      animation: false,
      xAxis: { type: 'category', data: ['Jan','Feb','Mar','Apr','May','Jun'] },
      yAxis: { type: 'value' },
      series: [{ data: [10,15,8,20,12,18], type: 'line', smooth: true }],
      tooltip: { trigger: 'axis' }
    });
    window.addEventListener('resize', () => chart.resize());
    return () => chart.dispose();
  }, []);

  return <div id="activity-chart" className="h-64 w-full" />;
};

export default ActivityChart;