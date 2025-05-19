import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Appointment {
  Pet_ID: number;
  Vet_ID: number;
  App_Date: string;
  App_Reason: string;
  App_Notes: string;
  Diagnosis: string;
  Treatment: string;
  Pet_Name: string;
  Vet_Name: string;
}

export const loader = async () => {
  // TODO: Replace with actual database query
  const appointments: Appointment[] = [
    {
      Pet_ID: 1,
      Vet_ID: 1,
      App_Date: "2024-03-15T10:00:00",
      App_Reason: "Annual Checkup",
      App_Notes: "Regular checkup and vaccinations",
      Diagnosis: "Healthy",
      Treatment: "Routine vaccinations administered",
      Pet_Name: "Max",
      Vet_Name: "Dr. Smith"
    },
    {
      Pet_ID: 2,
      Vet_ID: 2,
      App_Date: "2024-03-16T14:30:00",
      App_Reason: "Dental Cleaning",
      App_Notes: "First dental cleaning",
      Diagnosis: "Mild tartar buildup",
      Treatment: "Professional dental cleaning performed",
      Pet_Name: "Luna",
      Vet_Name: "Dr. Johnson"
    },
    {
      Pet_ID: 3,
      Vet_ID: 1,
      App_Date: "2024-03-17T11:15:00",
      App_Reason: "Limping",
      App_Notes: "Limping on right hind leg",
      Diagnosis: "Minor sprain",
      Treatment: "Rest recommended, anti-inflammatory prescribed",
      Pet_Name: "Rocky",
      Vet_Name: "Dr. Smith"
    },
    {
      Pet_ID: 4,
      Vet_ID: 3,
      App_Date: "2024-03-18T09:00:00",
      App_Reason: "Vaccination",
      App_Notes: "Due for booster shots",
      Diagnosis: "Healthy",
      Treatment: "Booster vaccines administered",
      Pet_Name: "Bella",
      Vet_Name: "Dr. Wilson"
    },
    {
      Pet_ID: 5,
      Vet_ID: 2,
      App_Date: "2024-03-19T15:45:00",
      App_Reason: "Ear Infection",
      App_Notes: "Scratching ears frequently",
      Diagnosis: "Bacterial ear infection",
      Treatment: "Ear drops prescribed for 7 days",
      Pet_Name: "Charlie",
      Vet_Name: "Dr. Johnson"
    }
  ];
  
  return json({ appointments });
};

export default function Appointments() {
  const { appointments } = useLoaderData<typeof loader>();

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
                <td className="border-b px-4 py-2">{appointment.Pet_Name}</td>
                <td className="border-b px-4 py-2">{appointment.Vet_Name}</td>
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