SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `check_log`
-- ----------------------------
DROP TABLE IF EXISTS `check_log`;
CREATE TABLE `check_log` (
  `id` bigint(20) NOT NULL auto_increment,
  `user_id` mediumint(9) NOT NULL,
  `check_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户签到历史';

SET FOREIGN_KEY_CHECKS = 1;
