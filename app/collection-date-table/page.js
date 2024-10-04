'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UniformDates = () => {
  const [dateGroups, setDateGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({
    cutoffDate: null,
    collectionDates: [null]
  });
  const [previewHtml, setPreviewHtml] = useState('');

  const monthColors = {
    'Jan': '#5DADE2', 'Feb': '#D98880', 'Mar': '#58D68D', 'Apr': '#A569BD',
    'May': '#F4D03F', 'Jun': '#F08080', 'Jul': '#E74C3C', 'Aug': '#DC7633',
    'Sep': '#A67C52', 'Oct': '#E67E22', 'Nov': '#922B21', 'Dec': '#1E8449'
  };

  const createDateCard = (date) => {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const weekday = date.toLocaleString('default', { weekday: 'long' });
    const ftColor = monthColors[month] || '#FFFFFF';
    return `
      <div style="display: inline-block; background-color: #FFFFFF; border: 1px solid #ddd; border-radius: 4px; padding: 5px; text-align: center; width: 80px; margin: 5px;">
        <div style="font-size: 0.9em; color: ${ftColor}"><b>${month}</b></div>
        <div style="font-size: 1.5em; font-weight: bold; color: #4169E1;">${day}</div>
        <div style="font-size: 0.8em;">${weekday}</div>
      </div>
    `;
  };

  const generateHtml = () => {
    let html = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0;">
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="font-weight: bold; text-align: left; padding-bottom: 10px;">Online order cut-off date</th>
              <th style="font-weight: bold; text-align: left; padding-bottom: 10px;">Uniform collect at school dates</th>
            </tr>
          </thead>
          <tbody>
    `;

    dateGroups.forEach(group => {
      html += `
        <tr>
          <td style="vertical-align: top;">
            ${createDateCard(group.cutoffDate)}
          </td>
          <td style="vertical-align: top;">
            ${group.collectionDates.map(date => createDateCard(date)).join('')}
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
        <p style="font-size: 0.9em; color: #666; margin-top: 20px;">**Self collection does not include nametags.</p>
      </div>
    `;

    return html;
  };

  useEffect(() => {
    setPreviewHtml(generateHtml());
  }, [dateGroups]);

  const handleDateChange = (date, type, index = null) => {
    setNewGroup(prev => {
      if (type === 'cutoff') {
        return { ...prev, cutoffDate: date };
      } else {
        const updatedDates = [...prev.collectionDates];
        updatedDates[index] = date;
        return { ...prev, collectionDates: updatedDates };
      }
    });
  };

  const addCollectionDate = () => {
    setNewGroup(prev => ({
      ...prev,
      collectionDates: [...prev.collectionDates, null]
    }));
  };

  const addDateGroup = () => {
    if (newGroup.cutoffDate && newGroup.collectionDates.every(date => date !== null)) {
      setDateGroups(prev => [...prev, newGroup]);
      setNewGroup({
        cutoffDate: null,
        collectionDates: [null]
      });
    } else {
      alert('Please select all dates before adding the group.');
    }
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(previewHtml);
    alert('HTML copied to clipboard!');
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  return (
    <>
      <Head>
        <title>Uniform Dates</title>
      </Head>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#333', borderBottom: '2px solid #4169E1', paddingBottom: '10px' }}>Create Date Group</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ width: '48%' }}>
            <h3 style={{ color: '#4169E1' }}>Cut-off Date</h3>
            <DatePicker
              selected={newGroup.cutoffDate}
              onChange={(date) => handleDateChange(date, 'cutoff')}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select cut-off date"
              className="date-picker"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ width: '48%' }}>
            <h3 style={{ color: '#4169E1' }}>Collection Dates</h3>
            {newGroup.collectionDates.map((date, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <DatePicker
                  selected={date}
                  onChange={(date) => handleDateChange(date, 'collection', index)}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select collection date"
                  className="date-picker"
                  style={{ width: '100%' }}
                />
              </div>
            ))}
            <button onClick={addCollectionDate} style={{ ...buttonStyle, backgroundColor: '#4169E1', color: 'white' }}>Add Collection Date</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={addDateGroup} style={{ ...buttonStyle, backgroundColor: '#28a745', color: 'white' }}>Add Date Group</button>
        </div>

        <h2 style={{ color: '#333', borderBottom: '2px solid #4169E1', paddingBottom: '10px', marginTop: '30px' }}>Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginTop: '10px' }} />

        <button onClick={copyHtml} style={{ ...buttonStyle, marginTop: '20px' }}>Copy HTML</button>
      </div>
    </>
  );
};

export default UniformDates;