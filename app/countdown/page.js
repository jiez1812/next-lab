'use client'
import OptionCard from './components/optionCard';
import CustomCard from './components/customCard';
import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function CountdownPage() {
  const [dateOptionsWithShortDate, setDateOptionsWithShortDate] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // 调用API路由来获取数据，而不是直接使用sql
        const response = await fetch('/api/festivals');
        if (!response.ok) {
          throw new Error('Failed to fetch festivals');
        }
        const data = await response.json();
        setDateOptionsWithShortDate(data);
      } catch (error) {
        console.error('Error fetching festivals:', error);
        setDateOptionsWithShortDate([]); // Fallback to an empty array if there's an error
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='relative flex flex-col items-center justify-center min-h-screen'>
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className='relative flex flex-col items-center min-h-screen'>
      <div className='relative z-10 order-2 mb-6 lg:order-1 lg:mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {dateOptionsWithShortDate.map(dateDay => (
          <OptionCard key={dateDay.festivalName} dateDay={dateDay}/>
        ))}
      </div>
      <div className='relative z-20 order-1 lg:order-2 flex-grow flex items-center m-6 lg:justify-center'>
        <CustomCard/>
      </div>
    </div>
  );
}