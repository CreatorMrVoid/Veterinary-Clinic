import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface Owner {
  Owner_ID: number;
  Owner_Name: string;
  Owner_Email: string;
  Owner_Tel: string;
  Address: string;
}

export const loader = async () => {
  // TODO: Replace with actual database query
  const owners: Owner[] = [
    {
      Owner_ID: 1,
      Owner_Name: "John Doe",
      Owner_Email: "john.doe@email.com",
      Owner_Tel: "555-0123",
      Address: "123 Main St, Cityville"
    },
    {
      Owner_ID: 2,
      Owner_Name: "Sarah Johnson",
      Owner_Email: "sarah.j@email.com",
      Owner_Tel: "555-0124",
      Address: "456 Oak Ave, Townsburg"
    },
    {
      Owner_ID: 3,
      Owner_Name: "Michael Brown",
      Owner_Email: "michael.b@email.com",
      Owner_Tel: "555-0125",
      Address: "789 Pine Rd, Villageton"
    },
    {
      Owner_ID: 4,
      Owner_Name: "Emily Wilson",
      Owner_Email: "emily.w@email.com",
      Owner_Tel: "555-0126",
      Address: "321 Maple Dr, Hamletville"
    },
    {
      Owner_ID: 5,
      Owner_Name: "David Martinez",
      Owner_Email: "david.m@email.com",
      Owner_Tel: "555-0127",
      Address: "654 Cedar Ln, Boroughton"
    }
  ];
  
  return json({ owners });
};

export default function Owners() {
  const { owners } = useLoaderData<typeof loader>();

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