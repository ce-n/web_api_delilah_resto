-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-04-2020 a las 00:40:24
-- Versión del servidor: 5.7.24
-- Versión de PHP: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `client_order`
--

DROP TABLE IF EXISTS `client_order`;
CREATE TABLE IF NOT EXISTS `client_order` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `hour` time(6) NOT NULL,
  `user_id` bigint(50) NOT NULL,
  `status_id` int(2) NOT NULL,
  `payment_id` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_client_order_state` (`status_id`),
  KEY `fk_client_order_user` (`user_id`),
  KEY `fk_client_order_payment_method` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `client_order`
--

INSERT INTO `client_order` (`id`, `hour`, `user_id`, `status_id`, `payment_id`) VALUES
(6, '18:21:14.000000', 6, 2, 3),
(10, '02:24:11.000000', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detail_order`
--

DROP TABLE IF EXISTS `detail_order`;
CREATE TABLE IF NOT EXISTS `detail_order` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `client_order_id` bigint(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detail_order_client_order` (`client_order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detail_order`
--

INSERT INTO `detail_order` (`id`, `client_order_id`) VALUES
(3, 6),
(33, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detail_per_product`
--

DROP TABLE IF EXISTS `detail_per_product`;
CREATE TABLE IF NOT EXISTS `detail_per_product` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(50) NOT NULL,
  `detail_order_id` bigint(50) NOT NULL,
  `number_of_unit` int(5) NOT NULL,
  `subtotal` int(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_detail_per_product_product` (`product_id`),
  KEY `fk_detail_per_product_detail_order` (`detail_order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `detail_per_product`
--

INSERT INTO `detail_per_product` (`id`, `product_id`, `detail_order_id`, `number_of_unit`, `subtotal`) VALUES
(36, 1, 3, 1, NULL),
(37, 5, 3, 1, NULL),
(38, 2, 33, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favourite`
--

DROP TABLE IF EXISTS `favourite`;
CREATE TABLE IF NOT EXISTS `favourite` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `product_id` bigint(50) NOT NULL,
  `user_id` bigint(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_favourite_user` (`user_id`),
  KEY `fk_favourite_product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `favourite`
--

INSERT INTO `favourite` (`id`, `product_id`, `user_id`) VALUES
(1, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_method`
--

DROP TABLE IF EXISTS `payment_method`;
CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `method` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `payment_method`
--

INSERT INTO `payment_method` (`id`, `method`) VALUES
(1, 'Débito'),
(2, 'Crédito'),
(3, 'Efectivo'),
(4, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `price_per_unit` int(5) NOT NULL,
  `image_url` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `price_per_unit`, `image_url`) VALUES
(1, 'Pizza Napolitana', 300, ''),
(2, 'Hamburguesa Completa', 250, ''),
(5, 'Coca-Cola 2 litros', 200, 'https://upload.wikimedia.org/wikipedia/commons/b/be/Bouteille_de_Coca-Cola_d%27un_litre_cinq_001.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `current_status` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `current_status`) VALUES
(1, 'Nuevo'),
(2, 'Confirmado'),
(3, 'Preparando'),
(4, 'Enviando'),
(5, 'Entregado'),
(6, 'Cancelado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `lastname` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `email` text COLLATE utf8_spanish_ci NOT NULL,
  `telephone` bigint(60) NOT NULL,
  `address` text COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `name`, `lastname`, `email`, `telephone`, `address`, `password`, `isAdmin`) VALUES
(1, 'Admin', 'Admin_User', 'user@email.com', 123456789, 'Calle, Barrio, Ciudad, País', 'w5HxfT5JxGUV9tnC', 1),
(5, 'John', 'Doe', 'joe-doe@gmail.com', 351123654, 'calle barrio, ciudad, país', 'pss_123456_qwqw3', 0),
(6, 'Joan', 'Pierce', 'jP@gmail.com', 698788797, '', 'pss_123_p569', 0);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `client_order`
--
ALTER TABLE `client_order`
  ADD CONSTRAINT `fk_client_order_payment_method` FOREIGN KEY (`payment_id`) REFERENCES `payment_method` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_client_order_state` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_client_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detail_order`
--
ALTER TABLE `detail_order`
  ADD CONSTRAINT `fk_detail_order_client_order` FOREIGN KEY (`client_order_id`) REFERENCES `client_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detail_per_product`
--
ALTER TABLE `detail_per_product`
  ADD CONSTRAINT `fk_detail_per_product_detail_order` FOREIGN KEY (`detail_order_id`) REFERENCES `detail_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detail_per_product_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favourite`
--
ALTER TABLE `favourite`
  ADD CONSTRAINT `fk_favourite_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_favourite_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
