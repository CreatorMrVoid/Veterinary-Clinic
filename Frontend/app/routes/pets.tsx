import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Pet {
  Pet_ID: number;
  Pet_name: string;
  Breed: string;
  Species: string;
  Date_Of_Birth: string;
  Owner_ID: number;
  Owner_Name: string;
}

export const loader = async () => {
  // TODO: Replace with actual database query
  const pets: Pet[] = [
    {
      Pet_ID: 1,
      Pet_name: "Max",
      Breed: "Golden Retriever",
      Species: "Dog",
      Date_Of_Birth: "2020-01-15",
      Owner_ID: 1,
      Owner_Name: "John Doe"
    },
    {
      Pet_ID: 2,
      Pet_name: "Luna",
      Breed: "Persian",
      Species: "Cat",
      Date_Of_Birth: "2021-03-22",
      Owner_ID: 2,
      Owner_Name: "Sarah Johnson"
    },
    {
      Pet_ID: 3,
      Pet_name: "Rocky",
      Breed: "German Shepherd",
      Species: "Dog",
      Date_Of_Birth: "2019-11-08",
      Owner_ID: 3,
      Owner_Name: "Michael Brown"
    },
    {
      Pet_ID: 4,
      Pet_name: "Bella",
      Breed: "Siamese",
      Species: "Cat",
      Date_Of_Birth: "2022-05-17",
      Owner_ID: 4,
      Owner_Name: "Emily Wilson"
    },
    {
      Pet_ID: 5,
      Pet_name: "Charlie",
      Breed: "Labrador",
      Species: "Dog",
      Date_Of_Birth: "2020-08-30",
      Owner_ID: 5,
      Owner_Name: "David Martinez"
    }
  ];
  
  return json({ pets });
};

export default function Pets() {
  const { pets } = useLoaderData<typeof loader>();

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
                <td className="border-b px-4 py-2">{pet.Pet_name}</td>
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