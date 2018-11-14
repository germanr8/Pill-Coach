-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2018 at 12:50 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pill-coach`
--

-- --------------------------------------------------------

--
-- Table structure for table `medicina`
--

CREATE TABLE `medicina` (
  `id_Medicina` int(11) NOT NULL,
  `nombreMedicina` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tipoMedicina` int(11) DEFAULT NULL,
  `gramosTotales` int(11) DEFAULT NULL,
  `gramosPorPresentacion` int(11) DEFAULT NULL,
  `cantidadDePresentacion` int(11) DEFAULT NULL,
  `notas` text COLLATE utf8_unicode_ci,
  `vecesTomadaDia` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `medicina`
--

INSERT INTO `medicina` (`id_Medicina`, `nombreMedicina`, `tipoMedicina`, `gramosTotales`, `gramosPorPresentacion`, `cantidadDePresentacion`, `notas`, `vecesTomadaDia`) VALUES
(19, 'as684dwa846', 2, 100, 10, 10, ' ', 0),
(23, '1', 1, 1, 0, 0, ' ', 0),
(24, 'Histiacil', 2, 50, 5, 10, ' ', 0),
(26, 'Histiacil', 2, 300, 15, 20, ' ', 0),
(29, '1', 1, 1, 0, 0, '1', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `medicina`
--
ALTER TABLE `medicina`
  ADD PRIMARY KEY (`id_Medicina`),
  ADD KEY `tipoMedicina` (`tipoMedicina`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicina`
--
ALTER TABLE `medicina`
  MODIFY `id_Medicina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicina`
--
ALTER TABLE `medicina`
  ADD CONSTRAINT `medicina_ibfk_1` FOREIGN KEY (`tipoMedicina`) REFERENCES `presentacion_medicina` (`id_Presentacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
