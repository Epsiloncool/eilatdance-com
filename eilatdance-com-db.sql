/*
 Navicat Premium Dump SQL

 Source Server         : 00_LOCALHOST
 Source Server Type    : MySQL
 Source Server Version : 50728 (5.7.28-log)
 Source Host           : localhost:3306
 Source Schema         : eilatdance

 Target Server Type    : MySQL
 Target Server Version : 50728 (5.7.28-log)
 File Encoding         : 65001

 Date: 08/04/2026 12:31:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` json NULL,
  `description` json NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `gradient` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, '{\"en\": \"Education\", \"he\": \"Education\", \"ru\": \"Образование\"}', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', 'bg-purple-50 text-purple-700', 'from-purple-500 to-violet-600');
INSERT INTO `categories` VALUES (2, '{\"en\": \"Guide\", \"he\": \"\", \"ru\": \"Руководство\"}', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', 'bg-teal-50 text-teal-700', 'from-teal-500 to-cyan-600');

-- ----------------------------
-- Table structure for dance_styles
-- ----------------------------
DROP TABLE IF EXISTS `dance_styles`;
CREATE TABLE `dance_styles`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` json NULL,
  `description` json NULL,
  `level` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT 'All Levels',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `gradient` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT 'from-purple-500 to-pink-600',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category` enum('kids','adults') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'adults',
  `price` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dance_styles
-- ----------------------------
INSERT INTO `dance_styles` VALUES (1, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"Детский Хип-хоп\"}', '{\"en\": \"Fun and energetic hip-hop classes designed specifically for children aged 3-6 years, focusing on rhythm and coordination.\", \"he\": \"\", \"ru\": \"\"}', 'Beginner', '', 'from-orange-500 to-amber-600', '2025-12-16 07:06:02', 'kids', NULL);

-- ----------------------------
-- Table structure for instructors
-- ----------------------------
DROP TABLE IF EXISTS `instructors`;
CREATE TABLE `instructors`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` json NULL,
  `role` json NULL,
  `bio` json NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `specialties_json` json NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of instructors
-- ----------------------------
INSERT INTO `instructors` VALUES (1, '{\"en\": \"Maxim\", \"he\": \"מקסים\", \"ru\": \"Максим\"}', '{\"en\": \"Lead Instructor\", \"ru\": \"Главный инструктор\"}', NULL, '/maxim.jpg', NULL);
INSERT INTO `instructors` VALUES (2, '{\"en\": \"Sofia\", \"he\": \"סופיה\", \"ru\": \"София\"}', '{\"en\": \"Ballet Master\", \"ru\": \"Балетмейстер\"}', NULL, '/sofia.jpg', NULL);

-- ----------------------------
-- Table structure for medias
-- ----------------------------
DROP TABLE IF EXISTS `medias`;
CREATE TABLE `medias`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL,
  `alt` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL,
  `mimetype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `orig_filename` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `orig_filesize` bigint(20) NOT NULL DEFAULT 0,
  `base_dir` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `orig_width` int(11) NOT NULL DEFAULT 0,
  `orig_height` int(11) NOT NULL DEFAULT 0,
  `previews` json NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medias
-- ----------------------------
INSERT INTO `medias` VALUES (1, 'volchara', '', 'volchara', 'image/jpeg', '2025-12-09 21:26:36', '212619-volchara.jpg', 116372, '/uploads/20251209/', 1170, 1029, '[{\"ident\": \"preview_1280_1024\", \"width\": 1164, \"height\": 1024, \"filename\": \"212619-volchara-1280x1024.webp\"}, {\"ident\": \"preview_1024_820\", \"width\": 932, \"height\": 820, \"filename\": \"212619-volchara-1024x820.webp\"}, {\"ident\": \"preview_720_576\", \"width\": 655, \"height\": 576, \"filename\": \"212619-volchara-720x576.webp\"}, {\"ident\": \"preview_360_288\", \"width\": 327, \"height\": 288, \"filename\": \"212619-volchara-360x288.webp\"}]');
INSERT INTO `medias` VALUES (2, 'cat_save_small', '', 'cat_save_small', 'image/jpeg', '2025-12-09 21:27:31', '212730-cat_save_small.jpg', 33459, '/uploads/20251209/', 240, 214, '[{\"ident\": \"preview_1280_1024\", \"width\": 240, \"height\": 214, \"filename\": \"212730-cat_save_small-1280x1024.webp\"}, {\"ident\": \"preview_1024_820\", \"width\": 240, \"height\": 214, \"filename\": \"212730-cat_save_small-1024x820.webp\"}, {\"ident\": \"preview_720_576\", \"width\": 240, \"height\": 214, \"filename\": \"212730-cat_save_small-720x576.webp\"}, {\"ident\": \"preview_360_288\", \"width\": 240, \"height\": 214, \"filename\": \"212730-cat_save_small-360x288.webp\"}]');
INSERT INTO `medias` VALUES (3, '', '', '', 'application/octet-stream', '2025-12-10 17:18:18', '171813-.photo-1657740034790-f860d612d1b2[1]', 162135, '/uploads/20251210/', 1080, 1620, '[{\"ident\": \"preview_1280_1024\", \"width\": 683, \"height\": 1024, \"filename\": \"171813--1280x1024.webp\"}, {\"ident\": \"preview_1024_820\", \"width\": 547, \"height\": 820, \"filename\": \"171813--1024x820.webp\"}, {\"ident\": \"preview_720_576\", \"width\": 384, \"height\": 576, \"filename\": \"171813--720x576.webp\"}, {\"ident\": \"preview_360_288\", \"width\": 192, \"height\": 288, \"filename\": \"171813--360x288.webp\"}]');
INSERT INTO `medias` VALUES (4, 'photo-1565784796667-98515d255f7d', '', 'photo-1565784796667-98515d255f7d', 'image/jpeg', '2025-12-16 07:52:34', '075231-photo-1565784796667-98515d255f7d.jpg', 249609, '/uploads/20251216/', 1080, 1541, '[{\"ident\": \"preview_1280_1024\", \"width\": 718, \"height\": 1024, \"filename\": \"075231-photo-1565784796667-98515d255f7d-1280x1024.webp\"}, {\"ident\": \"preview_1024_820\", \"width\": 575, \"height\": 820, \"filename\": \"075231-photo-1565784796667-98515d255f7d-1024x820.webp\"}, {\"ident\": \"preview_720_576\", \"width\": 404, \"height\": 576, \"filename\": \"075231-photo-1565784796667-98515d255f7d-720x576.webp\"}, {\"ident\": \"preview_360_288\", \"width\": 202, \"height\": 288, \"filename\": \"075231-photo-1565784796667-98515d255f7d-360x288.webp\"}]');
INSERT INTO `medias` VALUES (5, 'E20251223-031822-0011', '', 'E20251223-031822-0011', 'image/png', '2025-12-23 03:20:25', '032023-E20251223-031822-0011.png', 10409, '/uploads/20251222/', 291, 290, '[{\"ident\": \"preview_1280_1024\", \"width\": 291, \"height\": 290, \"filename\": \"032023-E20251223-031822-0011-1280x1024.webp\"}, {\"ident\": \"preview_1024_820\", \"width\": 291, \"height\": 290, \"filename\": \"032023-E20251223-031822-0011-1024x820.webp\"}, {\"ident\": \"preview_720_576\", \"width\": 291, \"height\": 290, \"filename\": \"032023-E20251223-031822-0011-720x576.webp\"}, {\"ident\": \"preview_360_288\", \"width\": 289, \"height\": 288, \"filename\": \"032023-E20251223-031822-0011-360x288.webp\"}]');

-- ----------------------------
-- Table structure for pages
-- ----------------------------
DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `meta_title` json NULL,
  `meta_desc` json NULL,
  `content_json` json NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `slug`(`slug`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pages
-- ----------------------------

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `author_id` int(11) NULL DEFAULT NULL,
  `is_published` tinyint(1) NULL DEFAULT 0,
  `published_at` datetime NULL DEFAULT NULL,
  `title` json NULL,
  `excerpt` json NULL,
  `content` json NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `category_id` int(11) NULL DEFAULT NULL,
  `quote` json NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `seo_title` json NULL,
  `seo_description` json NULL,
  `seo_keywords` json NULL,
  `seo_canonical` json NULL,
  `related_ids` json NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `slug`(`slug`) USING BTREE,
  INDEX `author_id`(`author_id`) USING BTREE,
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, '5-benefits-dance-training-children', '/uploads/20251210/171813-.photo-1657740034790-f860d612d1b2[1]', 2, 1, '2025-12-06 17:50:00', '{\"en\": \"5 Benefits of Dance Training for Children\", \"he\": \"\", \"ru\": \"5 преимуществ для занятия танцами для детей\"}', '{\"en\": \"Discover how dance classes can improve your child\'s physical coordination, social skills, and self-confidence. Learn why dance is one of the most comprehensive activities for child development.\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"270e299c-8ea0-41e5-81ed-9df673774ab8\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Dance is far more than just a fun activity for children—it\'s a comprehensive developmental tool that nurtures physical, emotional, and social growth. As experienced dance instructors at our Eilat studio, we\'ve witnessed firsthand the transformative power of dance in children\'s lives.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"f69e2020-85a0-4be7-ae7e-9a3871ad5645\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"1. Physical Coordination and Motor Skills\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"ff39cc5a-3281-4e02-ad0a-6f7abce6eb53\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Dance training significantly improves a child\'s gross and fine motor skills. Through structured movement and choreography, children develop better balance, spatial awareness, and body control. These foundational skills transfer to other physical activities and daily tasks, helping children move more confidently and safely.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"2c2eace1-1e9b-4f2c-8215-375ce44f2368\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Regular dance classes also enhance cardiovascular health, muscle tone, and flexibility. Unlike many sports that focus on specific muscle groups, dance provides a full-body workout that develops strength evenly across the entire body.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"3d12cc4e-14dc-4718-b423-c52efff904b7\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"2. Confidence and Self-Expression\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"fd0472af-7364-4b7e-bfc8-e52127891ebd\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"One of the most beautiful aspects of dance is how it empowers children to express themselves creatively. In our classes, we encourage students to interpret music and emotions through movement, giving them a healthy outlet for self-expression.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"84a8740d-b14f-4cf6-a0b4-0038482d950f\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"As children master new steps and perform in front of others, their confidence grows exponentially. This self-assurance extends beyond the studio, positively affecting their academic performance and social interactions.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"0f23b744-ce7c-47f3-a9b9-301d8bfbdf93\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"3. Social Skills and Teamwork\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"984d0883-8971-4702-b5dd-b9127a08239d\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Dance classes provide a structured social environment where children learn to work together, respect others, and develop friendships. Group choreography teaches the importance of coordination, timing, and supporting fellow dancers.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"14bbe694-8d20-447d-843b-4f93271c68c3\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Students learn to give and receive constructive feedback, celebrate each other\'s successes, and navigate the dynamics of being part of a team. These social skills are invaluable as children grow and face increasingly complex social situations.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"da11ab2f-8c35-4c19-a95b-db2c854a6a7a\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"4. Discipline and Focus\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"a2a03316-949f-4546-ba83-f786fdcddc8d\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Learning dance requires dedication, patience, and consistent practice. Children develop discipline as they work to perfect movements, remember choreography, and prepare for performances. This structured approach to learning helps build strong work habits that benefit academic pursuits.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"3493eaa0-25b1-49c0-b2c2-497d9e101f8d\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"The focus required in dance class—listening to instructions, counting beats, and coordinating movements—strengthens concentration skills that translate directly to classroom learning and homework completion.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"f1a22d27-8a04-4a23-bf61-71dfbddea171\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"5. Cultural Awareness and Appreciation\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"98cf3c89-3678-4536-b513-2e0efad196e9\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Through exposure to various dance styles from different cultures—from Argentine Tango to Hip-hop—children develop an appreciation for diversity and global artistic traditions. This cultural education broadens their worldview and fosters respect for different backgrounds and traditions.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"16b5f28f-66b5-43c3-bcd5-e7bc4ea30e9c\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"At our studio, we incorporate stories and history behind dance styles, helping children understand the cultural context of the movements they\'re learning.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"ae8935a6-c280-4971-b42b-a61d47e68d9d\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Getting Started\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"fd4a87bb-3d18-48ea-8571-40b30d3bdb30\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"If you\'re considering dance classes for your child, there\'s no better time to start than now. Our beginner-friendly classes for children aged 3-6 provide a welcoming environment where kids can explore movement, make friends, and develop skills that will benefit them throughout their lives.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"b6c9d203-6777-4692-97ed-3743e95f4ddb\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"We invite you to visit our studio in Eilat, observe a class, and see firsthand how dance can enrich your child\'s development. Book a trial class today and watch your child discover the joy of movement!\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"86c58c39-e51c-40e9-8b16-22951071c558\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]},{\\\"id\\\":\\\"31ebd83c-8bdb-44e2-b3b5-dcc0c86647d6\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2025-12-09 10:50:01', 1, '{\"text\": {\"en\": \"Dance gives children a voice when words aren\'t enough. It\'s a language that transcends barriers and builds confidence from the inside out.\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"Sofia, Lead Instructor\"}', 0, NULL, NULL, NULL, NULL, '[]');
INSERT INTO `posts` VALUES (2, 'choose-right-dance-style', '/uploads/20251216/075231-photo-1565784796667-98515d255f7d.jpg', 1, 1, '2025-11-09 11:49:00', '{\"en\": \"How to Choose the Right Dance Style for You\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"Not sure which dance style to try? This guide will help you understand the characteristics of different dance forms and find the perfect match for your personality and fitness goals.\\n\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"9946f141-3735-424a-9154-67586226c999\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Choosing the right dance style can feel overwhelming with so many options available. Whether you\'re looking for a high-energy workout, artistic expression, or social connection, there\'s a perfect dance style waiting for you. Let me help you navigate the options.\\\",\\\"styles\\\":{\\\"italic\\\":true}}],\\\"children\\\":[]},{\\\"id\\\":\\\"8f35429f-a251-4e52-9fb5-218fea5ac1ef\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Consider Your Personality\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"36266e92-6dc7-45f4-9c9a-6788c8aa03cf\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Your personality plays a huge role in which dance style will resonate with you. Are you outgoing and energetic? Hip-hop or Jazz-funk might be perfect. More introspective and graceful? Ballet or Contemporary could be your match.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"b6354775-ded4-417f-9d12-57bb2c06bfa1\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Think about how you like to move naturally. Do you prefer sharp, precise movements or flowing, lyrical ones? Your instinctive movement preferences can guide you toward styles that will feel most natural and enjoyable.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"88cfc0eb-4024-4d48-8b39-34cbee8c6781\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Fitness Goals Matter\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"364852f3-a0be-4493-9577-7d5e7474c430\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Different dance styles offer different fitness benefits. Hip-hop and Jazz-funk provide intense cardiovascular workouts with high energy. Ballet builds strength, posture, and flexibility through controlled movements.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"91b6e09d-1720-451c-b6b1-c6c3ec8e94ec\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Argentine Tango offers a unique blend of cardio and muscle toning while emphasizing connection and musicality. If flexibility is your main goal, styles that incorporate extensive stretching like Contemporary or Jazz will serve you well.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"773c7246-08e6-4d8d-8c8a-33f48ab03f77\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Social vs. Solo Dancing\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"cb5eee1d-89b6-4af5-bed0-5fb6b32946bc\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Some dance styles are inherently social. Argentine Tango and Salsa require a partner and emphasize connection and communication. These styles are perfect if you\'re looking to meet people and build social skills.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"b7765bd6-2b38-4109-8cb1-abda19ab1cf9\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Other styles like Hip-hop, Jazz-funk, and Contemporary can be performed solo or in groups. These offer flexibility depending on your mood and comfort level with social interaction.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"8b94420d-c7e0-4d6a-8ca0-44aca691b0ca\\\",\\\"type\\\":\\\"heading\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\",\\\"level\\\":3,\\\"isToggleable\\\":false},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Try Before You Commit\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"894d81ec-5279-45d6-9f26-e9795a60d5ac\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"The best way to find your perfect dance style is to try several classes. Most studios, including ours, offer trial classes or beginner packages that let you sample different styles.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"88deddca-fe76-4232-ae15-d124b9bbca20\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Don\'t be discouraged if the first style you try doesn\'t click immediately. Dance skills develop over time, and sometimes the style that challenges you most ends up becoming your favorite. Give each style at least 2-3 classes before making a decision.\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"8885ca98-bed3-4ee9-863e-156a793af073\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2025-12-16 07:58:00', 2, '{\"text\": {\"en\": \"There\'s no wrong choice in dance. Every style teaches valuable skills and brings joy. The right style is simply the one that makes you want to come back for more.\\n\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"Maxim, Dance Instructor\"}', 1, NULL, NULL, NULL, NULL, '[1, 3]');
INSERT INTO `posts` VALUES (3, 'some-broken', '/uploads/20251209/212730-cat_save_small.jpg', NULL, 1, '2025-12-19 21:15:00', '{\"en\": \"Some broken\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"excert\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"f537365f-fdcf-42c8-8954-5a1044b807ab\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Это содержимое с картинкой\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"f8a0ffa5-f4d2-4d30-be02-2949f5c9702f\\\",\\\"type\\\":\\\"image\\\",\\\"props\\\":{\\\"textAlignment\\\":\\\"left\\\",\\\"backgroundColor\\\":\\\"default\\\",\\\"name\\\":\\\"\\\",\\\"url\\\":\\\"/uploads/20251209/212730-cat_save_small.jpg\\\",\\\"caption\\\":\\\"cat_save_small\\\",\\\"showPreview\\\":true,\\\"previewWidth\\\":\\\"100%\\\"},\\\"children\\\":[]},{\\\"id\\\":\\\"e8ffb8b2-326a-46d5-9dce-879ff5c6bcdb\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Картинка\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"5e0062c9-ef4e-4a60-a375-03a92d26afbc\\\",\\\"type\\\":\\\"quote\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата \\\\n\\\\n- Автор имя\\\",\\\"styles\\\":{\\\"italic\\\":true}}],\\\"children\\\":[]},{\\\"id\\\":\\\"11edcd5d-ee05-46db-b4b6-feb7737bbee7\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Это видео\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"155b1ccb-031a-4086-8004-3e1991d97e1b\\\",\\\"type\\\":\\\"video\\\",\\\"props\\\":{\\\"textAlignment\\\":\\\"left\\\",\\\"backgroundColor\\\":\\\"default\\\",\\\"name\\\":\\\"watch?v=g_CpbgKztFE&list=RDg_CpbgKztFE&start_radio=1\\\",\\\"url\\\":\\\"https://www.youtube.com/watch?v=g_CpbgKztFE&list=RDg_CpbgKztFE&start_radio=1\\\",\\\"caption\\\":\\\"\\\",\\\"showPreview\\\":true,\\\"previewWidth\\\":473},\\\"children\\\":[]},{\\\"id\\\":\\\"933baade-ee5d-417b-a676-2dee85008d0b\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2025-12-23 00:15:31', NULL, '{\"text\": {\"en\": \"Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата Это красивая цитата\\n\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"С подписью\"}', 0, NULL, NULL, NULL, NULL, '[]');
INSERT INTO `posts` VALUES (4, 'some-fill-post', '', NULL, 1, '2026-01-14 03:07:39', '{\"en\": \"some fill post\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"eca7587e-69c8-4e3e-85ee-7cba69accbdd\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"some post content\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"3c96a0fa-96b7-400a-8324-dedeb1b581cb\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2026-01-14 03:07:38', NULL, '{\"text\": {\"en\": \"\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"\"}', 0, NULL, NULL, NULL, NULL, '[]');
INSERT INTO `posts` VALUES (5, 'some-more-post2', '', 2, 1, '2026-01-14 03:08:24', '{\"en\": \"some more post2\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"83f786be-144e-4ea2-8822-921eb269379c\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Some more post text\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"48e327ef-7d80-4c45-b37a-15e0f8908cce\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2026-01-14 03:08:23', 2, '{\"text\": {\"en\": \"\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"\"}', 0, NULL, NULL, NULL, NULL, '[]');
INSERT INTO `posts` VALUES (6, 'one-more-beautiful-post', '', 3, 1, '2026-01-14 03:10:24', '{\"en\": \"One more beautiful post\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"da2eb850-97fd-40f1-b696-7d2ec097a8ea\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"One more beautiful post One more beautiful post\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"2396f5a4-f4c7-4183-84f0-010eebf7676b\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2026-01-14 03:10:24', 2, '{\"text\": {\"en\": \"\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"\"}', 0, NULL, NULL, NULL, NULL, '[]');
INSERT INTO `posts` VALUES (7, 'one-else-post77', '', NULL, 1, '2026-01-14 03:17:30', '{\"en\": \"One else post777\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"fddb014a-ec34-4ca9-8787-25463bb82514\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"One else post777 One else post777 One else post777\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"2a323951-eca3-4ecd-80e5-6b9906238962\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2026-01-14 03:17:30', NULL, '{\"text\": {\"en\": \"\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"\"}', 0, NULL, NULL, NULL, NULL, '[]');
INSERT INTO `posts` VALUES (8, 's', '', NULL, 1, '2026-01-14 03:18:57', '{\"en\": \"Second page post\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"[{\\\"id\\\":\\\"6a0ee0ff-7bd4-4e75-94c0-e99bc4a01666\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[{\\\"type\\\":\\\"text\\\",\\\"text\\\":\\\"Second page post Second page post Second page post\\\",\\\"styles\\\":{}}],\\\"children\\\":[]},{\\\"id\\\":\\\"44cae075-2ca4-46f0-a9f5-64d90ac0ffe4\\\",\\\"type\\\":\\\"paragraph\\\",\\\"props\\\":{\\\"backgroundColor\\\":\\\"default\\\",\\\"textColor\\\":\\\"default\\\",\\\"textAlignment\\\":\\\"left\\\"},\\\"content\\\":[],\\\"children\\\":[]}]\", \"he\": \"\", \"ru\": \"\"}', '2026-01-14 03:18:57', NULL, '{\"text\": {\"en\": \"\", \"he\": \"\", \"ru\": \"\"}, \"author\": \"\"}', 0, NULL, NULL, NULL, NULL, '[]');

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_name` json NULL,
  `content` json NULL,
  `video_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `is_featured` tinyint(1) NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reviews
-- ----------------------------
INSERT INTO `reviews` VALUES (1, '{\"en\": \"Sarah M.\", \"he\": \"\", \"ru\": \"\"}', '{\"en\": \"Best dance studio in the city! The teachers are amazing and really care about each student.\", \"he\": \"\", \"ru\": \"\"}', 'https://www.youtube.com/watch?v=xIBRdED6suc', 1, '2025-12-13 00:29:19');
INSERT INTO `reviews` VALUES (2, '{\"en\": \"Michael K.\", \"he\": \"\", \"ru\": \"Михаил К.\"}', '{\"en\": \"My daughter has been dancing here for 2 years and loves every class. Highly recommend!\", \"he\": \"\", \"ru\": \"Моя дочь занимается здесь танцами уже 2 года и обожает все занятия. Очень рекомендую!\"}', 'https://www.youtube.com/watch?v=0_Kq3IQQMNA', 1, '2025-12-13 00:48:30');

-- ----------------------------
-- Table structure for schedule_items
-- ----------------------------
DROP TABLE IF EXISTS `schedule_items`;
CREATE TABLE `schedule_items`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `day_date` date NOT NULL,
  `start_time` time NOT NULL,
  `duration_minutes` int(11) NULL DEFAULT 60,
  `class_name` json NULL,
  `level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `instructor_id` int(11) NULL DEFAULT NULL,
  `category` enum('all','kids','adults') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'all',
  `comment` json NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `instructors` json NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `instructor_id`(`instructor_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schedule_items
-- ----------------------------
INSERT INTO `schedule_items` VALUES (1, '2025-12-22', '18:00:00', 60, '{\"en\": \"Hip-Hop\", \"he\": \"היפ הופ\", \"ru\": \"Хип-хоп\"}', 'Beginner', 1, 'all', NULL, NULL, NULL);
INSERT INTO `schedule_items` VALUES (2, '2025-12-23', '19:30:00', 60, '{\"en\": \"Tango\", \"ru\": \"Танго\"}', 'Advanced', 1, 'all', NULL, NULL, NULL);
INSERT INTO `schedule_items` VALUES (3, '2025-12-23', '16:00:00', 60, '{\"en\": \"Ballet\", \"ru\": \"Балет\"}', 'Beginner', 2, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', NULL, NULL);
INSERT INTO `schedule_items` VALUES (4, '2025-12-24', '13:30:00', 60, '{\"en\": \"Practice\"}', 'Intermediate', 2, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', NULL, NULL);
INSERT INTO `schedule_items` VALUES (5, '2025-12-26', '14:00:00', 60, '{\"en\": \"Qualify Test\"}', 'Intermediate', NULL, 'all', NULL, NULL, NULL);
INSERT INTO `schedule_items` VALUES (6, '2025-12-27', '13:00:00', 60, '{\"en\": \"Contemp\"}', 'All Levels', NULL, 'all', NULL, NULL, NULL);
INSERT INTO `schedule_items` VALUES (8, '2025-12-28', '14:30:00', 60, '{\"en\": \"Hip-Hop Women\"}', 'All Levels', NULL, 'adults', NULL, NULL, NULL);
INSERT INTO `schedule_items` VALUES (9, '2025-12-21', '18:00:00', 60, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"\"}', 'Beginner', 2, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', NULL, NULL);
INSERT INTO `schedule_items` VALUES (10, '2025-12-23', '14:00:00', 60, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"\"}', 'Beginner', 1, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', NULL, NULL);
INSERT INTO `schedule_items` VALUES (11, '2025-12-24', '18:00:00', 60, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"Детский Хип-хоп\"}', 'Advanced', NULL, 'all', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', NULL, NULL);
INSERT INTO `schedule_items` VALUES (12, '2025-12-31', '14:00:00', 60, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"Детский Хип-хоп\"}', 'Beginner', 2, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', 45.00, NULL);
INSERT INTO `schedule_items` VALUES (13, '2025-12-24', '14:00:00', 60, '{\"en\": \"Kids Hip-Hop22\", \"he\": \"\", \"ru\": \"Детский Хип-хоп22\"}', 'All Levels', NULL, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', NULL, NULL);
INSERT INTO `schedule_items` VALUES (14, '2026-01-01', '11:15:00', 60, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"Детский Хип-хоп\"}', 'Beginner', 2, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', 30.00, NULL);
INSERT INTO `schedule_items` VALUES (15, '2026-01-07', '18:00:00', 60, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"Детский Хип-хоп\"}', 'Beginner', 2, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', 55.00, '[2, 3]');
INSERT INTO `schedule_items` VALUES (16, '2026-01-11', '13:00:00', 60, '{\"en\": \"Kids Hip-Hop\", \"he\": \"\", \"ru\": \"Детский Хип-хоп\"}', 'Intermediate', NULL, 'kids', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', 223.00, '[2, 3]');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uuid`(`uuid`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `setting_value` json NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `setting_key`(`setting_key`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of settings
-- ----------------------------
INSERT INTO `settings` VALUES (1, 'phone', '\"\"');
INSERT INTO `settings` VALUES (2, 'email', '\"\"');
INSERT INTO `settings` VALUES (3, 'address', '\"\"');
INSERT INTO `settings` VALUES (4, 'facebook', '\"\"');
INSERT INTO `settings` VALUES (5, 'instagram', '\"\"');
INSERT INTO `settings` VALUES (6, 'youtube', '\"\"');
INSERT INTO `settings` VALUES (7, 'whatsapp', '\"\"');
INSERT INTO `settings` VALUES (8, 'map_url', '\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1392.2919388437542!2d34.95375186968619!3d29.56122815468357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150071e961c864db%3A0xac0c05561f489b99!2sEilat%20Dance%20Center!5e1!3m2!1sen!2sru!4v1765612939949!5m2!1sen!2sru\"');
INSERT INTO `settings` VALUES (9, 'payment_phone', '\"+972 53 390 0165\"');
INSERT INTO `settings` VALUES (19, 'payment_phone_display', '\"053-390-0165\"');

-- ----------------------------
-- Table structure for translation_refs
-- ----------------------------
DROP TABLE IF EXISTS `translation_refs`;
CREATE TABLE `translation_refs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phrase_id` int(11) NOT NULL DEFAULT 0,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `positions` json NULL,
  `group_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phrase_id_2`(`phrase_id`, `path`) USING BTREE,
  INDEX `phrase_id`(`phrase_id`) USING BTREE,
  INDEX `path`(`path`) USING BTREE,
  INDEX `group_name`(`group_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 241 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of translation_refs
-- ----------------------------
INSERT INTO `translation_refs` VALUES (1, 2, 'src/components/AboutUs.tsx', '[1577]', NULL);
INSERT INTO `translation_refs` VALUES (2, 3, 'src/components/AboutUs.tsx', '[1629]', NULL);
INSERT INTO `translation_refs` VALUES (3, 4, 'src/components/AboutUs.tsx', '[1758]', NULL);
INSERT INTO `translation_refs` VALUES (4, 5, 'src/components/AboutUs.tsx', '[1812]', NULL);
INSERT INTO `translation_refs` VALUES (5, 6, 'src/components/AboutUs.tsx', '[1947]', NULL);
INSERT INTO `translation_refs` VALUES (6, 7, 'src/components/AboutUs.tsx', '[2002]', NULL);
INSERT INTO `translation_refs` VALUES (7, 8, 'src/components/AboutUs.tsx', '[3368, 4903]', NULL);
INSERT INTO `translation_refs` VALUES (8, 9, 'src/components/AboutUs.tsx', '[3503]', NULL);
INSERT INTO `translation_refs` VALUES (9, 10, 'src/components/AboutUs.tsx', '[3627, 5033]', NULL);
INSERT INTO `translation_refs` VALUES (10, 11, 'src/components/AboutUs.tsx', '[5169, 5601]', NULL);
INSERT INTO `translation_refs` VALUES (11, 12, 'src/components/AboutUs.tsx', '[5470]', NULL);
INSERT INTO `translation_refs` VALUES (14, 15, 'src/components/AboutUs.tsx', '[11884]', NULL);
INSERT INTO `translation_refs` VALUES (15, 16, 'src/components/AboutUs.tsx', '[12023]', NULL);
INSERT INTO `translation_refs` VALUES (16, 17, 'src/components/Blog.tsx', '[1874]', NULL);
INSERT INTO `translation_refs` VALUES (17, 18, 'src/components/Blog.tsx', '[2008]', NULL);
INSERT INTO `translation_refs` VALUES (18, 19, 'src/components/Blog.tsx', '[2142]', NULL);
INSERT INTO `translation_refs` VALUES (19, 20, 'src/components/Contacts.tsx', '[3450]', NULL);
INSERT INTO `translation_refs` VALUES (20, 21, 'src/components/Contacts.tsx', '[3590]', NULL);
INSERT INTO `translation_refs` VALUES (21, 22, 'src/components/Contacts.tsx', '[3730]', NULL);
INSERT INTO `translation_refs` VALUES (22, 23, 'src/components/Contacts.tsx', '[5890]', NULL);
INSERT INTO `translation_refs` VALUES (23, 24, 'src/components/Contacts.tsx', '[9469]', NULL);
INSERT INTO `translation_refs` VALUES (24, 25, 'src/components/Contacts.tsx', '[9573]', NULL);
INSERT INTO `translation_refs` VALUES (25, 26, 'src/components/Contacts.tsx', '[9694]', NULL);
INSERT INTO `translation_refs` VALUES (26, 27, 'src/components/Contacts.tsx', '[10016]', NULL);
INSERT INTO `translation_refs` VALUES (27, 28, 'src/components/DanceStyles.tsx', '[5739]', NULL);
INSERT INTO `translation_refs` VALUES (28, 29, 'src/components/DanceStyles.tsx', '[5878]', NULL);
INSERT INTO `translation_refs` VALUES (29, 30, 'src/components/DanceStyles.tsx', '[6014]', NULL);
INSERT INTO `translation_refs` VALUES (30, 31, 'src/components/DanceStyles.tsx', '[6605]', NULL);
INSERT INTO `translation_refs` VALUES (31, 1, 'src/components/Footer.tsx', '[1949]', NULL);
INSERT INTO `translation_refs` VALUES (32, 32, 'src/components/Footer.tsx', '[2062]', NULL);
INSERT INTO `translation_refs` VALUES (33, 33, 'src/components/Footer.tsx', '[2177]', NULL);
INSERT INTO `translation_refs` VALUES (34, 34, 'src/components/Footer.tsx', '[2295]', NULL);
INSERT INTO `translation_refs` VALUES (35, 35, 'src/components/Footer.tsx', '[2415]', NULL);
INSERT INTO `translation_refs` VALUES (36, 36, 'src/components/Footer.tsx', '[2531]', NULL);
INSERT INTO `translation_refs` VALUES (37, 27, 'src/components/Footer.tsx', '[4021]', NULL);
INSERT INTO `translation_refs` VALUES (38, 1, 'src/components/Header.tsx', '[610]', NULL);
INSERT INTO `translation_refs` VALUES (39, 32, 'src/components/Header.tsx', '[656]', NULL);
INSERT INTO `translation_refs` VALUES (40, 33, 'src/components/Header.tsx', '[704]', NULL);
INSERT INTO `translation_refs` VALUES (41, 34, 'src/components/Header.tsx', '[755]', NULL);
INSERT INTO `translation_refs` VALUES (42, 35, 'src/components/Header.tsx', '[808]', NULL);
INSERT INTO `translation_refs` VALUES (43, 36, 'src/components/Header.tsx', '[857]', NULL);
INSERT INTO `translation_refs` VALUES (44, 37, 'src/components/Header.tsx', '[906]', NULL);
INSERT INTO `translation_refs` VALUES (45, 38, 'src/components/HomePage.tsx', '[8382]', NULL);
INSERT INTO `translation_refs` VALUES (46, 39, 'src/components/Instructors.tsx', '[5745]', NULL);
INSERT INTO `translation_refs` VALUES (47, 13, 'src/components/Instructors.tsx', '[5886]', NULL);
INSERT INTO `translation_refs` VALUES (48, 14, 'src/components/Instructors.tsx', '[6024]', NULL);
INSERT INTO `translation_refs` VALUES (49, 40, 'src/components/Schedule.tsx', '[2673, 3451]', NULL);
INSERT INTO `translation_refs` VALUES (50, 41, 'src/components/Schedule.tsx', '[2700, 3863]', NULL);
INSERT INTO `translation_refs` VALUES (51, 42, 'src/components/Schedule.tsx', '[2728, 4192]', NULL);
INSERT INTO `translation_refs` VALUES (52, 43, 'src/components/Schedule.tsx', '[2761, 4620]', NULL);
INSERT INTO `translation_refs` VALUES (53, 44, 'src/components/Schedule.tsx', '[2790, 5021]', NULL);
INSERT INTO `translation_refs` VALUES (54, 45, 'src/components/Schedule.tsx', '[2817, 5445]', NULL);
INSERT INTO `translation_refs` VALUES (55, 46, 'src/components/Schedule.tsx', '[2846, 5761]', NULL);
INSERT INTO `translation_refs` VALUES (56, 47, 'src/components/Schedule.tsx', '[3550, 3974, 4295, 4721, 5131, 5226, 5546, 5860]', NULL);
INSERT INTO `translation_refs` VALUES (57, 48, 'src/components/Schedule.tsx', '[3640, 3823, 4067, 4482, 4896, 5405, 5636, 6053]', NULL);
INSERT INTO `translation_refs` VALUES (58, 49, 'src/components/Schedule.tsx', '[4390, 4584, 5958]', NULL);
INSERT INTO `translation_refs` VALUES (59, 50, 'src/components/Schedule.tsx', '[11214]', NULL);
INSERT INTO `translation_refs` VALUES (60, 51, 'src/components/Schedule.tsx', '[11355]', NULL);
INSERT INTO `translation_refs` VALUES (61, 52, 'src/components/Schedule.tsx', '[11493]', NULL);
INSERT INTO `translation_refs` VALUES (62, 38, 'src/components/ScheduleCard.tsx', '[1887]', NULL);
INSERT INTO `translation_refs` VALUES (63, 38, 'src/components/StyleCard.tsx', '[4785]', NULL);
INSERT INTO `translation_refs` VALUES (64, 53, 'src/lib/scanner.ts', '[2210]', '...');
INSERT INTO `translation_refs` VALUES (66, 54, 'src/components/HomePage.tsx', '[7162]', NULL);
INSERT INTO `translation_refs` VALUES (67, 55, 'src/components/HomePage.tsx', '[7359]', NULL);
INSERT INTO `translation_refs` VALUES (68, 56, 'src/components/HomePage.tsx', '[7636]', NULL);
INSERT INTO `translation_refs` VALUES (69, 57, 'src/components/HomePage.tsx', '[7826]', NULL);
INSERT INTO `translation_refs` VALUES (70, 58, 'src/components/HomePage.tsx', '[8857]', NULL);
INSERT INTO `translation_refs` VALUES (71, 59, 'src/components/HomePage.tsx', '[9250]', NULL);
INSERT INTO `translation_refs` VALUES (72, 60, 'src/components/HomePage.tsx', '[9491]', NULL);
INSERT INTO `translation_refs` VALUES (73, 61, 'src/components/HomePage.tsx', '[9735]', NULL);
INSERT INTO `translation_refs` VALUES (74, 54, 'src/components/AboutUs.tsx', '[1048]', NULL);
INSERT INTO `translation_refs` VALUES (75, 62, 'src/components/BlogPostComponent.tsx', '[1546, 1662]', NULL);
INSERT INTO `translation_refs` VALUES (76, 63, 'src/components/BlogPostComponent.tsx', '[1998]', NULL);
INSERT INTO `translation_refs` VALUES (77, 64, 'src/components/Login.tsx', '[1256]', NULL);
INSERT INTO `translation_refs` VALUES (78, 65, 'src/components/Login.tsx', '[1958]', NULL);
INSERT INTO `translation_refs` VALUES (79, 66, 'src/components/Login.tsx', '[2078]', NULL);
INSERT INTO `translation_refs` VALUES (80, 67, 'src/components/Login.tsx', '[2377]', NULL);
INSERT INTO `translation_refs` VALUES (81, 68, 'src/components/Login.tsx', '[2779]', NULL);
INSERT INTO `translation_refs` VALUES (82, 69, 'src/components/Login.tsx', '[3171]', NULL);
INSERT INTO `translation_refs` VALUES (83, 70, 'src/components/Login.tsx', '[3212]', NULL);
INSERT INTO `translation_refs` VALUES (84, 71, 'src/components/Schedule.tsx', '[6476, 6564]', NULL);
INSERT INTO `translation_refs` VALUES (85, 72, 'src/components/Schedule.tsx', '[6840]', NULL);
INSERT INTO `translation_refs` VALUES (86, 73, 'src/components/Schedule.tsx', '[12145]', NULL);
INSERT INTO `translation_refs` VALUES (87, 74, 'src/components/Schedule.tsx', '[12591]', NULL);
INSERT INTO `translation_refs` VALUES (108, 95, 'src/components/DanceStyles.tsx', '[3208]', NULL);
INSERT INTO `translation_refs` VALUES (109, 96, 'src/components/DanceStyles.tsx', '[3823]', NULL);
INSERT INTO `translation_refs` VALUES (110, 97, 'src/components/DanceStyles.tsx', '[4198]', NULL);
INSERT INTO `translation_refs` VALUES (111, 98, 'src/components/DanceStyles.tsx', '[4349]', NULL);
INSERT INTO `translation_refs` VALUES (112, 99, 'src/components/DanceStyles.tsx', '[7068]', NULL);
INSERT INTO `translation_refs` VALUES (113, 100, 'src/components/DanceStyles.tsx', '[7537]', NULL);
INSERT INTO `translation_refs` VALUES (114, 101, 'src/components/Instructors.tsx', '[323]', NULL);
INSERT INTO `translation_refs` VALUES (115, 102, 'src/components/Instructors.tsx', '[374]', NULL);
INSERT INTO `translation_refs` VALUES (116, 103, 'src/components/Instructors.tsx', '[452]', NULL);
INSERT INTO `translation_refs` VALUES (117, 104, 'src/components/Instructors.tsx', '[741]', NULL);
INSERT INTO `translation_refs` VALUES (118, 105, 'src/components/Instructors.tsx', '[857]', NULL);
INSERT INTO `translation_refs` VALUES (119, 106, 'src/components/Instructors.tsx', '[1101]', NULL);
INSERT INTO `translation_refs` VALUES (120, 107, 'src/components/Instructors.tsx', '[1183]', NULL);
INSERT INTO `translation_refs` VALUES (121, 108, 'src/components/Instructors.tsx', '[1394]', NULL);
INSERT INTO `translation_refs` VALUES (122, 109, 'src/components/Instructors.tsx', '[1544]', NULL);
INSERT INTO `translation_refs` VALUES (123, 110, 'src/components/Instructors.tsx', '[1661]', NULL);
INSERT INTO `translation_refs` VALUES (124, 111, 'src/components/Instructors.tsx', '[1743]', NULL);
INSERT INTO `translation_refs` VALUES (125, 112, 'src/components/Instructors.tsx', '[1832]', NULL);
INSERT INTO `translation_refs` VALUES (126, 113, 'src/components/Instructors.tsx', '[1883]', NULL);
INSERT INTO `translation_refs` VALUES (127, 114, 'src/components/Instructors.tsx', '[1966]', NULL);
INSERT INTO `translation_refs` VALUES (128, 115, 'src/components/Instructors.tsx', '[2255]', NULL);
INSERT INTO `translation_refs` VALUES (129, 116, 'src/components/Instructors.tsx', '[2371]', NULL);
INSERT INTO `translation_refs` VALUES (130, 117, 'src/components/Instructors.tsx', '[2624]', NULL);
INSERT INTO `translation_refs` VALUES (131, 118, 'src/components/Instructors.tsx', '[2706]', NULL);
INSERT INTO `translation_refs` VALUES (132, 119, 'src/components/Instructors.tsx', '[2911]', NULL);
INSERT INTO `translation_refs` VALUES (133, 120, 'src/components/Instructors.tsx', '[3077]', NULL);
INSERT INTO `translation_refs` VALUES (134, 121, 'src/components/Instructors.tsx', '[3189]', NULL);
INSERT INTO `translation_refs` VALUES (135, 122, 'src/components/Instructors.tsx', '[3267]', NULL);
INSERT INTO `translation_refs` VALUES (136, 123, 'src/components/Instructors.tsx', '[4209]', NULL);
INSERT INTO `translation_refs` VALUES (137, 124, 'src/components/Instructors.tsx', '[4365]', NULL);
INSERT INTO `translation_refs` VALUES (138, 125, 'src/components/Instructors.tsx', '[7877]', NULL);
INSERT INTO `translation_refs` VALUES (139, 126, 'src/components/Instructors.tsx', '[7990]', NULL);
INSERT INTO `translation_refs` VALUES (140, 127, 'src/components/Instructors.tsx', '[9909]', NULL);
INSERT INTO `translation_refs` VALUES (141, 128, 'src/components/Instructors.tsx', '[10857]', NULL);
INSERT INTO `translation_refs` VALUES (142, 129, 'src/components/Footer.tsx', '[1290]', NULL);
INSERT INTO `translation_refs` VALUES (143, 130, 'src/components/Footer.tsx', '[1697]', NULL);
INSERT INTO `translation_refs` VALUES (144, 131, 'src/components/Footer.tsx', '[2745]', NULL);
INSERT INTO `translation_refs` VALUES (145, 132, 'src/components/Footer.tsx', '[6032]', NULL);
INSERT INTO `translation_refs` VALUES (146, 133, 'src/components/Footer.tsx', '[6331]', NULL);
INSERT INTO `translation_refs` VALUES (147, 134, 'src/components/HomePage.tsx', '[11749]', NULL);
INSERT INTO `translation_refs` VALUES (148, 135, 'src/components/HomePage.tsx', '[11885]', NULL);
INSERT INTO `translation_refs` VALUES (149, 136, 'src/components/HomePage.tsx', '[12114]', NULL);
INSERT INTO `translation_refs` VALUES (150, 137, 'src/components/HomePage.tsx', '[12738, 12980]', NULL);
INSERT INTO `translation_refs` VALUES (151, 138, 'src/components/HomePage.tsx', '[13772]', NULL);
INSERT INTO `translation_refs` VALUES (152, 139, 'src/components/HomePage.tsx', '[13938]', NULL);
INSERT INTO `translation_refs` VALUES (153, 140, 'src/components/HomePage.tsx', '[14083]', NULL);
INSERT INTO `translation_refs` VALUES (154, 141, 'src/components/HomePage.tsx', '[15405]', NULL);
INSERT INTO `translation_refs` VALUES (155, 142, 'src/components/HomePage.tsx', '[15529]', NULL);
INSERT INTO `translation_refs` VALUES (156, 143, 'src/components/HomePage.tsx', '[15708]', NULL);
INSERT INTO `translation_refs` VALUES (157, 144, 'src/components/HomePage.tsx', '[17942]', NULL);
INSERT INTO `translation_refs` VALUES (158, 145, 'src/components/HomePage.tsx', '[18516]', NULL);
INSERT INTO `translation_refs` VALUES (159, 146, 'src/components/HomePage.tsx', '[18637]', NULL);
INSERT INTO `translation_refs` VALUES (160, 147, 'src/components/HomePage.tsx', '[18885]', NULL);
INSERT INTO `translation_refs` VALUES (161, 148, 'src/components/HomePage.tsx', '[22087]', NULL);
INSERT INTO `translation_refs` VALUES (162, 149, 'src/components/HomePage.tsx', '[22281]', NULL);
INSERT INTO `translation_refs` VALUES (163, 150, 'src/components/HomePage.tsx', '[22678]', NULL);
INSERT INTO `translation_refs` VALUES (164, 151, 'src/components/HomePage.tsx', '[1527]', NULL);
INSERT INTO `translation_refs` VALUES (165, 152, 'src/components/HomePage.tsx', '[1604]', NULL);
INSERT INTO `translation_refs` VALUES (166, 153, 'src/components/HomePage.tsx', '[1803]', NULL);
INSERT INTO `translation_refs` VALUES (167, 154, 'src/components/HomePage.tsx', '[1870]', NULL);
INSERT INTO `translation_refs` VALUES (168, 155, 'src/components/HomePage.tsx', '[2065]', NULL);
INSERT INTO `translation_refs` VALUES (169, 156, 'src/components/HomePage.tsx', '[2138]', NULL);
INSERT INTO `translation_refs` VALUES (171, 158, 'src/components/Contacts.tsx', '[5246]', NULL);
INSERT INTO `translation_refs` VALUES (172, 159, 'src/components/Contacts.tsx', '[5365]', NULL);
INSERT INTO `translation_refs` VALUES (173, 160, 'src/components/Contacts.tsx', '[6603]', NULL);
INSERT INTO `translation_refs` VALUES (174, 161, 'src/components/Contacts.tsx', '[7445]', NULL);
INSERT INTO `translation_refs` VALUES (175, 162, 'src/components/Contacts.tsx', '[7770]', NULL);
INSERT INTO `translation_refs` VALUES (176, 163, 'src/components/Contacts.tsx', '[8536]', NULL);
INSERT INTO `translation_refs` VALUES (177, 164, 'src/components/Contacts.tsx', '[11996]', NULL);
INSERT INTO `translation_refs` VALUES (178, 165, 'src/components/Contacts.tsx', '[12578]', NULL);
INSERT INTO `translation_refs` VALUES (179, 166, 'src/components/Contacts.tsx', '[12719]', NULL);
INSERT INTO `translation_refs` VALUES (180, 167, 'src/components/Contacts.tsx', '[13632]', NULL);
INSERT INTO `translation_refs` VALUES (181, 168, 'src/components/Contacts.tsx', '[13755]', NULL);
INSERT INTO `translation_refs` VALUES (182, 169, 'src/components/Contacts.tsx', '[14571]', NULL);
INSERT INTO `translation_refs` VALUES (183, 170, 'src/components/Contacts.tsx', '[14696]', NULL);
INSERT INTO `translation_refs` VALUES (184, 75, 'src/components/ScheduleCardDialog.tsx', '[1850]', NULL);
INSERT INTO `translation_refs` VALUES (185, 76, 'src/components/ScheduleCardDialog.tsx', '[1996]', NULL);
INSERT INTO `translation_refs` VALUES (186, 77, 'src/components/ScheduleCardDialog.tsx', '[2284]', NULL);
INSERT INTO `translation_refs` VALUES (187, 78, 'src/components/ScheduleCardDialog.tsx', '[2587]', NULL);
INSERT INTO `translation_refs` VALUES (188, 79, 'src/components/ScheduleCardDialog.tsx', '[2887]', NULL);
INSERT INTO `translation_refs` VALUES (189, 80, 'src/components/ScheduleCardDialog.tsx', '[3199]', NULL);
INSERT INTO `translation_refs` VALUES (190, 81, 'src/components/ScheduleCardDialog.tsx', '[3469]', NULL);
INSERT INTO `translation_refs` VALUES (192, 83, 'src/components/ScheduleCardDialog.tsx', '[3825]', NULL);
INSERT INTO `translation_refs` VALUES (193, 84, 'src/components/ScheduleCardDialog.tsx', '[4089]', NULL);
INSERT INTO `translation_refs` VALUES (194, 85, 'src/components/ScheduleCardDialog.tsx', '[4413]', NULL);
INSERT INTO `translation_refs` VALUES (196, 87, 'src/components/ScheduleCardDialog.tsx', '[5140]', NULL);
INSERT INTO `translation_refs` VALUES (197, 88, 'src/components/ScheduleCardDialog.tsx', '[5211]', NULL);
INSERT INTO `translation_refs` VALUES (198, 89, 'src/components/ScheduleCardDialog.tsx', '[5438]', NULL);
INSERT INTO `translation_refs` VALUES (199, 90, 'src/components/ScheduleCardDialog.tsx', '[5725]', NULL);
INSERT INTO `translation_refs` VALUES (200, 91, 'src/components/ScheduleCardDialog.tsx', '[6084]', NULL);
INSERT INTO `translation_refs` VALUES (201, 92, 'src/components/ScheduleCardDialog.tsx', '[6465]', NULL);
INSERT INTO `translation_refs` VALUES (202, 93, 'src/components/ScheduleCardDialog.tsx', '[6895]', NULL);
INSERT INTO `translation_refs` VALUES (203, 94, 'src/components/ScheduleCardDialog.tsx', '[7053]', NULL);
INSERT INTO `translation_refs` VALUES (204, 171, 'src/components/ScheduleCardDialog.tsx', '[6172]', NULL);
INSERT INTO `translation_refs` VALUES (205, 172, 'src/app/[lang]/not-found.tsx', '[3675]', NULL);
INSERT INTO `translation_refs` VALUES (206, 173, 'src/app/[lang]/not-found.tsx', '[3850]', NULL);
INSERT INTO `translation_refs` VALUES (207, 174, 'src/app/[lang]/not-found.tsx', '[5353]', NULL);
INSERT INTO `translation_refs` VALUES (208, 175, 'src/app/[lang]/not-found.tsx', '[5865]', NULL);
INSERT INTO `translation_refs` VALUES (209, 176, 'src/app/[lang]/not-found.tsx', '[6080]', NULL);
INSERT INTO `translation_refs` VALUES (210, 177, 'src/app/[lang]/not-found.tsx', '[6487]', NULL);
INSERT INTO `translation_refs` VALUES (211, 178, 'src/app/[lang]/not-found.tsx', '[6817]', NULL);
INSERT INTO `translation_refs` VALUES (212, 179, 'src/app/[lang]/not-found.tsx', '[7145]', NULL);
INSERT INTO `translation_refs` VALUES (213, 180, 'src/app/[lang]/not-found.tsx', '[7469]', NULL);
INSERT INTO `translation_refs` VALUES (214, 181, 'src/components/AboutUs.tsx', '[6908]', NULL);
INSERT INTO `translation_refs` VALUES (215, 182, 'src/components/AboutUs.tsx', '[7066]', NULL);
INSERT INTO `translation_refs` VALUES (216, 183, 'src/components/AboutUs.tsx', '[7593]', NULL);
INSERT INTO `translation_refs` VALUES (217, 184, 'src/components/AboutUs.tsx', '[7896, 8329]', NULL);
INSERT INTO `translation_refs` VALUES (218, 185, 'src/components/AboutUs.tsx', '[8458]', NULL);
INSERT INTO `translation_refs` VALUES (219, 186, 'src/components/AboutUs.tsx', '[8642]', NULL);
INSERT INTO `translation_refs` VALUES (220, 187, 'src/components/AboutUs.tsx', '[8973]', NULL);
INSERT INTO `translation_refs` VALUES (221, 188, 'src/components/AboutUs.tsx', '[9192, 11345]', NULL);
INSERT INTO `translation_refs` VALUES (222, 189, 'src/components/AboutUs.tsx', '[9754]', NULL);
INSERT INTO `translation_refs` VALUES (223, 190, 'src/components/AboutUs.tsx', '[10057, 10488]', NULL);
INSERT INTO `translation_refs` VALUES (224, 191, 'src/components/AboutUs.tsx', '[10617]', NULL);
INSERT INTO `translation_refs` VALUES (225, 192, 'src/components/AboutUs.tsx', '[10801]', NULL);
INSERT INTO `translation_refs` VALUES (226, 193, 'src/components/AboutUs.tsx', '[11130]', NULL);
INSERT INTO `translation_refs` VALUES (227, 194, 'src/components/AboutUs.tsx', '[12423]', NULL);
INSERT INTO `translation_refs` VALUES (228, 195, 'src/components/AboutUs.tsx', '[12527]', NULL);
INSERT INTO `translation_refs` VALUES (229, 196, 'src/components/AboutUs.tsx', '[12639]', NULL);
INSERT INTO `translation_refs` VALUES (230, 197, 'src/components/AboutUs.tsx', '[13043]', NULL);
INSERT INTO `translation_refs` VALUES (231, 198, 'src/components/AboutUs.tsx', '[13486]', NULL);
INSERT INTO `translation_refs` VALUES (232, 199, 'src/components/AboutUs.tsx', '[13777]', NULL);
INSERT INTO `translation_refs` VALUES (233, 200, 'src/components/BlogPostComponent.tsx', '[3839]', NULL);
INSERT INTO `translation_refs` VALUES (234, 201, 'src/components/BlogPostComponent.tsx', '[5791]', NULL);
INSERT INTO `translation_refs` VALUES (235, 202, 'src/components/BlogPostComponent.tsx', '[5913]', NULL);
INSERT INTO `translation_refs` VALUES (236, 203, 'src/components/BlogPostComponent.tsx', '[6242]', NULL);
INSERT INTO `translation_refs` VALUES (237, 204, 'src/components/BlogPostComponent.tsx', '[6775]', NULL);
INSERT INTO `translation_refs` VALUES (238, 205, 'src/components/BlogPostComponent.tsx', '[7088]', NULL);
INSERT INTO `translation_refs` VALUES (239, 206, 'src/components/BlogPostComponent.tsx', '[7378]', NULL);
INSERT INTO `translation_refs` VALUES (240, 207, 'src/components/HomePage.tsx', '[8750]', NULL);

-- ----------------------------
-- Table structure for translation_texts
-- ----------------------------
DROP TABLE IF EXISTS `translation_texts`;
CREATE TABLE `translation_texts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phrase_id` int(11) NOT NULL DEFAULT 0,
  `lang` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `phrase_text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phrase_lang`(`phrase_id`, `lang`) USING BTREE,
  INDEX `phrase_id`(`phrase_id`) USING BTREE,
  INDEX `lang`(`lang`) USING BTREE,
  CONSTRAINT `fk_trans_texts_phrase` FOREIGN KEY (`phrase_id`) REFERENCES `translations` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 504 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of translation_texts
-- ----------------------------
INSERT INTO `translation_texts` VALUES (1, 1, 'en', 'Home');
INSERT INTO `translation_texts` VALUES (2, 1, 'ru', 'Главная');
INSERT INTO `translation_texts` VALUES (3, 1, 'he', 'בית');
INSERT INTO `translation_texts` VALUES (14, 53, 'en', '...');
INSERT INTO `translation_texts` VALUES (15, 53, 'ru', '...');
INSERT INTO `translation_texts` VALUES (16, 53, 'he', '...');
INSERT INTO `translation_texts` VALUES (17, 8, 'en', 'Our Story');
INSERT INTO `translation_texts` VALUES (19, 32, 'en', 'About');
INSERT INTO `translation_texts` VALUES (20, 33, 'en', 'Styles');
INSERT INTO `translation_texts` VALUES (21, 34, 'en', 'Schedule');
INSERT INTO `translation_texts` VALUES (22, 35, 'en', 'Teachers');
INSERT INTO `translation_texts` VALUES (23, 36, 'en', 'Blog');
INSERT INTO `translation_texts` VALUES (24, 37, 'en', 'Contacts');
INSERT INTO `translation_texts` VALUES (25, 38, 'en', 'Book Your Spot');
INSERT INTO `translation_texts` VALUES (26, 28, 'en', 'Dance Styles');
INSERT INTO `translation_texts` VALUES (27, 29, 'en', 'Find Your Style');
INSERT INTO `translation_texts` VALUES (28, 30, 'en', 'Explore our diverse range of dance classes for all levels');
INSERT INTO `translation_texts` VALUES (29, 31, 'en', 'All Styles');
INSERT INTO `translation_texts` VALUES (30, 47, 'en', 'Beginner');
INSERT INTO `translation_texts` VALUES (31, 48, 'en', 'Intermediate');
INSERT INTO `translation_texts` VALUES (32, 49, 'en', 'Advanced');
INSERT INTO `translation_texts` VALUES (33, 50, 'en', 'Weekly Schedule');
INSERT INTO `translation_texts` VALUES (34, 51, 'en', 'Class Schedule');
INSERT INTO `translation_texts` VALUES (35, 52, 'en', 'Plan your week with our comprehensive class schedule');
INSERT INTO `translation_texts` VALUES (36, 40, 'en', 'Monday');
INSERT INTO `translation_texts` VALUES (37, 41, 'en', 'Tuesday');
INSERT INTO `translation_texts` VALUES (38, 42, 'en', 'Wednesday');
INSERT INTO `translation_texts` VALUES (39, 43, 'en', 'Thursday');
INSERT INTO `translation_texts` VALUES (40, 44, 'en', 'Friday');
INSERT INTO `translation_texts` VALUES (41, 45, 'en', 'Saturday');
INSERT INTO `translation_texts` VALUES (42, 46, 'en', 'Sunday');
INSERT INTO `translation_texts` VALUES (43, 39, 'en', 'Our Team');
INSERT INTO `translation_texts` VALUES (44, 13, 'en', 'Meet Your Instructors');
INSERT INTO `translation_texts` VALUES (45, 14, 'en', 'Learn from passionate professionals dedicated to your growth');
INSERT INTO `translation_texts` VALUES (46, 20, 'en', 'Get In Touch');
INSERT INTO `translation_texts` VALUES (47, 21, 'en', 'Visit Us');
INSERT INTO `translation_texts` VALUES (48, 22, 'en', 'Come dance with us in the beautiful city of Eilat');
INSERT INTO `translation_texts` VALUES (49, 23, 'en', 'Contact Information');
INSERT INTO `translation_texts` VALUES (50, 24, 'en', 'Opening Hours');
INSERT INTO `translation_texts` VALUES (51, 25, 'en', 'Monday - Friday');
INSERT INTO `translation_texts` VALUES (52, 26, 'en', 'Saturday - Sunday');
INSERT INTO `translation_texts` VALUES (53, 27, 'en', 'Follow Us');
INSERT INTO `translation_texts` VALUES (54, 17, 'en', 'Our Blog');
INSERT INTO `translation_texts` VALUES (55, 18, 'en', 'Dance Stories & Tips');
INSERT INTO `translation_texts` VALUES (56, 19, 'en', 'Explore articles, tutorials, and inspiration from the dance world');
INSERT INTO `translation_texts` VALUES (58, 9, 'en', 'Welcome to Eilat Dance Center');
INSERT INTO `translation_texts` VALUES (59, 10, 'en', 'Founded in 2015, Eilat Dance Center has become the premier destination for dance education in southern Israel. Our studio was born from a passion for movement and a vision to create a welcoming space where dancers of all levels could grow, express themselves, and connect with others.');
INSERT INTO `translation_texts` VALUES (60, 11, 'en', 'We believe dance is more than just steps – it\'s a language that transcends barriers, builds confidence, and brings joy. Our diverse community of students ranges from young children taking their first dance steps to adults discovering new passions.');
INSERT INTO `translation_texts` VALUES (61, 12, 'en', 'Our Values');
INSERT INTO `translation_texts` VALUES (62, 2, 'en', 'Passion');
INSERT INTO `translation_texts` VALUES (63, 3, 'en', 'We bring energy and enthusiasm to every class, inspiring students to fall in love with dance.');
INSERT INTO `translation_texts` VALUES (64, 4, 'en', 'Community');
INSERT INTO `translation_texts` VALUES (65, 5, 'en', 'Our studio is a welcoming space where dancers support and celebrate each other\'s growth.');
INSERT INTO `translation_texts` VALUES (66, 6, 'en', 'Excellence');
INSERT INTO `translation_texts` VALUES (67, 7, 'en', 'With 15+ years of combined experience, our instructors bring world-class training and genuine care to every class.');
INSERT INTO `translation_texts` VALUES (68, 15, 'en', 'Dance in Paradise');
INSERT INTO `translation_texts` VALUES (69, 16, 'en', 'Located in beautiful Eilat, our studio offers more than just great classes – it\'s part of the vibrant cultural scene of Israel\'s southernmost city.');
INSERT INTO `translation_texts` VALUES (71, 32, 'he', 'אודות');
INSERT INTO `translation_texts` VALUES (72, 33, 'he', 'סגנונות');
INSERT INTO `translation_texts` VALUES (73, 34, 'he', 'לוח זמנים');
INSERT INTO `translation_texts` VALUES (74, 35, 'he', 'מורים');
INSERT INTO `translation_texts` VALUES (75, 36, 'he', 'בלוג');
INSERT INTO `translation_texts` VALUES (76, 37, 'he', 'יצירת קשר');
INSERT INTO `translation_texts` VALUES (77, 38, 'he', 'הזמינו מקום');
INSERT INTO `translation_texts` VALUES (78, 28, 'he', 'סגנונות ריקוד');
INSERT INTO `translation_texts` VALUES (79, 29, 'he', 'מצאו את הסגנון שלכם');
INSERT INTO `translation_texts` VALUES (80, 30, 'he', 'חקרו את מגוון שיעורי הריקוד שלנו לכל הרמות');
INSERT INTO `translation_texts` VALUES (81, 31, 'he', 'כל הסגנונות');
INSERT INTO `translation_texts` VALUES (82, 47, 'he', 'מתחילים');
INSERT INTO `translation_texts` VALUES (83, 48, 'he', 'בינוני');
INSERT INTO `translation_texts` VALUES (84, 49, 'he', 'מתקדמים');
INSERT INTO `translation_texts` VALUES (85, 50, 'he', 'לוח זמנים שבועי');
INSERT INTO `translation_texts` VALUES (86, 51, 'he', 'לוח שיעורים');
INSERT INTO `translation_texts` VALUES (87, 52, 'he', 'תכננו את השבוע שלכם עם לוח השיעורים המקיף שלנו');
INSERT INTO `translation_texts` VALUES (88, 40, 'he', 'שני');
INSERT INTO `translation_texts` VALUES (89, 41, 'he', 'שלישי');
INSERT INTO `translation_texts` VALUES (90, 42, 'he', 'רביעי');
INSERT INTO `translation_texts` VALUES (91, 43, 'he', 'חמישי');
INSERT INTO `translation_texts` VALUES (92, 44, 'he', 'שישי');
INSERT INTO `translation_texts` VALUES (93, 45, 'he', 'שבת');
INSERT INTO `translation_texts` VALUES (94, 46, 'he', 'ראשון');
INSERT INTO `translation_texts` VALUES (95, 39, 'he', 'הצוות שלנו');
INSERT INTO `translation_texts` VALUES (96, 13, 'he', 'הכירו את המדריכים');
INSERT INTO `translation_texts` VALUES (97, 14, 'he', 'למדו ממקצוענים נלהבים המוקדשים לצמיחתכם');
INSERT INTO `translation_texts` VALUES (98, 20, 'he', 'צרו קשר');
INSERT INTO `translation_texts` VALUES (99, 21, 'he', 'בואו לבקר אותנו');
INSERT INTO `translation_texts` VALUES (100, 22, 'he', 'בואו לרקוד איתנו בעיר היפה אילת');
INSERT INTO `translation_texts` VALUES (101, 23, 'he', 'פרטי התקשרות');
INSERT INTO `translation_texts` VALUES (102, 24, 'he', 'שעות פעילות');
INSERT INTO `translation_texts` VALUES (103, 25, 'he', 'ראשון - חמישי');
INSERT INTO `translation_texts` VALUES (104, 26, 'he', 'שישי - שבת');
INSERT INTO `translation_texts` VALUES (105, 27, 'he', 'עקבו אחרינו');
INSERT INTO `translation_texts` VALUES (106, 17, 'he', 'הבלוג שלנו');
INSERT INTO `translation_texts` VALUES (107, 18, 'he', 'סיפורי ריקוד וטיפים');
INSERT INTO `translation_texts` VALUES (108, 19, 'he', 'חקרו מאמרים, מדריכים והשראה מעולם הריקוד');
INSERT INTO `translation_texts` VALUES (109, 8, 'he', 'הסיפור שלנו');
INSERT INTO `translation_texts` VALUES (110, 9, 'he', 'ברוכים הבאים למרכז המחול אילת');
INSERT INTO `translation_texts` VALUES (111, 10, 'he', 'נוסד בשנת 2015, מרכז המחול אילת הפך ליעד המוביל לחינוך למחול בדרום ישראל. הסטודיו שלנו נולד מתוך תשוקה לתנועה וחזון ליצור מרחב מזמין שבו רקדנים בכל הרמות יכולים לצמוח, לבטא את עצמם ולהתחבר לאחרים.');
INSERT INTO `translation_texts` VALUES (112, 11, 'he', 'אנו מאמינים שריקוד הוא יותר מסתם צעדים - זו שפה שמתעלה מעל מחסומים, בונה ביטחון ומביאה שמחה. הקהילה המגוונת שלנו של תלמידים נעה מילדים צעירים העושים את צעדי הריקוד הראשונים שלהם ועד למבוגרים שמגלים תשוקות חדשות.');
INSERT INTO `translation_texts` VALUES (113, 12, 'he', 'הערכים שלנו');
INSERT INTO `translation_texts` VALUES (114, 2, 'he', 'תשוקה');
INSERT INTO `translation_texts` VALUES (115, 3, 'he', 'אנו מביאים אנרגיה והתלהבות לכל שיעור, מעוררים השראה בתלמידים להתאהב בריקוד.');
INSERT INTO `translation_texts` VALUES (116, 4, 'he', 'קהילה');
INSERT INTO `translation_texts` VALUES (117, 5, 'he', 'הסטודיו שלנו הוא מרחב מזמין שבו רקדנים תומכים וחוגגים את הצמיחה של זה את זה.');
INSERT INTO `translation_texts` VALUES (118, 6, 'he', 'מצוינות');
INSERT INTO `translation_texts` VALUES (119, 7, 'he', 'עם למעלה מ-15 שנות ניסיון משולב, המדריכים שלנו מביאים הכשרה ברמה עולמית ודאגה אמיתית לכל שיעור.');
INSERT INTO `translation_texts` VALUES (120, 15, 'he', 'ריקוד בגן עדן');
INSERT INTO `translation_texts` VALUES (121, 16, 'he', 'ממוקם באילת היפה, הסטודיו שלנו מציע יותר משיעורים מצוינים - הוא חלק מהסצנה התרבותית התוססת של העיר הדרומית ביותר בישראל.');
INSERT INTO `translation_texts` VALUES (123, 32, 'ru', 'О нас');
INSERT INTO `translation_texts` VALUES (124, 33, 'ru', 'Стили');
INSERT INTO `translation_texts` VALUES (125, 34, 'ru', 'Расписание');
INSERT INTO `translation_texts` VALUES (126, 35, 'ru', 'Преподаватели');
INSERT INTO `translation_texts` VALUES (127, 36, 'ru', 'Блог');
INSERT INTO `translation_texts` VALUES (128, 37, 'ru', 'Контакты');
INSERT INTO `translation_texts` VALUES (129, 38, 'ru', 'Забронировать');
INSERT INTO `translation_texts` VALUES (130, 28, 'ru', 'Стили танца');
INSERT INTO `translation_texts` VALUES (131, 29, 'ru', 'Найдите свой стиль');
INSERT INTO `translation_texts` VALUES (132, 30, 'ru', 'Исследуйте наше разнообразие танцевальных классов для всех уровней');
INSERT INTO `translation_texts` VALUES (133, 31, 'ru', 'Все стили');
INSERT INTO `translation_texts` VALUES (134, 47, 'ru', 'Начинающие');
INSERT INTO `translation_texts` VALUES (135, 48, 'ru', 'Средний');
INSERT INTO `translation_texts` VALUES (136, 49, 'ru', 'Продвинутый');
INSERT INTO `translation_texts` VALUES (137, 50, 'ru', 'Расписание на неделю');
INSERT INTO `translation_texts` VALUES (138, 51, 'ru', 'Расписание занятий');
INSERT INTO `translation_texts` VALUES (139, 52, 'ru', 'Планируйте свою неделю с нашим подробным расписанием занятий');
INSERT INTO `translation_texts` VALUES (140, 40, 'ru', 'Понедельник');
INSERT INTO `translation_texts` VALUES (141, 41, 'ru', 'Вторник');
INSERT INTO `translation_texts` VALUES (142, 42, 'ru', 'Среда');
INSERT INTO `translation_texts` VALUES (143, 43, 'ru', 'Четверг');
INSERT INTO `translation_texts` VALUES (144, 44, 'ru', 'Пятница');
INSERT INTO `translation_texts` VALUES (145, 45, 'ru', 'Суббота');
INSERT INTO `translation_texts` VALUES (146, 46, 'ru', 'Воскресенье');
INSERT INTO `translation_texts` VALUES (147, 39, 'ru', 'Наша команда');
INSERT INTO `translation_texts` VALUES (148, 13, 'ru', 'Познакомьтесь с преподавателями');
INSERT INTO `translation_texts` VALUES (149, 14, 'ru', 'Учитесь у увлеченных профессионалов, посвятивших себя вашему росту');
INSERT INTO `translation_texts` VALUES (150, 20, 'ru', 'Свяжитесь с нами');
INSERT INTO `translation_texts` VALUES (151, 21, 'ru', 'Посетите нас');
INSERT INTO `translation_texts` VALUES (152, 22, 'ru', 'Приходите танцевать с нами в прекрасном городе Эйлат');
INSERT INTO `translation_texts` VALUES (153, 23, 'ru', 'Контактная информация');
INSERT INTO `translation_texts` VALUES (154, 24, 'ru', 'Часы работы');
INSERT INTO `translation_texts` VALUES (155, 25, 'ru', 'Понедельник - Пятница');
INSERT INTO `translation_texts` VALUES (156, 26, 'ru', 'Суббота - Воскресенье');
INSERT INTO `translation_texts` VALUES (157, 27, 'ru', 'Следите за нами');
INSERT INTO `translation_texts` VALUES (158, 17, 'ru', 'Наш блог');
INSERT INTO `translation_texts` VALUES (159, 18, 'ru', 'Танцевальные истории и советы');
INSERT INTO `translation_texts` VALUES (160, 19, 'ru', 'Изучайте статьи, уроки и вдохновение из мира танца');
INSERT INTO `translation_texts` VALUES (161, 8, 'ru', 'Наша история');
INSERT INTO `translation_texts` VALUES (162, 9, 'ru', 'Добро пожаловать в танцевальный центр Эйлат');
INSERT INTO `translation_texts` VALUES (163, 10, 'ru', 'Основанный в 2015 году, танцевальный центр Эйлат стал главным центром танцевального образования на юге Израиля. Наша студия родилась из страсти к движению и видения создать гостеприимное пространство, где танцоры всех уровней могли бы расти, выражать себя и общаться с другими.');
INSERT INTO `translation_texts` VALUES (164, 11, 'ru', 'Мы верим, что танец - это больше, чем просто шаги - это язык, который преодолевает барьеры, укрепляет уверенность и приносит радость. Наше разнообразное сообщество студентов варьируется от маленьких детей, делающих свои первые танцевальные шаги, до взрослых, открывающих новые увлечения.');
INSERT INTO `translation_texts` VALUES (165, 12, 'ru', 'Наши ценности');
INSERT INTO `translation_texts` VALUES (166, 2, 'ru', 'Страсть');
INSERT INTO `translation_texts` VALUES (167, 3, 'ru', 'Мы привносим энергию и энтузиазм в каждый класс, вдохновляя студентов влюбиться в танец.');
INSERT INTO `translation_texts` VALUES (168, 4, 'ru', 'Сообщество');
INSERT INTO `translation_texts` VALUES (169, 5, 'ru', 'Наша студия - это гостеприимное пространство, где танцоры поддерживают и празднуют рост друг друга.');
INSERT INTO `translation_texts` VALUES (170, 6, 'ru', 'Превосходство');
INSERT INTO `translation_texts` VALUES (171, 7, 'ru', 'Имея более 15 лет совместного опыта, наши преподаватели привносят обучение мирового класса и искреннюю заботу в каждый класс.');
INSERT INTO `translation_texts` VALUES (172, 15, 'ru', 'Танец в раю');
INSERT INTO `translation_texts` VALUES (173, 16, 'ru', 'Расположенная в прекрасном Эйлате, наша студия предлагает больше, чем просто отличные занятия - она часть яркой культурной сцены самого южного города Израиля.');
INSERT INTO `translation_texts` VALUES (174, 54, 'en', 'Where passion meets movement');
INSERT INTO `translation_texts` VALUES (176, 54, 'ru', 'Там, где страсть встречается с движением');
INSERT INTO `translation_texts` VALUES (177, 54, 'he', 'המקום שבו תשוקה פוגשת תנועה');
INSERT INTO `translation_texts` VALUES (179, 55, 'en', 'Best Dance Studio in');
INSERT INTO `translation_texts` VALUES (180, 55, 'ru', 'Лучшая студия танцев в');
INSERT INTO `translation_texts` VALUES (183, 56, 'en', 'Eilat');
INSERT INTO `translation_texts` VALUES (184, 56, 'ru', 'Эйлате');
INSERT INTO `translation_texts` VALUES (186, 57, 'en', 'Professional dance training for kids and adults. Classes by Maxim & Sofia with 15+ years of experience.');
INSERT INTO `translation_texts` VALUES (187, 57, 'ru', 'Профессиональное обучение танцам для детей и взрослых. Занятия проводят Максим и София с более чем 15-летним опытом.');
INSERT INTO `translation_texts` VALUES (188, 57, 'he', 'שיעורי ריקוד מקצועיים לילדים ולמבוגרים. שיעורים בהנחיית מקסים וסופיה בעלי ניסיון של למעלה מ-15 שנה.');
INSERT INTO `translation_texts` VALUES (189, 58, 'en', 'Watch Video');
INSERT INTO `translation_texts` VALUES (190, 58, 'ru', 'Смотреть видео');
INSERT INTO `translation_texts` VALUES (191, 59, 'en', 'Happy Students');
INSERT INTO `translation_texts` VALUES (192, 60, 'en', 'Years Experience');
INSERT INTO `translation_texts` VALUES (193, 61, 'en', 'Dance Styles');
INSERT INTO `translation_texts` VALUES (194, 60, 'ru', 'лет опыта');
INSERT INTO `translation_texts` VALUES (195, 59, 'ru', 'счастливых учеников');
INSERT INTO `translation_texts` VALUES (196, 61, 'ru', 'танцевальных стилей');
INSERT INTO `translation_texts` VALUES (197, 62, 'en', 'Eilat Dance Center');
INSERT INTO `translation_texts` VALUES (198, 63, 'en', 'dance, dance training, dance tips, Eilat, dance education');
INSERT INTO `translation_texts` VALUES (199, 64, 'en', 'Login successful');
INSERT INTO `translation_texts` VALUES (200, 65, 'en', 'Welcome Back');
INSERT INTO `translation_texts` VALUES (201, 66, 'en', 'Enter your credentials to access your account');
INSERT INTO `translation_texts` VALUES (202, 67, 'en', 'Email');
INSERT INTO `translation_texts` VALUES (203, 68, 'en', 'Password');
INSERT INTO `translation_texts` VALUES (204, 69, 'en', 'Signing in...');
INSERT INTO `translation_texts` VALUES (205, 70, 'en', 'Sign In');
INSERT INTO `translation_texts` VALUES (206, 65, 'ru', 'С возвращением!');
INSERT INTO `translation_texts` VALUES (207, 64, 'ru', 'Успешный вход');
INSERT INTO `translation_texts` VALUES (208, 69, 'ru', 'Входим...');
INSERT INTO `translation_texts` VALUES (209, 70, 'ru', 'Войти');
INSERT INTO `translation_texts` VALUES (210, 68, 'ru', 'Пароль');
INSERT INTO `translation_texts` VALUES (211, 66, 'ru', 'Введите учётные данные для входа в аккаунт');
INSERT INTO `translation_texts` VALUES (216, 67, 'ru', 'E-mail');
INSERT INTO `translation_texts` VALUES (218, 62, 'ru', 'Eilat Dance Center');
INSERT INTO `translation_texts` VALUES (219, 63, 'ru', 'танцы, обучение танцам, танцевальные уроки, Эйлат, образование, хореография');
INSERT INTO `translation_texts` VALUES (220, 71, 'en', 'Eilat Dance Center Class Schedule');
INSERT INTO `translation_texts` VALUES (221, 72, 'en', 'Dance Classes');
INSERT INTO `translation_texts` VALUES (222, 73, 'en', 'This Week');
INSERT INTO `translation_texts` VALUES (223, 74, 'en', 'Next Week');
INSERT INTO `translation_texts` VALUES (224, 75, 'en', 'Book Your Class');
INSERT INTO `translation_texts` VALUES (225, 76, 'en', 'Date');
INSERT INTO `translation_texts` VALUES (226, 77, 'en', 'Class');
INSERT INTO `translation_texts` VALUES (227, 78, 'en', 'Time');
INSERT INTO `translation_texts` VALUES (228, 79, 'en', 'Teacher');
INSERT INTO `translation_texts` VALUES (229, 80, 'en', 'Level');
INSERT INTO `translation_texts` VALUES (230, 81, 'en', 'Price');
INSERT INTO `translation_texts` VALUES (231, 82, 'en', '₪80');
INSERT INTO `translation_texts` VALUES (232, 83, 'en', 'Payment Instructions');
INSERT INTO `translation_texts` VALUES (233, 84, 'en', 'Open your Bit app.');
INSERT INTO `translation_texts` VALUES (234, 85, 'en', 'Send payment to');
INSERT INTO `translation_texts` VALUES (235, 86, 'en', '05X-XXX-XXXX');
INSERT INTO `translation_texts` VALUES (236, 87, 'en', 'Add a note');
INSERT INTO `translation_texts` VALUES (237, 88, 'en', 'Your Name + Date');
INSERT INTO `translation_texts` VALUES (238, 89, 'en', 'Confirm your payment via WhatsApp');
INSERT INTO `translation_texts` VALUES (239, 90, 'en', 'Or scan to pay with Bit');
INSERT INTO `translation_texts` VALUES (240, 91, 'en', 'Bit QR Code');
INSERT INTO `translation_texts` VALUES (241, 92, 'en', 'https://wa.me/972XXXXXXXXX?text=Hi!%20I%20paid%20for%20the%20class%20on%20Nov%2024');
INSERT INTO `translation_texts` VALUES (242, 93, 'en', 'I Paid — Confirm via WhatsApp');
INSERT INTO `translation_texts` VALUES (243, 94, 'en', 'Click after completing payment to confirm via WhatsApp');
INSERT INTO `translation_texts` VALUES (244, 75, 'ru', 'Забронируйте ваше занятие');
INSERT INTO `translation_texts` VALUES (245, 77, 'ru', 'Занятие');
INSERT INTO `translation_texts` VALUES (247, 89, 'ru', 'Подтвердите платёж через WhatsApp');
INSERT INTO `translation_texts` VALUES (248, 76, 'ru', 'Дата');
INSERT INTO `translation_texts` VALUES (249, 93, 'ru', 'Я оплатил(а) - Подтвердите через WhatsApp');
INSERT INTO `translation_texts` VALUES (250, 83, 'ru', 'Инструкции по оплате');
INSERT INTO `translation_texts` VALUES (251, 80, 'ru', 'Уровень');
INSERT INTO `translation_texts` VALUES (252, 94, 'ru', 'Нажмите после завершения оплаты, чтобы подтвердить через WhatsApp');
INSERT INTO `translation_texts` VALUES (253, 81, 'ru', 'Цена');
INSERT INTO `translation_texts` VALUES (256, 82, 'ru', '₪80');
INSERT INTO `translation_texts` VALUES (257, 90, 'ru', 'Или отсканируйте, чтобы оплатить через Bit');
INSERT INTO `translation_texts` VALUES (258, 84, 'ru', 'Откройте приложение Bit.');
INSERT INTO `translation_texts` VALUES (259, 85, 'ru', 'Отправьте платёж на');
INSERT INTO `translation_texts` VALUES (260, 79, 'ru', 'Преподаватель');
INSERT INTO `translation_texts` VALUES (261, 78, 'ru', 'Время');
INSERT INTO `translation_texts` VALUES (262, 88, 'ru', 'Ваше имя и дата');
INSERT INTO `translation_texts` VALUES (263, 74, 'ru', 'На следующей неделе');
INSERT INTO `translation_texts` VALUES (264, 73, 'ru', 'На этой неделе');
INSERT INTO `translation_texts` VALUES (265, 71, 'ru', 'Расписание занятий Eilat Dance Center');
INSERT INTO `translation_texts` VALUES (266, 72, 'ru', 'Танцевальные занятия');
INSERT INTO `translation_texts` VALUES (268, 87, 'ru', 'Добавьте комментарий');
INSERT INTO `translation_texts` VALUES (270, 95, 'en', '%s Dance Classes');
INSERT INTO `translation_texts` VALUES (271, 96, 'en', 'Dance Styles Offered');
INSERT INTO `translation_texts` VALUES (272, 97, 'en', 'Home');
INSERT INTO `translation_texts` VALUES (273, 98, 'en', 'Dance Styles');
INSERT INTO `translation_texts` VALUES (274, 99, 'en', 'Kids');
INSERT INTO `translation_texts` VALUES (275, 100, 'en', 'Adults');
INSERT INTO `translation_texts` VALUES (276, 101, 'en', 'Maxim');
INSERT INTO `translation_texts` VALUES (277, 102, 'en', 'Lead Instructor & Choreographer');
INSERT INTO `translation_texts` VALUES (278, 103, 'en', 'https://images.unsplash.com/photo-1624421998513-77a9ebb43d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGFuY2UlMjBpbnN0cnVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080');
INSERT INTO `translation_texts` VALUES (279, 104, 'en', 'https://images.unsplash.com/photo-1624421998513-77a9ebb43d0d?w=400');
INSERT INTO `translation_texts` VALUES (280, 105, 'en', 'Maxim has been teaching dance professionally for over 15 years. He specializes in Hip-Hop, Argentine Tango, and Jazz-Funk. His choreography has won multiple awards at international competitions.');
INSERT INTO `translation_texts` VALUES (281, 106, 'en', 'Professional Dance Academy');
INSERT INTO `translation_texts` VALUES (282, 110, 'en', 'from-purple-500 to-violet-600');
INSERT INTO `translation_texts` VALUES (283, 111, 'en', 'from-purple-50 to-violet-50');
INSERT INTO `translation_texts` VALUES (284, 112, 'en', 'Sofia');
INSERT INTO `translation_texts` VALUES (285, 113, 'en', 'Principal Instructor & Ballet Master');
INSERT INTO `translation_texts` VALUES (286, 114, 'en', 'https://images.unsplash.com/photo-1576495123133-05895f832f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBiYWxsZXQlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080');
INSERT INTO `translation_texts` VALUES (287, 115, 'en', 'https://images.unsplash.com/photo-1576495123133-05895f832f7e?w=400');
INSERT INTO `translation_texts` VALUES (288, 116, 'en', 'Sofia brings 15 years of professional dance experience to our studio. She specializes in Ballet, High Heels, and Contemporary dance. Her nurturing approach makes her especially beloved by young students.');
INSERT INTO `translation_texts` VALUES (289, 117, 'en', 'Professional Ballet School');
INSERT INTO `translation_texts` VALUES (290, 119, 'en', 'Former Professional Ballet Dancer, Competition Judge Certification, 15+ Years Teaching Experience');
INSERT INTO `translation_texts` VALUES (291, 120, 'en', 'Ballet, High Heels, Contemporary, Stretching');
INSERT INTO `translation_texts` VALUES (292, 121, 'en', 'from-pink-500 to-rose-600');
INSERT INTO `translation_texts` VALUES (293, 122, 'en', 'from-pink-50 to-rose-50');
INSERT INTO `translation_texts` VALUES (294, 123, 'en', 'Home');
INSERT INTO `translation_texts` VALUES (295, 124, 'en', 'Teachers');
INSERT INTO `translation_texts` VALUES (296, 125, 'en', '15+');
INSERT INTO `translation_texts` VALUES (297, 126, 'en', 'Years');
INSERT INTO `translation_texts` VALUES (298, 127, 'en', 'Achievements & Experience');
INSERT INTO `translation_texts` VALUES (299, 128, 'en', 'Specialties');
INSERT INTO `translation_texts` VALUES (300, 127, 'ru', 'Достижения и опыт');
INSERT INTO `translation_texts` VALUES (301, 106, 'ru', 'Профессиональная академия танца');
INSERT INTO `translation_texts` VALUES (303, 108, 'en', 'International Dance Competition Winner, 15+ Years Teaching Experience Certificate');
INSERT INTO `translation_texts` VALUES (304, 109, 'en', 'Hip-Hop, Argentine Tango, Jazz-Funk, Contemporary');
INSERT INTO `translation_texts` VALUES (306, 118, 'en', '15+ years of teaching experience, Former professional ballet dancer, Competition judge and mentor,\nSpecialized in children\'s dance education');
INSERT INTO `translation_texts` VALUES (310, 107, 'en', '15+ years of teaching experience, Certified in multiple dance styles, International competition winner,\nChoreographer for professional productions');
INSERT INTO `translation_texts` VALUES (312, 112, 'ru', 'София');
INSERT INTO `translation_texts` VALUES (313, 101, 'ru', 'Максим');
INSERT INTO `translation_texts` VALUES (314, 102, 'ru', 'Ведущий инструктор и хореограф');
INSERT INTO `translation_texts` VALUES (317, 105, 'ru', 'Максим профессионально преподает танцы более 15 лет. Он специализируется на хип-хопе, аргентинском танго и джаз-фанке. Его хореография завоевала множество наград на международных конкурсах.');
INSERT INTO `translation_texts` VALUES (320, 107, 'ru', 'Более 15 лет преподавательского опыта, Cертифицирован по нескольким танцевальным стилям, Победитель международных конкурсов,\nХореограф профессиональных постановок.');
INSERT INTO `translation_texts` VALUES (323, 128, 'ru', 'Специализация');
INSERT INTO `translation_texts` VALUES (324, 126, 'ru', 'Лет');
INSERT INTO `translation_texts` VALUES (325, 125, 'ru', '15+');
INSERT INTO `translation_texts` VALUES (326, 124, 'ru', 'Преподаватели');
INSERT INTO `translation_texts` VALUES (327, 123, 'ru', 'Главная');
INSERT INTO `translation_texts` VALUES (331, 108, 'ru', 'Победитель международного танцевального конкурса, обладатель сертификата о более чем 15-летнем опыте преподавания.');
INSERT INTO `translation_texts` VALUES (334, 109, 'ru', 'Хип-хоп, Аргентинское танго, Джаз-фанк, Контемпорари');
INSERT INTO `translation_texts` VALUES (337, 129, 'en', 'Professional dance training for kids and adults in Eilat. Join our community today.');
INSERT INTO `translation_texts` VALUES (338, 130, 'en', 'Quick Links');
INSERT INTO `translation_texts` VALUES (339, 131, 'en', 'Contact');
INSERT INTO `translation_texts` VALUES (340, 132, 'en', 'Chat on WhatsApp');
INSERT INTO `translation_texts` VALUES (341, 133, 'en', 'Eilat Dance Center. All rights reserved.');
INSERT INTO `translation_texts` VALUES (342, 132, 'ru', 'Чат в WhatsApp');
INSERT INTO `translation_texts` VALUES (343, 131, 'ru', 'Контакты');
INSERT INTO `translation_texts` VALUES (345, 133, 'ru', 'Eilat Dance Center. Все права защищены.');
INSERT INTO `translation_texts` VALUES (346, 130, 'ru', 'Полезные ссылки');
INSERT INTO `translation_texts` VALUES (349, 129, 'ru', 'Профессиональное обучение танцам для детей и взрослых в Эйлате. Присоединяйтесь к нашему сообществу сегодня.');
INSERT INTO `translation_texts` VALUES (350, 134, 'en', 'Live Schedule');
INSERT INTO `translation_texts` VALUES (351, 135, 'en', 'Today\'s Classes');
INSERT INTO `translation_texts` VALUES (352, 136, 'en', 'View Full Schedule');
INSERT INTO `translation_texts` VALUES (353, 137, 'en', 'No upcoming classes for today.');
INSERT INTO `translation_texts` VALUES (354, 138, 'en', 'Excellence in Dance Education');
INSERT INTO `translation_texts` VALUES (355, 139, 'en', 'Why Choose Us');
INSERT INTO `translation_texts` VALUES (356, 140, 'en', 'We combine professional expertise with a welcoming atmosphere');
INSERT INTO `translation_texts` VALUES (357, 141, 'en', 'What Our Students Say');
INSERT INTO `translation_texts` VALUES (358, 142, 'en', 'Real feedback from our dance community');
INSERT INTO `translation_texts` VALUES (359, 143, 'en', 'No reviews yet.');
INSERT INTO `translation_texts` VALUES (360, 144, 'en', 'Video Review');
INSERT INTO `translation_texts` VALUES (361, 145, 'en', 'From Our Blog');
INSERT INTO `translation_texts` VALUES (362, 146, 'en', 'Tips, guides, and insights from our instructors');
INSERT INTO `translation_texts` VALUES (363, 147, 'en', 'View All Articles');
INSERT INTO `translation_texts` VALUES (364, 148, 'en', 'Ready to dance? Book now, start today.');
INSERT INTO `translation_texts` VALUES (365, 149, 'en', 'Choose a class from our schedule and pay directly via Bit to reserve your spot.');
INSERT INTO `translation_texts` VALUES (366, 150, 'en', 'Go to Schedule');
INSERT INTO `translation_texts` VALUES (367, 97, 'ru', 'Главная');
INSERT INTO `translation_texts` VALUES (368, 98, 'ru', 'Танцевальные стили');
INSERT INTO `translation_texts` VALUES (369, 95, 'ru', 'Уроки танца %s');
INSERT INTO `translation_texts` VALUES (370, 99, 'ru', 'Для детей');
INSERT INTO `translation_texts` VALUES (372, 100, 'ru', 'Для взрослых');
INSERT INTO `translation_texts` VALUES (373, 145, 'ru', 'Из нашего блога');
INSERT INTO `translation_texts` VALUES (374, 138, 'ru', 'Превосходство в танцевальном образовании');
INSERT INTO `translation_texts` VALUES (379, 147, 'ru', 'Показать все статьи');
INSERT INTO `translation_texts` VALUES (382, 149, 'ru', 'Выберите занятие из нашего расписания и оплатите его напрямую через Bit, чтобы забронировать место.');
INSERT INTO `translation_texts` VALUES (383, 150, 'ru', 'Перейти к расписанию');
INSERT INTO `translation_texts` VALUES (386, 134, 'ru', 'Живое расписание');
INSERT INTO `translation_texts` VALUES (387, 143, 'ru', 'Ещё нет отзывов.');
INSERT INTO `translation_texts` VALUES (388, 137, 'ru', 'Сегодня нет занятий.');
INSERT INTO `translation_texts` VALUES (389, 148, 'ru', 'Готовы танцевать? Забронируйте прямо сейчас, начните сегодня!');
INSERT INTO `translation_texts` VALUES (395, 142, 'ru', 'Реальные отзывы от нашего танцевального сообщества');
INSERT INTO `translation_texts` VALUES (398, 146, 'ru', 'Советы, руководства и полезная информация от наших инструкторов.');
INSERT INTO `translation_texts` VALUES (399, 135, 'ru', 'Занятия сегодня');
INSERT INTO `translation_texts` VALUES (400, 144, 'ru', 'Видеоотзыв');
INSERT INTO `translation_texts` VALUES (401, 136, 'ru', 'Показать полное расписание');
INSERT INTO `translation_texts` VALUES (404, 140, 'ru', 'Мы сочетаем профессионализм с дружелюбной атмосферой.');
INSERT INTO `translation_texts` VALUES (405, 141, 'ru', 'Что говорят наши ученики');
INSERT INTO `translation_texts` VALUES (406, 139, 'ru', 'Почему выбирают нас');
INSERT INTO `translation_texts` VALUES (407, 117, 'ru', 'Профессиональная школа балета');
INSERT INTO `translation_texts` VALUES (408, 151, 'en', 'Professional Teachers');
INSERT INTO `translation_texts` VALUES (409, 152, 'en', '15+ years of experience in dance training and choreography');
INSERT INTO `translation_texts` VALUES (410, 153, 'en', 'Central Location');
INSERT INTO `translation_texts` VALUES (411, 154, 'en', 'Easy to reach by public transport in the heart of Eilat');
INSERT INTO `translation_texts` VALUES (412, 155, 'en', 'Friendly Atmosphere');
INSERT INTO `translation_texts` VALUES (413, 156, 'en', 'Welcoming community for all ages and skill levels');
INSERT INTO `translation_texts` VALUES (414, 153, 'ru', 'Расположен в центре');
INSERT INTO `translation_texts` VALUES (415, 154, 'ru', 'Легко добраться общественным транспортом в сердце Эйлата');
INSERT INTO `translation_texts` VALUES (416, 152, 'ru', 'Более 15 лет опыта в обучении танцам и хореографии');
INSERT INTO `translation_texts` VALUES (417, 155, 'ru', 'Дружественная атмосфера');
INSERT INTO `translation_texts` VALUES (418, 151, 'ru', 'Профессиональные преподаватели');
INSERT INTO `translation_texts` VALUES (421, 156, 'ru', 'Доброжелательное сообщество для всех возрастов и уровней подготовки');
INSERT INTO `translation_texts` VALUES (426, 157, 'en', 'Tomorrow');
INSERT INTO `translation_texts` VALUES (427, 157, 'ru', 'Завтра');
INSERT INTO `translation_texts` VALUES (428, 158, 'en', 'Map not configured');
INSERT INTO `translation_texts` VALUES (429, 159, 'en', 'Please update map URL in Admin Settings');
INSERT INTO `translation_texts` VALUES (430, 160, 'en', 'Address');
INSERT INTO `translation_texts` VALUES (431, 161, 'en', 'Phone');
INSERT INTO `translation_texts` VALUES (432, 162, 'en', 'Available for Bit payments');
INSERT INTO `translation_texts` VALUES (433, 163, 'en', 'Email');
INSERT INTO `translation_texts` VALUES (434, 164, 'en', 'How to Find Us');
INSERT INTO `translation_texts` VALUES (435, 165, 'en', 'Public Transport');
INSERT INTO `translation_texts` VALUES (436, 166, 'en', 'Bus lines 5, 18, 61 stop nearby. 5-minute walk from Dizengoff Center.');
INSERT INTO `translation_texts` VALUES (437, 167, 'en', 'Parking');
INSERT INTO `translation_texts` VALUES (438, 168, 'en', 'Street parking available. Paid parking lot 2 minutes away.');
INSERT INTO `translation_texts` VALUES (439, 169, 'en', 'Entrance');
INSERT INTO `translation_texts` VALUES (440, 170, 'en', 'Studio is on the 2nd floor. Building entrance is between shops.');
INSERT INTO `translation_texts` VALUES (441, 171, 'en', '/uploads/20251222/032023-E20251223-031822-0011.png');
INSERT INTO `translation_texts` VALUES (442, 172, 'en', 'Oops! Lost the Rhythm');
INSERT INTO `translation_texts` VALUES (443, 174, 'en', 'Back to Home');
INSERT INTO `translation_texts` VALUES (444, 175, 'en', 'Go Back');
INSERT INTO `translation_texts` VALUES (445, 176, 'en', 'Or jump to a popular page:');
INSERT INTO `translation_texts` VALUES (446, 177, 'en', 'Dance Styles');
INSERT INTO `translation_texts` VALUES (447, 178, 'en', 'Schedule');
INSERT INTO `translation_texts` VALUES (448, 179, 'en', 'Teachers');
INSERT INTO `translation_texts` VALUES (449, 180, 'en', 'Blog');
INSERT INTO `translation_texts` VALUES (450, 181, 'en', 'Meet Your Instructors');
INSERT INTO `translation_texts` VALUES (451, 182, 'en', 'Learn from passionate professionals dedicated to your growth');
INSERT INTO `translation_texts` VALUES (452, 183, 'en', 'https://images.unsplash.com/photo-1624421998513-77a9ebb43d0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGFuY2UlMjBpbnN0cnVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080');
INSERT INTO `translation_texts` VALUES (453, 184, 'en', 'Maxim');
INSERT INTO `translation_texts` VALUES (454, 185, 'en', 'Lead Instructor • Ballroom & Tango Specialist');
INSERT INTO `translation_texts` VALUES (455, 186, 'en', 'With 15+ years of professional experience, Maxim specializes in Ballroom, Argentine Tango, and Contemporary dance. His patient teaching style and attention to technique help students of all levels achieve their goals.');
INSERT INTO `translation_texts` VALUES (456, 187, 'en', '/teachers');
INSERT INTO `translation_texts` VALUES (457, 188, 'en', 'View Full Profile');
INSERT INTO `translation_texts` VALUES (458, 189, 'en', 'https://images.unsplash.com/photo-1576495123133-05895f832f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBiYWxsZXQlMjB0ZWFjaGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MzIyMTQzfDA&ixlib=rb-4.1.0&q=80&w=1080');
INSERT INTO `translation_texts` VALUES (459, 190, 'en', 'Sofia');
INSERT INTO `translation_texts` VALUES (460, 191, 'en', 'Lead Instructor • Jazz-funk & Kids Specialist');
INSERT INTO `translation_texts` VALUES (461, 192, 'en', 'Sofia brings over 15 years of dance expertise, specializing in Jazz-funk, Stretching, and children\'s dance education. Her energetic classes and nurturing approach create a positive learning environment for all ages.');
INSERT INTO `translation_texts` VALUES (462, 193, 'en', '/teachers');
INSERT INTO `translation_texts` VALUES (463, 194, 'en', 'Visit Us');
INSERT INTO `translation_texts` VALUES (464, 195, 'en', 'Eilat, Israel');
INSERT INTO `translation_texts` VALUES (465, 196, 'en', 'Easy parking and accessible location');
INSERT INTO `translation_texts` VALUES (466, 197, 'en', 'Get Directions');
INSERT INTO `translation_texts` VALUES (467, 198, 'en', 'https://images.unsplash.com/photo-1630825669764-44ecddf22b41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHN0dWRpbyUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc2NDMyMTkwMXww&ixlib=rb-4.1.0&q=80&w=1080');
INSERT INTO `translation_texts` VALUES (468, 199, 'en', 'Studio Facilities');
INSERT INTO `translation_texts` VALUES (469, 200, 'en', 'Back to Blog');
INSERT INTO `translation_texts` VALUES (470, 201, 'en', 'Ready to Enroll Your Child?');
INSERT INTO `translation_texts` VALUES (471, 202, 'en', 'Join our next Kids (3-6y) Beginner class and see the difference dance can make');
INSERT INTO `translation_texts` VALUES (472, 203, 'en', 'View Class Schedule');
INSERT INTO `translation_texts` VALUES (473, 204, 'en', 'About');
INSERT INTO `translation_texts` VALUES (474, 205, 'en', 'View Full Profile');
INSERT INTO `translation_texts` VALUES (475, 206, 'en', 'Related Articles');
INSERT INTO `translation_texts` VALUES (476, 173, 'en', 'Looks like this page missed a beat and wandered off the dance floor.\nLet\'s get you back to the music!');
INSERT INTO `translation_texts` VALUES (477, 173, 'ru', 'Похоже, эта страница сбилась с ритма и затерялась на танцполе.\nДавайте вернёмся к музыке!');
INSERT INTO `translation_texts` VALUES (478, 177, 'ru', 'Танцевальные стили');
INSERT INTO `translation_texts` VALUES (479, 180, 'ru', 'Блог');
INSERT INTO `translation_texts` VALUES (480, 174, 'ru', 'На главную');
INSERT INTO `translation_texts` VALUES (481, 175, 'ru', 'Вернуться назад');
INSERT INTO `translation_texts` VALUES (482, 176, 'ru', 'Или перейдите на популярную страницу:');
INSERT INTO `translation_texts` VALUES (483, 178, 'ru', 'Расписание');
INSERT INTO `translation_texts` VALUES (484, 179, 'ru', 'Преподаватели');
INSERT INTO `translation_texts` VALUES (486, 172, 'ru', 'Ой! Потеряли ритм!');
INSERT INTO `translation_texts` VALUES (493, 201, 'ru', 'Готовы записать своего ребенка?');
INSERT INTO `translation_texts` VALUES (494, 203, 'ru', 'Показать расписание занятий');
INSERT INTO `translation_texts` VALUES (495, 206, 'ru', 'Похожие публикации');
INSERT INTO `translation_texts` VALUES (496, 205, 'ru', 'Показать полный профиль');
INSERT INTO `translation_texts` VALUES (499, 202, 'ru', 'Присоединяйтесь к нашему следующему занятию для начинающих детей (3-6 лет) и убедитесь сами, как танцы могут изменить жизнь.');
INSERT INTO `translation_texts` VALUES (503, 204, 'ru', 'О преподавателе: ');

-- ----------------------------
-- Table structure for translations
-- ----------------------------
DROP TABLE IF EXISTS `translations`;
CREATE TABLE `translations`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ident` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `comment` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL,
  `insert_dt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `ident`(`ident`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 208 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of translations
-- ----------------------------
INSERT INTO `translations` VALUES (1, 'nav.home', NULL, NULL);
INSERT INTO `translations` VALUES (2, 'about.values.passion.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (3, 'about.values.passion.description', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (4, 'about.values.community.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (5, 'about.values.community.description', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (6, 'about.values.excellence.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (7, 'about.values.excellence.description', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (8, 'about.badge', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (9, 'about.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (10, 'about.description1', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (11, 'about.description2', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (12, 'about.values.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (13, 'teachers.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (14, 'teachers.subtitle', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (15, 'about.location.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (16, 'about.location.description', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (17, 'blog.badge', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (18, 'blog.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (19, 'blog.subtitle', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (20, 'contacts.badge', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (21, 'contacts.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (22, 'contacts.subtitle', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (23, 'contacts.info.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (24, 'contacts.hours.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (25, 'contacts.hours.weekdays', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (26, 'contacts.hours.weekend', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (27, 'contacts.social.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (28, 'styles.badge', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (29, 'styles.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (30, 'styles.subtitle', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (31, 'styles.filter.all', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (32, 'nav.about', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (33, 'nav.styles', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (34, 'nav.schedule', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (35, 'nav.teachers', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (36, 'nav.blog', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (37, 'nav.contacts', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (38, 'common.book', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (39, 'teachers.badge', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (40, 'schedule.day.monday', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (41, 'schedule.day.tuesday', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (42, 'schedule.day.wednesday', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (43, 'schedule.day.thursday', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (44, 'schedule.day.friday', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (45, 'schedule.day.saturday', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (46, 'schedule.day.sunday', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (47, 'styles.beginner', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (48, 'styles.intermediate', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (49, 'styles.advanced', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (50, 'schedule.badge', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (51, 'schedule.title', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (52, 'schedule.subtitle', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (53, '...', NULL, '2025-12-21 04:08:20');
INSERT INTO `translations` VALUES (54, 'home.where-passion', NULL, '2025-12-21 04:51:33');
INSERT INTO `translations` VALUES (55, 'home.best-studio', NULL, '2025-12-21 04:55:36');
INSERT INTO `translations` VALUES (56, 'home.eilat', NULL, '2025-12-21 04:58:18');
INSERT INTO `translations` VALUES (57, 'home.professional-dance-training', NULL, '2025-12-21 05:00:03');
INSERT INTO `translations` VALUES (58, 'home.watch-video', NULL, '2025-12-21 05:01:51');
INSERT INTO `translations` VALUES (59, 'home.happy-students', NULL, '2025-12-21 05:04:09');
INSERT INTO `translations` VALUES (60, 'home.years-experience', NULL, '2025-12-21 05:04:09');
INSERT INTO `translations` VALUES (61, 'home.dance-styles', NULL, '2025-12-21 05:04:09');
INSERT INTO `translations` VALUES (62, 'seo.site-name', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (63, 'seo.article-keywords', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (64, 'login.success', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (65, 'login.welcome-back', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (66, 'login.enter-credentials', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (67, 'login.email', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (68, 'login.password', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (69, 'login.signing-in', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (70, 'login.sign-in', NULL, '2025-12-21 15:32:02');
INSERT INTO `translations` VALUES (71, 'seo-schedule.eilat-schedule', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (72, 'seo-schedule.event-list-name', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (73, 'schedule.this-week', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (74, 'schedule.next-week', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (75, 'payment.book-class', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (76, 'payment.date', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (77, 'payment.class', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (78, 'payment.time', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (79, 'payment.teacher', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (80, 'payment.level', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (81, 'payment.price_label', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (82, 'payment.price_value', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (83, 'payment.instructions-title', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (84, 'payment.step1', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (85, 'payment.step2', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (86, 'payment.bit-number', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (87, 'payment.add-note', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (88, 'payment.your-name-date', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (89, 'payment.confirm-via-whatsapp', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (90, 'payment.step-qr', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (91, 'payment.bit-qr-code', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (92, 'payment.whatsapp-link', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (93, 'payment.i-paid', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (94, 'payment.paid-comment', NULL, '2025-12-21 16:08:23');
INSERT INTO `translations` VALUES (95, 'styles.seo-dance-classes', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (96, 'styles.seo-offered', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (97, 'styles.seo-home', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (98, 'styles.seo-dance-styles', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (99, 'styles.kids', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (100, 'styles.adults', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (101, 'instructors.instr1_name', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (102, 'instructors.instr1_role', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (103, 'instructors.instr1_image', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (104, 'instructors.instr1_seo_image', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (105, 'instructors.instr1_bio', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (106, 'instructors.instr1_alumniof', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (107, 'instructors.instr1_highlights', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (108, 'instructors.instr1_seo_award', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (109, 'instructors.instr1_specialties', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (110, 'instructors.instr1_gradient', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (111, 'instructors.instr1_bgcolor', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (112, 'instructors.instr2_name', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (113, 'instructors.instr2_role', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (114, 'instructors.instr2_image', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (115, 'instructors.instr2_seo_image', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (116, 'instructors.instr2_bio', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (117, 'instructors.instr2_alumniof', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (118, 'instructors.instr2_highlights', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (119, 'instructors.instr2_seo_award', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (120, 'instructors.instr2_specialties', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (121, 'instructors.instr2_gradient', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (122, 'instructors.instr2_bgcolor', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (123, 'instructors.seo-home', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (124, 'instructors.seo-teachers', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (125, 'instructors.years-15', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (126, 'instructors.years', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (127, 'instructors.achievements-experience', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (128, 'instructors.specialties', NULL, '2025-12-22 03:12:23');
INSERT INTO `translations` VALUES (129, 'footer.short_description', NULL, '2025-12-22 03:55:25');
INSERT INTO `translations` VALUES (130, 'footer.quick_links', NULL, '2025-12-22 03:55:25');
INSERT INTO `translations` VALUES (131, 'footer.contact', NULL, '2025-12-22 03:55:25');
INSERT INTO `translations` VALUES (132, 'footer.chat-whatsapp', NULL, '2025-12-22 03:55:25');
INSERT INTO `translations` VALUES (133, 'footer.copyright', NULL, '2025-12-22 03:55:25');
INSERT INTO `translations` VALUES (134, 'home.live-schedule', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (135, 'home.today-classes', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (136, 'home.view-full-schedule', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (137, 'home.no-today-classes', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (138, 'home.excellence', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (139, 'home.why', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (140, 'home.we-combine', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (141, 'home.what-say', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (142, 'home.real-feedback', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (143, 'home.no-reviews-yet', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (144, 'home.video-review', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (145, 'home.from-our-blog', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (146, 'home.tips-guides', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (147, 'home.all-articles', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (148, 'home.ready-to-dance', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (149, 'home.choose-class', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (150, 'home.go-to-schedule', NULL, '2025-12-22 04:31:48');
INSERT INTO `translations` VALUES (151, 'home.professional-teachers', NULL, '2025-12-22 04:55:37');
INSERT INTO `translations` VALUES (152, 'home.exp-15yrs', NULL, '2025-12-22 04:55:37');
INSERT INTO `translations` VALUES (153, 'home.central-location', NULL, '2025-12-22 04:55:37');
INSERT INTO `translations` VALUES (154, 'home.easy-to-reach', NULL, '2025-12-22 04:55:37');
INSERT INTO `translations` VALUES (155, 'home.friendly-atmosphere', NULL, '2025-12-22 04:55:37');
INSERT INTO `translations` VALUES (156, 'home.welcoming-community', NULL, '2025-12-22 04:55:37');
INSERT INTO `translations` VALUES (157, 'schedulecard.tomorrow', NULL, '2025-12-22 05:01:22');
INSERT INTO `translations` VALUES (158, 'contacts.no-map', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (159, 'contats.update-map', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (160, 'contacts.address', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (161, 'contacts.phone', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (162, 'contacts.bit-payments-available', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (163, 'contacts.email', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (164, 'contacts.how-to-find', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (165, 'contacts.public-transport', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (166, 'contacts.bus', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (167, 'contacts.parking', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (168, 'contacts.parking-available', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (169, 'contacts.entrance', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (170, 'contacts.entrance-way', NULL, '2025-12-22 16:05:42');
INSERT INTO `translations` VALUES (171, 'payment.bit-qr-code-image', NULL, '2025-12-23 03:24:51');
INSERT INTO `translations` VALUES (172, '404.title', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (173, '404.description', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (174, '404.back', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (175, '404.go-back', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (176, '404.jump-title', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (177, '404.dance-styles', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (178, '404.schedule', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (179, '404.teachers', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (180, '404.blog', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (181, 'about.teachers.title', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (182, 'about.teachers.subtitle', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (183, 'about.teachers.teacher1_image', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (184, 'about.teachers.teacher1_name', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (185, 'about.teachers.teacher1_tags', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (186, 'about.teachers.teacher1_description', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (187, 'about.teachers.teacher1_profile_link', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (188, 'about.teachers.view_full_profile', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (189, 'about.teachers.teacher2_image', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (190, 'about.teachers.teacher2_name', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (191, 'about.teachers.teacher2_tags', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (192, 'about.teachers.teacher2_description', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (193, 'about.teachers.teacher2_profile_link', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (194, 'about.visit-us', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (195, 'about.location', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (196, 'about.easy-parking', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (197, 'about.get-directions', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (198, 'about.studio-image-url', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (199, 'about.studio-image-alt', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (200, 'blog.post.back-to-blog', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (201, 'blog.post.ready-title', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (202, 'blog.post.ready-body', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (203, 'blog.post.ready-url', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (204, 'blog.post.about', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (205, 'blog.post.view-full-profile', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (206, 'blog.post.related-article', NULL, '2026-01-06 16:08:02');
INSERT INTO `translations` VALUES (207, 'home.youtube-video-url', NULL, '2026-01-06 16:08:03');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `role` enum('admin','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT 'user',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `phone` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bio` json NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NULL DEFAULT NULL,
  `is_instructor` tinyint(1) NOT NULL DEFAULT 0,
  `display_name` json NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uuid`(`uuid`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_520_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'e8f12f02-5c21-4c54-bf7c-6ad1dc475db6', 'admin@eilatdance.com', '$2b$10$99c8IPAeb7mnnhahCbmhi.27Gz0.Gjwwaez1KnlHKlGB3uYipOARy', 'admin', 'Admin', NULL, '2025-12-08 10:16:02', NULL, NULL, 0, NULL);
INSERT INTO `users` VALUES (2, '7676736726371', 'sofia@eilatdance.com', 'pwdd', 'admin', 'Sofia', '', '2025-12-11 05:38:32', '{\"en\": \"Sofia is a professional dance instructor with over 15 years of experience in child development through dance. She specializes in Jazz-funk, Stretching, and beginner classes for young children.\", \"ru\": \"София — профессиональный преподаватель танцев с более чем 15-летним опытом работы в области развития детей посредством танцев. Она специализируется на джаз-фанке, растяжке и проводит занятия для начинающих детей младшего возраста.\"}', '/uploads/20251210/171813-.photo-1657740034790-f860d612d1b2[1]', 1, '{\"en\": \"Sofia11\", \"he\": \"He33\", \"ru\": \"София22\"}');
INSERT INTO `users` VALUES (3, '0c650230-eb69-11f0-9434-e4e74952b297', 'maxim@eilatdance.com', '$2b$10$qJDpioiCtgyNw7sRhScRT.evVlB3TfRx2rC5xW//JBXkEAVjYt7GC', 'admin', 'Maxim', '', '2026-01-07 06:35:06', '{\"en\": \"\", \"he\": \"\", \"ru\": \"\"}', '', 1, '{\"en\": \"Maxim\", \"he\": \"\", \"ru\": \"Максим\"}');

SET FOREIGN_KEY_CHECKS = 1;
