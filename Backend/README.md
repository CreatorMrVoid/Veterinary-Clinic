### The API includes the following endpoints:
Owners:
GET /api/v1/owners/ - Get all owners
GET /api/v1/owners/{owner_id} - Get specific owner
POST /api/v1/owners/ - Create new owner
Pets:
GET /api/v1/pets/ - Get all pets
GET /api/v1/pets/{pet_id} - Get specific pet with details
GET /api/v1/owners/{owner_id}/pets - Get all pets of an owner
POST /api/v1/pets/ - Create new pet
Veterinarians:
GET /api/v1/veterinarians/ - Get all veterinarians
GET /api/v1/veterinarians/{vet_id} - Get specific veterinarian
GET /api/v1/veterinarians/{vet_id}/appointments - Get all appointments of a vet
POST /api/v1/veterinarians/ - Create new veterinarian
Appointments:
GET /api/v1/appointments/ - Get all appointments
GET /api/v1/appointments/{app_id} - Get specific appointment
POST /api/v1/appointments/ - Create new appointment
Vaccinations:
GET /api/v1/vaccinations/ - Get all vaccinations
GET /api/v1/vaccinations/{vacc_id} - Get specific vaccination
GET /api/v1/pets/{pet_id}/next-vaccination - Get next due vaccination for a pet
POST /api/v1/vaccinations/ - Create new vaccination

### 1. To run the application:
First, create a .env file with your database configuration:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=vet_clinic_db

### 2.Install the requirements (be sure you are in the backend folder -cd backend-):
```bash
pip install -r requirements.txt
```

### 3. Run the application:
```bash
uvicorn main:app --reload
```

The API will be available at http://localhost:8000, and you can access the automatic API documentation at http://localhost:8000/docs.