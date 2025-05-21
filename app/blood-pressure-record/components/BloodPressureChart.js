'use client';

import { useEffect, useState } from 'react';
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
  SubTitle
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
// Import pattern fill plugin
import 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import { chartConfig } from '../config/chartConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  SubTitle,
  annotationPlugin
);

export default function BloodPressureChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/blood-pressure-record/api/notion');
        const { data } = await response.json();

        // Sort data by date and get last 7 days        // Log the raw data for debugging
        console.log('Raw data:', data);
        
        const sortedData = data
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(-7);
        
        // Log the processed data for debugging
        console.log('Sorted and filtered data:', sortedData);        // Determine morning/evening based on time (before/after 18:00)
        const labels = sortedData.map(record => {
          const date = new Date(record.date);
          const timeOfDay = date.getHours() < 18 ? 'Morning' : 'Evening';
          return `${date.toLocaleDateString()} ${timeOfDay}`;
        });

        // Separate morning and evening data based on time
        const morningData = sortedData.filter(record => {
          const date = new Date(record.date);
          return date.getHours() < 18;
        });
        const eveningData = sortedData.filter(record => {
          const date = new Date(record.date);
          return date.getHours() >= 18;
        });        const allDates = [...new Set(sortedData.map(record => {
          const date = new Date(record.date);
          return date.toLocaleDateString();
        }))];

        // Create consistent labels for all dates
        const consistentLabels = allDates.flatMap(date => [`${date} Morning`, `${date} Evening`]);

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
              backgroundColor: [chartConfig.colors.diastolic.morning, chartConfig.colors.diastolic.evening],
              borderColor: [chartConfig.colors.diastolic.borderMorning, chartConfig.colors.diastolic.borderEvening],
              borderWidth: [0, 2],
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
              backgroundColor: [chartConfig.colors.systolic.morning, chartConfig.colors.systolic.evening],
              borderColor: [chartConfig.colors.systolic.borderMorning, chartConfig.colors.systolic.borderEvening],
              borderWidth: [0, 2],
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
                borderDash: context => context.p0DataIndex % 2 === 1 ? [5, 5] : [],
              },
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: chartConfig.chartTitle.main,
        padding: {
          bottom: 30
        }
      },
      subtitle: {
        display: true,
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
        labels: {
          usePointStyle: true,
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
            yMin: chartConfig.standardRanges.systolic.min,
            yMax: chartConfig.standardRanges.systolic.max,
            backgroundColor: chartConfig.standardRanges.systolic.backgroundColor,
            borderColor: 'transparent',
            drawTime: 'beforeDatasetsDraw',
          },
          diastolicArea: {
            type: 'box',
            yMin: chartConfig.standardRanges.diastolic.min,
            yMax: chartConfig.standardRanges.diastolic.max,
            backgroundColor: chartConfig.standardRanges.diastolic.backgroundColor,
            borderColor: 'transparent',
            drawTime: 'beforeDatasetsDraw',
          },
          systolicUpperLine: {
            type: 'line',
            yMin: chartConfig.standardRanges.systolic.max,
            yMax: chartConfig.standardRanges.systolic.max,
            borderColor: chartConfig.standardRanges.systolic.lineColor,
            borderWidth: 1,
            borderDash: [4, 4],
            drawTime: 'beforeDatasetsDraw',
            label: {
              display: false
            }
          },
          systolicLowerLine: {
            type: 'line',
            yMin: chartConfig.standardRanges.systolic.min,
            yMax: chartConfig.standardRanges.systolic.min,
            borderColor: chartConfig.standardRanges.systolic.lineColor,
            borderWidth: 1,
            borderDash: [4, 4],
            drawTime: 'beforeDatasetsDraw',
            label: {
              display: false
            }
          },
          diastolicUpperLine: {
            type: 'line',
            yMin: chartConfig.standardRanges.diastolic.max,
            yMax: chartConfig.standardRanges.diastolic.max,
            borderColor: chartConfig.standardRanges.diastolic.lineColor,
            borderWidth: 1,
            borderDash: [4, 4],
            drawTime: 'beforeDatasetsDraw',
            label: {
              display: false
            }
          },
          diastolicLowerLine: {
            type: 'line',
            yMin: chartConfig.standardRanges.diastolic.min,
            yMax: chartConfig.standardRanges.diastolic.min,
            borderColor: chartConfig.standardRanges.diastolic.lineColor,
            borderWidth: 1,
            borderDash: [4, 4],
            drawTime: 'beforeDatasetsDraw',
            label: {
              display: false
            }
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 40,
        max: 160,
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Blood Pressure (mmHg)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },      y1: {
        beginAtZero: true,
        min: 40,
        max: 120,
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Heart Rate (BPM)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] p-4 bg-base-100 rounded-lg shadow-lg">
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
}
