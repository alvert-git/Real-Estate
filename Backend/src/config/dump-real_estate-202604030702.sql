-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: mysql-1c16e7e4-albertbelbase018-36af.a.aivencloud.com    Database: real_estate
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'ce20fef0-2e92-11f1-a2e2-da33fbd1cc30:1-62';

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `property_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_favorite` (`user_id`,`property_id`),
  KEY `fk_fav_property` (`property_id`),
  CONSTRAINT `fk_fav_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_fav_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (6,6,10,'2026-04-02 13:14:51'),(7,6,11,'2026-04-02 14:54:09');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci,
  `price` decimal(15,2) NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `bedrooms` int DEFAULT '0',
  `bathrooms` int DEFAULT '0',
  `area_sqft` int DEFAULT NULL,
  `type` enum('sale','rent') COLLATE utf8mb4_general_ci NOT NULL,
  `status` enum('available','sold','rented') COLLATE utf8mb4_general_ci DEFAULT 'available',
  `agent_id` int NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_properties_agent` (`agent_id`),
  KEY `idx_properties_deleted_at` (`deleted_at`),
  KEY `idx_properties_city` (`city`),
  CONSTRAINT `fk_properties_agent` FOREIGN KEY (`agent_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (10,'Property 1','sdcasas',200.00,'Dhapasi','Kathmandu',2,2,222,'sale','available',7,'2026-04-02 16:30:13','2026-04-02 13:12:08','2026-04-02 16:30:13'),(11,'Property 2','asdasd',300.00,'CA','USA',2,2,343,'sale','available',7,'2026-04-02 16:30:15','2026-04-02 13:12:33','2026-04-02 16:30:15'),(12,'Property 3','sdfsdcsd',300.00,'ktm','Kathmandu',2,2,322,'sale','available',7,'2026-04-02 16:30:18','2026-04-02 13:12:55','2026-04-02 16:30:18'),(13,'Property 4','asdasc',222.00,'aaa','Kathmandu',3,4,222,'sale','available',7,'2026-04-02 16:30:20','2026-04-02 13:13:22','2026-04-02 16:30:20'),(14,'Property 5','ascsa',221.00,'ts','USA',2,4,124,'sale','available',7,'2026-04-02 16:30:22','2026-04-02 13:13:47','2026-04-02 16:30:22'),(15,'Property 6','asdasc',22.00,'aaa','Kathmandu',21,1,1231,'sale','available',7,'2026-04-02 16:30:26','2026-04-02 13:14:09','2026-04-02 16:30:26'),(16,'Property 1','sdcsd',200.00,'Dhapasi','Kathmandu',2,2,222,'sale','available',7,NULL,'2026-04-02 16:30:59','2026-04-02 16:30:59'),(17,'Property 2','sadcasa',222.00,'CA','USA',2,2,222,'sale','available',7,NULL,'2026-04-02 16:34:58','2026-04-02 16:34:58'),(18,'Property 3','asdcas',444.00,'Texas','USA',2,2,222,'sale','available',7,NULL,'2026-04-02 16:35:42','2026-04-02 16:35:42'),(19,'Property 4','ascasc',212.00,'Nepal','Kathmandu',2,2,222,'sale','available',7,NULL,'2026-04-02 16:36:17','2026-04-02 16:36:17'),(20,'Property 5','ascas sda',112.00,'Nepal','Kathmandu',2,2,222,'sale','available',7,NULL,'2026-04-02 16:36:52','2026-04-02 16:36:52'),(21,'Property 6','sacas ascasc',2222.00,'Kathamndu','Kathmandu',2,2,221,'sale','available',7,NULL,'2026-04-02 16:37:21','2026-04-02 16:37:21');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `property_images`
--

DROP TABLE IF EXISTS `property_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `property_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `is_main` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_images_property` (`property_id`),
  CONSTRAINT `fk_images_property` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `property_images`
--

LOCK TABLES `property_images` WRITE;
/*!40000 ALTER TABLE `property_images` DISABLE KEYS */;
INSERT INTO `property_images` VALUES (14,10,'/uploads/properties/property-1775135528411-627973901.jfif',1),(15,11,'/uploads/properties/property-1775135553250-957622231.jpg',1),(16,12,'/uploads/properties/property-1775135575637-583566040.jpg',1),(17,13,'/uploads/properties/property-1775135602635-489595069.jpg',1),(18,14,'/uploads/properties/property-1775135627760-660838277.jfif',1),(19,15,'/uploads/properties/property-1775135649789-554713411.jpg',1),(20,16,'https://res.cloudinary.com/dbgotabgu/image/upload/v1775147458/properties/umqyx9h3rmdwsxb7ktum.jpg',1),(21,17,'https://res.cloudinary.com/dbgotabgu/image/upload/v1775147697/properties/y8nfyhw3wmeaeros1tqp.jpg',1),(22,18,'https://res.cloudinary.com/dbgotabgu/image/upload/v1775147741/properties/tjfeie0hrr9jqf2hmc7g.jpg',1),(23,19,'https://res.cloudinary.com/dbgotabgu/image/upload/v1775147775/properties/fmpevka82j48hv7ajbjm.jpg',1),(24,20,'https://res.cloudinary.com/dbgotabgu/image/upload/v1775147811/properties/oky2owjjxuhyq0en19mf.jpg',1),(25,21,'https://res.cloudinary.com/dbgotabgu/image/upload/v1775147840/properties/w4bpnul3rwx2fejty23z.jpg',1);
/*!40000 ALTER TABLE `property_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','agent','user') COLLATE utf8mb4_general_ci DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'User Account','user@gmail.com','$2b$10$oGFJfbrNmHVv5h4f.FpaM.selieyALEVE2lrKmJyv0YmEDyOMIB.a','user','2026-04-02 13:05:48','2026-04-02 13:05:48'),(7,'Agent Account','agent@gmail.com','$2b$10$/lJAhbFULWZUVZ.7gCEloeGfrzLkuGrTh0XCUyRE3/auIRUGXXtbu','agent','2026-04-02 13:10:23','2026-04-02 13:10:23');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'real_estate'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-03  7:02:48
