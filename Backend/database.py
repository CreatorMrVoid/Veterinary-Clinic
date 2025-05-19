from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get database configuration
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '3306')
DB_USER = os.getenv('DB_USER', 'root')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_NAME = os.getenv('DB_NAME', 'vet_clinic_db')

# Log the configuration (without password)
logger.info(f"Database configuration: host={DB_HOST}, port={DB_PORT}, user={DB_USER}, database={DB_NAME}")

# Create database URL
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

try:
    # Create engine with echo=True for debugging
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL,
        echo=True,  # This will log all SQL statements
        pool_pre_ping=True  # This will check the connection before using it
    )
    
    # Test the connection
    with engine.connect() as connection:
        logger.info("Successfully connected to the database!")
        
except Exception as e:
    logger.error(f"Error connecting to the database: {str(e)}")
    raise

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 