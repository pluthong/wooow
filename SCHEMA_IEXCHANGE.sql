DROP DATABASE IF EXISTS iexchange;

CREATE DATABASE IF NOT EXISTS iexchange;

USE iexchange;

DROP TABLE IF EXISTS customers;

CREATE TABLE IF NOT EXISTS customers(
  `customerId` smallint(3) unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `customerImageUrl` varchar(200) DEFAULT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products(
  `productId` smallint(3) unsigned NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(200) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(6,2) DEFAULT NULL,
  `productCustomerId` smallint(3) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS productimages;

CREATE TABLE IF NOT EXISTS productimages(
  `productImageId` smallint(3) unsigned NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  `createDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `productImageMain` boolean NOT NULL DEFAULT 0,
  `productImageUrl` varchar(200) DEFAULT NULL,
  `productImageProductId` smallint(3) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
