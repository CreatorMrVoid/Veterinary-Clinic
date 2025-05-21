-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vet_clinic_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `App_ID` int NOT NULL AUTO_INCREMENT,
  `Pet_ID` int DEFAULT NULL,
  `Vet_ID` int DEFAULT NULL,
  `App_Date` date DEFAULT NULL,
  `App_Reason` text,
  `App_Notes` text,
  `Diagnosis` text,
  `Treatment` text,
  PRIMARY KEY (`App_ID`),
  UNIQUE KEY `unique_pet_date` (`Pet_ID`,`App_Date`),
  KEY `Vet_ID` (`Vet_ID`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`Pet_ID`) REFERENCES `pet` (`Pet_ID`),
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`Vet_ID`) REFERENCES `veterinarian` (`Vet_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,3,2,'2025-05-01','Annual Checkup','Vitals normal. Slight tartar on teeth.','Mild dental plaque','Dental cleaning scheduled'),(2,7,5,'2025-05-03','Cough and Sneezing','Cough persistent for 3 days.','Kennel Cough suspected','Antibiotics prescribed'),(3,2,4,'2025-05-04','Vaccination','Routine DHPP booster given.','Preventive care','DHPP vaccine administered'),(4,10,1,'2025-05-06','Lethargy','Low energy and appetite.','Possible viral infection','Supportive care recommended'),(5,1,6,'2025-05-07','Skin Rash','Redness near tail observed.','Allergic reaction','Antihistamines prescribed'),(6,6,9,'2025-05-08','Eye Irritation','Excessive blinking and discharge.','Conjunctivitis','Ophthalmic drops given'),(7,8,3,'2025-05-10','Ear Scratching','Odor and wax buildup found.','Ear infection','Cleaning and antibiotic drops'),(8,4,7,'2025-05-12','Loss of appetite','Refuses food since yesterday.','Possible GI issue','Prescribed digestive enzymes'),(9,5,10,'2025-05-13','Limping on front paw','No swelling but sensitive.','Minor sprain','Rest and pain relief advised'),(10,9,8,'2025-05-14','Behavioral changes','Increased aggression noted.','Anxiety or hormonal shift','Monitoring and calming meds'),(11,1,4,'2025-05-17','Limping on left leg','Pet showed signs of mild pain when leg was touched.','Minor sprain','Prescribed rest and anti-inflammatory medication'),(12,2,4,'2025-05-15','Loss of appetite and lethargy','Owner reported 2 days of reduced activity and refusal to eat.','Gastrointestinal upset','Administered fluids; prescribed digestive supplements'),(13,1,4,'2025-05-10','Annual wellness exam','Performed full physical check. Weight and vitals normal.','Healthy','Routine vaccination and dietary recommendations'),(14,1,5,'2024-10-01','Routine Checkup','Annual visit, healthy','None','None'),(15,2,5,'2024-11-10','Vaccination','Rabies shot administered','Preventive','Rabies Vaccine'),(16,3,5,'2025-01-20','Skin rash','Mild skin irritation','Dermatitis','Ointment prescribed'),(17,4,8,'2024-09-15','Limping','Right leg limp','Sprain','Rest & anti-inflammatory meds'),(18,5,8,'2024-12-05','Dental Cleaning','Routine dental care','Tartar buildup','Cleaning performed'),(19,6,8,'2025-02-10','Follow-up','Post-surgery checkup','Recovery normal','None');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owner`
--

DROP TABLE IF EXISTS `owner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `owner` (
  `Owner_ID` int NOT NULL,
  `Owner_Name` varchar(50) DEFAULT NULL,
  `Owner_Email` varchar(50) DEFAULT NULL,
  `Owner_Tel` char(11) DEFAULT NULL,
  `Address` text,
  PRIMARY KEY (`Owner_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owner`
--

LOCK TABLES `owner` WRITE;
/*!40000 ALTER TABLE `owner` DISABLE KEYS */;
INSERT INTO `owner` VALUES (1,'Özgün','ozgun@example.com','0555444111','Ankara, Türkiye'),(2,'ceren','ceren@example.com','1234567890','123 Pet Street'),(3,'Arzu','arzu@example.com','00001234567','Ankara, Türkiye'),(4,'berkay','berkay@example.com','0555444333','Ankara, Türkiye'),(11,'ibrahim','ibrahim.j@example.com','05551238767','ankara altindağ'),(12,'Mustafa','mufffifiif@example.com','05552345678','ankara kecioren'),(13,'Beril','beril@example.com','05553456099','ankara çankaya'),(14,'Zeynep','zynb0404@example.com','05554547890','ankara çankaya'),(15,'Ali','aaealli@example.com','05589678901','ankara,altindağ'),(16,'Mehmet','mehmet3231@example.com','05590678901','ankara kecioren'),(17,'Elif','f7e9ele9@example.com','05557890123','ankara altindağ'),(18,'Harun','Hrn003@example.com','05558922234','ankara kecioren etlik'),(19,'Sena','seennaaa44@example.com','05557512345','ankara çankaya'),(20,'Baris','Bariscmcb@example.com','05350123759','ankara çankaya'),(21,'Hilal','Hilal@example.com','05061235689','Istanbul, Beykoz');
/*!40000 ALTER TABLE `owner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet`
--

DROP TABLE IF EXISTS `pet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet` (
  `Pet_ID` int NOT NULL,
  `Pet_name` varchar(50) DEFAULT NULL,
  `Breed` varchar(50) DEFAULT NULL,
  `Species` varchar(50) DEFAULT NULL,
  `Date_Of_Birth` date DEFAULT NULL,
  `Owner_ID` int DEFAULT NULL,
  PRIMARY KEY (`Pet_ID`),
  KEY `Owner_ID` (`Owner_ID`),
  CONSTRAINT `pet_ibfk_1` FOREIGN KEY (`Owner_ID`) REFERENCES `owner` (`Owner_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet`
--

LOCK TABLES `pet` WRITE;
/*!40000 ALTER TABLE `pet` DISABLE KEYS */;
INSERT INTO `pet` VALUES (1,'Max','Golden Retriever','Dog','2019-06-15',11),(2,'Mia','British Shorthair','Cat','2020-03-21',12),(3,'Oscar','Siamese','Cat','2021-11-11',13),(4,'Bella','Labrador','Dog','2018-08-09',14),(5,'Loki','Persian','Cat','2022-01-12',15),(6,'Rocky','German Shepherd','Dog','2020-09-25',16),(7,'Lucy','Beagle','Dog','2021-05-30',17),(8,'Simba','Maine Coon','Cat','2019-02-14',18),(9,'Luna','Poodle','Dog','2023-03-03',19),(10,'Chloe','Scottish Fold','Cat','2022-06-07',20),(12,'Speed','greyhound','dog','2020-05-10',21),(122,'Max','Bulldog','Dog','2017-04-15',20),(123,'Milo','Sphynx','Cat','2020-12-02',11),(124,'Daisy','Golden Retriever','Dog','2019-07-19',12),(125,'Nala','Ragdoll','Cat','2021-03-28',13),(126,'Bailey','Boxer','Dog','2018-11-11',14),(127,'Zoe','Birman','Cat','2022-02-22',15),(128,'Buddy','Dachshund','Dog','2016-09-05',16),(129,'Coco','Russian Blue','Cat','2023-01-15',17),(130,'Ruby','Shih Tzu','Dog','2020-06-30',18),(131,'Maggie','Abyssinian','Cat','2019-10-10',19),(132,'Leo','egyptian','Cat','2014-12-29',19),(156,'Rocky','Bulldog','Dog','2021-07-14',4),(157,'Nala','Bengal','Cat','2019-09-21',4);
/*!40000 ALTER TABLE `pet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccination`
--

DROP TABLE IF EXISTS `vaccination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccination` (
  `Vacc_ID` int NOT NULL,
  `Pet_ID` int DEFAULT NULL,
  `Vet_ID` int DEFAULT NULL,
  `Name_Vaccine` varchar(100) DEFAULT NULL,
  `Vacc_Date` date DEFAULT NULL,
  `Next_Due_Dates` date DEFAULT NULL,
  `Notes_Vaccination` text,
  PRIMARY KEY (`Vacc_ID`),
  KEY `Pet_ID` (`Pet_ID`),
  KEY `Vet_ID` (`Vet_ID`),
  CONSTRAINT `vaccination_ibfk_1` FOREIGN KEY (`Pet_ID`) REFERENCES `pet` (`Pet_ID`),
  CONSTRAINT `vaccination_ibfk_2` FOREIGN KEY (`Vet_ID`) REFERENCES `veterinarian` (`Vet_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccination`
--

LOCK TABLES `vaccination` WRITE;
/*!40000 ALTER TABLE `vaccination` DISABLE KEYS */;
INSERT INTO `vaccination` VALUES (1,2,2,'FVRCP','2024-04-15','2025-04-15','Core cat vaccine'),(2,5,2,'FVRCP','2025-02-15','2026-02-15','Feline core vaccine administered.'),(3,1,1,'Rabies','2025-01-20','2026-01-20','Annual rabies booster given.'),(4,2,2,'FVRCP','2025-02-15','2026-02-15','Feline core vaccine administered.'),(5,1,2,'Leptospirosis','2025-03-10','2026-03-10','Recommended for outdoor dogs.'),(6,2,1,'FeLV','2025-04-05','2026-04-05','Feline leukemia vaccine. Indoor/outdoor exposure risk.'),(7,1,1,'Bordetella','2025-05-01','2026-05-01','Kennel cough prevention. Recommended annually.'),(8,7,7,'FeLV','2025-04-05','2026-04-05','Feline leukemia vaccine. Indoor/outdoor exposure risk.'),(9,5,9,'Rabies','2025-01-20','2026-01-20','Annual rabies booster given.'),(10,7,2,'Leptospirosis','2025-03-10','2026-03-10','Recommended for outdoor dogs.'),(101,1,1,'DHPP','2024-05-20','2025-05-20','Intranasal products may be combined with MLV'),(102,2,4,'FeLV','2024-05-27','2025-05-27','It is endemic in various areas around the country'),(103,3,1,'Leptospirosis','2024-06-01','2025-06-01','Formerly considered a lifestyle vaccine.'),(104,4,5,'Influenza','2024-06-06','2025-06-06','It is highly contagious and causes a cough, nasal discharge, and low-grade fever.'),(105,5,7,'DHLPP','2024-06-11','2025-06-11','Auto-filled: vaccination record completed by system'),(106,6,8,'Crotalux atrox','2024-05-18','2025-05-18','Diseases from these agents typically resolve on their own, but they sometimes lead to pneumonia or more severe respiratory disease.'),(107,7,10,'Leptospirosis','2024-05-22','2025-05-22','Between 10 and 16 weeks of age'),(108,8,3,'Rabies','2024-05-29','2025-05-29','receive vaccinations delivered to a C5 level annually'),(109,9,5,'DHPP','2024-06-04','2025-06-04','KC every year plus C3 every 3 years'),(110,10,6,'FeLV','2024-06-14','2025-06-14','Preferably intranasal'),(111,123,2,'Leptospirosis','2024-05-24','2025-05-24','Frequency of adult “core vaccine” (i.e. C3) booster'),(112,124,4,'Rabies','2024-05-31','2025-05-31','C3 vaccination every third year.'),(113,125,6,'DHPP','2024-06-07','2025-06-07','KC vaccination every subsequent year; plus'),(114,126,7,'FeLV','2024-06-10','2025-06-10','C5 vaccination at 12-16 months of age; plus'),(115,127,9,'Hepatitis','2024-08-26','2025-06-15','Exposure to hepatitis is prevented'),(201,1,1,'Rabies','2024-05-01','2025-05-01','Annual rabies shot'),(203,3,1,'Rabies','2024-03-10','2025-03-10','Routine dose'),(204,4,3,'DHPP','2023-12-20','2024-12-20','Distemper combo vaccine'),(205,5,1,'Leptospirosis','2023-11-11','2024-11-11','Lepto shot'),(206,6,4,'Rabies','2024-01-05','2025-01-05','Booster given'),(207,7,2,'FVRCP','2024-02-28','2025-02-28','Indoor cat'),(208,8,5,'Bordetella','2023-10-18','2024-10-18','Kennel cough prevention'),(209,9,1,'Rabies','2023-06-30','2024-06-30','Updated early'),(210,10,6,'Feline Leukemia','2023-08-22','2024-08-22','Outdoor cat'),(211,12,1,'Parvovirus','2022-05-06','2026-05-06','Nececcary parvovirus protection');
/*!40000 ALTER TABLE `vaccination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinarian`
--

DROP TABLE IF EXISTS `veterinarian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinarian` (
  `Vet_ID` int NOT NULL,
  `Vet_Name` varchar(100) DEFAULT NULL,
  `License_Number` varchar(50) DEFAULT NULL,
  `Vet_Tel` char(11) DEFAULT NULL,
  `Vet_Email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Vet_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinarian`
--

LOCK TABLES `veterinarian` WRITE;
/*!40000 ALTER TABLE `veterinarian` DISABLE KEYS */;
INSERT INTO `veterinarian` VALUES (1,'Dr. Ayşe Yılmaz','TRVET001','05321234567','ayse.yilmaz@veteriner.com'),(2,'Dr. Mehmet Demir','TRVET002','05327654321','mehmet.demir@veteriner.com'),(3,'Dr. Elif Kaya','TRVET003','05329876543','elif.kaya@veteriner.com'),(4,'Dr. Ahmet Şahin','TRVET004','05323456789','ahmet.sahin@veteriner.com'),(5,'Dr. Fatma Aydın','TRVET005','05322345678','fatma.aydin@veteriner.com'),(6,'Dr. Emre Koç','TRVET006','05325678901','emre.koc@veteriner.com'),(7,'Dr. Zeynep Arslan','TRVET007','05320987654','zeynep.arslan@veteriner.com'),(8,'Dr. Burak Yıldız','TRVET008','05327894321','burak.yildiz@veteriner.com'),(9,'Dr. Merve Çelik','TRVET009','05329812345','merve.celik@veteriner.com'),(10,'Dr. Hasan Polat','TRVET010','05324567890','hasan.polat@veteriner.com');
/*!40000 ALTER TABLE `veterinarian` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-21  9:38:24
