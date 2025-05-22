'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  SubTitle,
  BarController,
  LineController
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
// Import plugins
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import { chartConfig } from '../config/chartConfig';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend,
  PointElement,
  SubTitle,
  ChartDataLabels, // 正确注册 datalabels 插件
  annotationPlugin
);

export default function BloodPressureChart({ data, selectedDay }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isMobile, setIsMobile] = useState(false);
  // 添加图表实例引用
  const chartRef = useRef(null);
  
  // 添加函数重新计算和应用注释
  const updateAnnotations = useCallback(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      // 手动触发图表更新以重绘标准阴影区域
      setTimeout(() => {
        if (chart) {
          chart.update();
        }
      }, 50);
    }
  }, []);

  // Add window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    // 数据验证检查
    if (!data || !Array.isArray(data) || data.length === 0) {
      // 设置空数据
      setChartData({
        labels: [],
        datasets: []
      });
      return;
    }
    
    // 确保所有记录都有必要的属性
    const validData = data.filter(record => 
      record && 
      record.date && 
      (record.diastolic !== undefined || record.systolic !== undefined || record.heartRate !== undefined)
    );
    
    if (validData.length === 0) return;
    
    // Sort data by date and get last 7 days
    const sortedData = validData
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7);
    
    // Separate morning and evening data based on time
    const morningData = sortedData.filter(record => {
      const date = new Date(record.date);
      return date.getHours() < 18;
    });
    const eveningData = sortedData.filter(record => {
      const date = new Date(record.date);
      return date.getHours() >= 18;
    });
    
    const allDates = [...new Set(sortedData.map(record => {
      const date = new Date(record.date);
      return date.toLocaleDateString();
    }))];

    // Create consistent labels for all dates
    const consistentLabels = allDates.flatMap(date => [`${date} Morning`, `${date} Evening`]);

    // Helper function to check if a datapoint is selected
    const isSelected = (date) => {
      if (!selectedDay) return false;
      return new Date(date).toLocaleDateString() === new Date(selectedDay).toLocaleDateString();
    };

    // Helper function to create background colors with selected state
    const getBackgroundColors = (normalColor, selectedColor) => {
      return allDates.flatMap(date => [
        isSelected(date) ? selectedColor : normalColor,
        isSelected(date) ? selectedColor : normalColor
      ]);
    };
    
    setChartData({
      labels: consistentLabels,
      datasets: [
        {
          type: 'bar',
          label: 'Diastolic',
          data: allDates.flatMap(date => {
            const morningRecord = morningData.find(record => 
              new Date(record.date).toLocaleDateString() === date
            );
            const eveningRecord = eveningData.find(record => 
              new Date(record.date).toLocaleDateString() === date
            );
            return [morningRecord?.diastolic || null, eveningRecord?.diastolic || null];
          }),
          backgroundColor: getBackgroundColors(
            chartConfig.colors.diastolic.morning, 
            'rgba(53, 162, 235, 0.95)'
          ),
          borderColor: [chartConfig.colors.diastolic.borderMorning, chartConfig.colors.diastolic.borderEvening],
          borderWidth: [0, 2],
          datalabels: { display: false },
          stack: 'stack1',
          order: 2,
        },
        {
          type: 'bar',
          label: 'Systolic - Diastolic',
          data: allDates.flatMap(date => {
            const morningRecord = morningData.find(record => 
              new Date(record.date).toLocaleDateString() === date
            );
            const eveningRecord = eveningData.find(record => 
              new Date(record.date).toLocaleDateString() === date
            );
            const morningDiff = morningRecord?.systolic && morningRecord?.diastolic ? 
              morningRecord.systolic - morningRecord.diastolic : null;
            const eveningDiff = eveningRecord?.systolic && eveningRecord?.diastolic ? 
              eveningRecord.systolic - eveningRecord.diastolic : null;
            return [morningDiff, eveningDiff];
          }),
          backgroundColor: getBackgroundColors(
            chartConfig.colors.systolic.morning, 
            'rgba(255, 99, 132, 0.95)'
          ),
          borderColor: [chartConfig.colors.systolic.borderMorning, chartConfig.colors.systolic.borderEvening],
          borderWidth: [0, 2],
          datalabels: { display: false },
          stack: 'stack1',
          order: 2,
        },
        {
          type: 'line',
          label: 'Heart Rate',
          data: allDates.flatMap(date => {
            const morningRecord = morningData.find(record => 
              new Date(record.date).toLocaleDateString() === date
            );
            const eveningRecord = eveningData.find(record => 
              new Date(record.date).toLocaleDateString() === date
            );
            return [
              morningRecord?.heartRate || null, 
              eveningRecord?.heartRate || null
            ];
          }),
          borderColor: chartConfig.colors.heartRate.line,
          backgroundColor: chartConfig.colors.heartRate.background,
          tension: 0.1,
          order: 1,
          yAxisID: 'y1',
          segment: {
            borderColor: context => context.p0DataIndex % 2 === 1 ? 'rgba(255, 0, 0, 0.5)' : 'rgb(255, 0, 0)',
            borderDash: context => context.p0DataIndex % 2 === 1 ? [5, 5] : [],
          },
          pointStyle: (context) => {
            const date = allDates[Math.floor(context.dataIndex / 2)];
            return isSelected(date) ? 'rectRot' : 'circle';
          },
          pointRadius: (context) => {
            const date = allDates[Math.floor(context.dataIndex / 2)];
            return isSelected(date) ? 6 : 3;
          },
          datalabels: { display: false },
        },
      ],
    });
  }, [data, selectedDay]);
  // 使用 state 来跟踪屏幕方向
  const [isLandscape, setIsLandscape] = useState(false);
    // 监听屏幕方向变化
  useEffect(() => {
    const handleOrientationChange = () => {
      const wasLandscape = isLandscape;
      const newIsLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(newIsLandscape);
      
      // 如果方向确实发生了变化，更新注释
      if (wasLandscape !== newIsLandscape) {
        // 给浏览器一点时间完成布局变化
        setTimeout(updateAnnotations, 200);
      }
    };
    
    handleOrientationChange(); // 检查初始方向
    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [isLandscape, updateAnnotations]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      // hide datalabels on bar columns but enable on other types
      datalabels: {
        display: context => context.dataset.type !== 'bar',
      },
      title: {
        display: true,
        text: chartConfig.chartTitle.main,
        padding: {
          bottom: isMobile ? 15 : 30
        }
      },
      subtitle: {
        display: !isMobile, // Hide subtitle on mobile
        text: chartConfig.chartTitle.subtitle,
        position: 'bottom',
        align: 'start',
        color: 'rgb(102, 102, 102)',
        font: {
          size: 12,
          family: 'system-ui'
        },
        padding: {
          bottom: 10
        }
      },
      legend: {
        position: 'top',
        align: isMobile ? 'start' : 'center',
        labels: {
          usePointStyle: true,
          boxWidth: isMobile ? 8 : 10,
          font: {
            size: isMobile ? 10 : 12
          }
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
          label: (context) => {
            const datasetLabel = context.dataset.label;
            const value = context.raw;
            
            if (datasetLabel === 'Systolic - Diastolic') {
              const diastolicValue = context.chart.data.datasets[0].data[context.dataIndex];
              return `Systolic: ${value + diastolicValue}`;
            }
            return `${datasetLabel}: ${value}`;
          }
        },
      },
      annotation: {
        annotations: {
          systolicArea: {
            type: 'box',
            yScaleID: 'y',
            yMin: chartConfig.standardRanges.systolic.min,
            yMax: chartConfig.standardRanges.systolic.max,
            backgroundColor: chartConfig.standardRanges.systolic.backgroundColor,
            borderWidth: 0
          },
          diastolicArea: {
            type: 'box',
            yScaleID: 'y',
            yMin: chartConfig.standardRanges.diastolic.min,
            yMax: chartConfig.standardRanges.diastolic.max,
            backgroundColor: chartConfig.standardRanges.diastolic.backgroundColor,
            borderWidth: 0
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 40,
        max: 160,
        type: 'linear',
        position: 'left',
        title: {
          display: !isMobile,
          text: 'Blood Pressure (mmHg)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
        // 移除可能导致问题的 afterDataLimits 回调
        // 使用固定的 min/max 值更稳定
      },
      y1: {
        beginAtZero: true,
        min: 40,
        max: 120,
        type: 'linear',
        position: 'right',
        title: {
          display: !isMobile,
          text: 'Heart Rate (BPM)',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: isMobile ? 8 : 12
          },
          maxRotation: isMobile ? 45 : 0,
          minRotation: isMobile ? 45 : 0
        }
      }
    },
  };  // 添加一个安全检查，确保chartData和options都已准备好
  const isDataReady = chartData?.labels?.length > 0 && chartData?.datasets?.length > 0;

  return (
    <div className={`w-full ${isMobile ? (isLandscape ? 'h-[300px]' : 'h-[400px]') : 'h-[500px]'} p-4 bg-base-100 rounded-lg shadow-lg`}>
      {typeof window !== 'undefined' && isDataReady && (
        <Chart 
          type="bar" 
          data={chartData} 
          options={options} 
          // 使用key更新组件强制完全重新渲染当屏幕方向改变时
          key={`chart-${isMobile}-${isLandscape}-${data?.length || 0}-${selectedDay || 'none'}`}
          ref={chartRef} // 设置图表引用
        />
      )}
      {!isDataReady && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">准备图表数据中...</p>
        </div>
      )}
    </div>
  );
}
