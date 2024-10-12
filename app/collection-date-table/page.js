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
      <div style="display: inline-block; background-color: #FFFFFF; border: 1px solid #ddd; border-radius: 4px; padding: 4px; text-align: center; width: 80px; margin: 5px;">
        <div style="font-size: 1.0em; color: ${ftColor}"><b>${month}</b></div>
        <div style="font-size: 1.5em; font-weight: bold; color: #4169E1;">${day}</div>
        <div style="font-size: 1.0em;">${weekday}</div>
      </div>
    `;
  };

  const generateHtml = () => {
    let html = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0;">
        <style>
          .table-hover tr:hover {
            background-color: #f5f5f5;
            transition: background-color 0.3s ease;
          }
        </style>
        <table class="table-hover" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="font-weight: bold; text-align: left; padding: 12px; font-size:1.2em;">Online order cut-off date</th>
              <th style="font-weight: bold; text-align: left; padding: 12px; font-size:1.2em;">Uniform collect at school dates</th>
            </tr>
          </thead>
          <tbody>
    `;

    dateGroups.forEach(group => {
      html += `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="vertical-align: top; padding: 12px;">
            ${createDateCard(group.cutoffDate)}
          </td>
          <td style="vertical-align: top; padding: 12px;">
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

  const removeCollectionDate = (index) => {
    setNewGroup(prev => ({
      ...prev,
      collectionDates: prev.collectionDates.filter((_, i) => i !== index)
    }));
  };

  const addDateGroup = () => {
    if (newGroup.cutoffDate && newGroup.collectionDates.some(date => date !== null)) {
      setDateGroups(prev => [...prev, {
        ...newGroup,
        collectionDates: newGroup.collectionDates.filter(date => date !== null)
      }]);
      setNewGroup({
        cutoffDate: null,
        collectionDates: [null]
      });
    } else {
      alert('Please select a cut-off date and at least one collection date before adding the group.');
    }
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(previewHtml);
    const copyButton = document.querySelector('.btn-success.w-full');
    const originalText = copyButton.textContent;
    const originalBgColor = copyButton.style.backgroundColor;
    copyButton.textContent = 'Copied!';
    copyButton.style.backgroundColor = '#68D391'; // Tailwind green-400
    setTimeout(() => {
      copyButton.textContent = originalText;
      copyButton.style.backgroundColor = originalBgColor;
    }, 2000);
  };

  const resetForm = () => {
    setDateGroups([]);
    setNewGroup({
      cutoffDate: null,
      collectionDates: [null]
    });
  };

  return (
    <>
      <Head>
        <title>Uniform Dates</title>
      </Head>
      <div className="prose mx-auto mt-4 shadow-xl p-6 rounded-md bg-slate-50 md:max-w-screen-md">
        <h2 className="m-0 border-b-2 border-sky-600">Create Date Group</h2>
        <div className='flex flex-row place-content-around'>
          <div className='flex flex-col gap-2'>
            <h3>Cut-off Date</h3>
            <DatePicker
              selected={newGroup.cutoffDate}
              onChange={(date) => handleDateChange(date, 'cutoff')}
              dateFormat="MMMM d, yyyy"
              placeholderText="Select cut-off date"
              className="date-picker input input-bordered w-full max-w-xs"
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h3>Collection Dates</h3>
            {newGroup.collectionDates.map((date, index) => (
              <div key={index} className='flex flex-row gap-2'>
                <DatePicker
                  selected={date}
                  onChange={(date) => handleDateChange(date, 'collection', index)}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select collection date"
                  className="date-picker input input-bordered w-full max-w-xs"
                />
                {newGroup.collectionDates.length > 1 && (
                  <button 
                    onClick={() => removeCollectionDate(index)} 
                    className='btn btn-error'
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button className='btn btn-success' onClick={addCollectionDate}>Add Collection Date</button>
          </div>
        </div>
        <div className='flex flex-row justify-end gap-2 mt-2 pe-14 pt-2 border-t-2 border-sky-200'>
          <button className='btn btn-neutral' onClick={resetForm}>Reset</button>
          <button className='btn btn-primary' onClick={addDateGroup}>Add Date Group</button>
        </div>
        <h2 className="m-0 border-b-2 border-sky-600">Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginTop: '10px' }} />

        <button className='btn btn-success w-full mt-2' onClick={copyHtml}>Copy HTML</button>
      </div>
    </>
  );
};

export default UniformDates;