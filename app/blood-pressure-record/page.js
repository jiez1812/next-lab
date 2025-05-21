import BloodPressureChart from './components/BloodPressureChart';

export default function BloodPressurePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Blood Pressure Records</h1>
      <BloodPressureChart />
    </div>
  );
}
