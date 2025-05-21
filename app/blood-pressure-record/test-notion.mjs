import { Client } from '@notionhq/client';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const notion = new Client({
  auth: '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', // Hardcoded for testing
});

function transformNotionData(results) {
  return results.map(record => ({
    id: record.id,
    date: record.properties['Date of Measurement'].created_time,
    heartRate: record.properties['Heart Rate'].number,
    systolic: record.properties['Blood Pressure Systolic'].number,
    diastolic: record.properties['Blood Pressure Diastolic'].number
  }));
}

async function fetchAndSaveNotionData() {
  try {
    console.log('Fetching data from Notion...');
    const response = await notion.databases.query({
      database_id: '1f2f38f90edd8056bfcfc5ac7e70ed0a', // Hardcoded for testing
      sorts: [
        {
          property: 'Date of Measurement',
          direction: 'descending',
        },
      ],
    });

    // Transform the data to our simplified format
    const transformedData = transformNotionData(response.results);
    
    // Format the data with indentation for better readability
    const formattedData = JSON.stringify(transformedData, null, 2);
    
    // Save to a JSON file in the same directory
    const filePath = join(process.cwd(), 'app/blood-pressure-record/notion-data-transformed.json');
    await writeFile(filePath, formattedData, 'utf8');
    
    console.log('Data has been saved to notion-data-transformed.json');
    console.log('First record sample:', transformedData[0]);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the function
fetchAndSaveNotionData();