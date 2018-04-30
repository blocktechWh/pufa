SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `user_lottery`
-- ----------------------------
DROP TABLE IF EXISTS `user_lottery`;
CREATE TABLE `user_lottery` (
  `id` mediumint(9) NOT NULL auto_increment,
  `user_id` mediumint(4) NOT NULL,
  `lottery_id` mediumint(9) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id` (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `lottery_id` (`lottery_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户抽奖关联表';

SET FOREIGN_KEY_CHECKS = 1;
