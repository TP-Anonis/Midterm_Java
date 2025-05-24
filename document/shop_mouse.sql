-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 28, 2025 lúc 05:14 AM
-- Phiên bản máy phục vụ: 8.0.37
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `shop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `id` bigint NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`id`, `user_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint NOT NULL,
  `quantity` int NOT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`id`, `quantity`, `cart_id`, `product_id`) VALUES
(4, 16, 2, 4),
(7, 2, 2, 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `id` bigint NOT NULL,
  `url` varchar(255) NOT NULL,
  `product_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`id`, `url`, `product_id`) VALUES
(104, '364c7e98-123b-4c49-bf4a-868532503f0a_dell-xps-14-9440-1 (1).jpg', 1),
(105, '5a753085-7a64-42fc-b542-23cae84db681_dell-xps-14-9440-7-300x300.jpg', 1),
(106, '47bff80e-a7c0-46d1-9ac9-14835e8f36e3_dell-xps-14-9440-6-300x300.jpg', 1),
(107, '1fbaff86-9583-495c-8518-603ef577d243_dell-xps-14-9440-4-300x300.jpg', 1),
(108, '4e54c7f4-8561-427b-9cea-6230d2259ca7_dell-xps-14-9440-9-300x300.jpg', 1),
(109, '01a1df7f-3afb-4b7d-a244-16d950a953cb_dell-xps-14-9440-8-300x300.jpg', 1),
(110, '1e2fdf1c-ad51-42de-976d-7adcc5a522f4_dell-xps-14-9440-5-300x300.jpg', 1),
(111, '18fa9965-c63e-4179-90e3-04adab45d765_dell-xps-14-9440-1.jpg', 1),
(112, '20e39675-11df-40eb-bf58-738bec625029_48647_laptop_dell_xps_13_9340_71034922__2_.jpg', 3),
(113, '35a15eb7-fb93-4773-8e0c-3c859a564c71_48647_laptop_dell_xps_13_9340_71034922__1_.jpg', 3),
(114, '20a54f3a-c4b5-45a8-bc2f-644a0ccb2a41_48647_laptop_dell_xps_13_9340_71034922__3_.jpg', 3),
(115, '8f3f598b-4c81-41b1-b79d-acb4e862a8b3_48647_laptop_dell_xps_13_9340_71034922__4_.jpg', 3),
(122, '9cfc7f95-813a-4f1a-b9f5-c1ac01698d9c_1.jpg', 4),
(123, '578b8fb0-c72f-4243-903f-ab83e59a24da_3.jpg', 4),
(124, '8c5e4463-6fde-4819-b8f2-c2fb7e4d4413_2.jpg', 4),
(125, '78f96a28-bb0c-402c-9816-ba353ff17f97_mb (3).webp', 5),
(126, 'cf801691-bd53-482b-9c11-f4f0a7903924_mb (1).webp', 5),
(127, 'a07e4fc7-da3f-4f22-a4e3-6b6786b6c657_mb (4).webp', 5),
(128, 'f5d4db33-272d-4564-9475-cc4316eb923c_mb (2).webp', 5),
(129, '7c3af293-e9ff-4b9b-a565-2bb91c1655df_2021_asus (2).webp', 6),
(130, 'b3f7cfd0-af83-4843-9042-9ab8348790c0_2021_asus (4).webp', 6),
(131, '1d3c0743-0373-4173-86b2-f207d289ead5_2021_asus (1).webp', 6),
(132, 'f9952edf-9688-41b9-8d97-781eece858ad_2021_asus (5).webp', 6),
(133, '3bcbcf7b-1a23-4139-a5a1-e55d7452df7f_2021_asus (3).webp', 6),
(134, '374e5961-f893-435c-abe1-c1550f0cf7f3_00910139_asus_gaming_vivobook (1).webp', 7),
(135, '05051e07-78e8-4dbf-a365-77e8ff0b1943_00910139_asus_gaming_vivobook (4).webp', 7),
(136, '37f87169-a516-418d-9d16-c0700a786b2b_00910139_asus_gaming_vivobook (2).webp', 7),
(137, 'd824238d-464d-4209-912d-24adc1290341_00910139_asus_gaming_vivobook (3).webp', 7),
(138, '87498a5a-d269-4d9f-a08b-f4d23ef353b2_00910139_asus_gaming_vivobook (6).webp', 7),
(139, 'eef5260b-d5ec-4306-8d28-822a198e1886_00910139_asus_gaming_vivobook (7).webp', 7),
(140, 'edfc156c-4603-44f1-bcc5-04ca7b7d5737_00910139_asus_gaming_vivobook (5).webp', 7),
(141, '16d9d03d-d767-4dd5-80e6-e4fa56642172_00910139_asus_gaming_vivobook (8).webp', 7),
(142, '78f9e42c-1d10-4a75-82ab-b4628d3a2b08_acer-aspire-3-a315-58-bac-6 (3).webp', 8),
(143, '5ceb3bd3-f5fb-4c5f-834e-fc0995a7b5a3_acer-aspire-3-a315-58-bac-6 (2).webp', 8),
(144, '47348539-6ad2-4881-9341-61e12b283604_acer-aspire-3-a315-58-bac-6 (5).webp', 8),
(145, 'b2443c4f-ba0e-4c97-af8c-a3e39ecbfbdb_acer-aspire-3-a315-58-bac-6 (1).webp', 8),
(146, 'bb8e3bbe-5b0e-4708-bdb9-e7368cc23081_acer-aspire-3-a315-58-bac-6 (4).webp', 8),
(149, '50fe2b52-9fa7-4cfb-b019-d6e33a6b1fa7_acer_aspire_lite_16 (1).webp', 9),
(150, '8e144faa-8204-4d68-9ea0-28be94697f8c_acer_aspire_lite_16 (6).webp', 9),
(151, 'f79a4b47-1057-461c-a10c-f81ad43f1f84_acer_aspire_lite_16 (2).webp', 9),
(152, '044a3743-bd83-4ed2-b5cb-8b7e1cd117e3_acer_aspire_lite_16 (4).webp', 9),
(153, 'bd080e10-5d5b-465d-9fd8-8037eed60726_acer_aspire_lite_16 (5).webp', 9),
(154, '785f9f13-6be1-4015-a0e6-ee16247cee8d_acer_aspire_lite_16 (3).webp', 9),
(155, 'd3c6c338-5e0b-4dbc-b87c-d2a7b18aa63c_2021_2_25_637498460857867432_acer-aspire-a514-54-bac-2.webp', 10),
(156, '28b094e9-8f88-4d52-8115-49af62c55210_2021_2_25_637498460858492771_acer-aspire-a514-54-bac-1.webp', 10),
(157, '4e5d3239-fd85-4518-b7ba-751a12e9e648_2021_2_25_637498460857867432_acer-aspire-a514-54-bac-3.webp', 10),
(158, 'ce6e7884-a64e-4a77-b35d-2e61fae7b54b_2021_2_25_637498460857711080_acer-aspire-a514-54-bac-5.webp', 10),
(159, '3c4da741-b670-4b51-99bf-3ddbf15900fd_2021_2_25_637498460858023418_acer-aspire-a514-54-bac-4.webp', 10),
(160, '01be4770-bae0-46f6-8b5e-b3248d8e0771_2021_2_25_637498460857867432_acer-aspire-a514-54-bac-6.webp', 10),
(161, 'd363aed2-56a1-46fb-bb50-4b62988f5bdf_2023_6_6_638216639883377102_acer-aspire-7-gaming-a715-76-den-1.webp', 11),
(162, '52751276-9505-404d-82f7-b5626d1190b7_2023_6_6_638216639883377102_acer-aspire-7-gaming-a715-76-den-4.webp', 11),
(163, 'dd18f228-0aea-4abb-bb10-8a18250af745_2023_6_6_638216639883220374_acer-aspire-7-gaming-a715-76-den-5.webp', 11),
(164, '37bb34fe-85dc-4f06-9661-7c6e5de8db6f_2023_6_6_638216639883220374_acer-aspire-7-gaming-a715-76-den-3.webp', 11),
(165, '1401d0ff-d3b5-4c26-979a-7e354baa810f_2023_6_6_638216639885189307_acer-aspire-7-gaming-a715-76-den-2.webp', 11),
(166, 'f598abf1-24a3-4621-95f9-3360172092b0_2022_6_17_637910540776035895_lenovo-thinkpad-p14s-g2-t-i5-1135g7-den-1.webp', 12),
(167, 'b401d680-c9a8-472f-bc43-939f3804fea3_2022_6_17_637910540775879833_lenovo-thinkpad-p14s-g2-t-i5-1135g7-den-2.webp', 12),
(168, '7f647d70-14db-46f9-b39b-456b73415150_2022_6_17_637910540776035895_lenovo-thinkpad-p14s-g2-t-i5-1135g7-den-3.webp', 12),
(169, '1a07d93a-5f33-4241-8a06-c73114c68dc4_2022_6_17_637910540775254911_lenovo-thinkpad-p14s-g2-t-i5-1135g7-den-6.webp', 12),
(170, 'c496cc86-e3e0-4afe-b068-c0fff57f75fc_2022_6_17_637910540775410899_lenovo-thinkpad-p14s-g2-t-i5-1135g7-den-5.webp', 12),
(171, 'd4d8b0e6-0b6f-44e2-ad52-1f4c3c7bd7c6_2022_6_17_637910540776035895_lenovo-thinkpad-p14s-g2-t-i5-1135g7-den-4.webp', 12),
(172, '7c5e99d2-1b91-4636-891d-c5aeccaec88a_2024_3_12_638458541226535168_lenovo-gaming-legion-pro-5-16irx9-i9-14900hx-1.webp', 13),
(173, '6172fc48-e44c-41a3-9fd0-5043926fe80c_2024_3_12_638458541226378868_lenovo-gaming-legion-pro-5-16irx9-i9-14900hx-2.webp', 13),
(174, '5d5bc6dc-5c4c-4963-9e73-0d0433954a1e_2024_3_12_638458541226847586_lenovo-gaming-legion-pro-5-16irx9-i9-14900hx-3.webp', 13),
(175, '6a2f7e74-e9c0-444c-a2e2-3bbb2e27a384_2024_3_12_638458541226378868_lenovo-gaming-legion-pro-5-16irx9-i9-14900hx-5.webp', 13),
(176, 'bb69b432-3027-4f05-9641-a871507ad9ad_2024_3_12_638458541225129034_lenovo-gaming-legion-pro-5-16irx9-i9-14900hx-4.webp', 13),
(177, 'c9228441-04ba-422d-bc2b-8a985deceb31_2024_2_21_638441314995029656_lenovo-gaming-legion-5-16irx9-i7-14650hx-2.webp', 14),
(178, 'c2924b43-1116-44c2-8b59-72f8f7aec85c_2024_2_21_638441314993936001_lenovo-gaming-legion-5-16irx9-i7-14650hx-5.webp', 14),
(179, 'a6eb8422-a651-4394-955d-dcc425cd4628_2024_2_21_638441314994717191_lenovo-gaming-legion-5-16irx9-i7-14650hx-4.webp', 14),
(180, '6167ad41-97ea-4365-9d00-3e9773ee30d7_2024_2_21_638441314994717191_lenovo-gaming-legion-5-16irx9-i7-14650hx-3.webp', 14),
(181, 'dfcaaea2-67fa-4ec2-88c0-79c79a9935bc_2024_2_21_638441314994560921_lenovo-gaming-legion-5-16irx9-i7-14650hx-1.webp', 14),
(190, 'cd19b39a-c828-45f3-a76a-4ea81497b00b_lenovo_legion_7_16irx9_glacier_white_1_058a8dd72a.webp', 15),
(191, '9df8cbee-44bb-4487-aaea-9398bb56f6b8_lenovo_legion_7_16irx9_glacier_white_7_4361d54b03.webp', 15),
(192, '2aba7346-db88-4b34-b318-d47498057fa3_lenovo_legion_7_16irx9_glacier_white_2_20cd7c19de.webp', 15),
(193, 'a51c52c6-fc3f-4338-9142-f8aa1c105f1c_lenovo_legion_7_16irx9_glacier_white_8_36fd22989d.webp', 15),
(194, '36e51aaf-7add-4b10-9096-c915eda543b3_lenovo_legion_7_16irx9_glacier_white_6_8003a46721.webp', 15),
(195, 'b8dfa461-33e8-4125-b299-cfdf6159adaf_lenovo_legion_7_16irx9_glacier_white_5_734452b206.webp', 15),
(196, 'e9886718-5d9e-4fe4-b09f-79ec211a983d_lenovo_legion_7_16irx9_glacier_white_3_f3a8c420a7.webp', 15),
(197, '2440cb1a-8c0c-4e40-94f6-cfa00b071098_lenovo_legion_7_16irx9_glacier_white_4_42530594c9.webp', 15),
(198, '9aa21668-3da9-4e37-a251-8813058fe701_hp_envy_x360_14_silver_1_2084f8665b.webp', 16),
(199, '7f18e8af-2d44-4abd-9278-8f0dfd635e34_hp_envy_x360_14_silver_2_caaea7f6bd.webp', 16),
(200, '413e751e-f07e-4f7a-88ba-57a77f7d939a_hp_envy_x360_14_silver_5_821af51e13.webp', 16),
(201, '6b6bb223-2e0d-4438-a6fe-411a41a2497d_hp_envy_x360_14_silver_3_4265e630f8.webp', 16),
(202, '07ce15e4-d7d4-488a-8e87-374534091a2a_hp_envy_x360_14_silver_6_9db9b52576.webp', 16),
(203, '4d86f7e7-de89-47c3-b5c3-f6ef968dd065_hp_envy_x360_14_silver_4_be0e58e7d5.webp', 16),
(204, 'd95c363a-5e31-4c38-bc2b-5c5ed3539eb0_46984_laptop_dell_mobile_precision_workstation_5680_71023332__1_.jpg', 17),
(205, 'a92029d8-32a1-4fa0-aec4-6cbcfa842f62_46984_laptop_dell_mobile_precision_workstation_5680_71023332__2_.jpg', 17),
(206, 'e7ae274e-aafc-417d-9fae-5b37402f6abe_46984_laptop_dell_mobile_precision_workstation_5680_71023332__5_.jpg', 17),
(207, '24cdd88e-d773-49e3-99df-d768e46ae869_46984_laptop_dell_mobile_precision_workstation_5680_71023332__3_.jpg', 17),
(208, '1682a820-7892-4165-9d1b-2ede36dff789_46984_laptop_dell_mobile_precision_workstation_5680_71023332__4_.jpg', 17),
(215, '07c2d78b-f7a1-4532-adac-f1d8c37d42a9_lenovo_ideapad_slim_3_14irh10_luna_grey_1_b3e26f1c73.webp', 19),
(216, '60394c9f-5461-4e59-ad4c-8228023b8267_lenovo_ideapad_slim_3_14irh10_luna_grey_5_4d705d55d2.webp', 19),
(217, '55969c69-8dbc-433b-b739-3aeada0c6e05_lenovo_ideapad_slim_3_14irh10_luna_grey_6_428e468cd4.webp', 19),
(218, '2f4f07cb-a79b-493d-bad6-474654243109_lenovo_ideapad_slim_3_14irh10_luna_grey_4_ed276567f7.webp', 19),
(219, 'c70075db-16ac-4cc6-b421-d097c03cd0dd_lenovo_ideapad_slim_3_14irh10_luna_grey_3_67e9dc235f.webp', 19),
(220, 'c7fe8fcc-459e-4da1-b5ee-017ba6b0c5fd_lenovo_ideapad_slim_3_14irh10_luna_grey_2_c5b8db177c.webp', 19),
(221, 'abe57744-5024-4530-b52f-52fe5fc37bda_51948_laptop_lenovo_yoga_slim_9_14ill10_83cx001avn__2_.jpg', 20),
(222, 'd2543393-3737-43d8-97b5-262fbd7bce01_51948_laptop_lenovo_yoga_slim_9_14ill10_83cx001avn__3_.jpg', 20),
(223, '0dca5e4e-f1e5-4f39-b2fc-f2cce3dc7dc6_51948_laptop_lenovo_yoga_slim_9_14ill10_83cx001avn__1_.jpg', 20),
(224, '43e278c4-ce88-49ad-a3a7-f206272f608d_51948_laptop_lenovo_yoga_slim_9_14ill10_83cx001avn__5_.jpg', 20),
(225, '5186fc16-2b7a-4a52-99e4-c45fcd18f0e3_51948_laptop_lenovo_yoga_slim_9_14ill10_83cx001avn__4_.jpg', 20),
(226, 'a337c726-1b9d-4897-9fc3-c48fa225e685_51571_laptop_msi_prestige_14_ai_evo_c1mg_081vn__4_.jpg', 21),
(227, '94151dbb-894e-4972-abe0-a5afafcdf208_51571_laptop_msi_prestige_14_ai_evo_c1mg_081vn__3_.jpg', 21),
(228, '8e1f6f74-c8e3-4474-8590-691d7fff9efd_51571_laptop_msi_prestige_14_ai_evo_c1mg_081vn__1_.jpg', 21),
(229, 'e0e674b1-d1bd-4992-ae4a-c52a55bfc686_51571_laptop_msi_prestige_14_ai_evo_c1mg_081vn__2_.jpg', 21),
(230, 'f9b75fe8-ea5a-4af7-ad5f-3e445b9e2a4b_Surface-Laptop-7.15.jpg', 22),
(231, '32a34f7b-a583-4662-aa57-d438944f1874_Surface-Laptop-7.12.webp', 22),
(232, '05c2516c-02d6-4150-b5d9-0c4851d26467_Surface-Laptop-7.2.webp', 22),
(233, 'fb501168-5ea4-4377-8e26-6a30574fcdaa_Surface-Laptop-7.4.webp', 22),
(234, '5ec5f01b-1f4f-4ae8-a928-c912de6528f7_Surface-Laptop-7.17.jpg', 22),
(235, 'a2ecd937-1aad-426f-9afe-ae6ee85df2fd_Surface-Laptop-7.9.webp', 22),
(242, '3afd2850-5e4f-4370-8831-97960f8d5b37_razer-blade-16-2025-1743059429.png', 31),
(243, '6efb766c-8aa6-4c20-8fef-a11c62ef34a0_razer-blade-16-2025-2-1743059429.png', 31);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` bigint NOT NULL,
  `order_date` datetime(6) NOT NULL,
  `receiver_phone` varchar(255) NOT NULL,
  `shipping_address` varchar(255) NOT NULL,
  `status` tinyint NOT NULL,
  `user_id` bigint NOT NULL,
  `total_amount` decimal(38,2) NOT NULL,
  `receiver_name` varchar(255) NOT NULL
) ;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `order_date`, `receiver_phone`, `shipping_address`, `status`, `user_id`, `total_amount`, `receiver_name`) VALUES
(1, '2025-04-24 12:14:19.970600', '0987654321', '123 Đường Láng, Hà Nội', 1, 1, 343548750.00, 'Nguyễn Văn A'),
(2, '2025-04-24 22:22:48.035257', '0987654321', '123 Đường Láng, Hà Nội', 0, 1, 302470000.00, 'Nguyễn Văn A'),
(3, '2025-04-27 22:06:08.771320', '0987999999', 'Quận 7, TP Hồ Chí Minh', 4, 1, 632770000.00, 'Nguyễn Văn A'),
(4, '2025-04-28 03:04:18.069511', '0987999999', 'Quận 7, TP Hồ Chí Minh', 0, 1, 632770000.00, 'Le Van A'),
(5, '2025-04-28 03:04:27.784365', '0987999999', 'Quận 7, TP Hồ Chí Minh', 0, 1, 632770000.00, 'Le Van A'),
(6, '2025-04-28 03:08:23.897572', '0987999999', 'Quận 7, TP Hồ Chí Minh', 0, 1, 632770000.00, 'Le Van A');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`id`, `price`, `quantity`, `order_id`, `product_id`) VALUES
(1, 24999750.00, 5, 1, 1),
(2, 9625000.00, 2, 1, 3),
(3, 3925000.00, 4, 1, 4),
(4, 16600000.00, 6, 1, 10),
(5, 19525000.00, 2, 1, 7),
(6, 22475000.00, 2, 1, 8),
(7, 12990000.00, 3, 2, 1),
(8, 9625000.00, 2, 2, 3),
(9, 3925000.00, 4, 2, 4),
(10, 16600000.00, 6, 2, 10),
(11, 19525000.00, 2, 2, 7),
(12, 22475000.00, 4, 2, 8),
(13, 76990000.00, 3, 3, 1),
(14, 50990000.00, 2, 3, 3),
(15, 27490000.00, 4, 3, 4),
(16, 12990000.00, 6, 3, 10),
(17, 16990000.00, 2, 3, 7),
(18, 12990000.00, 6, 3, 8),
(19, 76990000.00, 3, 4, 1),
(20, 50990000.00, 2, 4, 3),
(21, 27490000.00, 4, 4, 4),
(22, 12990000.00, 6, 4, 10),
(23, 16990000.00, 2, 4, 7),
(24, 12990000.00, 6, 4, 8),
(25, 76990000.00, 3, 5, 1),
(26, 50990000.00, 2, 5, 3),
(27, 27490000.00, 4, 5, 4),
(28, 12990000.00, 6, 5, 10),
(29, 16990000.00, 2, 5, 7),
(30, 12990000.00, 6, 5, 8),
(31, 76990000.00, 3, 6, 1),
(32, 50990000.00, 2, 6, 3),
(33, 27490000.00, 4, 6, 4),
(34, 12990000.00, 6, 6, 10),
(35, 16990000.00, 2, 6, 7),
(36, 12990000.00, 6, 6, 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `id` bigint NOT NULL,
  `expiration_time` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`id`, `expiration_time`, `token`, `user_id`) VALUES
