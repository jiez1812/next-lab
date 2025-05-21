export const chartConfig = {
  // 颜色配置
  colors: {
    heartRate: {
      line: 'rgb(255, 0, 0)',
      background: 'rgba(255, 0, 0, 0.5)'
    },
    diastolic: {
      morning: 'rgba(53, 162, 235, 0.8)',
      evening: 'rgba(32, 97, 141, 0.8)',
      borderMorning: 'transparent',
      borderEvening: 'rgba(32, 97, 141, 1)'
    },
    systolic: {
      morning: 'rgba(255, 99, 132, 0.8)',
      evening: 'rgba(153, 59, 79, 0.8)',
      borderMorning: 'transparent',
      borderEvening: 'rgba(153, 59, 79, 1)'
    }
  },

  // 血压标准范围
  standardRanges: {
    systolic: {
      min: 90,
      max: 120,
      backgroundColor: 'rgba(255, 99, 132, 0.05)',
      lineColor: 'rgba(255, 99, 132, 0.3)'
    },
    diastolic: {
      min: 60,
      max: 80,
      backgroundColor: 'rgba(53, 162, 235, 0.05)',
      lineColor: 'rgba(53, 162, 235, 0.3)'
    }
  },

  // 图表标题配置
  chartTitle: {
    main: 'Blood Pressure & Heart Rate Last 7 Days (Morning vs Evening)',
    subtitle: [
      'Standard Range:',
      'Systolic: 90-120 mmHg',
      'Diastolic: 60-80 mmHg'
    ]
  }
};
