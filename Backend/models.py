from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base

class Owner(Base):
    __tablename__ = "owner"

    Owner_ID = Column(Integer, primary_key=True, index=True)
    Owner_Name = Column(String(100))
    Owner_Email = Column(String(100))
    Owner_Tel = Column(String(20))
    Address = Column(String(200))

    pets = relationship("Pet", back_populates="owner")

class Pet(Base):
    __tablename__ = "pet"

    Pet_ID = Column(Integer, primary_key=True, index=True)
    Pet_Name = Column(String(100))
    Breed = Column(String(100))
    Species = Column(String(100))
    Dte_Of_Birth = Column(Date)
    Owner_ID = Column(Integer, ForeignKey("owner.Owner_ID"))

    owner = relationship("Owner", back_populates="pets")
    appointments = relationship("Appointment", back_populates="pet")
    vaccinations = relationship("Vaccination", back_populates="pet")

class Veterinarian(Base):
    __tablename__ = "veterinarian"

    Vet_ID = Column(Integer, primary_key=True, index=True)
    Vet_Name = Column(String(100))
    License_Number = Column(String(50))
    Vet_Tel = Column(String(20))
    Vet_Email = Column(String(100))

    appointments = relationship("Appointment", back_populates="vet")
    vaccinations = relationship("Vaccination", back_populates="vet")

class Appointment(Base):
    __tablename__ = "appointment"

    App_ID = Column(Integer, primary_key=True, index=True)
    Pet_ID = Column(Integer, ForeignKey("pet.Pet_ID"))
    Vet_ID = Column(Integer, ForeignKey("veterinarian.Vet_ID"))
    App_Date = Column(Date)
    App_Reason = Column(String(200))
    App_Notes = Column(Text)
    Diagnosis = Column(Text)
    Treatment = Column(Text)

    pet = relationship("Pet", back_populates="appointments")
    vet = relationship("Veterinarian", back_populates="appointments")

class Vaccination(Base):
    __tablename__ = "vaccination"

    Vacc_ID = Column(Integer, primary_key=True, index=True)
    Pet_ID = Column(Integer, ForeignKey("pet.Pet_ID"))
    Vet_ID = Column(Integer, ForeignKey("veterinarian.Vet_ID"))
    Name_Vaccine = Column(String(100))
    Vacc_Date = Column(Date)
    Next_Due_Dates = Column(Date)
    Notes_Vaccination = Column(Text)

    pet = relationship("Pet", back_populates="vaccinations")
    vet = relationship("Veterinarian", back_populates="vaccinations") 