(2, '2025-04-24 22:32:42.733977', '22459', 53),
(4, '2025-04-26 08:27:36.892362', '19387', 53);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint NOT NULL,
  `brand` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `detailed_description` text,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `short_description` varchar(255) DEFAULT NULL,
  `sold_quantity` bigint NOT NULL DEFAULT '0',
  `updated_at` datetime(6) DEFAULT NULL,
  `views` bigint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `brand`, `category`, `created_at`, `detailed_description`, `name`, `price`, `short_description`, `sold_quantity`, `updated_at`, `views`) VALUES
(1, 'Dell', 'Mỏng nhẹ', '2025-04-24 04:42:46.533878', 'Mang trong mình DNA của dòng laptop flagship, Dell XPS 14 9440 U7 155H là tuyên ngôn phong cách của giới doanh nhân thành đạt. Với thiết kế tinh xảo tối giản, màn hình 3K sắc nét, bộ vi xử lý Intel Core Ultra 7 155H kết hợp cùng RTX 4050, đây chính là sản phẩm tối ưu cho những ai kiếm tìm một thiết bị làm việc vừa sang trọng, vừa mạnh mẽ.\nToát lên đẳng cấp qua phong cách tối giản\nNgay từ cái nhìn đầu tiên, Dell XPS 14 9440 U7 155H 71054773 đã tạo ấn tượng mạnh mẽ với thiết kế tối giản, thanh thoát, đậm chất doanh nhân. Sự liền mạch trong ngôn ngữ thiết kế, từ khung vỏ nhôm nguyên khối được cắt CNC, cho đến viền màn hình siêu mỏng, tất cả đều thể hiện sự đầu tư tỉ mỉ của Dell vào từng chi tiết.\n\nCảm giác cao cấp và chắc chắn là điều bạn có thể nhận thấy ngay khi cầm thiết bị trên tay. Bản lề vững vàng, mặt kính cường lực Gorilla Glass 3 bảo vệ màn hình khỏi va đập mang lại sự bền bỉ và sang trọng. Ngoài tính thẩm mỹ, XPS 14 9440 còn siêu nhẹ và cơ động, giúp bạn dễ dàng mang theo mọi lúc mọi nơi mà không cảm thấy nặng nề.\n\nBàn phím tối tân, hàng phím chức năng cảm ứng\nYếu tố tạo nên sự khác biệt lớn trong thiết kế của XPS 14 9440 nằm ở hệ thống bàn phím tràn viền với hành trình phím được tối ưu nhằm mang lại cảm giác gõ êm ái và chính xác. Tiết diện mặt phím lớn giúp hạn chế gõ nhầm phím ngay cả khi soạn thảo văn bản tốc độ cao.\n\nIntel Core Ultra 7 155H với nguồn sức mạnh ấn tượng\nẨn trong ngoại hình tinh tế là hiệu năng vượt ngoài mong đợi với chip Intel Core Ultra 7 155H 16 nhân, 22 luồng, tốc độ tối đa 4.8GHz. Nhờ công nghệ AI Engine, vi xử lý này có thể học hỏi và tối ưu hiệu suất dựa trên thói quen sử dụng của bạn, giúp tăng tốc xử lý tác vụ nặng, từ chỉnh sửa video, thiết kế đồ họa đến lập trình.\n\nRTX 4050: Lựa chọn lý tưởng cho gaming và sáng tạo\nNgoài sự mạnh mẽ của CPU, Dell XPS 14 9440 U7 155H 71054773 còn ghi điểm mạnh khi sở hữu card đồ họa GeForce RTX 4050 6GB VRAM mang lại hiệu năng đẳng cấp studio. RTX 4050 được trang bị Real-time Ray Tracing, giúp mô phỏng ánh sáng chân thực, mang lại trải nghiệm đồ họa tuyệt vời cho trải nghiệm game và sáng tạo nội dung chuyên nghiệp. Công nghệ DLSS 3.0 hỗ trợ bởi AI giúp nâng cao tốc độ khung hình mà vẫn duy trì chất lượng hình ảnh sắc nét.', 'Laptop Dell XPS 14 9440', 76990000.00, 'Ultra7 155H /64GB/1TB/14.5\" 3.2K OLED Touch/Nvidia GeForce RTX4050 6GB/Win11/Office HS24/OS365', 14, '2025-04-28 03:08:23.925781', 50),
(3, 'Dell', 'Mỏng nhẹ', '2025-04-24 04:42:46.556372', 'Mỏng nhẹ, đẳng cấp và mạnh mẽ, Dell XPS 13 9340 là mẫu laptop flagship đột phá trong phân khúc multimedia và ultrabook. Với hiệu suất tối ưu từ Intel Core Ultra 5-125H, màn hình QHD+ cảm ứng và card đồ họa Intel Arc thế hệ mới, sản phẩm hứa hẹn cung cấp sự trợ giúp chuyên nghiệp tối đa.\n\nThiết kế độc bản, tối giản mà đầy lôi cuốn\nSo với các phiên bản tiền nhiệm, Dell XPS 13 9340 cho thấy sự kế thừa trong ngôn ngữ thiết kế khi đề cao tính tối giản đặc trưng của dòng XPS. Phần bàn phím và mặt cảm ứng được gia công phẳng hoàn toàn, tạo cảm giác liền mạch, hiện đại và thêm phần sang trọng. Chạm vào bất cứ điểm nào trên chiếc ultrabook, bạn lập tức cảm nhận được đẳng cấp mà ít mẫu laptop nào sánh bằng.\n\nMàn hình QHD+ đáp ứng chuẩn màu khắt khe\nDell XPS 13 9340 sở hữu màn hình OLED cảm ứng 13.4 inch với độ phân giải QHD+ (2560 x 1600 pixels), cung cấp chất lượng hiển thị sắc nét với các gam màu sâu và độ tương phản cao. Các công nghệ như Anti-Reflect cùng EyeSafe từ Dell cũng hỗ trợ rất tốt cho những người làm việc văn phòng, phải sử dụng laptop nhiều giờ mỗi ngày, giúp bảo vệ mắt hiệu quả hơn.\n\nTrang bị phím cảm ứng và touchpad đột phá\nKhác với các dòng laptop truyền thống, Dell XPS 13 9340 đã loại bỏ hàng phím chức năng F và thay thế bằng dãy phím cảm ứng, tạo nên thiết kế hiện đại, liền mạch và tối giản. Các phím bấm bên dưới có kích thước lớn, độ nảy tốt, giúp soạn thảo văn bản nhanh chóng và thoải mái.', 'Laptop Dell XPS 13 9340 Ultra5', 50990000.00, '125H/AI/16GB/1TB/13.4\" QHD+/Win11/Office HS24/OS365', 52, '2025-04-28 03:08:23.925781', 10),
(4, 'Apple', 'Doanh nhân', '2025-04-24 04:42:46.562551', 'MacBook Air M2 2023 giờ đây sẽ mở ra trải nghiệm hình ảnh rộng lớn hơn khi gia tăng kích cỡ màn hình Liquid Retina lên ngưỡng 15 inch ấn tượng. Độ tương thích tuyệt đối giữa chip M2 và nền tảng macOS đem lại trải nghiệm mượt mà và chuyên nghiệp nhất, giúp phản hồi cực nhanh mọi tác vụ của bạn.\nBền bỉ, tinh xảo với độ hoàn thiện ấn tượng\nPhát huy truyền thống mỏng nhẹ vốn có của dòng MacBook Air, phiên bản MacBook Air M2 2023 dù mở rộng màn hình lên mức 15 inch nhưng vẫn đảm bảo độ tinh xảo và cao cấp. Từng chi tiết, từng góc cạnh trên thiết bị đều được trau chuốt tỉ mỉ và chế tác từ chất liệu nhôm tái chế bền bỉ mà thân thiện với môi trường. Đặc biệt, sản phẩm có cấu trúc hoạt động không quạt gió, duy trì độ êm ái khi vận hành ngay cả khi chạy tác vụ nặng với khối lượng lớn.\nBốn lựa chọn màu sắc cao cấp và sang trọng\nMacBook Air M2 15 inch đem đến cho bạn bốn lựa chọn về màu sắc sang trọng, bao gồm: Đen, Vàng, Xám và Bạc. Tất cả các tùy chọn này đều được tinh chỉnh nhằm phát huy tối đa vẻ cao cấp và lịch thiệp mà sản phẩm hướng tới, cực kỳ phù hợp với giới văn phòng, doanh nhân. Với mỗi màu sắc, Apple lại trang bị sẵn một bộ cáp sạc MagSafe cùng tone màu trong hộp đựng sản phẩm.', 'MacBook Air 15 inch M2 2023', 27490000.00, 'Apple M28CPU 10GPU 8GB/256GB', 110, '2025-04-28 03:08:23.925781', 588),
(5, 'Apple', 'Sinh viên - Văn phòng', '2025-04-24 04:42:46.567756', 'Chiếc MacBook Air có hiệu năng đột phá nhất từ trước đến nay đã xuất hiện. Bộ vi xử lý Apple M1 hoàn toàn mới đưa sức mạnh của MacBook Air M1 13 inch 2020 vượt xa khỏi mong đợi người dùng, có thể chạy được những tác vụ nặng và thời lượng pin đáng kinh ngạc.\n\nLần đầu tiên Apple sử dụng con chip do chính mình sản xuất cho dòng máy Macbook. Bộ vi xử lý Apple M1 với 16 tỉ bóng bán dẫn, bao gồm 8 nhân cực mạnh, trong đó có 4 nhân hiệu năng cao và 4 nhân tiết kiệm điện, mang đến cho MacBook Air M1 tốc độ xử lý tuyệt vời, đồng thời kéo dài thời lượng pin. Nhờ vậy MacBook Air M1 2020 có hiệu suất nhanh gấp 3,5 lần thế hệ cũ, cho bạn làm việc với cả những công việc chuyên nghiệp, những tác vụ nặng mà không thể chạy được trên MacBook Air trước đây.\nKhả năng xử lý đồ họa đỉnh cao\nMacBook Air M1 13 inch 2020 có khả năng đồ họa khó tin trên một chiếc laptop siêu nhỏ gọn. GPU tích hợp trên Apple M1 có tới 8 nhân và là GPU tích hợp mạnh nhất thế giới laptop hiện nay. So với thế hệ trước, MacBook Air M1 2020 có khả năng xử lý đồ họa mạnh gấp 5 lần. Giờ đây ngay trên chiếc MacBook Air cực kỳ di động, bạn đã có thể xem và chỉnh sửa video 4K mượt mà, thậm chí là chơi game cũng như chạy các tác vụ đồ họa chuyên sâu.', 'MacBook Air 13 inch M1 2020', 16990000.00, 'Apple M1 8CPU 7GPU 8GB/256GB', 56, '2025-04-27 09:36:25.881704', 261),
(6, 'ASUS', 'Gaming - Đồ họa', '2025-04-24 04:42:46.574758', 'Sở hữu sức mạnh phần cứng ấn tượng và thiết kế chuẩn gaming, Asus TUF FA506NCR-HN047W mang lại trải nghiệm chơi game mượt mà, tốc độ cùng năng lực đa nhiệm ấn tượng. Sản phẩm được tích hợp chip AMD Ryzen 7 7435HS mạnh mẽ, card đồ họa RTX 3050 và màn hình 144Hz.\nAMD Ryzen 7 7435HS với sức mạnh ấn tượng\nQuyết định sức mạnh hiệu năng của Asus TUF FA506NCR-HN047W là chip AMD Ryzen 7 7435HS với 8 nhân, 16 luồng, tốc độ tối đa lên đến 4.55GHz. Bộ vi xử lý cung cấp hiệu năng mạnh mẽ cho các tựa game AAA, đồng thời đảm bảo khả năng đa nhiệm xuất sắc, giúp bạn dễ dàng chuyển đổi giữa các phần mềm mà không gặp tình trạng giật lag.\nChinh phục mọi tựa game với RTX 3050\nVề hiệu suất đồ họa, Asus TUF FA506NCR-HN047W sở hữu card đồ họa NVIDIA GeForce RTX 3050 4GB – dòng GPU tầm trung cung cấp trải nghiệm gaming chân thực với công nghệ Ray Tracing thời gian thực. Bạn sẽ được tận hưởng các hiệu ứng ánh sáng, đổ bóng, phản chiếu sắc nét, giúp thế giới game sống động không kém gì những bộ phim bom tấn.', 'Laptop Asus TUF Gaming A15 FA506NCR-HN047W', 19490000.00, '7435HS/16GB/512GB/15.6\" 144Hz/Nvidia GeForce RTX3050 4GB/Win 11', 53, '2025-04-27 09:38:13.553266', 3),
(7, 'ASUS', 'Gaming - Đồ họa', '2025-04-24 04:42:46.585263', 'Giải pháp tuyệt vời để giải trí, sáng tạo và học tập dành cho các bạn học sinh/sinh viên, chiếc laptop gaming Asus Vivobook K3605ZF-RP634W ghi điểm nhờ mức giá rất tốt, khả năng đa nhiệm bền bỉ và được trang bị card đồ họa RTX2050 hết sức xịn sò. Chip xử lý Intel Core i5-12500H sẽ cung cấp sức mạnh tuyệt vời cho mọi tác vụ bạn dùng.\nKhai mở hiệu năng gaming ấn tượng\nTrọng tâm trong sức mạnh đồ họa của laptop Vivobook K3605ZF-RP634W nằm ở bộ GPU GeForce RTX 2050 xây dựng trên kiến trúc Ampere GA107 của NVIDIA với nhiều cải tiến ở công nghệ dò tia và cung cấp hiệu năng chiến game cực tốt. Nhờ vậy, người dùng sẽ thoải mái chơi các tựa game cực hot hiện nay như Dota 2 Reborn, GTA V hay The Witcher 3 với mức FPS cực kỳ ấn tượng.\nChip mạnh mẽ và cấu hình tuyệt vời\nDù có mức giá lên kệ dễ tiếp cận hơn nhiều so với mặt bằng chung của dòng laptop gaming nhưng Vivobook K3605ZF-RP634W vẫn sở hữu thông số cấu hình hết sức ấn tượng với chip Intel Core i5-12500H – bộ vi xử lý có xung nhịp 2.5GHz đi kèm công nghệ Turbo Boost tối ưu hiệu năng cực tốt.', 'Laptop Asus Gaming Vivobook K3605ZF-RP634W', 16990000.00, 'i5-12500H/16GB/512GB/16\"/Nvidia GeForce RTX2050 4GB/Win11', 17, '2025-04-28 03:08:23.925781', 18),
(8, 'Acer', 'Sinh viên - Văn phòng', '2025-04-24 04:42:46.590305', 'Laptop Acer Aspire 3 A315-44P-R5QG NX.KSJSV.001 là sự kết hợp hoàn hảo giữa hiệu năng mạnh mẽ và thiết kế tinh tế, đáp ứng nhu cầu làm việc, học tập và giải trí hàng ngày. Với cấu hình mạnh mẽ cùng khả năng nâng cấp linh hoạt, sản phẩm này phù hợp với người dùng từ sinh viên đến nhân viên văn phòng.\nCPU: AMD Ryzen 7 5700U(8 nhân, 16 luồng,upto 4.30 GHz, 12MB)\nVGA: AMD Radeon™ Graphics\nMàn hình: 15.6 inch FHD(1920 x 1080) IPS 60Hz Acer ComfyView™ LED-backlit TFT LCD\nRAM: 2*8GB DDR4 3200Mhz (nâng cấp tối đa 32GB)\nỔ cứng: 512GB PCIe NVMe SSD (nâng cấp tối đa 2TB PCIe Gen4, 16 Gb/s, NVMe)\nPin: 50 Wh 3-cell\nCân nặng: 1.7 kg\nMàu sắc: Bạc\nOS: Windows 11 Home', 'Laptop Acer Aspire 3 A315-44P-R5QG', 12990000.00, 'AMD Ryzen 7 5700U | 15.6 inch FHD | 16GB | 512GB | Win 11', 89, '2025-04-28 03:08:23.925781', 530),
(9, 'Acer', 'Sinh viên - Văn phòng', '2025-04-24 04:42:46.594811', 'Acer Aspire Lite AL16-51P-72S2_NX.KX0SV.002 là dòng laptop văn phòng được thiết kế để mang đến trải nghiệm làm việc tối ưu. Với cấu hình mạnh mẽ, thiết kế chắc chắn và các tính năng tiện ích, chiếc Laptop Acer này phù hợp cho các tác vụ công việc hàng ngày lẫn giải trí cơ bản.\nCPU: Intel Core i7-1255U (upto 4.7 GHz, 12MB)\nRAM: 1*16GB 4800MHz DDR5 (2 khe, Nâng cấp tối đa 64 GB, cắm sẵn 16GB)\nỔ cứng: 512GB PCIe NVMe SSD\nVGA: Intel® Iris® Xe Graphics eligible\nMàn hình: 16\" FHD+(1920 x 1200) IPS (16:10) 45% NTSC 60Hz Acer ComfyView™ LED-backlit TFT LCD\nOS: Windows 11 Home SL\nPin: 58Whr 3-cell\nCân nặng: 1.8 kg\nMàu sắc: Xám', 'Laptop Acer Aspire Lite AL16-51P-72S2', 15990000.00, 'Intel Core i7-1255U | 16GB | 512GB | 16 inch FHD+ | Win 11', 55, '2025-04-27 09:44:16.478406', 139),
(10, 'Acer', 'Sinh viên - Văn phòng', '2025-04-24 04:42:46.601387', 'CPU: Intel Core i5-1235U (upto 4.40 GHz, 12MB)\nRAM: 8GB (4GB onboard + 4GB So-dim) DDR4 2666Hz (1 khe, Nâng cấp tối đa 20GB)\nỔ cứng: 512GB PCIe NVMe SSD (nâng cấp tối đa 1 TB HDD và 1 TB SSD PCIe Gen3 8 Gb/s up to 4 lanes, NVMe)\nVGA: Intel Iris Xe Graphics\nMàn hình: 14.0 inch FHD(1920 x 1080), 60Hz Acer ComfyView™ IPS LED LCD\nPin: 3cell, 50Wh\nCân nặng: 1.4 kg\nMàu sắc: Steel Gray\nTính năng: Đèn nền bàn phím, Bảo mật vân tay\nOS: Windows 11 Home\n\nAcer Aspire 5 A514-55-5954 NX.K5BSV.001 là chiếc laptop - máy tính xách tay dành cho sinh viên & nhân viên văn phòng. Mẫu laptop Acer này sở hữu màn hình 14 inch, thiết kế nhỏ gọn cùng cấu hình core i5 chuyên dụng cho công việc, học tập và giải trí nhẹ nhàng, kèm tính năng bảo mật hiệu quả.\n\nAcer Aspire 5 A514-55-5954 NX.K5BSV.001 thuộc dòng laptop Aspire - đây là dòng laptop tầm trung rất được nhiều bạn sinh viên và giới nhân viên văn phòng bởi mức giá phải chăng, phong cách thiết kế tối giản thanh lịch, cùng với đó là kích thước gọn gàng, cân nặng nhẹ. \n\nPhần vỏ của laptop được làm từ chất liệu nhựa giả kim phủ lớp sơn màu kim loại xám. Các góc của laptop được bo tròn nhẹ, đường nét ở cạnh vuông vức và được gia công rất chắc chắn. Những điểm này đã tạo nên cho chiếc laptop Acer này một vẻ ngoài tinh tế như những chiếc laptop thuộc phân khúc cao cấp.\n\nKích thước của máy 32,8 x 22,1 cm, nặng chỉ 1,4kg và mỏng chỉ 1,79 cm. Đây là kích thước rất gọn nhẹ cho một chiếc máy 14 inch để bạn có thể dễ dàng cho vào balo, túi xách hay cầm nắm vừa tay để sử dụng nhiều môi trường làm việc khác nhau. ', 'Laptop Acer Aspire 5 A514-55-5954', 12990000.00, 'Core i5-1235U | 8GB | 512G | Intel Iris Xe | 14.0 inch FHD IPS | Win 11', 69, '2025-04-28 03:08:23.925781', 353),
(11, 'Acer', 'Sinh viên - Văn phòng', '2025-04-24 04:42:46.606734', 'CPU: Intel Core i7-12650H (up to 4.7GHz, 24MB)\nRAM: 16GB (8x2) DDR4 3200MHz (2 slot, up to 32GB )\nỔ cứng: 512GB PCIe NVMe SSD\nVGA: Intel® UHD Graphics\nMàn hình: 15.6inch FHD (1920 x 1080) IPS SlimBezel, 60Hz\nPin: 3-cell, 50Wh\nCân nặng: 2.1kg\nMàu sắc: Đen\nOS: Windows 11 Home\n', 'Laptop Acer Aspire 7 A715-76-728X', 16990000.00, 'Intel Core i7-12650H | 16GB | 512GB | Intel UHD | 15.6 inch FHD | Win 11', 18, '2025-04-27 09:49:58.170030', 185),
(12, 'Lenovo', 'Doanh nhân', '2025-04-24 04:42:46.613584', 'CPU: Intel Core Ultra 5 125H, 14C (4P + 8E + 2LPE) / 18T, Max Turbo up to 4.5GHz, 18MB\nVGA: NVIDIA RTX 500 Ada Generation 4GB GDDR6\nMàn hình: 14.5\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC, 60Hz, Eyesafe®, TÜV Low Blue Light\nRAM: 2x 16GB SO-DIMM DDR5-5600 Non-ECC (Up to 96GB (2x 48GB DDR5 SO-DIMM)\nỔ cứng: 1TB SSD M.2 2280 PCIe® 4.0x4 Performance NVMe® Opal 2.0\nPin: 75Wh\nCân nặng: 1.61 kg\nTính năng: Bảo mật vân tay,…\nMàu sắc: Đen\nOS: NoOS\n\nLenovo ThinkPad P14s Gen 5 21G2004XVA là chiếc laptop workstation di động mạnh mẽ, được thiết kế để đáp ứng nhu cầu của các chuyên gia sáng tạo nội dung, kỹ sư và nhà thiết kế đồ họa. Với bộ vi xử lý Intel Core Ultra 5 125H, card đồ họa NVIDIA RTX 500 Ada Generation 4GB GDDR6, và màn hình 14.5 inch WUXGA chuẩn màu, sản phẩm mang lại sự cân bằng hoàn hảo giữa hiệu suất, tính di động và độ bền.\n\nThiết kế\nThinkPad P14s Gen 5 giữ nguyên phong cách thiết kế tối giản và chắc chắn đặc trưng của dòng ThinkPad, với màu đen thanh lịch và khung máy bền bỉ. Với trọng lượng 1.61 kg và kích thước gọn nhẹ, đây là một trong những mẫu máy workstation nhẹ nhất, giúp người dùng dễ dàng mang theo khi di chuyển. Máy được trang bị bàn phím có đèn nền, mang lại sự tiện lợi khi làm việc trong môi trường ánh sáng yếu, cùng cảm biến vân tay tích hợp để đảm bảo bảo mật.', 'Laptop Lenovo ThinkPad P14s Gen 5 21G2004XVA', 37990000.00, 'Intel Core Ultra 5 125H | RTX 500 Ada | 14.5 inch WUXGA | 32GB | 1TB | NoOS | Đen', 21, '2025-04-27 09:52:33.201556', 792),
(13, 'Lenovo', 'Doanh nhân', '2025-04-24 04:42:46.620239', 'CPU: Intel Core i9-14900HX (up to 5.8GHz 36MB)\nVGA: NVIDIA GeForce RTX 4060 8GB (AI TOPS: 233)\nMàn hình: 16 inch WQXGA (2560x1600) IPS 500nits Anti-glare, 100% DCI-P3, 240Hz, DisplayHDR™ 400, Dolby Vision®, G-SYNC®, Low Blue Light, High Gaming Performance\nRAM: 32GB (16x2) DDR5-5600 (2 khe, up to 32GB)\nỔ cứng: 1TB SSD M.2 2280 PCIe® 4.0x4 NVMe®\nPin: 80WHr\nCân nặng: 2.5 kg\nMàu sắc: Xám\nOS: Windows 11 Home\nChức năng: Bàn phím 4-Zone RGB Backlit\n\nLenovo Legion Pro 5 16IRX9 83DF0047VN là một chiếc laptop gaming cao cấp với cấu hình mạnh mẽ, thiết kế tối ưu và khả năng xử lý tuyệt vời. Được trang bị bộ xử lý Intel Core i9-14900HX và card đồ họa NVIDIA GeForce RTX 4060, chiếc Lenovo Legion này là lựa chọn hoàn hảo cho game thủ và người dùng đòi hỏi hiệu suất cao.\n\nThiết Kế Bền Bỉ, Tinh Tế Với Vỏ Nhựa Cứng Cáp\nLegion Pro 5 sở hữu thiết kế mạnh mẽ, sang trọng đặc trưng của dòng máy Legion nổi tiếng.  Chất lượng Build siêu hạng cực kỳ cứng cáp với vỏ nhựa xám Obsidian mang tới cho Legion sự chắc chắn, không hề có hiện tượng ọp ẹp ở bất kỳ mặt nào của máy. Máy có cân nặng 2.5 kg, phù hợp hơn với các setup cố định phù hợp với những anh em chú trọng vào hiệu năng mạnh mẽ thay vì tính di động.\n\nHiệu Năng Cực Đỉnh Với Intel Core i9-14900HX Và RTX 4060\nSở hữu CPU Intel Core i9-14900HX với 24 nhân 32 luồng, tốc độ tối đa 5.8GHz cùng bộ nhớ đệm 36MB, Lenovo Legion Pro 5 dễ dàng xử lý các tác vụ phức tạp, từ chơi game cho đến các phần mềm đồ họa chuyên nghiệp. Hiệu suất của 14900HX là không phải bàn cãi, đây có thể coi như là chiếc CPU Laptop mạnh mẽ nhất ở thời điểm hiện tại. Cho thử nghiệm với Cinebench R23, i9-14900HX đạt tới 27232 điểm thể hiện sức mạnh áp đảo so với mọi chiếc CPU Laptop thời điểm hiện tại. Mức nhiệt độ trung bình khi chạy Benchmark là 80 độ khi ở chế độ Performance.', 'Laptop Lenovo Legion Pro 5 16IRX9 83DF0047VN', 45990000.00, 'Intel Core i9-14900HX | RTX 4060 |16inch WQXGA | 32GB | 1TB SSD | Win 11 | Grey', 94, '2025-04-27 09:54:29.329245', 723),
(14, 'Lenovo', 'Doanh nhân', '2025-04-24 04:42:46.632817', 'CPU: Intel Core i7-14650HX\nVGA: NVIDIA® GeForce RTX™ 4060 8GB GDDR6 (AI TOPS: 233)\nMàn hình: 16 inch WQXGA (2560x1600) AG, 350nits, 165Hz\nRAM: 16GB\nỔ cứng: 512GB M.2 2280 PCIe 4.0x4 NVMe SSD\nPin: 80Wh\nCân nặng:\nMàu sắc:Xám\nOS: Windows 11 Home\nChức năng: Bàn phím Led RGB\n\nLaptop Lenovo Legion 5 16IRX9 83DG004YVN\nKhi bạn đang tìm kiếm một chiếc laptop gaming cao cấp, Lenovo Legion 5 16IRX9 83DG004YVN không chỉ đáp ứng mà còn vượt trội hơn cả những kỳ vọng của bạn.\nLenovo Legion 5 được trang bị vi xử lý Intel Core i7-14650HX và card đồ họa RTX 4060, mang lại hiệu suất mạnh mẽ cho mọi trò chơi và ứng dụng đồ họa. Dù bạn đang chơi game đồ họa cao, làm việc với phần mềm thiết kế, chỉnh sửa video hay lập trình, máy này luôn đảm bảo trải nghiệm mượt mà và nhanh chóng.\n\nBộ Nhớ RAM 16GB DDR5 và SSD 512GB NVMe Siêu Nhanh\nVới RAM 16GB DDR5 và SSD 512GB NVMe, Lenovo Legion 5 không chỉ cung cấp khả năng xử lý đa nhiệm mạnh mẽ mà còn đảm bảo tốc độ truy cập dữ liệu siêu nhanh. Bạn sẽ thấy sự khác biệt rõ rệt trong mọi tác vụ, từ khởi động máy, chạy ứng dụng đến truy cập dữ liệu.\n\n \n\nMàn Hình 16 inch 165Hz Độ Phân Giải 2560x1600\nMàn hình của sản phẩm Lenovo Legion này lớn 16 inch với tần số quét 165Hz và độ phân giải 2560x1600 mang đến hình ảnh sắc nét và trải nghiệm chơi game mượt mà, tối ưu hóa mọi chi tiết hình ảnh. Đây là yếu tố quan trọng không chỉ cho game thủ mà còn cho những người làm việc với hình ảnh và video.\n', 'Laptop Lenovo Legion 5 16IRX9 83DG004YVN', 39990000.00, 'Intel Core i7-14650HX | RTX 4060 |16 inch WQXGA 165Hz | 16GB | 512GB SSD | Win 11 | Grey', 48, '2025-04-27 09:56:26.155586', 668),
(15, 'Lenovo', 'Doanh nhân', '2025-04-24 04:42:46.643925', 'CPU: Intel Core i9-14900HX (24C/32T, P-core 2.2 / 5.8GHz 36MB)\nVGA: NVIDIA® GeForce RTX™ 4070 8GB GDDR6 (AI TOPS: 321)\nMàn hình: 16\" 3.2K (3200x2000) IPS 430nits Anti-glare, 100% DCI-P3, 165Hz, Dolby® Vision®, G-SYNC®, Low Blue Light\nRAM: 2x 16GB SO-DIMM DDR5-5600(2x SO-DIMM socket, Up to 32GB)\nỔ cứng: 1TB SSD M.2 2280 PCIe® 4.0x4 NVMe\nPin: 99.9Wh\nCân nặng: 2.24 kg\nMàu sắc: Trắng\nOS: Windows 11 Home\nChức năng: Bàn phím Per-key RGB\n\nLaptop Lenovo Legion 7 16IRX9 83FD006JVN\nNếu bạn đang tìm kiếm một chiếc laptop gaming cao cấp không chỉ mạnh mẽ về hiệu năng mà còn đẳng cấp về thiết kế, Laptop Lenovo Legion 7 16IRX9 83FD006JVN chính là lựa chọn không thể bỏ qua.\nHiệu Năng Đỉnh Cao với Intel Core i9-14900HX và RTX 4070\nTrái tim của Lenovo Legion 5 16IRX9 83DG0051VN là vi xử lý Intel Core i9-14900HX, một trong những CPU mạnh mẽ nhất hiện nay, cùng với card đồ họa RTX 4070 8GB GDDR6, tạo nên sức mạnh đáng kinh ngạc cho mọi trò chơi và ứng dụng đồ họa. Với cấu hình này, bạn có thể chơi các tựa game mới nhất ở cài đặt đồ họa cao, làm việc với các phần mềm thiết kế đồ họa, chỉnh sửa video hay lập trình mà không lo về vấn đề giật lag.\n\nRAM 32GB DDR5 - Hiệu Suất Ấn Tượng\nVới RAM 16GB DDR5, Laptop Lenovo Legion 7 16IRX9 83FD006JVN không chỉ đáp ứng nhu cầu gaming mà còn là một sự lựa chọn hoàn hảo cho các công việc đòi hỏi khả năng xử lý đa nhiệm và tốc độ cao như thiết kế đồ họa, chỉnh sửa video và phát triển phần mềm.\n\nMàn Hình 16 inch 165Hz Độ Phân Giải 3.2K\nMàn hình 16 inch của laptop với tần số quét 165Hz và độ phân giải 3.2K (3200x2000) mang lại trải nghiệm hình ảnh sắc nét, màu sắc sống động, và độ mượt mà tuyệt vời. Đây là điểm cộng lớn cho game thủ và những người làm trong lĩnh vực sáng tạo nội dung, nơi mà chất lượng hình ảnh là yếu tố quan trọng. Tần số quét 165Hz bắt kịp từng chuyển động để mang lại lợi thế cho bạn trong những tựa Game FPS hành động tốc độ cao.', 'Laptop Lenovo Legion 7 16IRX9 83FD006JVN', 59900000.00, 'Intel Core i9-14900HX | RTX 4070 |32GB | 1TB | 16 inch 3.2K | Win 11 | Trắng', 21, '2025-04-27 09:59:12.580056', 279),
(16, 'HP', 'Doanh nhân', '2025-04-24 04:42:46.658472', 'CPU: Intel Core Ultra 7 155U (up to 4.8 GHz, 12 MB L3 cache, 12 cores, 14 threads)\nRAM: 32 GB LPDDR5-6400 MHz RAM (onboard)\nỔ cứng: 1 TB PCIe® Gen4 NVMe™ M.2 SSD\nVGA: Intel® Graphics\nMàn hình: 14\" 2.8K (2880 x 1800), OLED, multitouch-enabled, 48-120 Hz, 0.2 ms response time, UWVA, edge-to-edge glass, micro-edge, Corning® Gorilla® Glass NBT™, Low Blue Light, SDR 400 nits, HDR 500 nits, 100% DCI-P3\nPin: 3-cell, 59 Wh\nTính năng: Đèn nền bàn phím\nCân nặng: 1.34 kg\nMàu sắc: Bạc\nOS: Windows 11 Home\n\nLaptop HP ENVY X360 14-fc0084TU A19BTPA\nLaptop HP ENVY X360 14-fc0084TU A19BTPA là sự kết hợp hoàn hảo giữa hiệu năng mạnh mẽ, thiết kế sang trọng và các tính năng hiện đại, mang lại trải nghiệm tuyệt vời cho người dùng cần một chiếc máy tính xách tay linh hoạt phục vụ công việc sáng tạo, giải trí và đa nhiệm. Với cấu hình cao cấp cùng thiết kế mỏng nhẹ, sản phẩm này xứng đáng là người bạn đồng hành lý tưởng cho các chuyên gia và người dùng đam mê công nghệ.\n\nHiệu năng vượt trội với Intel Core Ultra 7\nLaptop HP ENVY X360 14-fc0084TU A19BTPA được trang bị bộ vi xử lý Intel Core Ultra 7-155U thế hệ mới nhất, với bộ nhớ đệm 12MB và tốc độ tối đa lên đến 4.8 GHz. Vi xử lý này cung cấp hiệu suất mạnh mẽ cho các tác vụ đa nhiệm, giúp bạn dễ dàng xử lý mọi công việc từ văn phòng, lập trình cho đến chỉnh sửa đồ họa. Với khả năng tiết kiệm năng lượng và hiệu quả cao, bạn có thể yên tâm làm việc lâu dài mà không lo lắng về tình trạng máy quá nhiệt.\nRAM LPDDR5 và ổ cứng SSD tốc độ cao\nLaptop HP ENVY X360 được trang bị 32 GB RAM LPDDR5-6400 MHz, cung cấp khả năng xử lý nhanh chóng và mượt mà, ngay cả khi bạn mở nhiều ứng dụng cùng lúc. Bộ nhớ RAM tốc độ cao này giúp tối ưu hóa hiệu suất, giảm thiểu tình trạng giật lag trong quá trình sử dụng. Ổ cứng SSD PCIe® Gen4 NVMe™ M.2 dung lượng 1 TB không chỉ mang lại không gian lưu trữ rộng rãi mà còn đảm bảo tốc độ truy xuất dữ liệu vượt trội, giúp khởi động máy và ứng dụng gần như ngay lập tức.', 'Laptop HP ENVY X360 14-fc0084TU A19BTPA', 35190000.00, 'Intel Core Ultra 7 155U | 32GB | 1TB | 14 inch 2.8K | Win 11 | Bạc', 93, '2025-04-27 10:02:16.970767', 787),
(17, 'Dell', 'Doanh nhân', '2025-04-24 04:42:46.665584', 'CPU: Intel Core i7-13800H (upto 5.2 GHz, 24MB)\nRAM: 16GB DDR5 4800MHz\nỔ cứng: 512GB M.2 2230 Gen 4 PCIe NVMe SSD\nVGA: NVIDIA RTX 2000 Ada 8GB\nMàn hình: 16 inch FHD+ 1920x1200, WVA, 60Hz, anti-glare, non-touch, 45% NTSC, 250 nits\nPin: 6-cell 100Wh\nCân nặng:\nOS: Ubuntu\n\nLaptop Dell Mobile Precision Workstation 5680 71023332\nDell Mobile Precision Workstation 5680 là dòng laptop – máy tính xách tay thuộc phân khúc máy trạm cao cấp của Dell, được lấy cảm hứng thiết kế từ dòng laptop doanh nhân cao cấp XPS 15, nhưng màu sắc của máy được thay đổi thành Titan Gray, vẻ ngoài cũng mạnh mẽ, chắn chắn hơn. Với thiết kế bền bỉ, màn hình độ phân giải sắc nét và đặc biệt là hiệu năng mạnh mẽ, đây sẽ là mẫu laptop Dell dành riêng cho những ai đang cần một thiết bị mỏng nhẹ nhưng lại có thể đáp ứng tốt cho các tác vụ nặng như thiết kế hình ảnh, dựng 3D, render video và nhiều hơn thế nữa.\n\nThiết kế sang trọng, siêu cấp bền bỉ\n\nDell Mobile Precision Workstation 5680 thừa hưởng một thiết kế sang trọng, mỏng nhẹ và tinh tế đến từ dòng XPS. Dell Mobile Precision Workstation 5680 được nhiều người dùng ví von là một chiếc Workstation “ẩn mình” trong một chiếc máy doanh nhân hiện đại.\n\nHiệu năng mạnh mẽ với CPU Intel\n\nDell Mobile Precision Workstation 5680 được trang bị một cấu hình cực “ngon” trong phân khúc giá, bao gồm CPU Intel Core i7-13800H, 14 nhân / 20 luồng, một con chip hiệu năng cao cùng với card đồ họa rời NVIDIA RTX 2000 Ada 8GB. Với cấu hình này, Dell Mobile Precision Workstation 5680 có thể đáp ứng tối đa các nhu cầu đòi hỏi sự mạnh mẽ.', 'Laptop Dell Mobile Precision Workstation 5680 71023332', 57900000.00, 'Intel Core i7-13800H | 16GB | 512GB | RTX 2000 Ada 8GB | 16 inch FHD+ | Ubuntu', 0, '2025-04-27 10:04:34.367567', 376),
(19, 'Lenovo', 'Mỏng nhẹ', '2025-04-24 04:42:46.665584', 'CPU: Intel Core i5-13420H, (8C/ 12T, upto 4.6GHz, 12MB)\nRAM: 8GB Soldered DDR5-4800 + 8GB SO-DIMM DDR5-4800 (tối đa 24GB)\nỔ cứng: 512GB SSD M.2 2242 PCIe® 4.0x4 NVMe\nVGA: Integrated Intel UHD Graphics\nMàn hình: 14\" WUXGA (1920x1200) IPS 300nits Anti-glare, 45% NTSC\nPin: 60Wh\nCân nặng: 1.43 kg\nMàu sắc: Luna Grey\nOS: Windows 11 Home SL\n\nLaptop Lenovo IdeaPad Slim 3 14IRH10 83K00008VN', 'Laptop Lenovo IdeaPad Slim 3 14IRH10 83K00008VN', 15490000.00, 'Intel Core i5-13420H | 16GB | 512GB | Intel UHD | 14 inch WUXGA | Win 11 | Xám', 6, '2025-04-27 10:07:54.280273', 460),
(20, 'Lenovo', 'AI', '2025-04-24 04:42:46.672500', 'Mô tả chi tiết cho sản phẩm 20:\nHiệu suất vượt trội so với các sản phẩm cùng phân khúc.\nThiết kế tinh tế, mang lại trải nghiệm sử dụng tuyệt vời.\nThiết kế tinh tế, mang lại trải nghiệm sử dụng tuyệt vời.\nChất lượng cao, đảm bảo độ bền lâu dài.\nHiệu suất vượt trội so với các sản phẩm cùng phân khúc.\nSản phẩm này được thiết kế với công nghệ tiên tiến nhất.\nĐây là lựa chọn hoàn hảo cho nhu cầu của bạn!', 'Laptop Lenovo Yoga Slim 9 14ILL10 83CX001AVN', 55490000.00, 'Intel Core Ultra 7 258V | 1TB | 32GB | Intel Arc | 14 inch 4K 120Hz | Win 11 | Office | Xanh', 45, '2025-04-27 10:10:26.022677', 448),
(21, 'MSI', 'AI', '2025-04-24 04:54:23.110710', 'MSI Prestige 14 AI Evo C1MG 081VN – chiếc laptop được chế tác tinh xảo, không chỉ đáp ứng mà còn vượt xa mọi kỳ vọng về hiệu suất, tính di động và trải nghiệm hình ảnh. Thuộc dòng Prestige danh tiếng của MSI, chiếc máy này là sự kết hợp hoàn hảo giữa công nghệ Trí tuệ nhân tạo (AI) tiên tiến, thiết kế thanh lịch và sức mạnh bền bỉ, hướng đến giới chuyên gia, nhà sáng tạo nội dung và những ai đòi hỏi sự hoàn hảo trong công việc lẫn giải trí.\n\nBước vào Kỷ Nguyên AI với Intel® Core™ Ultra\n\nTrái tim của MSI Prestige 14 AI Evo là bộ vi xử lý Intel® Core™ Ultra 5 125H thế hệ mới nhất. Đây không chỉ là một bước nhảy vọt về hiệu năng xử lý đa nhiệm mà còn là cột mốc đánh dấu sự tích hợp sâu rộng của AI vào trải nghiệm người dùng. Với kiến trúc đột phá bao gồm NPU (Neural Processing Unit) chuyên dụng, con chip này tối ưu hóa các tác vụ AI, tăng tốc độ xử lý các ứng dụng thông minh, nâng cao hiệu quả năng lượng và mang đến những khả năng mới như khử tiếng ồn thông minh, làm mờ hậu cảnh chuyên nghiệp khi họp trực tuyến, hay tối ưu hiệu suất theo thời gian thực. Nền tảng Intel® Evo™ Edition đảm bảo bạn có được sự phản hồi tức thì, thời lượng pin ấn tượng, tốc độ sạc nhanh và kết nối Wi-Fi siêu tốc, sẵn sàng cho mọi thử thách.\n\nĐắm Chìm Trong Thế Giới Hình Ảnh 2.8K OLED Sống Động\n\nTrải nghiệm thị giác trên MSI Prestige 14 AI Evo được nâng lên một tầm cao mới với màn hình 14 inch độ phân giải 2.8K (2880x1800) sử dụng công nghệ tấm nền OLED. Hãy chuẩn bị choáng ngợp trước màu sắc rực rỡ, độ tương phản vô hạn và màu đen sâu tuyệt đối mà chỉ OLED mới có thể mang lại. Với độ phủ màu 100% DCI-P3 chuẩn điện ảnh, mọi hình ảnh, từ bảng tính phức tạp, bản vẽ thiết kế chi tiết đến những thước phim bom tấn, đều được tái hiện một cách chân thực và sống động đến kinh ngạc. Màn hình này là công cụ lý tưởng cho các nhà thiết kế đồ họa, biên tập video và bất kỳ ai yêu cầu sự chính xác về màu sắc.', 'Laptop MSI Prestige 14 AI Evo C1MG 081VN', 26490000.00, 'Intel Core Ultra 5 125H | 14 inch 2.8K OLED | 16GB | 512GB | Win 11 | Xám', 0, '2025-04-27 10:12:55.637159', 0),
(22, 'Surface', 'AI', '2025-04-24 06:31:33.481135', 'Microsoft đã ra mắt Surface Laptop 7 phiên bản sử dụng bộ vi xử lý Intel, mang lại hiệu suất mạnh mẽ và nhiều tính năng tiên tiến. Dưới đây là mô tả chi tiết về sản phẩm này:\nCấu hình và hiệu suất:\n\nBộ vi xử lý: Surface Laptop 7 được trang bị các tùy chọn vi xử lý Intel Core Ultra 5 hoặc Ultra 7 thuộc kiến trúc Lunar Lake, đảm bảo hiệu suất cao và tiết kiệm năng lượng.\nBộ nhớ và lưu trữ: Tùy chọn RAM 16GB hoặc 32GB LPDDR5x, cùng với ổ cứng SSD dung lượng 256GB, 512GB hoặc 1TB, đáp ứng nhu cầu lưu trữ đa dạng của người dùng.\nMàn hình:\n\nKích thước và độ phân giải: Surface Laptop 7 có hai tùy chọn kích thước màn hình: 13,8 inch và 15 inch, cả hai đều hỗ trợ cảm ứng và có độ phân giải cao, mang lại trải nghiệm hình ảnh sắc nét và chi tiết.\nThiết kế và kích thước:\n\nThiết kế: Surface Laptop 7 giữ nguyên thiết kế tinh tế với vỏ nhôm cao cấp, mang lại cảm giác sang trọng và bền bỉ.\nMàu sắc: Phiên bản Intel chỉ có hai màu: Platinum (Bạch kim) và Black (Đen), trong khi các màu sắc đặc biệt như Sapphire và Dune chỉ có trên phiên bản Snapdragon.', 'Surface Laptop 7 13.8 inch', 19999750.00, 'Intel Core Ultra 7/32/1TB Mới', 0, '2025-04-27 10:19:09.679891', 0),
(31, 'Razer', 'AI', '2025-04-27 10:44:48.960756', 'CPU: AMD Ryzen™ AI 9 365 Processor (10-Cores / 20-Threads, 2 GHz Base / 5 GHz Max boost) Radeon™ 880M Graphics\nRAM: 32 GB LPDDR5X 8000 MHz (Soldered)\nỔ cứng: 1 TB SSD (M.2 PCIe Gen 4 NVMe x4, x2)\nMàn hình: 16-inch, QHD+ (2560x1600) 16:10, 240 Hz, AMD FreeSync™ Premium, OLED Up to 100% DCI-P3, HDR 500, 400 nits\nCard đồ họa: NVIDIA® GeForce RTX™ 5070 Ti 12GB\nTình trạng: Hàng New, Nhập Khẩu\n\nSức mạnh đột phá với AMD Ryzen AI 9 & RTX 50 Series\nRazer Blade 16 (2025) trang bị bộ vi xử lý AMD Ryzen AI 9 HX 365/370, kết hợp GPU mạnh mẽ RTX 5070 Ti/5080/5090, mang đến hiệu năng vượt trội cho gaming và công việc sáng tạo.\nMàn hình OLED QHD+ 240Hz – Hình ảnh siêu mượt, màu sắc sống động\nSở hữu màn hình OLED QHD+ 16 inch, tần số quét 240Hz, Razer Blade 16 (2025) mang lại chất lượng hiển thị sắc nét, tốc độ phản hồi nhanh, đảm bảo lợi thế tối đa trong mọi trận đấu.', 'Razer Blade 16 (2025)', 127990000.00, 'AMD Ryzen™ AI 9 HX 365, Ram 32GB, SSD 1TB, RTX 5070 Ti 12GB, OLED QHD+ 240 Hz(No.4352)', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('FEMALE','MALE','OTHER') DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `address`, `avatar`, `created_at`, `created_by`, `email`, `gender`, `name`, `password`, `phone`, `role`, `updated_at`, `updated_by`) VALUES
(1, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.169236', 'admin@gmail.com', 'admin@gmail.com', 'FEMALE', 'Quản trị viên', '$2a$10$pc4ScYtzS6JCxVVlD7v35eRhlkOzKtcUjr1oaF7fqpiSpFU9bdLgW', '0123456711', 'ADMIN', '2025-04-27 04:56:09.141152', 'admin@gmail.com'),
(2, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.217290', 'user1@gmail.com', 'user1@gmail.com', 'FEMALE', 'TestUser1', '$2a$10$jadpf0Gs/3lT2Q0owmWGAeB1vuMPzlFxmnqBhiWuasvwR6ZA11c5C', '0123456701', 'USER', NULL, NULL),
(3, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.229210', 'user2@gmail.com', 'user2@gmail.com', 'MALE', 'TestUser2', '$2a$10$aZ9LZEBwa5gdeVy/LlDDEeNpe7NMYDC1nyIwlu64cC653sPgz0Gmi', '0123456702', 'USER', NULL, NULL),
(4, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.229210', 'user3@gmail.com', 'user3@gmail.com', 'FEMALE', 'TestUser3', '$2a$10$uk8zq9xt4SmW8QZqCju2qOJtwSCNmhZHVCWuLsfNGMeiYcbp/TMvC', '0123456703', 'USER', NULL, NULL),
(5, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.239942', 'user4@gmail.com', 'user4@gmail.com', 'MALE', 'TestUser4', '$2a$10$2vL.XTBt.Ezkw2Bkyj/H7e161Oa7Gipta8W3/kuJeXnm19yCjoVkO', '0123456704', 'USER', NULL, NULL),
(6, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.244440', 'user5@gmail.com', 'user5@gmail.com', 'FEMALE', 'TestUser5', '$2a$10$CAXR58ozZUC9n/63FCQBbuNvVWq3DiKy3bNH2Zop/jp5Lp2u/.Lh.', '0123456705', 'USER', NULL, NULL),
(7, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.252909', 'user6@gmail.com', 'user6@gmail.com', 'MALE', 'TestUser6', '$2a$10$TtQUDDESx5v6WSl1Kyvx3uvxhOi6QmFAySvO9eviViTtaEVk5190K', '0123456706', 'USER', NULL, NULL),
(8, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.264747', 'user7@gmail.com', 'user7@gmail.com', 'FEMALE', 'TestUser7', '$2a$10$k.21ehQrTjvnx8YihZ6yJuj4Ray1VS47lGOVc5NzCiZwpZoSj3mf6', '0123456707', 'USER', NULL, NULL),
(9, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.264747', 'user8@gmail.com', 'user8@gmail.com', 'MALE', 'TestUser8', '$2a$10$ZHP0jLQd9rWdOpk5VufHT.rpB3Xu1DQmnm1A6FmagBQIEHDLgM74q', '0123456708', 'USER', NULL, NULL),
(12, 'Thành Phố Hà Nội', 'f4b80af3-a14d-4b9f-a91a-8b203b9814c0_screenshot_1745140127.png', '2025-04-24 04:42:46.291494', 'user11@gmail.com', 'user11@gmail.com', 'FEMALE', 'TestUser11', '$2a$10$sCQM8ghRJrug86sti0RgZOZW/hvNTM.6VlPnatNQGJfqL6aarvBZ.', '0123456711', 'USER', '2025-04-27 07:26:27.609895', 'admin@gmail.com'),
(13, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.291494', 'user12@gmail.com', 'user12@gmail.com', 'MALE', 'TestUser12', '$2a$10$pokFodvOkgCd7veg3tWVg.Dumr41vzyEcNEkB82Ii84oM2A7VgzX2', '0123456712', 'USER', NULL, NULL),
(14, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.307549', 'user13@gmail.com', 'user13@gmail.com', 'FEMALE', 'TestUser13', '$2a$10$ySOuR9NzeorP53aV1wQ6iOeYCtjyGiephjuPQ5CFGrySV014AbR0y', '0123456713', 'USER', NULL, NULL),
(15, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.312444', 'user14@gmail.com', 'user14@gmail.com', 'MALE', 'TestUser14', '$2a$10$WLAQHUYVdPqZIp4Yh2OlGexf6mp2ktrBnyv1XmFtHW6unUsNLJPtG', '0123456714', 'USER', NULL, NULL),
(16, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.325182', 'user15@gmail.com', 'user15@gmail.com', 'FEMALE', 'TestUser15', '$2a$10$7djWnOFZPfKuF6zPtCTqeuThH.cbopdHOl33.M5gUjTktMEAhJqkW', '0123456715', 'USER', NULL, NULL),
(17, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.335819', 'user16@gmail.com', 'user16@gmail.com', 'MALE', 'TestUser16', '$2a$10$UlgmEVrpAkq9c9XIvsx6Mews2HI9b7Aktqw5ckozKaYBek9fTLyqG', '0123456716', 'USER', NULL, NULL),
(18, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.339709', 'user17@gmail.com', 'user17@gmail.com', 'FEMALE', 'TestUser17', '$2a$10$g4XVTM7q1XplhVB0FPJui.PSHBdPzNBWNQsrXxv4iTq/5bqg7B.HW', '0123456717', 'USER', NULL, NULL),
(19, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.348356', 'user18@gmail.com', 'user18@gmail.com', 'MALE', 'TestUser18', '$2a$10$B7fK.66r7TBBF12rMWeBIu8UB6Zeq1oGgA.S5nD6sHJtSqPzanOuu', '0123456718', 'USER', NULL, NULL),
(20, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.355662', 'user19@gmail.com', 'user19@gmail.com', 'FEMALE', 'TestUser19', '$2a$10$/fvZJ04QGeMMPpDfJz6yUOJ77WobhzC1IUu28UmUIubZcjp4XKfZC', '0123456719', 'USER', NULL, NULL),
(21, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.360947', 'user20@gmail.com', 'user20@gmail.com', 'MALE', 'TestUser20', '$2a$10$D.4G2x9ShPIYV0mwWPcvO.BbYJjkibJ9m/s/Mrg/8Q9pqMqVHnlza', '0123456720', 'USER', NULL, NULL),
(22, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.364967', 'user21@gmail.com', 'user21@gmail.com', 'FEMALE', 'TestUser21', '$2a$10$pVRr/llthA5OmhEwYvTyLOYVaNPEnTmpoB.Elr1yAHYKYSLKeSAEq', '0123456721', 'USER', NULL, NULL),
(23, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.372585', 'user22@gmail.com', 'user22@gmail.com', 'MALE', 'TestUser22', '$2a$10$bz5h0ay53/oJLrXckw0TxuAMM.sGHeZb2ewauE1CqJnOuoXg9ATqi', '0123456722', 'USER', NULL, NULL),
(24, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.372585', 'user23@gmail.com', 'user23@gmail.com', 'FEMALE', 'TestUser23', '$2a$10$C1jNKsKia6klXAexKESreu2uDNaaUZwdPY8kRdzhA.GUjqhGSTKEC', '0123456723', 'USER', NULL, NULL),
(25, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.383821', 'user24@gmail.com', 'user24@gmail.com', 'MALE', 'TestUser24', '$2a$10$8xhrn8E7nyMhxDVGG00wwOPyAg0/HZ7dAsPQtRne9GGoBvam7pk0S', '0123456724', 'USER', NULL, NULL),
(26, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.387832', 'user25@gmail.com', 'user25@gmail.com', 'FEMALE', 'TestUser25', '$2a$10$K11TffunblVVX/lwZ0yjmOvzvlYINQLdScw.GK6Tfwr0IusWqd8we', '0123456725', 'USER', NULL, NULL),
(27, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.387832', 'user26@gmail.com', 'user26@gmail.com', 'MALE', 'TestUser26', '$2a$10$S3al4d6i6nLJx4z273o72.caPWghR/1Ilc.16bFT64CUCSqnPh18m', '0123456726', 'USER', NULL, NULL),
(28, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.395771', 'user27@gmail.com', 'user27@gmail.com', 'FEMALE', 'TestUser27', '$2a$10$.iZtDlonBPMvtdXQan56h.pMM0KgFnyx6dlwdtPj2xVt53OQ5Xkz.', '0123456727', 'USER', NULL, NULL),
(29, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.395771', 'user28@gmail.com', 'user28@gmail.com', 'MALE', 'TestUser28', '$2a$10$YLHTQgkmPKmEM6vEQcdV2O/jHV.a15vCqqFrSwsuK22X18.9f/nye', '0123456728', 'USER', NULL, NULL),
(30, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.408380', 'user29@gmail.com', 'user29@gmail.com', 'FEMALE', 'TestUser29', '$2a$10$u6aCwy9AODi.tpHaCuZxTeSLNnNAu6VzJsnblhtEbDjAXaixVKnOu', '0123456729', 'USER', NULL, NULL),
(31, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.409004', 'user30@gmail.com', 'user30@gmail.com', 'MALE', 'TestUser30', '$2a$10$8RSIEPIEHMx3IwZ5ArhVlOu6y8qkG6QCQy.i3B676qGfIfhbCS/UC', '0123456730', 'USER', NULL, NULL),
(32, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.409004', 'user31@gmail.com', 'user31@gmail.com', 'FEMALE', 'TestUser31', '$2a$10$387.VoVa8ZFHDlfhgNKxYelGL2cJKsx0v1bfpNBe2xYG0xz2hKaVS', '0123456731', 'USER', NULL, NULL),
(33, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.421356', 'user32@gmail.com', 'user32@gmail.com', 'MALE', 'TestUser32', '$2a$10$V9hnIjZx7dvQ7sGyzc.eiudpxc1xEgdtC79a0w0HHrzi.uUC.WL2q', '0123456732', 'USER', NULL, NULL),
(34, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.421356', 'user33@gmail.com', 'user33@gmail.com', 'FEMALE', 'TestUser33', '$2a$10$p2y.u9arX2FlcNOcBqC1N.ToIUq2ITWI6nEdKmR2OAl9NZ948hxjm', '0123456733', 'USER', NULL, NULL),
(35, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.431836', 'user34@gmail.com', 'user34@gmail.com', 'MALE', 'TestUser34', '$2a$10$fQg2MgX4GcBlFaEINlE/CuDkgGI9E2mA71YBiO47il2QbjtDhlzm.', '0123456734', 'USER', NULL, NULL),
(36, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.435989', 'user35@gmail.com', 'user35@gmail.com', 'FEMALE', 'TestUser35', '$2a$10$aJd/SF/CCEgc2FyD5CHFM.IFGiglKSZe0jdpRVpc0w74xWVD1FRN6', '0123456735', 'USER', NULL, NULL),
(37, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.435989', 'user36@gmail.com', 'user36@gmail.com', 'MALE', 'TestUser36', '$2a$10$iwVhEEvkwR0BrokXA4N.vezhoLkCkPEmwQsnaYjlkuqaSGrt/V3gG', '0123456736', 'USER', NULL, NULL),
(38, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.445162', 'user37@gmail.com', 'user37@gmail.com', 'FEMALE', 'TestUser37', '$2a$10$3EBGS7CyCpTt4l3HVjRfM.I/X.jCcLTCD23i6rMsHSt7D0Md6t4yq', '0123456737', 'USER', NULL, NULL),
(39, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.445162', 'user38@gmail.com', 'user38@gmail.com', 'MALE', 'TestUser38', '$2a$10$cZ7bbHdi2LJkZyeZ9HC8reiUUTh5/SU5Om5tGoI1eA8fcDxMzaUJi', '0123456738', 'USER', NULL, NULL),
(40, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.451790', 'user39@gmail.com', 'user39@gmail.com', 'FEMALE', 'TestUser39', '$2a$10$3LThUtUntaokOoDtYM.UJuuVkxQgHGF2qNSyuOWffkf84B8udOCTu', '0123456739', 'USER', NULL, NULL),
(41, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.456351', 'user40@gmail.com', 'user40@gmail.com', 'MALE', 'TestUser40', '$2a$10$EiDYONJcVwZxtjZG1nyjUOO04oz.q7a5.gMxsVNohyFOy7HgorzpK', '0123456740', 'USER', NULL, NULL),
(42, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.456351', 'user41@gmail.com', 'user41@gmail.com', 'FEMALE', 'TestUser41', '$2a$10$44ImB2z.kMe24GqtTqTPAeKXggSZOAzOm0GrjVUbar2MZA4zd4RQe', '0123456741', 'USER', NULL, NULL),
(43, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.469094', 'user42@gmail.com', 'user42@gmail.com', 'MALE', 'TestUser42', '$2a$10$XXnDlLH2P.xgCFJx4uOT9e0K8NjKusu0pRDU81vioYPawD7.iczii', '0123456742', 'USER', NULL, NULL),
(44, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.469094', 'user43@gmail.com', 'user43@gmail.com', 'FEMALE', 'TestUser43', '$2a$10$gtXTxLSddX3w02I5cV1bf.UiV7tB.WhvJfmF/xBR7MTKxuMtPAUv2', '0123456743', 'USER', NULL, NULL),
(45, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.469094', 'user44@gmail.com', 'user44@gmail.com', 'MALE', 'TestUser44', '$2a$10$uf12jyTNM5/D9ZVvg4MnD.jHxgUtKkXKeUDw7x.u1G0pjsoW2JIgC', '0123456744', 'USER', NULL, NULL),
(46, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.483421', 'user45@gmail.com', 'user45@gmail.com', 'FEMALE', 'TestUser45', '$2a$10$2ID5jBlami2.qqXzEvjLs.na2uDfacdR/zH4dySnpRP2ERmSmoKY2', '0123456745', 'USER', NULL, NULL),
(47, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.483421', 'user46@gmail.com', 'user46@gmail.com', 'MALE', 'TestUser46', '$2a$10$Ox7zaP0WJ4q.soNiZiLzQuHrlPp07fXzR2360ffWO5Lz.zBgkeyyC', '0123456746', 'USER', NULL, NULL),
(48, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.492985', 'user47@gmail.com', 'user47@gmail.com', 'FEMALE', 'TestUser47', '$2a$10$qwDjMvDiLf6SNGttnVpv3efk5aGrzxP7wXRF0PtykVh7pgXk2z1ra', '0123456747', 'USER', NULL, NULL),
(49, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 04:42:46.499394', 'user48@gmail.com', 'user48@gmail.com', 'MALE', 'TestUser48', '$2a$10$2vpDfjkdk4c4B0R6lgZiGe2bKVeepLnRBBWAUGog9AaRQl0XOmPz.', '0123456748', 'USER', NULL, NULL),
(50, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-24 04:42:46.504518', 'user49@gmail.com', 'user49@gmail.com', 'FEMALE', 'TestUser49', '$2a$10$QM7TViVvwz7YpnzT05OzZuZFLv2vWlmEtI/GYZRm2cBKW32iZGqly', '0123456749', 'USER', NULL, NULL),
(53, NULL, 'avatar-default.webp', '2025-04-24 22:22:38.401946', 'zdat5624@gmail.com', 'zdat5624@gmail.com', 'MALE', 'Dat123', '$2a$10$FT/n0yH2SvxoAKv5k5D3beMNRYHQF0RtnqB7RkEE.vv0KcEcqxFFW', '0867532563', 'USER', '2025-04-26 08:20:14.308450', 'anonymousUser'),
(54, 'Thành phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-24 23:19:41.230706', 'admin@gmail.com', 'zdat5624222@gmail.com', 'FEMALE', 'Dat123', '$2a$10$uFLkiAdv276thlGeIUC0Z.3qpU7eGMaax9mdw085DJc1FRKiCJM6G', '08675325631', 'USER', NULL, NULL),
(55, NULL, 'avatar-default.webp', '2025-04-25 11:47:45.093359', 'zdat5624232@gmail.com', 'zdat5624232@gmail.com', 'MALE', 'Dat123', '$2a$10$9PJLt49LS8h.FPd0jEpJ3O55lDwL6UArg6G5WEa09gI8M9e5f0NH.', '0867532563', 'USER', NULL, NULL),
(56, NULL, 'avatar-default.webp', '2025-04-25 12:00:12.243151', 'zdat5624444@gmail.com', 'zdat5624444@gmail.com', 'MALE', 'Lê Đạt', '$2a$10$lIhRJkKl3WZJ5wJU.w2V/./ngRKmydDk7cxHImjHghPq63Z1tPsGu', '0867532563', 'USER', NULL, NULL),
(57, 'Thành phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-27 07:33:26.910787', 'admin@gmail.com', 'zdat562425f2@gmail.com', 'FEMALE', 'Dat123', '$2a$10$2yTsvIBvyOlq5el30oSoAu/D34IfutX/048dqkfrtyaodm3CnhVSW', '08675325631', 'USER', NULL, NULL),
(58, '993 Lê Văn Lương', 'avatar-default.webp', '2025-04-27 07:37:39.853854', 'admin@gmail.com', 'dat56245624@gmail.com', 'MALE', 'Lê Thành Đạt', '$2a$10$u7Cs43WjMHgXohhPdQ7VXOMs.n4RDDANXH3MAGB.wWzux7BPE1I9.', '0867532563', 'USER', NULL, NULL),
(59, '993 Lê Văn Lương', 'avatar-default.webp', '2025-04-27 07:40:13.060441', 'admin@gmail.com', 'zdat56245622@gmail.com', 'MALE', 'Lê Thành Đạt', '$2a$10$1oAuGX9x89BuvGrzGlb7K.pV6nuNGpz0MHaAP4etF1SuYdzi5BkoC', '0867532563', 'USER', NULL, NULL),
(60, 'Thành Phố Hà Nội', 'avatar-default.webp', '2025-04-27 11:09:56.591992', 'user9@gmail.com', 'user9@gmail.com', 'FEMALE', 'TestUser9', '$2a$10$EQKtfHsl9SN8mzilm.RoL./ymC9juhaHspibT3HRhz6UTYegGBRDq', '0123456709', 'USER', NULL, NULL),
(61, 'Thành Phố Hồ Chí Minh', 'avatar-default.webp', '2025-04-27 11:09:56.633044', 'user10@gmail.com', 'user10@gmail.com', 'MALE', 'TestUser10', '$2a$10$IJ7TW6zxL5pmK8hLsGrOAOIXBikZGLAhZ1qyxHuK3dNASJjA7OmXW', '0123456710', 'USER', NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK64t7ox312pqal3p7fg9o503c2` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpcttvuq4mxppo8sxggjtn5i2c` (`cart_id`),
  ADD KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKghwsjbjo7mg3iufxruvq6iu3q` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  ADD KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKk3ndxg5xp6v7wd4gjyusp15gq` (`user_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=252;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`);

--
-- Các ràng buộc cho bảng `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `FKghwsjbjo7mg3iufxruvq6iu3q` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD CONSTRAINT `FKk3ndxg5xp6v7wd4gjyusp15gq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
