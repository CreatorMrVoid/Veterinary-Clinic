from pydantic import BaseModel
from datetime import date
from typing import Optional, List

# Owner schemas
class OwnerBase(BaseModel):
    Owner_Name: str
    Owner_Email: str
    Owner_Tel: str
    Address: str

class OwnerCreate(OwnerBase):
    pass

class Owner(OwnerBase):
    Owner_ID: int

    class Config:
        from_attributes = True

# Pet schemas
class PetBase(BaseModel):
    Pet_Name: str
    Breed: str
    Species: str
    Date_Of_Birth: date
    Owner_ID: int

class PetCreate(PetBase):
    pass

class Pet(PetBase):
    Pet_ID: int

    class Config:
        from_attributes = True

# Veterinarian schemas
class VeterinarianBase(BaseModel):
    Vet_Name: str
    License_Number: str
    Vet_Tel: str
    Vet_Email: str

class VeterinarianCreate(VeterinarianBase):
    pass

class Veterinarian(VeterinarianBase):
    Vet_ID: int

    class Config:
        from_attributes = True

# Appointment schemas
class AppointmentBase(BaseModel):
    Pet_ID: int
    Vet_ID: int
    App_Date: date
    App_Reason: str
    App_Notes: Optional[str] = None
    Diagnosis: Optional[str] = None
    Treatment: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class Appointment(AppointmentBase):
    App_ID: int

    class Config:
        from_attributes = True

class AppointmentWithDetails(Appointment):
    pet: Pet
    vet: Veterinarian

    class Config:
        from_attributes = True 

# Vaccination schemas
class VaccinationBase(BaseModel):
    Pet_ID: int
    Vet_ID: int
    Name_Vaccine: str
    Vacc_Date: date
    Next_Due_Dates: date
    Notes_Vaccination: Optional[str] = None

class VaccinationCreate(VaccinationBase):
    pass

class Vaccination(VaccinationBase):
    Vacc_ID: int

    class Config:
        from_attributes = True

# Response schemas for relationships
class PetWithOwner(Pet):
    owner: Owner

class PetWithDetails(Pet):
    owner: Owner
    appointments: List[Appointment]
    vaccinations: List[Vaccination]

class VeterinarianWithAppointments(Veterinarian):
    appointments: List[Appointment]

class VeterinarianWithVaccinations(Veterinarian):
    vaccinations: List[Vaccination]
