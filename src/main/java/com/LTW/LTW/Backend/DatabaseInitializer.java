package com.LTW.LTW.Backend;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DatabaseInitializer {
	private String jdbcURL = "jdbc:mysql://localhost:3306/";
	private String jdbcUsername = "root";
	private String jdbcPassword = "1234";
	private final String dbName = "LTWBook";
	
	private final String CREATE_BOOK = "CREATE TABLE IF NOT EXISTS `book` (\r\n"
			+ "  `bookId` int NOT NULL AUTO_INCREMENT,\r\n"
			+ "  `title` varchar(90) DEFAULT NULL,\r\n"
			+ "  `author` varchar(90) DEFAULT NULL,\r\n"
			+ "  `description` varchar(200) DEFAULT NULL,\r\n"
			+ "  `releaseDate` date DEFAULT NULL,\r\n"
			+ "  `categoryId` int DEFAULT NULL,\r\n"
			+ "  `pageNum` int DEFAULT NULL,\r\n"
			+ "  `price` int DEFAULT NULL,\r\n"
			+ "  `numSold` int DEFAULT NULL,\r\n"
			+ "  `coverPath` varchar(90) DEFAULT NULL,\r\n"
			+ "  PRIMARY KEY (`bookId`)\r\n"
			+ ") ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\r\n";
	private final String CREATE_CART = "CREATE TABLE IF NOT EXISTS `cart` (\r\n"
			+ "  `id` int NOT NULL AUTO_INCREMENT,\r\n"
			+ "  `bookId` int DEFAULT NULL,\r\n"
			+ "  `username` varchar(45) DEFAULT NULL,\r\n"
			+ "  `amount` int DEFAULT NULL,\r\n"
			+ "  `status` int DEFAULT '0',\r\n"
			+ "  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,\r\n"
			+ "  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\r\n"
			+ "  PRIMARY KEY (`id`)\r\n"
			+ ") ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\r\n";
	private final String CREATE_CATEGORY = "CREATE TABLE IF NOT EXISTS `category` (\r\n"
			+ "  `id` int NOT NULL AUTO_INCREMENT,\r\n"
			+ "  `categoryName` varchar(80) DEFAULT NULL,\r\n"
			+ "  PRIMARY KEY (`id`)\r\n"
			+ ") ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\r\n";
	private final String CREATE_REVIEW = "CREATE TABLE IF NOT EXISTS `review` (\r\n"
			+ "  `id` int NOT NULL AUTO_INCREMENT,\r\n"
			+ "  `username` varchar(45) DEFAULT NULL,\r\n"
			+ "  `bookId` int DEFAULT NULL,\r\n"
			+ "  `comment` varchar(200) DEFAULT NULL,\r\n"
			+ "  `rating` float DEFAULT NULL,\r\n"
			+ "  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,\r\n"
			+ "  PRIMARY KEY (`id`)\r\n"
			+ ") ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\r\n";
	private final String CREATE_USER = "CREATE TABLE IF NOT EXISTS `user` (\r\n"
			+ "  `userId` int NOT NULL AUTO_INCREMENT,\r\n"
			+ "  `username` varchar(45) DEFAULT NULL,\r\n"
			+ "  `email` varchar(45) DEFAULT NULL,\r\n"
			+ "  `password` varchar(45) DEFAULT NULL,\r\n"
			+ "  `role` varchar(45) DEFAULT 'user',\r\n"
			+ "  PRIMARY KEY (`userId`)\r\n"
			+ ") ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\r\n";
	protected Connection getConnection(String dbName) {
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(jdbcURL + dbName, jdbcUsername, jdbcPassword);
		} catch (SQLException e) {
			// TODO: handle exception
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return connection;
	}
	
	private String execute(String cmd, String dbName) {
		String msg = "null";
		try {
			try (
					Connection connection = getConnection(dbName);
					PreparedStatement ps = connection.prepareStatement(cmd);
				) {
				
				ps.execute();
				msg = "success";
			} catch (SQLException e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return msg;
	}
	
	public DatabaseInitializer() {
		execute("CREATE DATABASE IF NOT EXISTS LTWBook", "");
		execute(CREATE_BOOK, dbName);
		execute(CREATE_CART, dbName);
		execute(CREATE_CATEGORY, dbName);
		execute(CREATE_REVIEW, dbName);
		execute(CREATE_USER, dbName);
	}
}
