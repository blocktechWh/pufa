SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `check`
-- ----------------------------
DROP TABLE IF EXISTS `check`;
CREATE TABLE `check` (
  `id` mediumint(9) NOT NULL auto_increment,
  `user_id` mediumint(9) NOT NULL,
  `check_times` mediumint(9) NOT NULL DEFAULT 0,
  `check_times_total` mediumint(9) NOT NULL DEFAULT 0,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户签到';

SET FOREIGN_KEY_CHECKS = 1;
