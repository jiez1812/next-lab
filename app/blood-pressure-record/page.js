'use client';

import { useState, useEffect } from 'react';
import BloodPressureChart from './components/BloodPressureChart';
import BloodPressureTable from './components/BloodPressureTable';
import PasswordProtection from './components/PasswordProtection';

export default function BloodPressurePage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add cache-busting timestamp and no-cache headers
        const response = await fetch(`/blood-pressure-record/api/notion?t=${new Date().getTime()}`, {
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });
        const { data } = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (!isUnlocked) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Blood Pressure Records</h1>
        <PasswordProtection onUnlock={setIsUnlocked} isUnlocked={isUnlocked} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Blood Pressure Records</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Blood Pressure Records</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <BloodPressureChart data={data} selectedDay={selectedDay} />
        <BloodPressureTable data={data} selectedDay={selectedDay} onDaySelect={setSelectedDay} />
      </div>
    </div>
  );
}
