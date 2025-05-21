'use client'

import { useState, useMemo } from 'react'

export default function BloodPressureTable({ data, selectedDay, onDaySelect }) {
  // 将数据按时间排序并添加上午/下午标记
  const sortedData = useMemo(() => {
    return [...data]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(record => {
        const date = new Date(record.date);
        const isMorning = date.getHours() < 18;
        return {
          ...record,
          formattedTime: date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
          period: isMorning ? 'Morning' : 'Evening'
        };
      });
  }, [data]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  const getRowClass = (date) => {
    const isSelected = new Date(date).toLocaleDateString() === 
                      (selectedDay ? new Date(selectedDay).toLocaleDateString() : null);
    return `hover:bg-base-200 cursor-pointer transition-colors ${
      isSelected ? 'bg-base-300 font-medium' : ''
    }`;
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Period</th>
            <th className="text-right">Systolic</th>
            <th className="text-right">Diastolic</th>
            <th className="text-right">Heart Rate</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((record, index) => (
            <tr 
              key={record.date + index}
              className={getRowClass(record.date)}
              onClick={() => onDaySelect(record.date)}
            >
              <td>{formatDate(record.date)}</td>
              <td>{record.formattedTime}</td>
              <td>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  record.period === 'Morning' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {record.period}
                </span>
              </td>
              <td className="text-right">{record.systolic} mmHg</td>
              <td className="text-right">{record.diastolic} mmHg</td>
              <td className="text-right">{record.heartRate} bpm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
