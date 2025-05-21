import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
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

export async function getBloodPressureRecords(databaseId = process.env.BLOOD_PRESSURE_DBID) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'Date of Measurement',
          direction: 'descending',
        },
      ],
    });

    return transformNotionData(response.results);
  } catch (error) {
    console.error('Error fetching blood pressure records:', error);
    throw error;
  }
}