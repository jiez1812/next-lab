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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
// Import pattern fill plugin
import 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
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
              label: 'Morning Systolic',
              data: allDates.flatMap(date => {
                const morningRecord = morningData.find(record => 
                  new Date(record.date).toLocaleDateString() === date
                );
                return [morningRecord?.systolic || null, null]; // null for evening slot
              }),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              stack: 'morning',
              order: 2,
            },
            {
              type: 'bar',
              label: 'Morning Diastolic',
              data: allDates.flatMap(date => {
                const morningRecord = morningData.find(record => 
                  new Date(record.date).toLocaleDateString() === date
                );
                return [morningRecord?.diastolic || null, null]; // null for evening slot
              }),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              stack: 'morning',
              order: 2,
            },
            {
              type: 'bar',
              label: 'Evening Systolic',
              data: allDates.flatMap(date => {
                const eveningRecord = eveningData.find(record => 
                  new Date(record.date).toLocaleDateString() === date
                );
                return [null, eveningRecord?.systolic || null]; // null for morning slot
              }),
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              stack: 'evening',
              order: 2,
              borderWidth: 2,
              borderColor: 'rgba(255, 99, 132, 1)',
            },
            {
              type: 'bar',
              label: 'Evening Diastolic',
              data: allDates.flatMap(date => {
                const eveningRecord = eveningData.find(record => 
                  new Date(record.date).toLocaleDateString() === date
                );
                return [null, eveningRecord?.diastolic || null]; // null for morning slot
              }),
              backgroundColor: 'rgba(53, 162, 235, 0.8)',
              stack: 'evening',
              order: 2,
              borderWidth: 2,
              borderColor: 'rgba(53, 162, 235, 1)',
            },
            {              type: 'line',
              label: 'Morning Heart Rate',              data: allDates.flatMap(date => {
                const morningRecord = morningData.find(record => 
                  new Date(record.date).toLocaleDateString() === date
                );
                return [morningRecord?.heartRate || null, null]; // null for evening slot
              }),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              tension: 0.1,
              order: 1,
              yAxisID: 'y1',
              borderDash: [],
            },
            {              type: 'line',
              label: 'Evening Heart Rate',              data: allDates.flatMap(date => {
                const eveningRecord = eveningData.find(record => 
                  new Date(record.date).toLocaleDateString() === date
                );
                return [null, eveningRecord?.heartRate || null]; // null for morning slot
              }),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              tension: 0.1,
              order: 1,
              yAxisID: 'y1',
              borderDash: [5, 5],
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
    plugins: {      title: {
        display: true,
        text: 'Blood Pressure & Heart Rate Last 7 Days (Morning vs Evening)',
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
        },
      },
    },    scales: {
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
