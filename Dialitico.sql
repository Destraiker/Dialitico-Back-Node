-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 27-Maio-2020 às 03:01
-- Versão do servidor: 10.1.38-MariaDB
-- versão do PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dialitico`
--
CREATE DATABASE IF NOT EXISTS `dialitico` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `dialitico`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `dados`
--

CREATE TABLE `dados` (
  `idDados` int(10) UNSIGNED NOT NULL,
  `Usuario_idUsuario` int(10) UNSIGNED NOT NULL,
  `Dreneagem_inicial` int(10) UNSIGNED DEFAULT NULL,
  `Dreneagem_final` int(10) UNSIGNED DEFAULT NULL,
  `Liquido` int(10) UNSIGNED DEFAULT NULL,
  `Data_2` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `dados`
--

INSERT INTO `dados` (`idDados`, `Usuario_idUsuario`, `Dreneagem_inicial`, `Dreneagem_final`, `Liquido`, `Data_2`) VALUES
(1, 2, 100, 100, 500, '2020-04-08'),
(2, 9, 200, 2000, 2000, '2020-01-12'),
(3, 11, 123, 123, 123, '2020-05-26'),
(4, 11, 435, 345, 345, '2020-05-25'),
(5, 11, 654, 34545, 345212, '2020-05-24'),
(6, 11, 234, 44, 123, '2020-05-23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `medico`
--

CREATE TABLE `medico` (
  `idMedico` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Crm` varchar(15) NOT NULL,
  `Login` varchar(255) NOT NULL,
  `Senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `medico`
--

INSERT INTO `medico` (`idMedico`, `Nome`, `Crm`, `Login`, `Senha`) VALUES
(2, 'Brener', '1234', 'Brener', '$2y$10$KdwnXd2TGbI0Q41PnlQRyOWNHgRb3esVmSze9kL.Ft3C156dm9rAe'),
(3, 'as', 'as', 'aas', '$2y$10$MfheLH1IKGV3AFd17YeDmuRQ9vqlLhEkFZ7R8SRZ1jBuoP5b7T6ei'),
(4, 'Teste', '24165456', 'teste', '$2y$10$xspCVeKJIC2YuYx4kODyjuEGeyqz528p5os07DDjk6XQxNqQ1V1Ia'),
(5, 'test', '236246267', 'login', '$2y$10$mZgjeAf8QsR/1T9WhGpwbOT0dVn0tsKEAD5y1MKo8ymu8PpB2a2Am'),
(6, 'João', '65965844', 'teste', '9bea29064125894f91274abb1527d868'),
(7, 'Brener', '4294967295', 'TESTE', '9bea29064125894f91274abb1527d868'),
(8, 'Brener Eduardo Rodrigues', 'teste', 't', '9bea29064125894f91274abb1527d868'),
(9, 'Festa', 'assa', 'te', '9bea29064125894f91274abb1527d868');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(10) UNSIGNED NOT NULL,
  `Medico_idMedico` int(10) UNSIGNED NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `CPF` int(10) UNSIGNED NOT NULL,
  `Senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Medico_idMedico`, `Nome`, `CPF`, `Senha`) VALUES
(2, 2, 'Brener Eduardo Rodrigues', 4294967295, '$2y$10$g48g.BX5miyxvnFMC5FNLutV1NDIOohTQ4yISQqek4EQa0MJSZLqy'),
(5, 2, 'Brener', 4294967295, '$2y$10$avPATNA6GEojDUTH7/LwH.JBIiqNFDB7So37/4hwwlwOQwBFVMyQK'),
(6, 2, 'João', 4294967295, '$2y$10$KXFrkbF2ZaHV6mbzfXmeIewmEt5c5OegNmNJPnuiKf8UIDjDNHe0W'),
(7, 2, 'João', 4294967295, '$2y$10$vrinlEUwfiLZWbFyeY3PteFzcsMkz8Rl/BWi9H4cuslJG8ZSgvkCK'),
(8, 2, 'João', 4294967295, '$2y$10$.pjdLYo3Cnzw5yjZjBONPuCfpf5R9sT0B0DJZWvJVcVVKa03pfO3K'),
(9, 2, 'João', 545454, '$2y$10$Bz3L1JBnOMiZ40ptB21zyO.rrpd6Z6xDSEkn/QVAuK/mzpziR8/2W'),
(10, 6, 'Brener', 4294967295, '9bea29064125894f91274abb1527d868'),
(11, 9, 'Otavi', 123456, '0b941b9120372867a292bf02e3ae3450'),
(12, 9, 'Ramon', 654321, '9bea29064125894f91274abb1527d868');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dados`
--
ALTER TABLE `dados`
  ADD PRIMARY KEY (`idDados`),
  ADD KEY `Usuario_idUsuario` (`Usuario_idUsuario`);

--
-- Indexes for table `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`idMedico`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD KEY `Usuario_FKIndex1` (`Medico_idMedico`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dados`
--
ALTER TABLE `dados`
  MODIFY `idDados` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `medico`
--
ALTER TABLE `medico`
  MODIFY `idMedico` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `dados`
--
ALTER TABLE `dados`
  ADD CONSTRAINT `dados_ibfk_1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`);

--
-- Limitadores para a tabela `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`Medico_idMedico`) REFERENCES `medico` (`idMedico`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
