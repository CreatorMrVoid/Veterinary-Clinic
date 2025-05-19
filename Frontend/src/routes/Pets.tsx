import { useState, useEffect } from 'react';

interface Pet {
  Pet_ID: number;
  Pet_Name: string;
  Breed: string;
  Species: string;
  Date_Of_Birth: string;
  Owner_ID: number;
  Owner_Name: string;
}

export default function Pets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/pets');
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Pets</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Pets</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pets</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2 text-left">ID</th>
              <th className="border-b px-4 py-2 text-left">Name</th>
              <th className="border-b px-4 py-2 text-left">Breed</th>
              <th className="border-b px-4 py-2 text-left">Species</th>
              <th className="border-b px-4 py-2 text-left">Date of Birth</th>
              <th className="border-b px-4 py-2 text-left">Owner</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.Pet_ID} className="hover:bg-gray-50">
                <td className="border-b px-4 py-2">{pet.Pet_ID}</td>
                <td className="border-b px-4 py-2">{pet.Pet_Name}</td>
                <td className="border-b px-4 py-2">{pet.Breed}</td>
                <td className="border-b px-4 py-2">{pet.Species}</td>
                <td className="border-b px-4 py-2">{new Date(pet.Date_Of_Birth).toLocaleDateString()}</td>
                <td className="border-b px-4 py-2">{pet.Owner_Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 