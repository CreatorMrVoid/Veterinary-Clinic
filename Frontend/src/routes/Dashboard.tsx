import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Owner {
  Owner_ID: number;
  Owner_Name: string;
  Owner_Email: string;
  Owner_Tel: string;
  Address: string;
}

interface Pet {
  Pet_ID: number;
  Pet_Name: string;
  Breed: string;
  Species: string;
  Date_Of_Birth: string;
  Owner_ID: number;
}

interface Vaccination {
  Vacc_ID: number;
  Pet_ID: number;
  Vet_ID?: number;
  Name_Vaccine: string;
  Vacc_Date?: string;
  Next_Due_Dates?: string;
  Notes_Vaccination?: string;
}

export default function Dashboard() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
  const [ownerPets, setOwnerPets] = useState<Pet[]>([]);
  const [petVaccinations, setPetVaccinations] = useState<{ [key: number]: Vaccination[] }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingPets, setLoadingPets] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/owners');
        if (!response.ok) {
          throw new Error('Failed to fetch owners');
        }
        const data = await response.json();
        setOwners(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOwners();
  }, []);

  const handleOwnerClick = async (owner: Owner) => {
    setSelectedOwner(owner);
    setLoadingPets(true);
    try {
      // Fetch owner's pets
      const petsResponse = await fetch(`http://localhost:8000/api/owners/${owner.Owner_ID}/pets`);
      if (!petsResponse.ok) {
        throw new Error('Failed to fetch pets');
      }
      const petsData = await petsResponse.json();
      setOwnerPets(petsData);

      // Fetch vaccinations for each pet
      const vaccinationsMap: { [key: number]: Vaccination[] } = {};
      for (const pet of petsData) {
        try {
          // Use the new endpoint for pet vaccinations
          const vaccResponse = await fetch(`http://localhost:8000/api/pets/${pet.Pet_ID}/vaccinations`);
          if (vaccResponse.ok) {
            const vaccData = await vaccResponse.json();
            vaccinationsMap[pet.Pet_ID] = vaccData;
          } else if (vaccResponse.status === 404) {
            // If no vaccinations found, set empty array
            vaccinationsMap[pet.Pet_ID] = [];
          } else {
            console.warn(`Failed to fetch vaccinations for pet ${pet.Pet_ID}`);
            vaccinationsMap[pet.Pet_ID] = [];
          }
        } catch (err) {
          console.error(`Error fetching vaccinations for pet ${pet.Pet_ID}:`, err);
          vaccinationsMap[pet.Pet_ID] = [];
        }
      }
      setPetVaccinations(vaccinationsMap);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoadingPets(false);
    }
  };

  const filteredOwners = owners.filter(owner =>
    owner.Owner_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    owner.Owner_Email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search owners by name or email..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Owners List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow p-4"
        >
          <h2 className="text-xl font-semibold mb-4">Owners</h2>
          <div className="space-y-2">
            {filteredOwners.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No owners found</p>
            ) : (
              filteredOwners.map((owner) => (
                <motion.div
                  key={owner.Owner_ID}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedOwner?.Owner_ID === owner.Owner_ID
                      ? 'bg-blue-100 border-l-4 border-blue-500'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleOwnerClick(owner)}
                >
                  <h3 className="font-medium">{owner.Owner_Name}</h3>
                  <p className="text-sm text-gray-600">{owner.Owner_Email}</p>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Selected Owner Details */}
        <AnimatePresence>
          {selectedOwner && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-lg shadow p-4"
            >
              <h2 className="text-xl font-semibold mb-4">Owner Details</h2>
              <div className="mb-4">
                <h3 className="font-medium">{selectedOwner.Owner_Name}</h3>
                <p className="text-sm text-gray-600">{selectedOwner.Owner_Email}</p>
                <p className="text-sm text-gray-600">{selectedOwner.Owner_Tel}</p>
                <p className="text-sm text-gray-600">{selectedOwner.Address}</p>
              </div>

              {/* Pets and Vaccinations */}
              <div className="space-y-4">
                <h3 className="font-medium">Pets and Vaccinations</h3>
                {loadingPets ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : ownerPets.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No pets found</p>
                ) : (
                  ownerPets.map((pet) => (
                    <motion.div
                      key={pet.Pet_ID}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-3"
                    >
                      <h4 className="font-medium">{pet.Pet_Name}</h4>
                      <p className="text-sm text-gray-600">
                        {pet.Breed} - {pet.Species}
                      </p>
                      {petVaccinations[pet.Pet_ID] && petVaccinations[pet.Pet_ID].length > 0 ? (
                        <div className="mt-2">
                          <h5 className="text-sm font-medium">Vaccinations:</h5>
                          <ul className="text-sm text-gray-600">
                            {petVaccinations[pet.Pet_ID].map((vacc) => (
                              <motion.li
                                key={vacc.Vacc_ID}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-1 p-2 bg-gray-50 rounded"
                              >
                                <div className="font-medium">{vacc.Name_Vaccine}</div>
                                {vacc.Vacc_Date && (
                                  <div>Given: {new Date(vacc.Vacc_Date).toLocaleDateString()}</div>
                                )}
                                {vacc.Next_Due_Dates && (
                                  <div>Next due: {new Date(vacc.Next_Due_Dates).toLocaleDateString()}</div>
                                )}
                                {vacc.Notes_Vaccination && (
                                  <div className="text-gray-500 mt-1">{vacc.Notes_Vaccination}</div>
                                )}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">No vaccination records found</p>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          <p>{error}</p>
        </motion.div>
      )}
    </div>
  );
} 