import { getBloodPressureRecords } from '../services/notion';

export async function GET() {
  try {
    const records = await getBloodPressureRecords();
    return Response.json({ data: records });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}