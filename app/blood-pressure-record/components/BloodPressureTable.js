'use client'

import { useState } from 'react'

export default function BloodPressureTable({ data, selectedDay, onDaySelect }) {

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getRowClass = (date) => {
    return `hover:bg-base-200 cursor-pointer ${date === selectedDay ? 'bg-base-300' : ''}`
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="table">
        {/* head */}
        <thead className="bg-base-200">
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th className="text-right">Systolic</th>
            <th className="text-right">Diastolic</th>
            <th className="text-right">Heart Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr 
              key={index}
              className={getRowClass(record.date)}
              onClick={() => onDaySelect(record.date)}
            >
              <td>{formatDate(record.date)}</td>
              <td>{record.time}</td>
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
