-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2022 a las 20:09:27
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wulu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nombre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `favorites`
--

INSERT INTO `favorites` (`id`, `id_user`, `id_product`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorites_products`
--

CREATE TABLE `favorites_products` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorites_shop`
--

CREATE TABLE `favorites_shop` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_shop` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `id` int(11) NOT NULL,
  `detalles` varchar(500) NOT NULL,
  `precio` float NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `fecha_pago` datetime NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `fecha_pago`, `cantidad`, `plan_id`, `shop_id`) VALUES
(5, '2022-06-17 18:34:54', 2, 1, 4),
(7, '2022-06-17 18:34:54', 2, 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `precio` float NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `max_productos` int(11) NOT NULL,
  `max_imagenes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`id`, `nombre`, `precio`, `descripcion`, `tipo`, `max_productos`, `max_imagenes`) VALUES
(1, 'Estándar', 400, '', 'Mensual', 5, 3),
(2, 'Medium', 550, '', 'Mensual', 10, 5),
(3, 'Premium', 700, '', 'Mensual', 1000, 10),
(4, 'Estándar', 4080, '', 'Anual', 5, 3),
(5, 'Medium', 5610, '', 'Anual', 10, 5),
(6, 'Premium', 7140, '', 'Anual', 1000, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `titulo` varchar(45) NOT NULL,
  `precio` float NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `metodo_pago` varchar(45) NOT NULL,
  `devoluciones` tinyint(1) NOT NULL,
  `detalles` varchar(45) DEFAULT NULL,
  `shop_id` int(11) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `titulo`, `precio`, `descripcion`, `imagen`, `metodo_pago`, `devoluciones`, `detalles`, `shop_id`, `fecha_creacion`) VALUES
(1, 'Mate', 500, 'Mate personalizado ', '', 'transferencia', 1, '', 4, '2022-06-17 21:47:26'),
(3, 'titulo', 600, 'descxripcion', 'imagen', 'metodo_pago', 0, 'detalles', 4, '2022-06-20 11:41:04'),
(4, 'Taza', 600, 'descripcion', 'imagen', 'transferencia', 0, 'detalles', 4, '2022-06-20 11:46:23'),
(5, 'Taza', 600, 'descripcion', 'imagen', 'transferencia', 0, 'detalles', 4, '2022-06-20 11:47:15'),
(6, 'Taza', 600, 'descripcion', 'imagen', 'transferencia', 0, 'detalles', 4, '2022-06-20 11:47:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `nombre` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `nombre`) VALUES
(1, 'comprador'),
(2, 'vendedor');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale`
--

CREATE TABLE `sale` (
  `id` int(11) NOT NULL,
  `fecha_venta` date NOT NULL,
  `fecha_carga` datetime NOT NULL DEFAULT current_timestamp(),
  `cantidad` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sale`
--

INSERT INTO `sale` (`id`, `fecha_venta`, `fecha_carga`, `cantidad`, `product_id`) VALUES
(1, '2022-06-18', '2022-06-20 12:16:13', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shop`
--

CREATE TABLE `shop` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `rubro` varchar(45) DEFAULT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `telefono` int(15) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `contraseña` varchar(15) NOT NULL,
  `localidad` varchar(45) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `shop`
--

INSERT INTO `shop` (`id`, `nombre`, `rubro`, `descripcion`, `telefono`, `mail`, `contraseña`, `localidad`, `instagram`, `facebook`, `imagen`, `fecha_creacion`, `user_id`) VALUES
(4, 'nombre', 'rubro', 'descripcion', 1234567, 'mail@mail.com', '123456', 'localidad', 'insta', 'face', 'imagen', '2022-06-16 22:24:35', 2),
(5, 'nombre3', 'rubro3', 'descripcion3', 1234567, 'mai3l@mail.com', '', 'localidad', 'insta', 'face', 'imagen', '2022-06-17 15:30:31', 3),
(7, 'Taza', 'rubro', 'descripcion', 0, 'transferencia', '0', NULL, NULL, NULL, NULL, '2022-06-20 13:20:39', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `dni` int(9) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `telefono` int(15) NOT NULL,
  `mail` varchar(100) NOT NULL,
  `contraseña` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `dni`, `nombre`, `apellido`, `telefono`, `mail`, `contraseña`, `role_id`) VALUES
(1, 43665098, 'wulu', 'family', 1169158711, 'wulu@family.com', '12345678', 1),
(2, 46258, 'lucho', 'ferreiros', 1169158711, 'mail', '12345678', 2),
(3, 1234567, 'test', 'test', 12348765, 'test@user.com', '12345qwe', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `favorites_products`
--
ALTER TABLE `favorites_products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `favorites_shop`
--
ALTER TABLE `favorites_shop`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oferta_ibfk_1` (`product_id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pagos_ibfk_1` (`plan_id`),
  ADD KEY `pagos_ibfk_2` (`shop_id`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`shop_id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_ibfk_1` (`product_id`);

--
-- Indices de la tabla `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shop_ibfk_1` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_ibfk_1` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `favorites_products`
--
ALTER TABLE `favorites_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favorites_shop`
--
ALTER TABLE `favorites_shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `sale`
--
ALTER TABLE `sale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `shop`
--
ALTER TABLE `shop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`id`),
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`);

--
-- Filtros para la tabla `sale`
--
ALTER TABLE `sale`
  ADD CONSTRAINT `sale_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `shop`
--
ALTER TABLE `shop`
  ADD CONSTRAINT `shop_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
