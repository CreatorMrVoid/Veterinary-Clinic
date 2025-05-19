from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import date

import models
import schemas
from database import get_db

router = APIRouter()

# Owner routes
@router.get("/owners/", response_model=List[schemas.Owner])
def get_owners(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    owners = db.query(models.Owner).offset(skip).limit(limit).all()
    return owners

@router.get("/owners/{owner_id}", response_model=schemas.Owner)
def get_owner(owner_id: int, db: Session = Depends(get_db)):
    owner = db.query(models.Owner).filter(models.Owner.Owner_ID == owner_id).first()
    if owner is None:
        raise HTTPException(status_code=404, detail="Owner not found")
    return owner

@router.post("/owners/", response_model=schemas.Owner)
def create_owner(owner: schemas.OwnerCreate, db: Session = Depends(get_db)):
    db_owner = models.Owner(**owner.model_dump())
    db.add(db_owner)
    db.commit()
    db.refresh(db_owner)
    return db_owner

# Pet routes
@router.get("/pets/", response_model=List[schemas.Pet])
def get_pets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pets = db.query(models.Pet).offset(skip).limit(limit).all()
    return pets

@router.get("/pets/{pet_id}", response_model=schemas.PetWithDetails)
def get_pet(pet_id: int, db: Session = Depends(get_db)):
    pet = db.query(models.Pet).filter(models.Pet.Pet_ID == pet_id).first()
    if pet is None:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet

@router.get("/owners/{owner_id}/pets", response_model=List[schemas.Pet])
def get_owner_pets(owner_id: int, db: Session = Depends(get_db)):
    pets = db.query(models.Pet).filter(models.Pet.Owner_ID == owner_id).all()
    return pets

@router.post("/pets/", response_model=schemas.Pet)
def create_pet(pet: schemas.PetCreate, db: Session = Depends(get_db)):
    db_pet = models.Pet(**pet.model_dump())
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet

# Veterinarian routes
@router.get("/veterinarians/", response_model=List[schemas.Veterinarian])
def get_veterinarians(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    vets = db.query(models.Veterinarian).offset(skip).limit(limit).all()
    return vets

@router.get("/veterinarians/{vet_id}", response_model=schemas.Veterinarian)
def get_veterinarian(vet_id: int, db: Session = Depends(get_db)):
    vet = db.query(models.Veterinarian).filter(models.Veterinarian.Vet_ID == vet_id).first()
    if vet is None:
        raise HTTPException(status_code=404, detail="Veterinarian not found")
    return vet

@router.get("/veterinarians/{vet_id}/appointments", response_model=List[schemas.Appointment])
def get_vet_appointments(vet_id: int, db: Session = Depends(get_db)):
    appointments = db.query(models.Appointment).filter(models.Appointment.Vet_ID == vet_id).all()
    return appointments

@router.post("/veterinarians/", response_model=schemas.Veterinarian)
def create_veterinarian(vet: schemas.VeterinarianCreate, db: Session = Depends(get_db)):
    db_vet = models.Veterinarian(**vet.model_dump())
    db.add(db_vet)
    db.commit()
    db.refresh(db_vet)
    return db_vet

# Appointment routes
@router.get("/appointments/", response_model=List[schemas.Appointment])
def get_appointments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    appointments = db.query(models.Appointment).offset(skip).limit(limit).all()
    return appointments

@router.get("/appointments/{app_id}", response_model=schemas.Appointment)
def get_appointment(app_id: int, db: Session = Depends(get_db)):
    appointment = db.query(models.Appointment).filter(models.Appointment.App_ID == app_id).first()
    if appointment is None:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@router.post("/appointments/", response_model=schemas.Appointment)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = models.Appointment(**appointment.model_dump())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

# Vaccination routes
@router.get("/vaccinations/", response_model=List[schemas.Vaccination])
def get_vaccinations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    vaccinations = db.query(models.Vaccination).offset(skip).limit(limit).all()
    return vaccinations

@router.get("/vaccinations/{vacc_id}", response_model=schemas.Vaccination)
def get_vaccination(vacc_id: int, db: Session = Depends(get_db)):
    vaccination = db.query(models.Vaccination).filter(models.Vaccination.Vacc_ID == vacc_id).first()
    if vaccination is None:
        raise HTTPException(status_code=404, detail="Vaccination not found")
    return vaccination

@router.get("/pets/{pet_id}/next-vaccination", response_model=schemas.Vaccination)
def get_next_vaccination(pet_id: int, db: Session = Depends(get_db)):
    today = date.today()
    vaccination = db.query(models.Vaccination)\
        .filter(models.Vaccination.Pet_ID == pet_id)\
        .filter(models.Vaccination.Next_Due_Dates >= today)\
        .order_by(models.Vaccination.Next_Due_Dates)\
        .first()
    if vaccination is None:
        raise HTTPException(status_code=404, detail="No upcoming vaccinations found")
    return vaccination

@router.post("/vaccinations/", response_model=schemas.Vaccination)
def create_vaccination(vaccination: schemas.VaccinationCreate, db: Session = Depends(get_db)):
    db_vaccination = models.Vaccination(**vaccination.model_dump())
    db.add(db_vaccination)
    db.commit()
    db.refresh(db_vaccination)
    return db_vaccination 