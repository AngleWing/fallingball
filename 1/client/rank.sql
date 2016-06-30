/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50051
Source Host           : localhost:3306
Source Database       : rank

Target Server Type    : MYSQL
Target Server Version : 50051
File Encoding         : 65001

Date: 2012-08-07 17:33:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `ranking`
-- ----------------------------
DROP TABLE IF EXISTS `ranking`;
CREATE TABLE `ranking` (
  `id` int(11) NOT NULL auto_increment,
  `player` varchar(50) collate utf8_bin NOT NULL default 'someone',
  `score` time NOT NULL default '00:00:00',
  `ipadd` varchar(20) collate utf8_bin default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of ranking
-- ----------------------------
INSERT INTO `ranking` VALUES ('1', 'someone', '00:32:00', null);
INSERT INTO `ranking` VALUES ('2', 'someone', '00:00:00', null);
INSERT INTO `ranking` VALUES ('18', 'q12w121eqe', '00:10:04', null);
INSERT INTO `ranking` VALUES ('17', 'qweqe', '00:00:00', null);
INSERT INTO `ranking` VALUES ('5', 'momo?', '00:07:32', null);
INSERT INTO `ranking` VALUES ('6', 'momo', '00:04:43', null);
INSERT INTO `ranking` VALUES ('16', 'asfwqerwrw', '00:04:46', null);
INSERT INTO `ranking` VALUES ('9', 'feifei', '00:00:00', null);
INSERT INTO `ranking` VALUES ('15', 'asfdasfaf', '00:04:28', null);
INSERT INTO `ranking` VALUES ('14', 'asdff', '00:00:00', null);
INSERT INTO `ranking` VALUES ('12', 'nihao', '00:00:00', null);
INSERT INTO `ranking` VALUES ('13', 'women', '00:04:33', null);
INSERT INTO `ranking` VALUES ('19', 'good', '00:00:00', null);
INSERT INTO `ranking` VALUES ('20', 'MYBOOK', '00:04:26', null);
