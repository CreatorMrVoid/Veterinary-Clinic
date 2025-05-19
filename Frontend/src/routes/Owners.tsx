import { useState, useEffect } from 'react';

interface Owner {
  Owner_ID: number;
  Owner_Name: string;
  Owner_Email: string;
  Owner_Tel: string;
  Address: string;
}

export default function Owners() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/owners');
        if (!response.ok) {
          throw new Error('Failed to fetch owners');
        }
        const data = await response.json();
        setOwners(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Pet Owners</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Pet Owners</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pet Owners</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2 text-left">ID</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Email</th>
              <th className="border-b px-4 py-2 text-left">Phone</th>
              <th className="border-b px-4 py-2 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.Owner_ID} className="hover:bg-gray-50">
                <td className="border-b px-4 py-2">{owner.Owner_ID}</td>
                <td className="border-b px-4 py-2">{owner.Owner_Name}</td>
                <td className="border-b px-4 py-2">{owner.Owner_Email}</td>
                <td className="border-b px-4 py-2">{owner.Owner_Tel}</td>
                <td className="border-b px-4 py-2">{owner.Address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 