-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 08, 2018 at 06:13 AM
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
  `cantidadDePresentacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `notificaciones`
--

CREATE TABLE `notificaciones` (
  `id_Username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_Notificacion` int(11) NOT NULL,
  `confirmacion` tinyint(1) DEFAULT NULL,
  `horaEnviada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `contenido` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `paciente_cuidador`
--

CREATE TABLE `paciente_cuidador` (
  `id_Relacion` int(11) NOT NULL,
  `username_Cuidador` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username_Paciente` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `inicioRelacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `presentacion_medicina`
--

CREATE TABLE `presentacion_medicina` (
  `id_Presentacion` int(11) NOT NULL,
  `nombrePresentacion` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `forma` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `receta`
--

CREATE TABLE `receta` (
  `id_Receta` int(11) NOT NULL,
  `username_Paciente` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_Medicina` int(11) DEFAULT NULL,
  `cantidadConsumo` int(11) DEFAULT NULL,
  `tabletasConsumo` int(11) DEFAULT NULL,
  `frecuenciaHoraDosis` int(11) DEFAULT NULL,
  `diasDosis` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_completo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fecha_Nacimiento` date DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contrasenia` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pais` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `paciente` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


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
-- Indexes for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id_Notificacion`),
  ADD KEY `id_Username` (`id_Username`);

--
-- Indexes for table `paciente_cuidador`
--
ALTER TABLE `paciente_cuidador`
  ADD PRIMARY KEY (`id_Relacion`),
  ADD KEY `username_Paciente` (`username_Paciente`),
  ADD KEY `username_Cuidador` (`username_Cuidador`);

--
-- Indexes for table `presentacion_medicina`
--
ALTER TABLE `presentacion_medicina`
  ADD PRIMARY KEY (`id_Presentacion`);

--
-- Indexes for table `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`id_Receta`),
  ADD KEY `id_Medicina` (`id_Medicina`),
  ADD KEY `username_Paciente` (`username_Paciente`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `medicina`
--
ALTER TABLE `medicina`
  MODIFY `id_Medicina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id_Notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `presentacion_medicina`
--
ALTER TABLE `presentacion_medicina`
  MODIFY `id_Presentacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receta`
--
ALTER TABLE `receta`
  MODIFY `id_Receta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `medicina`
--
ALTER TABLE `medicina`
  ADD CONSTRAINT `medicina_ibfk_1` FOREIGN KEY (`tipoMedicina`) REFERENCES `presentacion_medicina` (`id_Presentacion`);

--
-- Constraints for table `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD CONSTRAINT `notificaciones_ibfk_1` FOREIGN KEY (`id_Username`) REFERENCES `user` (`username`);

--
-- Constraints for table `paciente_cuidador`
--
ALTER TABLE `paciente_cuidador`
  ADD CONSTRAINT `paciente_cuidador_ibfk_1` FOREIGN KEY (`username_Paciente`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `paciente_cuidador_ibfk_2` FOREIGN KEY (`username_Cuidador`) REFERENCES `user` (`username`);

--
-- Constraints for table `receta`
--
ALTER TABLE `receta`
  ADD CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`id_Medicina`) REFERENCES `medicina` (`id_Medicina`),
  ADD CONSTRAINT `receta_ibfk_2` FOREIGN KEY (`username_Paciente`) REFERENCES `user` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
