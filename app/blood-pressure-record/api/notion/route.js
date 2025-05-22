import { getBloodPressureRecords } from '../../services/notion.js';

export const dynamic = 'force-dynamic'; // This prevents caching
export const revalidate = 0; // This prevents reusing old data

export async function GET() {
  try {
    const records = await getBloodPressureRecords();
    return Response.json({ data: records }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}