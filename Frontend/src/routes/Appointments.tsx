import { useState, useEffect } from 'react';

interface Appointment {
  App_ID: number;
  Pet_ID: number;
  Vet_ID: number;
  App_Date: string;
  App_Reason: string;
  App_Notes: string;
  Diagnosis: string;
  Treatment: string;
  pet: {
    Pet_ID: number;
    Pet_Name: string;
  };
  vet: {
    Vet_ID: number;
    Vet_Name: string;
  };
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Appointments</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Appointments</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2 text-left">Date</th>
              <th className="border-b px-4 py-2 text-left">Pet</th>
              <th className="border-b px-4 py-2 text-left">Veterinarian</th>
              <th className="border-b px-4 py-2 text-left">Reason</th>
              <th className="border-b px-4 py-2 text-left">Diagnosis</th>
              <th className="border-b px-4 py-2 text-left">Treatment</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={`${appointment.Pet_ID}-${appointment.App_Date}`} className="hover:bg-gray-50">
                <td className="border-b px-4 py-2">{new Date(appointment.App_Date).toLocaleString()}</td>
                <td className="border-b px-4 py-2">{appointment.pet.Pet_Name}</td>
                <td className="border-b px-4 py-2">{appointment.vet.Vet_Name}</td>
                <td className="border-b px-4 py-2">{appointment.App_Reason}</td>
                <td className="border-b px-4 py-2">{appointment.Diagnosis}</td>
                <td className="border-b px-4 py-2">{appointment.Treatment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 