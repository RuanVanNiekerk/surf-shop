-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 28, 2021 at 05:45 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surf_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `user_id` int(11) NOT NULL,
  `address` varchar(244) NOT NULL,
  `country` varchar(244) NOT NULL,
  `state` varchar(244) NOT NULL,
  `zip` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`user_id`, `address`, `country`, `state`, `zip`) VALUES
(11, 'test', 'test', 'test', 1010);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `type` varchar(244) NOT NULL,
  `name` varchar(244) NOT NULL,
  `description` varchar(244) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `img_url` varchar(244) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `type`, `name`, `description`, `price`, `stock`, `img_url`) VALUES
(3, 'Shortboard', 'Highliner Surfboard 5\'5\" Print 2021', 'Twin Fin\r\nEpoxy\r\nAlton Logo On Front & Back Of Board\r\nSanded Finish\r\nFin + Fin Key Included', 390, 3, '3_6d825ae8-f896-4346-bdfa-050e5d54cc7b_1024x1024@2x.jpg'),
(4, 'Shortboard', 'Scrambler Surfboard 6\'0\" 2021', 'Thruster \r\nEpoxy\r\nJack\'s Logo On Front & Back Of Board\r\nSanded Finish\r\nFins + Fin Key Included ', 390, 7, '58_9f193b83-6d49-4ea6-96b6-899d47e65a6a_1024x1024@2x.jpg'),
(5, 'Shortboard', 'Dino Surfboard 4\'8\" 2021', 'Thruster\r\nEpoxy\r\nJack\'s Logo On Front & Back Of Board\r\nSanded Finish\r\nFin + Fin Key Included', 350, 2, '53_1024x1024@2x.jpg'),
(6, 'Shortboard', 'Nemo Surfboard 5\'10\" 2021', 'Twin Fin\r\nEpoxy\r\nAlton Logo On Front & Back Of Board\r\nSanded Finish\r\nFin + Fin Key Included', 390, 6, '43_1024x1024@2x.jpg'),
(7, 'Shortboard', 'Highliner Surfboard 5\'7\" Print 2021', 'Twin Fin\r\nEpoxy\r\nAlton Logo On Front & Back Of Board\r\nSanded Finish\r\nFins + Fin Key Included ', 390, 2, '45_1024x1024@2x.jpg'),
(8, 'Longboard', 'Nomad Surfboard 9\'6\" Print 2021', 'Single Fin Set Up \r\nEpoxy\r\nJack\'s Logo On Front & Back Of Board\r\nSanded Finish\r\nFins + Fin Key Included ', 465, 5, '99_1024x1024@2x.jpg'),
(9, 'Longboard', 'Nomad Surfboard 9\'2\" 2021', 'Single Fin Set Up \r\nEpoxy\r\nJack\'s Logo On Front & Back Of Board\r\nSanded Finish\r\nFins + Fin Key Included ', 450, 1, '97_1024x1024@2x.jpg'),
(10, 'Longboard', 'Nomad Surfboard 9\'6\" 2021', 'Single Fin Set Up \r\nEpoxy\r\nJack\'s Logo On Front & Back Of Board\r\nSanded Finish\r\nFins + Fin Key Included ', 470, 2, '72_1024x1024@2x.jpg'),
(11, 'Shortboard', 'Comet Surfboard 5\'8\" 2021', '5 Fin Set Up \r\nEpoxy\r\nJack\'s Logo On Front & Back Of Board\r\nSanded Finish\r\nFins + Fin Key Included ', 380, 2, '61_1024x1024@2x.jpg'),
(12, 'Shortboard', 'Starchief Surfboard 6\'6\" 2021', '2+1 Fin Set Up \r\nEpoxy\r\nJack\'s Logo On Front & Back Of Board\r\nSanded Finish\r\nFins + Fin Key Included ', 395, 3, '85_1024x1024@2x.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `query_id` int(11) NOT NULL,
  `name` varchar(244) NOT NULL,
  `email` varchar(244) NOT NULL,
  `subject` varchar(244) NOT NULL,
  `message` varchar(244) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(244) NOT NULL,
  `surname` varchar(244) NOT NULL,
  `email` varchar(244) NOT NULL,
  `password` varchar(244) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `surname`, `email`, `password`) VALUES
(11, 'Ruan', 'van Niekerk', 'ruanvanniekerk3@gmail.com', 'w'),
(12, 'steve', 'test', 'steve@test', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`query_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
