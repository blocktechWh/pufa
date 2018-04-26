SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `feedback`
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` mediumint(9) NOT NULL auto_increment,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `feedback_type` mediumint(9) NOT NULL,
  `status` mediumint(9) NOT NULL DEFAULT 0,
  `image_url` varchar(1024) COLLATE utf8mb4_unicode_ci,
  `u_id` mediumint(9) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE,
  KEY `u_id` (`u_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户反馈';

SET FOREIGN_KEY_CHECKS = 1;
